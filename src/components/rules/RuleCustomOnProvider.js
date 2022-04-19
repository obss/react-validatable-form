import { useValidatableForm } from '../../lib';
import { Link } from 'react-router-dom';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val: 'b',
    val2: 's',
    val3: 'd',
};

const rules = [
    { path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'myCustomRule' }] },
    { path: 'val2', ruleSet: [{ rule: 'required' }, { rule: 'myCustomRule2' }] },
    { path: 'val3', ruleSet: [{ rule: 'required' }, { rule: 'myCustomRule3' }] },
];

const RuleCustomOnProvider = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper
            header="custom on provider"
            codeUrl={['components/rules/RuleCustomOnProvider.js', 'components/Main.js']}
        >
            <p className="infoParagraph">
                Custom rules can be defined as a function and passed to{' '}
                <Link className="inner-link" to="/api/react-validatable-form-provider">
                    ReactValidatableFormProvider
                </Link>{' '}
                with a unique name and can be used anywhere in the app.
            </p>
            <div>
                <TextField
                    error={!!getError('val')}
                    helperText={getError('val') || ' '}
                    label="val"
                    type="text"
                    value={getValue('val') || ''}
                    onChange={(e) => setPathValue('val', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val2')}
                    helperText={getError('val2') || ' '}
                    label="val2"
                    type="text"
                    value={getValue('val2') || ''}
                    onChange={(e) => setPathValue('val2', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val3')}
                    helperText={getError('val3') || ' '}
                    label="val3"
                    type="text"
                    value={getValue('val3') || ''}
                    onChange={(e) => setPathValue('val3', e.target.value)}
                />
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default RuleCustomOnProvider;
