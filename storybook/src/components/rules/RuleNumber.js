import { useState } from 'react';
import { useValidatableForm } from 'react-validatable-form';
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
const numberRule = { rule: 'number' };
numberRule[ruleOptions[0]] = defaultComparisonValue;
const rules = [{ path: 'val', ruleSet: ['required', numberRule], dependantPaths: ['comparisonValue'] }];
const initialFormData = {
    val: 3,
    ruleOption: ruleOptions[0],
    comparisonValue: defaultComparisonValue,
};

const RuleNumber = () => {
    const { isValid, setPathValue, setRules, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });
    const [currentRules, setCurrentRules] = useState(rules);
    const [ruleOption, setRuleOption] = useState(ruleOptions[0]);
    const [isFunc, setIsFunc] = useState(false);
    const [onlyIntegers, setOnlyIntegers] = useState(false);

    const updateRules = (funcParam, ruleParam, onlyIntegersParam) => {
        const newRules = JSON.parse(JSON.stringify(rules));
        const newRuleSet = [...newRules[0].ruleSet];
        const newRule = { rule: 'number' };
        if (ruleParam) {
            if (funcParam) {
                newRule[ruleParam] = (formData) => formData['comparisonValue'];
            } else {
                newRule[ruleParam] = defaultComparisonValue;
            }
        }
        if (onlyIntegersParam) {
            newRule['onlyIntegers'] = true;
        }
        newRuleSet.splice(1, 1, newRule);
        newRules[0].ruleSet = newRuleSet;
        setCurrentRules(newRules);
        setRules(newRules);
    };

    const handleSetIsFunc = (newValue) => {
        updateRules(newValue, ruleOption, onlyIntegers);
        setIsFunc(newValue);
    };

    const handleRuleOptionChange = (newValue) => {
        updateRules(isFunc, newValue, onlyIntegers);
        setRuleOption(newValue);
    };

    const handleOnlyIntegersChange = (newValue) => {
        updateRules(isFunc, ruleOption, newValue);
        setOnlyIntegers(newValue);
    };

    return (
        <ExampleUsageWrapper header="number" codeUrl="components/rules/RuleNumber.js">
            <p className="infoParagraph">
                <b>number</b> rule checks if the given value is a valid number. If <b>onlyIntegers</b> parameter is set,
                it also checks if given value is an integer. <b>{ruleOptions.join(', ')}</b> parameters are used to make
                comparisons with given comparison values.
            </p>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('val')}
                    helperText={getError('val') || ' '}
                    label="val"
                    type="number"
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
                    disableClearable={false}
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
            <div className="comparisonDiv">
                <FormGroup className={'checkboxOnRight'}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={onlyIntegers}
                                onChange={(e) => handleOnlyIntegersChange(e.target.checked)}
                            />
                        }
                        label="onlyIntegers"
                    />
                </FormGroup>
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={currentRules} />
        </ExampleUsageWrapper>
    );
};

export default RuleNumber;
