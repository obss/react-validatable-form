import { useValidatableForm } from 'react-validatable-form';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import { options } from '../../constants/Data';

const initialFormData = {
    val: false,
    val2: 'aa',
    val3: 'asia',
    comparisonValue: 'aba',
};

const rules = [
    { path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'equality', equalTo: true }] },
    {
        path: 'val2',
        ruleSet: [{ rule: 'required' }, { rule: 'equality', equalTo: (formData) => formData['comparisonValue'] }],
        dependantPaths: ['comparisonValue'],
    },
    {
        path: 'val3',
        ruleSet: [{ rule: 'required' }, { rule: 'equality', isOneOf: [] }],
    },
];

const RuleEquality = () => {
    const [currentRules, setCurrentRules] = useState(rules);
    const { isValid, setPathValue, getValue, getError, setRules } = useValidatableForm({
        rules,
        initialFormData,
    });
    const [equalityList, setEqualityList] = useState([]);

    const updateIsOneOf = (newList) => {
        setEqualityList(newList);
        const copyRules = [...currentRules];
        copyRules[2].ruleSet = [{ rule: 'required' }, { rule: 'equality', isOneOf: newList }];
        setCurrentRules(copyRules);
        setRules(copyRules);
    };

    return (
        <ExampleUsageWrapper header="equality" codeUrl="components/rules/RuleEquality.js">
            <p className="infoParagraph">
                <b>equality</b> rule checks if the given value is equal to comparison value.
            </p>
            <div>
                <FormGroup className={'checkboxOnRight'}>
                    <FormControl error={!!getError('val')}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getValue('val') || false}
                                    onChange={(e) => setPathValue('val', e.target.checked)}
                                />
                            }
                            label={<FormHelperText>{getError('val') || ' '}</FormHelperText>}
                        />
                    </FormControl>
                </FormGroup>
            </div>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('val2')}
                    helperText={getError('val2') || ' '}
                    label="val2"
                    type="text"
                    value={getValue('val2') || ''}
                    onChange={(e) => setPathValue('val2', e.target.value)}
                />
                <TextField
                    className="comparisonComponent"
                    label="comparisonValue"
                    type="text"
                    value={getValue('comparisonValue')}
                    onChange={(e) => setPathValue('comparisonValue', e.target.value)}
                />
            </div>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('val3')}
                    helperText={getError('val3') || ' '}
                    label="val3"
                    type="text"
                    value={getValue('val3') || ''}
                    onChange={(e) => setPathValue('val3', e.target.value)}
                />
                <Autocomplete
                    multiple
                    value={equalityList}
                    onChange={(event, newValue) => {
                        updateIsOneOf(newValue);
                    }}
                    options={options}
                    renderInput={(params) => <TextField {...params} label="ruleOption" />}
                />
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={currentRules} />
        </ExampleUsageWrapper>
    );
};

export default RuleEquality;
