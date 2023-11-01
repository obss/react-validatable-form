import TextField from '@mui/material/TextField';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useValidatableForm } from '../../lib';

const rules = [
    { path: 'autonomousChild1', ruleSet: ['required'] },
    { path: 'autonomousChild2', ruleSet: ['required'] },
];

const AdvancedSubAutonomousComponent = forwardRef((props, ref) => {
    const { handleAutonomousFormDataIsChanged, handleAutonomousIsValidChanged } = props;
    const { isValid, formData, setFormIsSubmitted, setPathValue, setPathIsBlurred, getValue, getError } =
        useValidatableForm({
            rules,
            hideBeforeSubmit: true,
            showAfterBlur: true,
            focusToErrorAfterSubmit: true,
        });

    useEffect(() => {
        handleAutonomousFormDataIsChanged(formData);
    }, [formData]);

    useEffect(() => {
        handleAutonomousIsValidChanged(isValid);
    }, [isValid]);

    useImperativeHandle(ref, () => ({
        handleSetFormIsSubmitted() {
            setFormIsSubmitted();
        },
    }));

    return (
        <div>
            <div className={'formField'}>
                <TextField
                    error={!!getError('autonomousChild1')}
                    helperText={getError('autonomousChild1') || ' '}
                    label="autonomousChild1"
                    type="text"
                    value={getValue('autonomousChild1') || ''}
                    onChange={(e) => setPathValue('autonomousChild1', e.target.value)}
                    onBlur={() => setPathIsBlurred('autonomousChild1')}
                    id="autonomousChild1"
                />
                <TextField
                    error={!!getError('autonomousChild2')}
                    helperText={getError('autonomousChild2') || ' '}
                    label="autonomousChild2"
                    type="text"
                    value={getValue('autonomousChild2') || ''}
                    onChange={(e) => setPathValue('autonomousChild2', e.target.value)}
                    onBlur={() => setPathIsBlurred('autonomousChild2')}
                    id="autonomousChild2"
                />
            </div>
        </div>
    );
});

export default AdvancedSubAutonomousComponent;
