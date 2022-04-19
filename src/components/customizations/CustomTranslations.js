import { useValidatableForm } from '../../lib';
import { Link } from 'react-router-dom';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val1: '',
    val2: '',
    val3: 'not email',
    checkVal: false,
};

const rules = [
    { path: 'val1', ruleSet: ['required', { rule: 'length', greaterThan: 8 }] },
    { path: 'val2', ruleSet: ['required', { rule: 'length', equalTo: 5 }] },
    { path: 'val3', ruleSet: ['required', 'email'] },
];

const CustomTranslations = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper
            header="translations"
            codeUrl={['components/customizations/CustomTranslations.js', 'components/Main.js']}
        >
            <p className="infoParagraph">
                Validation error messages of any rules can be customized in app by passing <b>translations</b> param to{' '}
                <Link className="inner-link" to="/api/react-validatable-form-provider">
                    ReactValidatableFormProvider
                </Link>
                .
            </p>
            <div>
                <div>
                    <TextField
                        error={!!getError('val1')}
                        helperText={getError('val1') || ' '}
                        label="val1 (requiredAndLengthGreaterThan)"
                        type="text"
                        value={getValue('val1')}
                        onChange={(e) => setPathValue('val1', e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('val2')}
                        helperText={getError('val2') || ' '}
                        label="val2 (requiredAndLengthEqualTo)"
                        type="text"
                        value={getValue('val2')}
                        onChange={(e) => setPathValue('val2', e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('val3')}
                        helperText={getError('val3') || ' '}
                        label="val3 (email)"
                        type="text"
                        value={getValue('val3')}
                        onChange={(e) => setPathValue('val3', e.target.value)}
                    />
                </div>
                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </div>
        </ExampleUsageWrapper>
    );
};

export default CustomTranslations;
