import ExampleUsageWrapper from '../ExampleUsageWrapper';
import '../../App.css';
import { TextField } from '@mui/material';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { useValidatableForm } from 'react-validatable-form';

const initialFormData = {
    val: 'example',
    val2: 'abc',
    comparisonValue: 'bcc',
};

const rules = [
    {
        path: 'val',
        ruleSet: [{ rule: 'required' }, { rule: 'includes', includes: 'exe' }],
        dependantPaths: ['comparisonValue'],
    },
    {
        path: 'val2',
        ruleSet: [{ rule: 'required' }, { rule: 'includes', includes: (formData) => formData['comparisonValue'] }],
        dependantPaths: ['comparisonValue'],
    },
];

const RuleIncludes = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header={'includes'} codeUrl={'components/rules/RuleIncludes.js'}>
            <p className={'infoParagraph'}>
                <b> includes </b> rule checks if the given value includes comparison value.
            </p>
            <div className={'comparisonDiv'}>
                <TextField
                    error={!!getError('val')}
                    helperText={getError('val') || ' '}
                    label="val"
                    type="text"
                    value={getValue('val')}
                    onChange={(e) => setPathValue('val', e.target.value)}
                />
            </div>
            <div className={'comparisonDiv'}>
                <TextField
                    error={!!getError('val2')}
                    helperText={getError('val2') || ' '}
                    label="val2"
                    type="text"
                    value={getValue('val2')}
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
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default RuleIncludes;
