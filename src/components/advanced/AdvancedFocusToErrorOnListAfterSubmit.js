import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';

const rules = [
    {
        listPath: 'listChild',
        ruleSet: ['required', { rule: 'length', greaterThan: 3 }],
    },
    {
        path: 'listChild',
        ruleSet: ['required', { rule: 'listSize', greaterThan: 2 }],
        elementId: 'listErrorFocusElement',
    },
];

const AdvancedFocusToErrorOnListAfterSubmit = () => {
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
        initialFormData: { listChild: [''] },
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

    let listChildJsx = null;

    const handleAddElement = () => {
        const newListChild = [...formData.listChild];
        newListChild.push('');
        setPathValue('listChild', newListChild);
    };

    const handleDeleteElement = (index) => {
        const newListChild = formData.listChild.filter((el, ind) => ind !== index);
        setPathValue('listChild', newListChild);
    };

    if (formData.listChild && formData.listChild.length > 0) {
        listChildJsx = formData.listChild.map((lc, index) => {
            return (
                <div key={index}>
                    <TextField
                        error={!!getError(`listChild{${index}}`)}
                        helperText={getError(`listChild{${index}}`) || ' '}
                        label="lengthGreaterThan3"
                        type="text"
                        value={getValue(`listChild[${index}]`) || ''}
                        onChange={(e) => setPathValue(`listChild[${index}]`, e.target.value)}
                        onBlur={() => setPathIsBlurred(`listChild{${index}}`)}
                        id={`listChild{${index}}`}
                    />
                    <Button className="myDeleteButton" variant="contained" onClick={() => handleDeleteElement(index)}>
                        <span className="myShinkableButtonSpan">Delete Element</span>
                        <DeleteIcon className="myShinkableButtonIcon" />
                    </Button>
                </div>
            );
        });
    }

    return (
        <ExampleUsageWrapper
            header="focusToErrorAfterSubmit on Lists"
            codeUrl="components/advanced/AdvancedFocusToErrorOnListAfterSubmit.js"
        >
            <p className="infoParagraph">
                <b>focusToErrorAfterSubmit</b> parameter is used to automatically focus to the first element of list
                with validation errors. In order to find the element on DOM, <b>listPath</b> value and index of the list
                should be equal to the HTML element ID in a format <b>{'listPath{index}'}</b>. If DOM list element ID
                prefix is different than <b>listPath</b> value, then the DOM element ID prefix should be passed as{' '}
                <b>listElementId</b> param to the rule definition.
            </p>
            <div>
                <div>
                    <Button
                        className="myAddButton"
                        variant="contained"
                        onClick={() => handleAddElement()}
                        id={'listErrorFocusElement'}
                    >
                        <span className="myShinkableButtonSpan">Add New Element</span>
                        <AddIcon className="myShinkableButtonIcon" />
                    </Button>
                </div>
                <div className={'formListField'}>{listChildJsx}</div>
                <div className={'errorInfoText'}>{getError('listChild')}</div>
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

export default AdvancedFocusToErrorOnListAfterSubmit;
