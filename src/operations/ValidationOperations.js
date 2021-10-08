import { get, isArray, isDate, isEmpty, isFunction, isString } from 'lodash';
import { DEFAULT_LANG } from '../constants/Constants';
import { defaultFormatDate, isEmptyString, isValidEmail, isValidIban, isValidUrl } from '../utils/ControlUtils';

const COMPARISON_KEYS = [
    'equalTo',
    'lessThan',
    'lessThanOrEqualTo',
    'greaterThan',
    'greaterThanOrEqualTo',
    'notEqualTo',
];

const isEmptyStringOrArray = (value) => {
    if (Array.isArray(value)) {
        return isEmpty(value);
    }
    return isEmptyString(value);
};

export const handleValidationsOfForm = (validationParams) => {
    const { rules, formData, context, currentValidationError, pathToBeRun } = validationParams;

    let validationErrorOriginalResult = {};

    if (rules) {
        if (!Array.isArray(rules)) {
            throw `useValidatableForm error. "rules" should be an array`;
        }

        let rulesToBeRun = [];

        if (pathToBeRun) {
            let resultStr = pathToBeRun;
            if (resultStr.includes('[')) {
                resultStr = resultStr.substring(0, resultStr.indexOf('['));
            }
            validationErrorOriginalResult = { ...currentValidationError };
            rulesToBeRun = rules.filter((r) => {
                if (
                    resultStr === r.path ||
                    resultStr === r.listPath ||
                    (r.dependantPaths && r.dependantPaths.includes(resultStr))
                ) {
                    return true;
                }
                return false;
            });

            const keysToBeDeleted = Object.keys(validationErrorOriginalResult).filter((kp) => {
                return kp === resultStr || kp.startsWith(resultStr + '{');
            });
            keysToBeDeleted.forEach((kd) => {
                delete validationErrorOriginalResult[kd];
            });
        } else {
            validationErrorOriginalResult = {};
            rulesToBeRun = rules;
        }

        rulesToBeRun.forEach((ruleDef) => {
            const path = ruleDef.path;
            const listPath = ruleDef.listPath;
            const dependantPaths = ruleDef.dependantPaths;
            const subRules = ruleDef.subRules;

            if (!path && !listPath) {
                throw `useValidatableForm error. Either "path" or "listPath" keys should exist in validation definitions`;
            }
            if (listPath && path) {
                throw `useValidatableForm error. Only one of "path" or "listPath" keys should exist in validation definitions`;
            }
            if (dependantPaths && !isArray(dependantPaths)) {
                throw `useValidatableForm error. "dependantPaths" key should be an array`;
            }
            let ruleArrayOfKey = [];
            const ruleSetOfKey = ruleDef.ruleSet;
            if (!listPath && !ruleSetOfKey) {
                throw `useValidatableForm error. "ruleSet" key should exist in validation definitions if "path" is the key`;
            }

            if (listPath && !ruleSetOfKey && !subRules) {
                throw `useValidatableForm error. One of "ruleSet" or "subRules" keys should exist in validation definitions if "listPath" is the key`;
            }
            if (subRules && ruleSetOfKey) {
                throw `useValidatableForm error. Only one of "ruleSet" or "subRules" keys should exist in validation definitions`;
            }

            if (ruleSetOfKey) {
                if (Array.isArray(ruleSetOfKey)) {
                    ruleArrayOfKey = [...ruleSetOfKey];
                } else {
                    ruleArrayOfKey.push(ruleSetOfKey);
                }
            }

            let valuesToBeValidated = [];
            if (listPath) {
                if (subRules) {
                    if (!Array.isArray(subRules)) {
                        throw `useValidatableForm error. "subRules" param should be an array`;
                    }
                    for (let s = 0; s < subRules.length; s++) {
                        const subRule = subRules[s];
                        const subRulePath = subRule.path;
                        const subRuleSet = subRule.ruleSet;
                        if (subRuleSet) {
                            if (Array.isArray(subRuleSet)) {
                                ruleArrayOfKey = [...subRuleSet];
                            } else {
                                ruleArrayOfKey.push(subRuleSet);
                            }
                        }

                        const listObject = get(formData, listPath);
                        if (listObject && listObject.length > 0) {
                            for (let k = 0; k < listObject.length; k++) {
                                const validatableObject = {
                                    value: get(listObject[k], subRulePath),
                                    fullPath: `${listPath}{${k}}.${subRulePath}`,
                                    subRuleSet: subRuleSet,
                                    indexOfList: k,
                                    subRulePath: subRulePath,
                                };
                                valuesToBeValidated.push(validatableObject);
                            }
                        }
                    }
                } else {
                    const listObject = get(formData, listPath);
                    if (listObject && listObject.length > 0) {
                        for (let k = 0; k < listObject.length; k++) {
                            const validatableObject = {
                                value: listObject[k],
                                fullPath: `${listPath}{${k}}`,
                                subRuleSet: ruleSetOfKey,
                                indexOfList: k,
                            };
                            valuesToBeValidated.push(validatableObject);
                        }
                    }
                }
            } else {
                const validatableObject = {
                    value: get(formData, path),
                    fullPath: path,
                    subRuleSet: ruleSetOfKey,
                };
                valuesToBeValidated.push(validatableObject);
            }

            if (valuesToBeValidated.length > 0) {
                for (let k = 0; k < valuesToBeValidated.length; k++) {
                    const subRuleSet = valuesToBeValidated[k].subRuleSet;
                    for (let i = 0; i < subRuleSet.length; i++) {
                        const ruleInfo = subRuleSet[i];
                        let rule = null;
                        let options = {};
                        if (isString(ruleInfo)) {
                            rule = ruleInfo;
                            options = {};
                        } else {
                            const { rule: ruleName, ...optionsOfRule } = ruleInfo;
                            rule = ruleName;
                            options = optionsOfRule;
                        }

                        if (!rule) {
                            if (path) {
                                throw `useValidatableForm error. "rule" key should exist in validation definitions object of path: ${path}`;
                            } else {
                                throw `useValidatableForm error. "rule" key should exist in validation definitions object of listPath: ${listPath}`;
                            }
                        }

                        if (rule === 'unique' && !listPath) {
                            throw `useValidatableForm error. Rule "unique" can only be used with "listPath"`;
                        }

                        let ruleFunction = null;
                        if (isFunction(rule)) {
                            ruleFunction = rule;
                        } else {
                            ruleFunction = context.allRules[rule];
                        }

                        if (!ruleFunction) {
                            throw `useValidatableForm error. rule "${rule}" is not defined`;
                        }
                        const validatorFunction = VALIDATOR_FUNCTION_MAP[rule];

                        const value = valuesToBeValidated[k].value;
                        const fullPath = valuesToBeValidated[k].fullPath;
                        const indexOfList = valuesToBeValidated[k].indexOfList;
                        const subRulePath = valuesToBeValidated[k].subRulePath;

                        delete validationErrorOriginalResult[fullPath];

                        const ruleParams = {
                            value,
                            context,
                            formData,
                            path: fullPath,
                            options,
                            currentRule: rule,
                            validatorFunction,
                            indexOfList,
                            originalListPath: listPath,
                            subRulePath,
                        };
                        const isEnabled = handleIsValidationEnabled(ruleParams);
                        if (isEnabled) {
                            const currentValidationResult = ruleFunction(ruleParams);
                            if (currentValidationResult) {
                                validationErrorOriginalResult[fullPath] = currentValidationResult;
                                break;
                            }
                        }
                    }
                }
            }
        });
    }

    return validationErrorOriginalResult;
};

const handleIsValidationEnabled = (ruleParams) => {
    const { formData, indexOfList, options } = ruleParams;
    const { disableIf, enableIf } = options;

    if (disableIf && !isFunction(disableIf)) {
        throw `useValidatableForm error. "disableIf" property should be a function`;
    }
    if (enableIf && !isFunction(enableIf)) {
        throw `useValidatableForm error. "enableIf" property should be a function`;
    }
    let isDisabled = false;
    let isEnabled = true;
    if (disableIf) {
        isDisabled = disableIf(formData, indexOfList);
    }
    if (enableIf) {
        isEnabled = enableIf(formData, indexOfList);
    }

    const result = !isDisabled && isEnabled;
    return result;
};

const handleRequired = (ruleParams) => {
    const { context, options, currentRule, value, indexOfList } = ruleParams;
    if (isEmptyStringOrArray(value)) {
        const errorMessageParams = {
            context,
            value,
            options,
            rule: currentRule,
            indexOfList,
        };
        return getErrorMessage(errorMessageParams);
    }
    return null;
};

const handleGeneralComparison = (ruleParams) => {
    const { context, path, options, currentRule, formData, value, indexOfList } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    let comparisonKey = null;
    for (let i = 0; i < COMPARISON_KEYS.length; i++) {
        const candidateKey = COMPARISON_KEYS[i];
        if (options[candidateKey]) {
            comparisonKey = candidateKey;
            break;
        }
    }
    if (!comparisonKey) {
        throw `useValidatableForm error. comparison key is not found on rule "${currentRule}" of path: ${path}`;
    }

    let valueToBeCompared = value;
    if (currentRule === 'length' || currentRule === 'listSize') {
        valueToBeCompared = value ? value.length : 0;
    }

    let comparisonValue = null;
    if (isFunction(options[comparisonKey])) {
        const comparisonFunction = options[comparisonKey];
        comparisonValue = comparisonFunction(formData, indexOfList);
    } else {
        comparisonValue = options[comparisonKey];
    }

    if (!comparisonValue) {
        const errorMessageParams = {
            context,
            messageKey: 'comparisonValueNotFound',
        };
        return getGeneralErrorMessageByKey(errorMessageParams);
    }

    let currentValue = null;
    let targetValue = null;
    if (currentRule === 'date') {
        if (!isDate(valueToBeCompared)) {
            const errorMessageParams = {
                context,
                messageKey: 'valueIsNotAValidDate',
            };
            return getGeneralErrorMessageByKey(errorMessageParams);
        }
        if (!isDate(comparisonValue)) {
            const errorMessageParams = {
                context,
                messageKey: 'comparisonValueIsNotAValidDate',
            };
            return getGeneralErrorMessageByKey(errorMessageParams);
        }
        currentValue = Date.UTC(
            valueToBeCompared.getFullYear(),
            valueToBeCompared.getMonth(),
            valueToBeCompared.getDate()
        );
        targetValue = Date.UTC(comparisonValue.getFullYear(), comparisonValue.getMonth(), comparisonValue.getDate());
    } else {
        currentValue = parseInt(valueToBeCompared);
        targetValue = parseInt(comparisonValue);
    }

    const compareParams = {
        context,
        currentValue,
        targetValue,
        comparisonKey,
        rule: currentRule,
    };

    const comparisonValidationResult = compareValuesAccordingToKey(compareParams);
    if (isString(comparisonValidationResult)) {
        return comparisonValidationResult;
    }

    let errorMessageValue = currentValue;
    let errorMessageComparisonValue = comparisonValue;
    if (currentRule === 'date') {
        const dateFormatFunction = context.dateFormatterFunction || defaultFormatDate;
        const currentDateValue = new Date(currentValue);
        errorMessageValue = dateFormatFunction(currentDateValue);
        const comparisonDateValue = new Date(comparisonValue);
        errorMessageComparisonValue = dateFormatFunction(comparisonDateValue);
    }

    if (!comparisonValidationResult) {
        const errorMessageParams = {
            context,
            value: errorMessageValue,
            comparisonValue: errorMessageComparisonValue,
            comparisonKey,
            options,
            rule: currentRule,
            originalValue: value,
            indexOfList,
        };
        return getErrorMessage(errorMessageParams);
    }
    return null;
};

const handleStringControl = (ruleParams) => {
    const { context, options, currentRule, value, validatorFunction, indexOfList } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    if (!validatorFunction(value)) {
        const errorMessageParams = {
            context,
            value,
            options,
            rule: currentRule,
            indexOfList,
        };
        return getErrorMessage(errorMessageParams);
    }
    return null;
};

const handleEqualityControl = (ruleParams) => {
    const { context, formData, options, currentRule, value, path, indexOfList } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    const { equalTo } = options;

    if (!equalTo) {
        throw `useValidatableForm error. equalTo key is not found on rule "${currentRule}" of path: ${path}`;
    }

    let comparisonValue = null;
    if (isFunction(equalTo)) {
        comparisonValue = equalTo(formData, indexOfList);
    } else {
        comparisonValue = equalTo;
    }

    if (comparisonValue !== value) {
        const errorMessageParams = {
            context,
            value,
            options,
            rule: currentRule,
            indexOfList,
        };
        return getErrorMessage(errorMessageParams);
    }
    return null;
};

const handleRegexControl = (ruleParams) => {
    const { context, options, currentRule, value, path, indexOfList } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    const { regex } = options;

    if (!regex) {
        throw `useValidatableForm error. regex key is not found on rule "${currentRule}" of path: ${path}`;
    }

    let regexObject = null;
    try {
        regexObject = new RegExp(regex);
    } catch (e) {
        throw `useValidatableForm error. regex param is not valid on rule "${currentRule}" of path: ${path}`;
    }

    if (!regexObject.test(value)) {
        const errorMessageParams = {
            context,
            value,
            options,
            rule: currentRule,
            indexOfList,
        };
        return getErrorMessage(errorMessageParams);
    }
    return null;
};

const handleUniqueControl = (ruleParams) => {
    const { context, formData, options, currentRule, value, indexOfList, originalListPath, subRulePath } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    const fullList = get(formData, originalListPath);
    const valueExistsInList =
        fullList &&
        fullList.filter((el, ind) => {
            let valueIsEqual = false;
            if (subRulePath) {
                valueIsEqual = get(el, subRulePath) === value;
            } else {
                valueIsEqual = el === value;
            }
            return valueIsEqual && indexOfList !== ind;
        }).length > 0;
    if (valueExistsInList) {
        const errorMessageParams = {
            context,
            value,
            options,
            rule: currentRule,
            indexOfList,
        };
        return getErrorMessage(errorMessageParams);
    }
    return null;
};

const getGeneralErrorMessageByKey = (errorMessageParams) => {
    const { context, messageKey } = errorMessageParams;
    const { lang, translations } = context;
    const defaultMessage = translations[lang][messageKey];
    let messageToBeReturned = defaultMessage;
    return messageToBeReturned;
};

const getErrorMessage = (errorMessageParams) => {
    const { context, value, comparisonValue, comparisonKey, rule, options } = errorMessageParams;
    const { lang, translations } = context;
    let messageKey = `${rule}`;
    if (comparisonKey) {
        messageKey = `${rule}.${comparisonKey}`;
    }
    const defaultMessage = translations[lang][messageKey];
    const { customMessage } = options;
    let messageToBeReturned = defaultMessage;
    if (!defaultMessage) {
        messageToBeReturned = translations[DEFAULT_LANG][messageKey]; // fallback default to en
    }
    if (customMessage) {
        if (isString(customMessage)) {
            messageToBeReturned = customMessage;
        } else if (isFunction(customMessage)) {
            messageToBeReturned = customMessage(errorMessageParams);
            if (!messageToBeReturned || !isString(messageToBeReturned)) {
                throw `useValidatableForm error. "customMessage" function should return a valid string. currentValue: ${messageToBeReturned}`;
            }
        } else {
            throw `useValidatableForm error. "customMessage" should be either of type string or function`;
        }
    }
    if (!messageToBeReturned) {
        throw `useValidatableForm error. Validation result could not be found while validating rule "${rule}" on value ${value}`;
    }
    messageToBeReturned = messageToBeReturned.replaceAll('${value}', value);
    messageToBeReturned = messageToBeReturned.replaceAll('${comparisonValue}', comparisonValue);
    return messageToBeReturned;
};

const compareValuesAccordingToKey = (compareParams) => {
    const { currentValue, targetValue, comparisonKey } = compareParams;

    switch (comparisonKey) {
        case 'equalTo':
            return currentValue === targetValue;
        case 'greaterThanOrEqualTo':
            return currentValue >= targetValue;
        case 'lessThanOrEqualTo':
            return currentValue <= targetValue;
        case 'greaterThan':
            return currentValue > targetValue;
        case 'lessThan':
            return currentValue < targetValue;
        case 'notEqualTo':
            return currentValue !== targetValue;
    }
    return false;
};

const VALIDATOR_FUNCTION_MAP = {
    email: isValidEmail,
    url: isValidUrl,
    iban: isValidIban,
};

export const VALIDATION_OPERATIONS_MAP = {
    required: handleRequired,
    number: handleGeneralComparison,
    length: handleGeneralComparison,
    listSize: handleGeneralComparison,
    date: handleGeneralComparison,
    email: handleStringControl,
    url: handleStringControl,
    iban: handleStringControl,
    equality: handleEqualityControl,
    regex: handleRegexControl,
    unique: handleUniqueControl,
};
