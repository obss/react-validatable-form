import { useEffect, useState } from 'react';
import { useValidatableForm } from '../../lib';
import get from 'lodash/get';
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

const ExampleSetFormData = () => {
    const { isValid, validationError, formData, setPathValue, setFormData, setFormIsSubmitted, setPathIsBlurred } =
        useValidatableForm({
            rules,
            focusToErrorAfterSubmit: true,
        });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formFilledState, setFormFilledState] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setFormData({
                textVal1: 'aa',
                textVal2: 'bb',
                numVal: 5,
                selectVal: ['Europe', 'South America'],
            });
            setFormFilledState(1);
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setFormData({
                textVal1: 'aa',
                numVal: 8,
                selectVal: ['Europe'],
            });
            setFormFilledState(2);
        }, 4000);
    }, []);

    const handleFormSubmit = () => {
        const submitResultValid = setFormIsSubmitted();
        if (submitResultValid) {
            setDialogOpen(true);
        }
    };

    return (
        <ExampleUsageWrapper header="setFormData" codeUrl="components/examples/ExampleSetFormData.js">
            <div>
                {formFilledState === 0
                    ? 'Please wait for 2 seconds...'
                    : formFilledState === 1
                    ? 'Wait for another 2 seconds...'
                    : 'Thanks for waiting 4 seconds'}
                <br />
                <br />
                <div>
                    <TextField
                        error={!!get(validationError, 'textVal1')}
                        helperText={get(validationError, 'textVal1') || ' '}
                        label="Text1"
                        type="text"
                        value={get(formData, 'textVal1') || ''}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal1')}
                        id="textVal1"
                    />
                </div>
                <div>
                    <TextField
                        error={!!get(validationError, 'textVal2')}
                        helperText={get(validationError, 'textVal2') || ' '}
                        label="Text2"
                        type="text"
                        value={get(formData, 'textVal2') || ''}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal2')}
                        id="textVal2"
                    />
                </div>
                <div>
                    <TextField
                        error={!!get(validationError, 'numVal')}
                        helperText={get(validationError, 'numVal') || ' '}
                        label="Num Val"
                        type="number"
                        value={get(formData, 'numVal') || ''}
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
                        value={get(formData, 'selectVal') || []}
                        onChange={(event, newValue) => {
                            setPathValue('selectVal', newValue);
                        }}
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!get(validationError, 'selectVal')}
                                helperText={get(validationError, 'selectVal') || ' '}
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

export default ExampleSetFormData;
