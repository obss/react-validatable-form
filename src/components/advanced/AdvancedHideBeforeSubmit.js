import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';
import { options } from '../../constants/Data';

const initialFormData = {
    textVal1: '',
    textVal2: '',
    val3: [],
    textVal4: '',
    checkVal: false,
};

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 7 }] },
    { path: 'val3', ruleSet: [{ rule: 'required' }, { rule: 'listSize', equalTo: 2 }] },
    { path: 'textVal4', ruleSet: [{ rule: 'required' }, { rule: 'url' }] },
];

const AdvancedHideBeforeSubmit = () => {
    const { isValid, formData, setPathValue, setFormIsSubmitted, resetForm, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
        hideBeforeSubmit: true,
    });
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFormSubmit = () => {
        const submitResultValid = setFormIsSubmitted();
        if (submitResultValid) {
            setDialogOpen(true);
        }
    };

    return (
        <ExampleUsageWrapper header="hideBeforeSubmit" codeUrl="components/advanced/AdvancedHideBeforeSubmit.js">
            <p className="infoParagraph">
                <b>hideBeforeSubmit</b> parameter is used to hide validation errors before <b>setFormIsSubmitted()</b>{' '}
                function is called. Later, validation errors can also be hidden by calling <b>resetForm()</b> function.
            </p>
            <div>
                <div className={'formField'}>
                    <TextField
                        error={!!getError('textVal1')}
                        helperText={getError('textVal1') || ' '}
                        label="requiredField"
                        type="text"
                        value={getValue('textVal1')}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                    />
                    <TextField
                        error={!!getError('textVal2')}
                        helperText={getError('textVal2') || ' '}
                        label="requiredAndLengthField"
                        type="text"
                        value={getValue('textVal2')}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                    />
                    <Autocomplete
                        multiple
                        value={getValue('val3')}
                        onChange={(event, newValue) => {
                            setPathValue('val3', newValue);
                        }}
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
                        error={!!getError('textVal4')}
                        helperText={getError('textVal4') || ' '}
                        label="requiredAndUrl"
                        type="text"
                        value={getValue('textVal4')}
                        onChange={(e) => setPathValue('textVal4', e.target.value)}
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

export default AdvancedHideBeforeSubmit;
