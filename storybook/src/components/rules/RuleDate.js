import { useState } from 'react';
import { useValidatableForm } from 'react-validatable-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ruleOptions } from '../../constants/Constants';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const today = new Date();
const defaultComparisonValue = today;
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const dateRule = { rule: 'date' };
dateRule[ruleOptions[0]] = defaultComparisonValue;
const rules = [{ path: 'val', ruleSet: ['required', dateRule], dependantPaths: ['comparisonValue'] }];
const initialFormData = {
    val: yesterday,
    ruleOption: ruleOptions[0],
    comparisonValue: defaultComparisonValue,
};

const RuleDate = () => {
    const { isValid, setPathValue, setRules, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });
    const [currentRules, setCurrentRules] = useState(rules);
    const [ruleOption, setRuleOption] = useState(ruleOptions[0]);
    const [isFunc, setIsFunc] = useState(false);
    const [withTime, setWithTime] = useState(false);

    const updateRules = (funcParam, ruleParam, withTimeParam) => {
        const newRules = JSON.parse(JSON.stringify(rules));
        const newRuleSet = [...newRules[0].ruleSet];
        const newRule = { rule: 'date' };
        if (ruleParam) {
            if (funcParam) {
                newRule[ruleParam] = (formData) => formData['comparisonValue'];
            } else {
                newRule[ruleParam] = defaultComparisonValue;
            }
        }
        if (withTimeParam) {
            newRule['withTime'] = true;
        }
        newRuleSet.splice(1, 1, newRule);
        newRules[0].ruleSet = newRuleSet;
        setCurrentRules(newRules);
        setRules(newRules);
    };

    const handleSetIsFunc = (newValue) => {
        updateRules(newValue, ruleOption, withTime);
        setIsFunc(newValue);
    };

    const handleRuleOptionChange = (newValue) => {
        updateRules(isFunc, newValue, withTime);
        setRuleOption(newValue);
    };

    const handleWithTimeChange = (newValue) => {
        updateRules(isFunc, ruleOption, newValue);
        setWithTime(newValue);
    };

    const PickerComponent = withTime ? DateTimePicker : DesktopDatePicker;
    const pickerFormat = withTime ? null : 'MM/dd/yyyy';

    return (
        <ExampleUsageWrapper header="date" codeUrl="components/rules/RuleDate.js">
            <p className="infoParagraph">
                <b>date</b> rule checks if the given value is a valid date. If <b>withTime</b> parameter is set, it
                compares hours and minutes, too. <b>{ruleOptions.join(', ')}</b> parameters are used to make comparisons
                with given comparison values.
            </p>
            <div className="comparisonDiv">
                <PickerComponent
                    label="val"
                    inputFormat={pickerFormat}
                    value={getValue('val')}
                    onChange={(val) => setPathValue('val', val)}
                    renderInput={(params) => (
                        <TextField {...params} error={!!getError('val')} helperText={getError('val') || ' '} />
                    )}
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
                    <PickerComponent
                        label="comparisonValue"
                        inputFormat={pickerFormat}
                        value={getValue('comparisonValue')}
                        onChange={(val) => setPathValue('comparisonValue', val)}
                        renderInput={(params) => <TextField className="comparisonDateComponent" {...params} />}
                    />
                ) : (
                    <PickerComponent
                        disabled={true}
                        label="comparisonValue"
                        inputFormat={pickerFormat}
                        value={today}
                        onChange={() => {}}
                        renderInput={(params) => <TextField className="comparisonDateComponent" {...params} />}
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
                            <Checkbox checked={withTime} onChange={(e) => handleWithTimeChange(e.target.checked)} />
                        }
                        label="withTime"
                    />
                </FormGroup>
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={currentRules} />
        </ExampleUsageWrapper>
    );
};

export default RuleDate;
