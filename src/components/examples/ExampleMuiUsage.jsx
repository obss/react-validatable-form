import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import { Autocomplete, Button, Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';
import { options } from '../../constants/Data';
import CurrentRulesInfo from '../CurrentRulesInfo';

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }] },
    { path: 'numVal', ruleSet: [{ rule: 'required' }] },
    { path: 'selectVal', ruleSet: [{ rule: 'required' }] },
];

const ExampleMuiUsage = () => {
    const { isValid, formData, setPathValue, setFormIsSubmitted, setPathIsBlurred, getValue, getError } =
        useValidatableForm({
            rules,
            hideBeforeSubmit: true,
            showAfterBlur: true,
            focusToErrorAfterSubmit: true,
        });
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFormSubmit = () => {
        const submitResultValid = setFormIsSubmitted();
        if (submitResultValid) {
            setDialogOpen(true);
        }
    };

    return (
        <ExampleUsageWrapper
            header="Example Usage with MUI Components"
            codeUrl="components/examples/ExampleMuiUsage.js"
        >
            <div>
                <div>
                    <TextField
                        error={!!getError('textVal1')}
                        helperText={getError('textVal1') || ' '}
                        label="Text1"
                        type="text"
                        value={getValue('textVal1') || ''}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal1')}
                        id="textVal1"
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('textVal2')}
                        helperText={getError('textVal2') || ' '}
                        label="Text2"
                        type="text"
                        value={getValue('textVal2') || ''}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal2')}
                        id="textVal2"
                    />
                </div>
                <div>
                    <TextField
                        error={!!getError('numVal')}
                        helperText={getError('numVal') || ' '}
                        label="Num Val"
                        type="number"
                        value={getValue('numVal') || ''}
                        onChange={(e) => setPathValue('numVal', e.target.value)}
                        onBlur={() => setPathIsBlurred('numVal')}
                        id="numVal"
                    />
                </div>
                <div>
                    <Autocomplete
                        id="selectVal"
                        onBlur={() => setPathIsBlurred('selectVal')}
                        multiple
                        value={getValue('selectVal') || []}
                        onChange={(event, newValue) => {
                            setPathValue('selectVal', newValue);
                        }}
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!getError('selectVal')}
                                helperText={getError('selectVal') || ' '}
                                label="Select Val"
                            />
                        )}
                    />
                </div>
                <div>
                    <Button className="mySubmitButton" variant="contained" onClick={() => handleFormSubmit()}>
                        Submit Form
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

export default ExampleMuiUsage;
