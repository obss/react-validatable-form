import { useValidatableForm } from 'react-validatable-form';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import React from 'react';

const initialFormData = {
    val1: 'a',
    val2: 'a',
    val3: 's',
    val4: 'sdd',
    checkVal: false,
};

const customMessageFunc = (errorParams) => {
    if (errorParams.value > errorParams.comparisonValue) {
        return `This field's length should be ${errorParams.comparisonValue}, your input's (${errorParams.value}) is greater than this value`;
    }
    return `This field's length should be ${errorParams.comparisonValue}, your input's (${errorParams.value}) is less than this value`;
};

const customMessageFuncJsx = (errorParams) => {
    return (
        <span>
            This field{"'"}s length should be <b>{errorParams.comparisonValue} </b>, your input length is{' '}
            <b> {errorParams.value} </b>
        </span>
    );
};

const rules = [
    {
        path: 'val1',
        ruleSet: [
            'required',
            {
                rule: 'length',
                greaterThan: 8,
                customMessage: "This field's length is ${value}, however it should be greater than ${comparisonValue}",
            },
        ],
    },
    { path: 'val2', ruleSet: ['required', { rule: 'length', equalTo: 5, customMessage: customMessageFunc }] },
    {
        path: 'val3',
        ruleSet: [
            'required',
            {
                rule: 'myCustomRule2',
                customMessage:
                    "Hello, this is myCustomRule2 customMessage. This field is not valid, because text ${value} should either include letter 'a' or its length should be greater than 4",
            },
        ],
    },
    {
        path: 'val4',
        ruleSet: [
            {
                rule: 'required',
                customMessage: (
                    <span>
                        This field is <b> required </b>
                    </span>
                ),
            },
            {
                rule: 'length',
                equalTo: 6,
                customMessage: customMessageFuncJsx,
            },
        ],
    },
];

const CustomMessage = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header="customMessage" codeUrl="components/customizations/CustomMessage.js">
            <p className="infoParagraph">
                Validation error message of a rule can be customized by passing <b>customMessage</b> param to the rule.
            </p>
            <div>
                <div>
                    <TextField
                        error={!!getError('val1')}
                        helperText={getError('val1') || ' '}
                        label="val1 (customMessage as string)"
                        type="text"
                        value={getValue('val1') || ''}
                        onChange={(e) => setPathValue('val1', e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('val2')}
                        helperText={getError('val2') || ' '}
                        label="val2 (customMessage as function)"
                        type="text"
                        value={getValue('val2') || ''}
                        onChange={(e) => setPathValue('val2', e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('val3')}
                        helperText={getError('val3') || ' '}
                        label="val3 (customMessage for custom rule)"
                        type="text"
                        value={getValue('val3') || ''}
                        onChange={(e) => setPathValue('val3', e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('val4')}
                        helperText={getError('val4') || ' '}
                        label="val4 (customMessage for jsx)"
                        type="text"
                        value={getValue('val4') || ''}
                        onChange={(e) => setPathValue('val4', e.target.value)}
                    />
                </div>
                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </div>
        </ExampleUsageWrapper>
    );
};

export default CustomMessage;
