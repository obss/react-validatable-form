import { useValidatableForm } from 'react-validatable-form';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { options } from '../../constants/Data';

const initialFormData = {
    val1: false,
    val2: 'aa',
    val3: 'bb',
    comparisonValueEqualTo: 'aba',
    comparisonValueNotEqualTo: 'aba',
    valIsOneOf1: 'Asia',
    valIsOneOf2: 'Asia',
    valIsOneOf3: 'Asia',
    comparisonValueIsOneOf: ['North America', 'Africa', 'Europe'],
    comparisonValueIsNoneOf: ['North America', 'Africa', 'Europe'],
};

const rules = [
    { path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'equality', equalTo: true }] },
    {
        path: 'val2',
        ruleSet: [
            { rule: 'required' },
            { rule: 'equality', equalTo: (formData) => formData['comparisonValueEqualTo'] },
        ],
        dependantPaths: ['comparisonValueEqualTo'],
    },
    {
        path: 'val3',
        ruleSet: [
            { rule: 'required' },
            { rule: 'equality', notEqualTo: (formData) => formData['comparisonValueNotEqualTo'] },
        ],
        dependantPaths: ['comparisonValueNotEqualTo'],
    },
    {
        path: 'valIsOneOf1',
        ruleSet: [{ rule: 'required' }, { rule: 'equality', isOneOf: ['North America', 'Africa', 'Europe'] }],
    },
    {
        path: 'valIsOneOf2',
        ruleSet: [
            { rule: 'required' },
            { rule: 'equality', isOneOf: (formData) => formData['comparisonValueIsOneOf'] },
        ],
        dependantPaths: ['comparisonValueIsOneOf'],
    },
    {
        path: 'valIsOneOf3',
        ruleSet: [
            { rule: 'required' },
            { rule: 'equality', isNoneOf: (formData) => formData['comparisonValueIsNoneOf'] },
        ],
        dependantPaths: ['comparisonValueIsNoneOf'],
    },
];

const RuleEquality = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

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
                    label="equalTo"
                    type="text"
                    value={getValue('val2') || ''}
                    onChange={(e) => setPathValue('val2', e.target.value)}
                />
                <TextField
                    className="comparisonComponent"
                    label="comparisonValueEqualTo"
                    type="text"
                    value={getValue('comparisonValueEqualTo')}
                    onChange={(e) => setPathValue('comparisonValueEqualTo', e.target.value)}
                />
            </div>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('val3')}
                    helperText={getError('val3') || ' '}
                    label="notEqualTo"
                    type="text"
                    value={getValue('val3') || ''}
                    onChange={(e) => setPathValue('val3', e.target.value)}
                />
                <TextField
                    className="comparisonComponent"
                    label="comparisonValueNotEqualTo"
                    type="text"
                    value={getValue('comparisonValueNotEqualTo')}
                    onChange={(e) => setPathValue('comparisonValueNotEqualTo', e.target.value)}
                />
            </div>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('valIsOneOf1')}
                    helperText={getError('valIsOneOf1') || ' '}
                    label="valIsOneOf1"
                    type="text"
                    value={getValue('valIsOneOf1') || ''}
                    onChange={(e) => setPathValue('valIsOneOf1', e.target.value)}
                />
                {"['America', 'Africa', 'Europe']"}
            </div>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('valIsOneOf2')}
                    helperText={getError('valIsOneOf2') || ' '}
                    label="isOneOf"
                    type="text"
                    value={getValue('valIsOneOf2') || ''}
                    onChange={(e) => setPathValue('valIsOneOf2', e.target.value)}
                />
                <Autocomplete
                    multiple
                    value={getValue('comparisonValueIsOneOf')}
                    onChange={(event, newValue) => {
                        setPathValue('comparisonValueIsOneOf', newValue);
                    }}
                    options={options}
                    renderInput={(params) => <TextField {...params} label="ruleOption" />}
                />
            </div>
            <div className="comparisonDiv">
                <TextField
                    error={!!getError('valIsOneOf3')}
                    helperText={getError('valIsOneOf3') || ' '}
                    label="isNoneOf"
                    type="text"
                    value={getValue('valIsOneOf3') || ''}
                    onChange={(e) => setPathValue('valIsOneOf3', e.target.value)}
                />
                <Autocomplete
                    multiple
                    value={getValue('comparisonValueIsNoneOf')}
                    onChange={(event, newValue) => {
                        setPathValue('comparisonValueIsNoneOf', newValue);
                    }}
                    options={options}
                    renderInput={(params) => <TextField {...params} label="ruleOption" />}
                />
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default RuleEquality;
