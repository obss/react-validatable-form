import get from 'lodash.get';
import { DEFAULT_LANG } from '../constants/Constants';
import {
    defaultEnFormatDate,
    defaultEnFormatDateWithTime,
    defaultTrFormatDate,
    defaultTrFormatDateWithTime,
    isEmptyString,
    isFunction,
    isNullOrUndefined,
    isObject,
    isString,
    isValidDate,
    isValidEmail,
    isValidIban,
    isValidNumber,
    isValidUrl,
} from '../utils/ControlUtils';

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
        return value.length < 1;
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
            if (dependantPaths && !Array.isArray(dependantPaths)) {
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

            if (path && !isString(path)) {
                throw `useValidatableForm error. "path" key should be a string`;
            }

            if (listPath && !isString(listPath)) {
                throw `useValidatableForm error. "listPath" key should be a string`;
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
                            const resultErrorMessageParams = ruleFunction(ruleParams);
                            if (resultErrorMessageParams) {
                                let validationErrorResult = null;
                                if (isString(resultErrorMessageParams)) {
                                    validationErrorResult = resultErrorMessageParams;
                                } else if (isObject(resultErrorMessageParams)) {
                                    resultErrorMessageParams.context = context;
                                    resultErrorMessageParams.rule = rule;
                                    resultErrorMessageParams.options = options;
                                    resultErrorMessageParams.indexOfList = indexOfList;
                                    if (resultErrorMessageParams.isCommonError) {
                                        validationErrorResult = getCommonErrorMessageByKey(resultErrorMessageParams);
                                    } else {
                                        validationErrorResult = getErrorMessage(resultErrorMessageParams);
                                    }
                                } else {
                                    throw `useValidatableForm error. Validation result should be either string or json on rule "${rule}" of path: ${path}. Current result: ${resultErrorMessageParams}`;
                                }
                                validationErrorOriginalResult[fullPath] = validationErrorResult;
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
    const { value } = ruleParams;
    if (isEmptyStringOrArray(value)) {
        const errorMessageParams = {
            value,
        };
        return errorMessageParams;
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
        const canditateValue = options[candidateKey];
        if (!isEmptyString(canditateValue)) {
            comparisonKey = candidateKey;
            break;
        }
    }

    let valueToBeCompared = value;
    if (currentRule === 'number') {
        valueToBeCompared = isEmptyString(value) ? undefined : Number(value);
    } else if (currentRule === 'length' || currentRule === 'listSize') {
        valueToBeCompared = value && value.length ? value.length : 0;
    }

    if (currentRule === 'number') {
        if (!isValidNumber(valueToBeCompared)) {
            const errorMessageParams = {
                messageKey: 'valueIsNotAValidNumber',
                isCommonError: true,
            };
            return errorMessageParams;
        }
        if (options.onlyIntegers) {
            if (!Number.isInteger(valueToBeCompared)) {
                const errorMessageParams = {
                    messageKey: 'valueIsNotAnInteger',
                    isCommonError: true,
                };
                return errorMessageParams;
            }
        }
    }

    if (currentRule === 'date') {
        if (!isValidDate(valueToBeCompared)) {
            const errorMessageParams = {
                messageKey: 'valueIsNotAValidDate',
                isCommonError: true,
            };
            return errorMessageParams;
        }
    }

    if (!comparisonKey) {
        if (currentRule === 'date') {
            return null;
        }
        if (currentRule === 'number') {
            return null;
        }
        throw `useValidatableForm error. comparison key is not found on rule "${currentRule}" of path: ${path}`;
    }

    let comparisonValue = null;
    if (isFunction(options[comparisonKey])) {
        const comparisonFunction = options[comparisonKey];
        comparisonValue = comparisonFunction(formData, indexOfList);
    } else {
        comparisonValue = options[comparisonKey];
    }

    if (isEmptyString(comparisonValue)) {
        const errorMessageParams = {
            messageKey: 'comparisonValueNotFound',
            isCommonError: true,
        };
        return errorMessageParams;
    }

    let currentValue = null;
    let targetValue = null;
    if (currentRule === 'date') {
        if (!isValidDate(comparisonValue)) {
            const errorMessageParams = {
                messageKey: 'comparisonValueIsNotAValidDate',
                isCommonError: true,
            };
            return errorMessageParams;
        }
        if (options.withTime) {
            currentValue = Date.UTC(
                valueToBeCompared.getFullYear(),
                valueToBeCompared.getMonth(),
                valueToBeCompared.getDate(),
                valueToBeCompared.getHours(),
                valueToBeCompared.getMinutes()
            );
            targetValue = Date.UTC(
                comparisonValue.getFullYear(),
                comparisonValue.getMonth(),
                comparisonValue.getDate(),
                comparisonValue.getHours(),
                comparisonValue.getMinutes()
            );
        } else {
            currentValue = Date.UTC(
                valueToBeCompared.getFullYear(),
                valueToBeCompared.getMonth(),
                valueToBeCompared.getDate()
            );
            targetValue = Date.UTC(
                comparisonValue.getFullYear(),
                comparisonValue.getMonth(),
                comparisonValue.getDate()
            );
        }
    } else {
        currentValue = valueToBeCompared;
        targetValue = Number(comparisonValue);
        if (!isValidNumber(targetValue)) {
            const errorMessageParams = {
                messageKey: 'comparisonValueIsNotAValidNumber',
                isCommonError: true,
            };
            return errorMessageParams;
        }
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
        const defaultFormatDate = context.lang === 'tr' ? defaultTrFormatDate : defaultEnFormatDate;
        const defaultFormatDateWithTime =
            context.lang === 'tr' ? defaultTrFormatDateWithTime : defaultEnFormatDateWithTime;
        const defaultFormatterFunction = options.withTime ? defaultFormatDateWithTime : defaultFormatDate;
        const contextDateFormatFunction = options.withTime
            ? context.dateWithTimeFormatterFunction
            : context.dateFormatterFunction;
        const dateFormatFunction = contextDateFormatFunction || defaultFormatterFunction;
        const currentDateValue = new Date(currentValue);
        errorMessageValue = dateFormatFunction(currentDateValue);
        const comparisonDateValue = new Date(comparisonValue);
        errorMessageComparisonValue = dateFormatFunction(comparisonDateValue);
    }

    if (!comparisonValidationResult) {
        const errorMessageParams = {
            value: errorMessageValue,
            comparisonValue: errorMessageComparisonValue,
            comparisonKey,
        };
        return errorMessageParams;
    }
    return null;
};

const handleStringControl = (ruleParams) => {
    const { options, value, validatorFunction } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    if (!validatorFunction(value)) {
        const errorMessageParams = {
            value,
        };
        return errorMessageParams;
    }
    return null;
};

const handleEqualityControl = (ruleParams) => {
    const { formData, options, currentRule, value, path, indexOfList } = ruleParams;

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
            value,
            comparisonValue,
        };
        return errorMessageParams;
    }
    return null;
};

const handleIncludesControl = (ruleParams) => {
    const { formData, options, currentRule, value, path, indexOfList } = ruleParams;

    if (isEmptyStringOrArray(value) && !options.applyToNulls) {
        return null;
    }

    const { includes } = options;

    if (!includes) {
        throw `useValidatableForm error. includes key is not found on rule "${currentRule}" of path: ${path}`;
    }

    let comparisonValue = null;
    if (isFunction(includes)) {
        comparisonValue = includes(formData, indexOfList);
    } else {
        comparisonValue = includes;
    }

    if (!comparisonValue) {
        const errorMessageParams = {
            messageKey: 'comparisonValueNotFound',
            isCommonError: true,
        };
        return errorMessageParams;
    }

    let valueToCompare = value;

    if (isNullOrUndefined(valueToCompare)) {
        valueToCompare = '';
    }

    if (!isString(valueToCompare)) {
        valueToCompare = value.toString();
    }

    if (!isString(comparisonValue)) {
        throw `useValidatableForm error. comparisonValue is not string on rule "${currentRule}" of path: ${path}`;
    }

    if (!valueToCompare.includes(comparisonValue)) {
        const errorMessageParams = {
            value: valueToCompare,
            comparisonValue,
        };
        return errorMessageParams;
    }
    return null;
};

const handleRegexControl = (ruleParams) => {
    const { options, currentRule, value, path } = ruleParams;

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
            value,
        };
        return errorMessageParams;
    }
    return null;
};

const handleUniqueControl = (ruleParams) => {
    const { formData, options, value, indexOfList, originalListPath, subRulePath } = ruleParams;

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
            value,
        };
        return errorMessageParams;
    }
    return null;
};

const getCommonErrorMessageByKey = (errorMessageParams) => {
    const { context, messageKey } = errorMessageParams;
    const { lang, translations } = context;
    const defaultMessage = translations[lang][messageKey];
    let messageToBeReturned = defaultMessage;
    if (!defaultMessage) {
        messageToBeReturned = translations[DEFAULT_LANG][messageKey]; // fallback default to en
    }
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
    const customMessage = options && options.customMessage;
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
    messageToBeReturned = messageToBeReturned.split('${value}').join(value);
    messageToBeReturned = messageToBeReturned.split('${comparisonValue}').join(comparisonValue);
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
    includes: handleIncludesControl,
    regex: handleRegexControl,
    unique: handleUniqueControl,
};
