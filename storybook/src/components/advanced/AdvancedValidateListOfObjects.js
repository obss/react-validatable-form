import { useState } from 'react';
import { useValidatableForm } from 'react-validatable-form';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';

const disableSubkey2 = (formData, index) => {
    return formData.disableAllSubkey2Rule || formData.listChild[index].disableSubkey2Rule;
};

const rules = [
    {
        listPath: 'listChild',
        subRules: [
            {
                path: 'subkey1',
                ruleSet: ['required', { rule: 'length', greaterThan: 3 }],
            },
            {
                path: 'subkey2',
                ruleSet: [
                    {
                        rule: 'required',
                        disableIf: disableSubkey2,
                    },
                    {
                        rule: 'number',
                        greaterThan: 5,
                        disableIf: disableSubkey2,
                    },
                ],
            },
            {
                path: 'subkey3',
                ruleSet: ['required'],
                elementId: 'subkey3ElementId',
            },
        ],
        dependantPaths: ['disableAllSubkey2Rule'],
    },
    {
        path: 'listChild',
        ruleSet: ['required', { rule: 'listSize', greaterThan: 2 }],
        elementId: 'listErrorFocusElement',
    },
];

const AdvancedValidateListOfObjects = () => {
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
        initialFormData: { listChild: [{ id: 1 }] },
        hideBeforeSubmit: true,
        showAfterBlur: true,
        focusToErrorAfterSubmit: true,
    });
    const [nextId, setNextId] = useState(2);
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
        newListChild.push({ id: nextId });
        setNextId(nextId + 1);
        setPathValue('listChild', newListChild);
    };

    const handleDeleteElement = (id) => {
        const newListChild = formData.listChild.filter((el) => el.id !== id);
        setPathValue('listChild', newListChild);
    };

    if (formData.listChild && formData.listChild.length > 0) {
        listChildJsx = formData.listChild.map((lc, index) => {
            return (
                <div key={lc.id} className="formListItem">
                    <TextField
                        style={{ width: 200 }}
                        error={!!getError(`listChild{${index}}.subkey1`)}
                        helperText={getError(`listChild{${index}}.subkey1`) || ' '}
                        label="lengthGreaterThan3"
                        type="text"
                        value={getValue(`listChild[${index}].subkey1`) || ''}
                        onChange={(e) => setPathValue(`listChild[${index}].subkey1`, e.target.value)}
                        onBlur={() => setPathIsBlurred(`listChild{${index}}.subkey1`)}
                        id={`listChild{${index}}.subkey1`}
                    />
                    <TextField
                        style={{ width: 200 }}
                        error={!!getError(`listChild{${index}}.subkey2`)}
                        helperText={getError(`listChild{${index}}.subkey2`) || ' '}
                        label="numberGreaterThan5"
                        type="number"
                        value={getValue(`listChild[${index}].subkey2`) || ''}
                        onChange={(e) => setPathValue(`listChild[${index}].subkey2`, e.target.value)}
                        onBlur={() => setPathIsBlurred(`listChild{${index}}.subkey2`)}
                        id={`listChild{${index}}.subkey2`}
                    />
                    disable
                    {
                        <Checkbox
                            checked={getValue(`listChild[${index}].disableSubkey2Rule`) || false}
                            onChange={(e) => setPathValue(`listChild[${index}].disableSubkey2Rule`, e.target.checked)}
                        />
                    }
                    <TextField
                        style={{ width: 200 }}
                        error={!!getError(`listChild{${index}}.subkey3`)}
                        helperText={getError(`listChild{${index}}.subkey3`) || ' '}
                        label="required"
                        type="text"
                        value={getValue(`listChild[${index}].subkey3`) || ''}
                        onChange={(e) => setPathValue(`listChild[${index}].subkey3`, e.target.value)}
                        onBlur={() => setPathIsBlurred(`listChild{${index}}.subkey3`)}
                        id={`listChild{${index}}.subkey3ElementId`}
                    />
                    <Button className="myDeleteButton" variant="contained" onClick={() => handleDeleteElement(lc.id)}>
                        <span className="myShinkableButtonSpan">Delete Element</span>
                        <DeleteIcon className="myShinkableButtonIcon" />
                    </Button>
                </div>
            );
        });
    }

    return (
        <ExampleUsageWrapper
            header="Validate List of Objects"
            codeUrl="components/advanced/AdvancedValidateListOfObjects.js"
        >
            <p className="infoParagraph">
                An array of objects with more than one subkeys can be validated using{' '}
                <Link className="inner-link" to="/api/path">
                    listPath
                </Link>{' '}
                and each subkey can have different rules which should be defined in <b>subRules</b> key.
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
                    <span style={{ marginLeft: 10 }}>disable all subkey2 rows</span>
                    {
                        <Checkbox
                            checked={getValue(`disableAllSubkey2Rule`) || false}
                            onChange={(e) => setPathValue(`disableAllSubkey2Rule`, e.target.checked)}
                        />
                    }
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

export default AdvancedValidateListOfObjects;
