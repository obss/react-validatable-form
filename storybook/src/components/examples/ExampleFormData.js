import { useEffect, useState } from 'react';
import { useValidatableForm } from 'react-validatable-form';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import ValidationResult from '../ValidationResult';
import { Autocomplete, Button } from '@mui/material';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';
import { options } from '../../constants/Data';
import CurrentRulesInfo from '../CurrentRulesInfo';

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }] },
    { path: 'numVal', ruleSet: [{ rule: 'required' }] },
    { path: 'selectVal', ruleSet: [{ rule: 'required' }] },
];

const rules2 = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 10 }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 15 }] },
    { path: 'numVal', ruleSet: [{ rule: 'required' }] },
    { path: 'selectVal', ruleSet: [{ rule: 'required' }] },
];

const rules3 = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 13 }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 25 }] },
    { path: 'numVal', ruleSet: [{ rule: 'required' }] },
    { path: 'selectVal', ruleSet: [{ rule: 'required' }] },
];

const ExampleFormData = () => {
    const {
        isValid,
        formData,
        setPathValue,
        setFormDataAndRules,
        setFormIsSubmitted,
        setPathIsBlurred,
        getValue,
        getError,
    } = useValidatableForm({
        rules,
        focusToErrorAfterSubmit: true,
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentRules, setCurrentRules] = useState(rules);
    const [formFilledState, setFormFilledState] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setFormDataAndRules(
                {
                    textVal1: 'aa',
                    textVal2: 'bb',
                    numVal: 5,
                    selectVal: ['Europe', 'South America'],
                },
                rules2
            );
            setFormFilledState(1);
            setCurrentRules(rules2);
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setFormDataAndRules(
                {
                    textVal1: 'aa',
                    numVal: 8,
                    selectVal: ['Europe'],
                },
                rules3
            );
            setFormFilledState(2);
            setCurrentRules(rules3);
        }, 4000);
    }, []);

    const handleFormSubmit = () => {
        const submitResultValid = setFormIsSubmitted();
        if (submitResultValid) {
            setDialogOpen(true);
        }
    };

    return (
        <ExampleUsageWrapper header="formData" codeUrl="components/examples/ExampleFormData.js">
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
                <CurrentRulesInfo currentRules={formData} header="Current formData" />
                <CurrentRulesInfo currentRules={currentRules} />
            </div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Form Data Submitted</DialogTitle>
                <FormSubmitResult formData={formData} />
            </Dialog>
        </ExampleUsageWrapper>
    );
};

export default ExampleFormData;
