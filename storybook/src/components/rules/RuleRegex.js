import { useValidatableForm } from 'react-validatable-form';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val: 'ab',
    val2: 'a1',
};

const rules = [
    { path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'regex', regex: /ab+c/ }] },
    { path: 'val2', ruleSet: [{ rule: 'required' }, { rule: 'regex', regex: /\D\d\D/ }] },
];

const RuleRegex = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header="regex" codeUrl="components/rules/RuleRegex.js">
            <p className="infoParagraph">
                <b>regex</b> rule checks if the given value is a valid string according to given{' '}
                <a
                    className="outsideUrlSpan"
                    href={'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'}
                    target="_blank"
                    rel="noreferrer"
                >
                    regex
                </a>
                .
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
                <span className="regexInfo">regex: /ab+c/</span>
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
                <span className="regexInfo">regex: /\D\d\D/</span>
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default RuleRegex;
