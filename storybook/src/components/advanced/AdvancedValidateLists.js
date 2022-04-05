import { useState } from 'react';
import { useValidatableForm } from 'react-validatable-form';
import { Link } from 'react-router-dom';
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
    { path: 'listChild', ruleSet: ['required', { rule: 'listSize', greaterThan: 2 }] },
    {
        listPath: 'listChild',
        ruleSet: ['required', { rule: 'length', greaterThan: 3 }],
    },
];

const AdvancedValidateLists = () => {
    const { isValid, formData, setPathValue, setFormIsSubmitted, getValue, getError } = useValidatableForm({
        rules,
        initialFormData: { listChild: [''] },
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
        <ExampleUsageWrapper header="Validate Lists" codeUrl="components/advanced/AdvancedValidateLists.js">
            <p className="infoParagraph">
                An array of values can be validated using{' '}
                <Link className="inner-link" to="/api/path">
                    listPath
                </Link>{' '}
                key.
            </p>
            <div>
                <div>
                    <Button className="myAddButton" variant="contained" onClick={() => handleAddElement()}>
                        <span className="myShinkableButtonSpan">Add New Element</span>
                        <AddIcon className="myShinkableButtonIcon" />
                    </Button>
                </div>
                <div className={'formListField'}>{listChildJsx}</div>
                <div className={'errorInfoText'}>{getError('listChild')}</div>
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

export default AdvancedValidateLists;
