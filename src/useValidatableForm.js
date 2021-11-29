import { useCallback, useContext, useEffect, useState } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import unset from 'lodash.unset';
import ReactValidatableFormContext from './ReactValidatableFormContext';
import { handleValidationsOfForm } from './operations/ValidationOperations';
import { isNullOrUndefined } from './utils/ControlUtils';

const findDuplicates = (arry) => arry.filter((item, index) => arry.indexOf(item) !== index);

const immediatelyFocusToHtmlElementWithGivenId = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`useValidatableForm warning. Dom element with id ${elementId} is not found to be focused`);
    } else {
        element.focus();
    }
};

const getFinalPropValueFromHookOrContext = (key, hookProps, context) => {
    let finalVal = false;
    if (!isNullOrUndefined(context[key])) {
        finalVal = context[key];
    }
    if (!isNullOrUndefined(hookProps[key])) {
        finalVal = hookProps[key];
    }
    return finalVal;
};

const useValidatableForm = (props) => {
    const { rules, initialFormData = {}, elementFocusHandler } = props;

    const context = useContext(ReactValidatableFormContext);
    const [currentFormData, setCurrentFormData] = useState(initialFormData);
    const [currentRules, setCurrentRules] = useState(rules);
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const [blurPathList, setBlurPathList] = useState([]);
    const [validationErrorOriginalResult, setValidationErrorOriginalResult] = useState({});

    if (!context) {
        throw new Error('useValidatableForm hook must be used inside ReactValidatableFormProvider context');
    }

    useEffect(() => {
        runValidations();
    }, [context]);

    useEffect(() => {
        if (currentRules) {
            if (!Array.isArray(currentRules)) {
                throw `useValidatableForm error. "rules" should be an array`;
            }
            const pathsOfCurrentRules = currentRules.map((cr) => cr.path).filter((cr) => cr);
            const duplicatePaths = findDuplicates(pathsOfCurrentRules);
            if (duplicatePaths && duplicatePaths.length > 0) {
                throw `useValidatableForm error. Duplicate path keys found on rules: ${duplicatePaths}`;
            }
            const listPathsOfCurrentRules = currentRules.map((cr) => cr.listPath).filter((cr) => cr);
            const duplicateListPaths = findDuplicates(listPathsOfCurrentRules);
            if (duplicateListPaths && duplicateListPaths.length > 0) {
                throw `useValidatableForm error. Duplicate listPath keys found on rules: ${duplicateListPaths}`;
            }
        }
    }, [currentRules]);

    const handleSetFormIsSubmitted = () => {
        setFormIsSubmitted(true);
        let finalFocusToErrorAfterSubmit = getFinalPropValueFromHookOrContext(
            'focusToErrorAfterSubmit',
            props,
            context
        );
        if (!isValid && finalFocusToErrorAfterSubmit) {
            const focusToElementFunction =
                elementFocusHandler || context.elementFocusHandler || immediatelyFocusToHtmlElementWithGivenId;
            for (let i = 0; i < currentRules.length; i++) {
                const ruleDef = currentRules[i];
                if (!ruleDef.disableFocusAfterSubmit) {
                    const path = ruleDef.path;
                    const elementId = ruleDef.elementId;
                    const listPath = ruleDef.listPath;
                    const listElementId = ruleDef.listElementId;
                    const subRules = ruleDef.subRules;
                    let scrollableList = [];
                    if (listPath) {
                        if (subRules) {
                            const fullElementIdPrefix = listElementId || listPath;
                            const listData = get(currentFormData, listPath);
                            if (listData && listData.length > 0) {
                                for (let j = 0; j < listData.length; j++) {
                                    for (let s = 0; s < subRules.length; s++) {
                                        const subRule = subRules[s];
                                        if (!subRule.disableFocusAfterSubmit) {
                                            const subRulePath = subRule.path;
                                            const subElementId = subRule.elementId || subRulePath;
                                            scrollableList.push({
                                                fullPath: `${listPath}{${j}}.${subRulePath}`,
                                                fullElementId: `${fullElementIdPrefix}{${j}}.${subElementId}`,
                                            });
                                        }
                                    }
                                }
                            }
                        } else {
                            const fullElementIdPrefix = listElementId || listPath;
                            const listData = get(currentFormData, listPath);
                            if (listData && listData.length > 0) {
                                for (let j = 0; j < listData.length; j++) {
                                    scrollableList.push({
                                        fullPath: `${listPath}{${j}}`,
                                        fullElementId: `${fullElementIdPrefix}{${j}}`,
                                    });
                                }
                            }
                        }
                    } else {
                        const fullElementId = elementId || path;
                        scrollableList.push({
                            fullPath: path,
                            fullElementId: fullElementId,
                        });
                    }

                    if (scrollableList && scrollableList.length > 0) {
                        for (let k = 0; k < scrollableList.length; k++) {
                            const scrollableObject = scrollableList[k];
                            const fullPath = scrollableObject.fullPath;
                            const fullElementId = scrollableObject.fullElementId;
                            if (validationErrorOriginalResult[fullPath] && fullElementId) {
                                focusToElementFunction(fullElementId);
                                return isValid;
                            }
                        }
                    }
                }
            }
        }
        return isValid;
    };

    const resetForm = () => {
        setFormIsSubmitted(false);
        setBlurPathList([]);
    };

    const runValidations = (runParams) => {
        setValidationErrorOriginalResult((latestValidationErrorOriginalResult) => {
            const { newFormData, newRules, pathToBeRun } = runParams || {};
            const rules = newRules ? newRules : currentRules;
            const formData = newFormData ? newFormData : currentFormData;
            const validationParams = {
                currentValidationError: latestValidationErrorOriginalResult,
                context,
                rules,
                formData: formData || {},
                pathToBeRun,
            };
            const newValidationErrorOriginalResult = handleValidationsOfForm(validationParams);
            return newValidationErrorOriginalResult;
        });
    };

    const setPathValue = useCallback(
        (path, value) => {
            setCurrentFormData((latestFormData) => {
                const newFormData = { ...latestFormData };
                set(newFormData, path, value);
                let pathToBeRun = path;
                runValidations({ newFormData, pathToBeRun });
                return newFormData;
            });
        },
        [context, currentRules, setCurrentFormData, setValidationErrorOriginalResult]
    );

    const unsetPathValue = useCallback(
        (path) => {
            setCurrentFormData((latestFormData) => {
                const newFormData = { ...latestFormData };
                unset(newFormData, path);
                let pathToBeRun = path;
                runValidations({ newFormData, pathToBeRun });
                return newFormData;
            });
        },
        [context, currentRules, setCurrentFormData, setValidationErrorOriginalResult]
    );

    const handleSetCurrentRules = (newRules) => {
        runValidations({ newRules });
        setCurrentRules(newRules);
    };

    const handleSetFormData = (newFormData, pathToBeRun) => {
        runValidations({ newFormData, pathToBeRun });
        setCurrentFormData(newFormData);
    };

    const handleSetFormDataAndCurrentRules = (newFormData, newRules) => {
        runValidations({ newFormData, newRules });
        setCurrentRules(newRules);
        setCurrentFormData(newFormData);
    };

    const setPathIsBlurred = useCallback(
        (path) => {
            if (path) {
                setBlurPathList((latestBlurPathList) => {
                    const newBlurPathList = [...latestBlurPathList];
                    if (!newBlurPathList.includes(path)) {
                        newBlurPathList.push(path);
                    }
                    return newBlurPathList;
                });
            }
        },
        [context, currentRules, setBlurPathList, setValidationErrorOriginalResult]
    );

    const isValid = Object.keys(validationErrorOriginalResult).length < 1;

    let validationError = { ...validationErrorOriginalResult };
    let finalHideBeforeSubmit = getFinalPropValueFromHookOrContext('hideBeforeSubmit', props, context);
    if (finalHideBeforeSubmit && !formIsSubmitted) {
        let finalShowAfterBlur = getFinalPropValueFromHookOrContext('showAfterBlur', props, context);
        if (finalShowAfterBlur) {
            Object.keys(validationErrorOriginalResult).forEach((pathForFocus) => {
                if (!blurPathList.includes(pathForFocus)) {
                    delete validationError[pathForFocus];
                }
            });
        } else {
            validationError = {};
        }
    }

    const getValue = (path) => {
        return get(currentFormData, path);
    };

    const getError = (path) => {
        return get(validationError, path);
    };

    return {
        isValid: isValid,
        validationError: validationError,
        validationErrorOriginalResult: validationErrorOriginalResult,
        formData: currentFormData || {},
        forceRunAllValidations: runValidations,
        resetForm: resetForm,
        setPathValue: setPathValue,
        unsetPathValue: unsetPathValue,
        setFormData: handleSetFormData,
        setRules: handleSetCurrentRules,
        setFormDataAndRules: handleSetFormDataAndCurrentRules,
        setFormIsSubmitted: handleSetFormIsSubmitted,
        setPathIsBlurred: setPathIsBlurred,
        getValue: getValue,
        getError: getError,
    };
};

export default useValidatableForm;
