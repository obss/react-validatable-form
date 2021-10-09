import React from 'react';
import { DEFAULT_LANG } from './constants/Constants';
import { VALIDATION_OPERATIONS_MAP } from './operations/ValidationOperations';
import ReactValidatableFormContext from './ReactValidatableFormContext';
import originalTranslations from './translations';

const ReactValidatableFormProvider = (props) => {
    const {
        customRules,
        lang,
        translations,
        hideBeforeSubmit,
        showAfterBlur,
        focusToErrorAfterSubmit,
        elementFocusHandler,
    } = props;
    const contextValue = { lang: DEFAULT_LANG };

    let allRules = { ...VALIDATION_OPERATIONS_MAP };
    if (customRules) {
        const baseRuleKeys = Object.keys(VALIDATION_OPERATIONS_MAP);
        Object.keys(customRules).forEach((cr) => {
            if (baseRuleKeys.includes(cr)) {
                throw `ReactValidatableFormProvider error. rule key: "${cr}" is already defined. Please rename custom rule key parameter of ReactValidatableFormProvider.`;
            }
        });
        allRules = { ...allRules, ...customRules };
    }
    contextValue.allRules = allRules;

    contextValue.translations = JSON.parse(JSON.stringify(originalTranslations));
    if (translations) {
        Object.keys(translations).forEach((langKey) => {
            if (!contextValue.translations[langKey]) {
                contextValue.translations[langKey] = {};
            }
            contextValue.translations[langKey] = { ...contextValue.translations[langKey], ...translations[langKey] };
        });
    }

    if (lang) {
        if (!Object.keys(contextValue.translations).includes(lang)) {
            throw `ReactValidatableFormProvider error. lang: "${lang}" is not found on translations.`;
        }
        contextValue.lang = lang;
    }

    contextValue.hideBeforeSubmit = hideBeforeSubmit;
    contextValue.showAfterBlur = showAfterBlur;
    contextValue.focusToErrorAfterSubmit = focusToErrorAfterSubmit;
    contextValue.elementFocusHandler = elementFocusHandler;

    return (
        <ReactValidatableFormContext.Provider value={contextValue}>
            {props.children}
        </ReactValidatableFormContext.Provider>
    );
};

export default ReactValidatableFormProvider;
