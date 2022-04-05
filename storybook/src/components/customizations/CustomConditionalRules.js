import { useValidatableForm } from 'react-validatable-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {};

const rules = [
    {
        path: 'val1',
        ruleSet: [
            {
                rule: 'required',
                disableIf: (formData) => formData['disableVal1Rule'],
            },
        ],
        dependantPaths: ['disableVal1Rule'],
    },
    {
        path: 'val2',
        ruleSet: [
            {
                rule: 'required',
                enableIf: (formData) => formData['enableVal2Rule'],
            },
        ],
        dependantPaths: ['enableVal2Rule'],
    },
];

const CustomConditionalRules = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper
            header="disableIf & enableIf"
            codeUrl={'components/customizations/CustomConditionalRules.js'}
        >
            <p className="infoParagraph">
                Any validation rule can be disabled if the defined <b>disableIf</b> function returns true. Any
                validation rule can only be enabled if the defined <b>enableIf</b> function returns true.
            </p>
            <div>
                <div className={'textAndCheckboxDiv'}>
                    <TextField
                        error={!!getError('val1')}
                        helperText={getError('val1') || ' '}
                        label="val1"
                        type="text"
                        value={getValue('val1') || ''}
                        onChange={(e) => setPathValue('val1', e.target.value)}
                    />
                    <FormGroup className={'checkboxOnRight'}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getValue('disableVal1Rule') || false}
                                    onChange={(e) => setPathValue('disableVal1Rule', e.target.checked)}
                                />
                            }
                            label="Disable val1 Rule"
                        />
                    </FormGroup>
                </div>
                <div className={'textAndCheckboxDiv'}>
                    <TextField
                        error={!!getError('val2')}
                        helperText={getError('val2') || ' '}
                        label="val2"
                        type="text"
                        value={getValue('val2') || ''}
                        onChange={(e) => setPathValue('val2', e.target.value)}
                    />
                    <FormGroup className={'checkboxOnRight'}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getValue('enableVal2Rule') || false}
                                    onChange={(e) => setPathValue('enableVal2Rule', e.target.checked)}
                                />
                            }
                            label="Enable val2 Rule"
                        />
                    </FormGroup>
                </div>
                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </div>
        </ExampleUsageWrapper>
    );
};

export default CustomConditionalRules;
