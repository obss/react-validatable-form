import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import Checkbox from '@mui/material/Checkbox';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import AdvancedSubComponent from './AdvancedSubComponent';
import { Dialog, DialogTitle } from '@mui/material';
import FormSubmitResult from '../FormSubmitResult';

const disableSubkey2 = (formData, index) => {
    return formData.disableAllSubkey2Rule || formData.listChild[index].disableSubkey2Rule;
};

const rules = [
    { path: 'child1', ruleSet: ['required'] },
    { path: 'child2', ruleSet: ['required'] },
    { path: 'child3.subchild1', ruleSet: ['required'] },
    { path: 'child3.subchild2', ruleSet: ['required'] },
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
        ],
        dependantPaths: ['disableAllSubkey2Rule'],
    },
    {
        path: 'listChild',
        ruleSet: [
            { rule: 'required', customMessage: 'This list should not be empty' },
            { rule: 'listSize', greaterThan: 2 },
        ],
        elementId: 'listErrorFocusElement',
    },
    { path: 'bottomElement1', ruleSet: ['required'] },
    { path: 'bottomElement2', ruleSet: [{ rule: 'length', greaterThan: 3, applyToNulls: true }] },
    { path: 'subComponentElement1', ruleSet: ['required'] },
    { path: 'subComponentElement2', ruleSet: ['required'] },
];

const AdvancedValidateComplexForms = () => {
    const { isValid, formData, setPathValue, setFormIsSubmitted, setPathIsBlurred, getValue, getError } =
        useValidatableForm({
            rules,
            hideBeforeSubmit: true,
            showAfterBlur: true,
            focusToErrorAfterSubmit: true,
        });
    const [nextId, setNextId] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFormSubmit = () => {
        const submitResultValid = setFormIsSubmitted();
        if (submitResultValid) {
            setDialogOpen(true);
        }
    };

    const handleAddElement = () => {
        const newListChild = formData.listChild ? [...formData.listChild] : [];
        newListChild.push({ id: nextId });
        setNextId(nextId + 1);
        setPathValue('listChild', newListChild);
    };

    const handleDeleteElement = (id) => {
        const newListChild = formData.listChild.filter((el) => el.id !== id);
        setPathValue('listChild', newListChild);
    };

    let listChildJsx = null;

    if (formData.listChild && formData.listChild.length > 0) {
        listChildJsx = formData.listChild.map((lc, index) => {
            return (
                <div key={lc.id} className="formListItem">
                    <TextField
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
            header="Validate Complex Forms"
            codeUrl={[
                'components/advanced/AdvancedValidateComplexForms.js',
                'components/advanced/AdvancedSubComponent.js',
            ]}
        >
            <p className="infoParagraph">
                <b>react-validatable-form</b> can handle validation of complex forms. The form can have multiple paths,
                listPaths and subcomponents.
            </p>
            <div>
                <div className={'formField'}>
                    <TextField
                        error={!!getError('child1')}
                        helperText={getError('child1') || ' '}
                        label="child1"
                        type="text"
                        value={getValue('child1') || ''}
                        onChange={(e) => setPathValue('child1', e.target.value)}
                        onBlur={() => setPathIsBlurred('child1')}
                        id="child1"
                    />
                    <TextField
                        error={!!getError('child2')}
                        helperText={getError('child2') || ' '}
                        label="child2"
                        type="text"
                        value={getValue('child2') || ''}
                        onChange={(e) => setPathValue('child2', e.target.value)}
                        onBlur={() => setPathIsBlurred('child2')}
                        id="child2"
                    />
                    <TextField
                        error={!!getError('child3.subchild1')}
                        helperText={getError('child3.subchild1') || ' '}
                        label="child3.subchild1"
                        type="text"
                        value={getValue('child3.subchild1') || ''}
                        onChange={(e) => setPathValue('child3.subchild1', e.target.value)}
                        onBlur={() => setPathIsBlurred('child3.subchild1')}
                        id="child3.subchild1"
                    />
                    <TextField
                        error={!!getError('child3.subchild2')}
                        helperText={getError('child3.subchild2') || ' '}
                        label="child3.subchild2"
                        type="text"
                        value={getValue('child3.subchild2') || ''}
                        onChange={(e) => setPathValue('child3.subchild2', e.target.value)}
                        onBlur={() => setPathIsBlurred('child3.subchild2')}
                        id="child3.subchild2"
                    />
                </div>
                <div>
                    <Button
                        className="myAddButton"
                        variant="contained"
                        onClick={handleAddElement}
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
                <div className={'complexFormListField'}>{listChildJsx}</div>
                <div className={'errorInfoText'}>{getError('listChild')}</div>
                <div className={'formField'}>
                    <TextField
                        error={!!getError('bottomElement1')}
                        helperText={getError('bottomElement1') || ' '}
                        label="bottomElement1"
                        type="text"
                        value={getValue('bottomElement1') || ''}
                        onChange={(e) => setPathValue('bottomElement1', e.target.value)}
                        onBlur={() => setPathIsBlurred('bottomElement1')}
                        id="bottomElement1"
                    />
                    <TextField
                        error={!!getError('bottomElement2')}
                        helperText={getError('bottomElement2') || ' '}
                        label="bottomElement2"
                        type="text"
                        value={getValue('bottomElement2') || ''}
                        onChange={(e) => setPathValue('bottomElement2', e.target.value)}
                        onBlur={() => setPathIsBlurred('bottomElement2')}
                        id="bottomElement2"
                    />
                </div>
                <AdvancedSubComponent
                    getValue={getValue}
                    getError={getError}
                    formData={formData}
                    setPathValue={setPathValue}
                    setPathIsBlurred={setPathIsBlurred}
                />
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

export default AdvancedValidateComplexForms;
