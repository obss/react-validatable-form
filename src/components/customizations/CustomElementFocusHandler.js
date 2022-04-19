import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import './CustomElementFocusHandler.css';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';
import { options } from '../../constants/Data';

const myCustomElementFocusHandler = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Dom element with id ${elementId} could not be found`);
    } else {
        const parentElement = element.parentElement;
        const grantParentElement = parentElement.parentElement;
        grantParentElement.classList.add('element-shaking');
        element.focus();
        setTimeout(() => {
            grantParentElement.classList.remove('element-shaking');
        }, 600);
    }
};

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    {
        path: 'textVal2',
        ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThanOrEqualTo: 7 }],
    },
    { path: 'val3', ruleSet: [{ rule: 'required' }, { rule: 'listSize', equalTo: 2 }] },
    { path: 'textVal4', ruleSet: [{ rule: 'required' }, { rule: 'url' }] },
];

const CustomElementFocusHandler = () => {
    const {
        isValid,
        formData,
        setPathValue,
        setFormIsSubmitted,
        setPathIsBlurred,
        getValue,
        getError,
    } = useValidatableForm({
        rules,
        hideBeforeSubmit: true,
        showAfterBlur: true,
        focusToErrorAfterSubmit: true,
        elementFocusHandler: myCustomElementFocusHandler,
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
            header="elementFocusHandler"
            codeUrl="components/customizations/CustomElementFocusHandler.js"
        >
            <p className="infoParagraph">
                <b>elementFocusHandler</b> parameter is used to manually handle focusing to the first element with a
                validation error.
            </p>
            <div>
                <div className={'formField'}>
                    <TextField
                        error={!!getError('textVal1')}
                        helperText={getError('textVal1') || ' '}
                        label="requiredField"
                        type="text"
                        value={getValue('textVal1') || ''}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal1')}
                        id="textVal1"
                    />
                    <TextField
                        error={!!getError('textVal2')}
                        helperText={getError('textVal2') || ' '}
                        label="requiredAndLengthField"
                        type="text"
                        value={getValue('textVal2') || ''}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal2')}
                        id="textVal2"
                    />
                    <Autocomplete
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
                        id="val3"
                    />
                    <TextField
                        error={!!getError('textVal4')}
                        helperText={getError('textVal4') || ' '}
                        label="requiredAndUrl"
                        type="text"
                        value={getValue('textVal4') || ''}
                        onChange={(e) => setPathValue('textVal4', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal4')}
                        id="textVal4"
                    />
                </div>
                <div>
                    <Button className="mySubmitButton" variant="contained" onClick={handleFormSubmit}>
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

export default CustomElementFocusHandler;
