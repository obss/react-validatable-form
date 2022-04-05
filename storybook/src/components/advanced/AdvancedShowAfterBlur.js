import { useState } from 'react';
import { useValidatableForm } from 'react-validatable-form';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';
import { options } from '../../constants/Data';

const initialFormData = {};

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 7 }] },
    { path: 'val3', ruleSet: [{ rule: 'required' }, { rule: 'listSize', equalTo: 2 }] },
    { path: 'textVal4', ruleSet: [{ rule: 'required' }, { rule: 'url' }] },
];

const AdvancedShowAfterBlur = () => {
    const {
        isValid,
        formData,
        setPathValue,
        setFormIsSubmitted,
        setPathIsBlurred,
        resetForm,
        getValue,
        getError,
    } = useValidatableForm({
        rules,
        initialFormData,
        hideBeforeSubmit: true,
        showAfterBlur: true,
    });
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFormSubmit = () => {
        const submitResultValid = setFormIsSubmitted();
        if (submitResultValid) {
            setDialogOpen(true);
        }
    };

    return (
        <ExampleUsageWrapper header="showAfterBlur" codeUrl="components/advanced/AdvancedShowAfterBlur.js">
            <p className="infoParagraph">
                <b>showAfterBlur</b> parameter is used to show validation error of a path after{' '}
                <b>setPathIsBlurred(path)</b> function is called. Later, validation errors can also be hidden by calling{' '}
                <b>resetForm()</b> function.
            </p>
            <div>
                <div className={'formField'}>
                    <TextField
                        id={'textVal1'}
                        error={!!getError('textVal1')}
                        helperText={getError('textVal1') || ' '}
                        label="requiredField"
                        type="text"
                        value={getValue('textVal1') || ''}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal1')}
                    />
                    <TextField
                        id={'textVal2'}
                        error={!!getError('textVal2')}
                        helperText={getError('textVal2') || ' '}
                        label="requiredAndLengthField"
                        type="text"
                        value={getValue('textVal2') || ''}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal2')}
                    />
                    <Autocomplete
                        id={'val3'}
                        multiple
                        value={getValue('val3') || []}
                        onChange={(event, newValue) => {
                            setPathValue('val3', newValue);
                        }}
                        onBlur={() => setPathIsBlurred('val3')}
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!getError('val3')}
                                helperText={getError('val3') || ' '}
                                label="requiredAndListSize"
                            />
                        )}
                    />
                    <TextField
                        id={'textVal4'}
                        error={!!getError('textVal4')}
                        helperText={getError('textVal4') || ' '}
                        label="requiredAndUrl"
                        type="text"
                        value={getValue('textVal4') || ''}
                        onChange={(e) => setPathValue('textVal4', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal4')}
                    />
                </div>
                <div>
                    <Button className="mySubmitButton" variant="contained" onClick={handleFormSubmit}>
                        Submit Form
                    </Button>
                    <Button className="mySubmitButton" variant="contained" onClick={resetForm}>
                        Reset Form
                    </Button>
                </div>
                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Form Data Submitted</DialogTitle>
                <FormSubmitResult formData={formData} />
            </Dialog>
        </ExampleUsageWrapper>
    );
};

export default AdvancedShowAfterBlur;
