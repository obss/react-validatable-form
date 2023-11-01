import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ruleOptions } from '../../constants/Constants';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const defaultComparisonValue = 5;
const lengthRule = { rule: 'length' };
lengthRule[ruleOptions[0]] = defaultComparisonValue;
const rules = [{ path: 'val', ruleSet: ['required', lengthRule], dependantPaths: ['comparisonValue'] }];
const initialFormData = {
    val: 'aa',
    ruleOption: ruleOptions[0],
    comparisonValue: defaultComparisonValue,
};

const RuleLength = () => {
    const { isValid, setPathValue, setRules, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });
    const [currentRules, setCurrentRules] = useState(rules);
    const [ruleOption, setRuleOption] = useState(ruleOptions[0]);
    const [isFunc, setIsFunc] = useState(false);

    const updateRules = (funcParam, ruleParam) => {
        const newRules = JSON.parse(JSON.stringify(rules));
        const newRuleSet = [...newRules[0].ruleSet];
        const newRule = { rule: 'length' };
        if (funcParam) {
            newRule[ruleParam] = (formData) => formData['comparisonValue'];
        } else {
            newRule[ruleParam] = defaultComparisonValue;
        }
        newRuleSet.splice(1, 1, newRule);
        newRules[0].ruleSet = newRuleSet;
        setCurrentRules(newRules);
        setRules(newRules);
    };

    const handleSetIsFunc = (newValue) => {
        updateRules(newValue, ruleOption);
        setIsFunc(newValue);
    };

    const handleRuleOptionChange = (newValue) => {
        updateRules(isFunc, newValue);
        setRuleOption(newValue);
    };

    return (
        <ExampleUsageWrapper header="length" codeUrl="components/rules/RuleLength.js">
            <p className="infoParagraph">
                <b>length</b> rule checks the length of a string. <b>{ruleOptions.join(', ')}</b> parameters are used to
                make comparisons with given comparison values.
            </p>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('val')}
                    helperText={getError('val') || ' '}
                    label="val"
                    type="text"
                    value={getValue('val')}
                    onChange={(e) => setPathValue('val', e.target.value)}
                />

                <Autocomplete
                    className="ruleOptionComponent"
                    value={ruleOption}
                    onChange={(event, newValue) => {
                        handleRuleOptionChange(newValue);
                    }}
                    options={ruleOptions}
                    disableClearable={true}
                    renderInput={(params) => <TextField {...params} label="ruleOption" />}
                />
                {isFunc ? (
                    <TextField
                        className="comparisonComponent"
                        label="comparisonValue"
                        type="number"
                        value={getValue('comparisonValue')}
                        onChange={(e) => setPathValue('comparisonValue', e.target.value)}
                    />
                ) : (
                    <TextField
                        disabled={true}
                        className="comparisonComponent"
                        label="comparisonValue"
                        type="number"
                        value={defaultComparisonValue}
                        onChange={() => {}}
                    />
                )}
                <FormGroup className={'checkboxOnRight'}>
                    <FormControlLabel
                        control={<Checkbox checked={isFunc} onChange={(e) => handleSetIsFunc(e.target.checked)} />}
                        label="as Function"
                    />
                </FormGroup>
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={currentRules} />
        </ExampleUsageWrapper>
    );
};

export default RuleLength;
