import { useState } from 'react';
import { useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import FormSubmitResult from '../FormSubmitResult';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Dialog, DialogTitle } from '@mui/material';
import { options } from '../../constants/Data';
import CurrentRulesInfo from '../CurrentRulesInfo';
import './MyBootstrap.css';

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }] },
    { path: 'numVal', ruleSet: [{ rule: 'required' }] },
    { path: 'selectVal', ruleSet: [{ rule: 'required' }] },
];

const ExampleIsPathValid = () => {
    const {
        isValid,
        formData,
        setPathValue,
        setFormIsSubmitted,
        setPathIsBlurred,
        getValue,
        getError,
        isPathValid,
    } = useValidatableForm({
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
        <ExampleUsageWrapper header="isPathValid" codeUrl="components/examples/ExampleIsPathValid.js">
            <Form className="my-bootstrap-form">
                <Form.Group controlId="textVal1">
                    <Form.Label>Text1</Form.Label>
                    <Form.Control
                        placeholder="Text1"
                        value={getValue('textVal1') || ''}
                        onBlur={() => setPathIsBlurred('textVal1')}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                        isInvalid={!!getError('textVal1')}
                        isValid={isPathValid('textVal1')}
                    />
                    {getError('textVal1') ? (
                        <Form.Control.Feedback type="invalid">{getError('textVal1') || ' '}</Form.Control.Feedback>
                    ) : (
                        <div className={'my-bootstrap-empty-feedback'}></div>
                    )}
                </Form.Group>
                <Form.Group controlId="textVal2">
                    <Form.Label>Text2</Form.Label>
                    <Form.Control
                        placeholder="Text2"
                        value={getValue('textVal2') || ''}
                        onBlur={() => setPathIsBlurred('textVal2')}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                        isInvalid={!!getError('textVal2')}
                        isValid={isPathValid('textVal2')}
                    />
                    {getError('textVal2') ? (
                        <Form.Control.Feedback type="invalid">{getError('textVal2') || ' '}</Form.Control.Feedback>
                    ) : (
                        <div className={'my-bootstrap-empty-feedback'}></div>
                    )}
                </Form.Group>
                <Form.Group controlId="numVal">
                    <Form.Label>Num Val</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Num Val"
                        value={getValue('numVal') || ''}
                        onBlur={() => setPathIsBlurred('numVal')}
                        onChange={(e) => setPathValue('numVal', e.target.value)}
                        isInvalid={!!getError('numVal')}
                        isValid={isPathValid('numVal')}
                    />
                    {getError('numVal') ? (
                        <Form.Control.Feedback type="invalid">{getError('numVal') || ' '}</Form.Control.Feedback>
                    ) : (
                        <div className={'my-bootstrap-empty-feedback'}></div>
                    )}
                </Form.Group>
                <Form.Group controlId="selectVal">
                    <Form.Label>Select Val</Form.Label>
                    <Form.Select
                        value={getValue('selectVal') || ''}
                        onBlur={() => setPathIsBlurred('selectVal')}
                        onChange={(e) => setPathValue('selectVal', e.target.value)}
                        isInvalid={!!getError('selectVal')}
                        isValid={isPathValid('selectVal')}
                    >
                        <option key={'empty'} value={''}>
                            {''}
                        </option>
                        {options.map((op) => {
                            return (
                                <option key={op} value={op}>
                                    {op}
                                </option>
                            );
                        })}
                    </Form.Select>
                    {getError('selectVal') ? (
                        <Form.Control.Feedback type="invalid">{getError('selectVal') || ' '}</Form.Control.Feedback>
                    ) : (
                        <div className={'my-bootstrap-empty-feedback'}></div>
                    )}
                </Form.Group>
                <Button className="mySubmitButton" variant="primary" onClick={() => handleFormSubmit()}>
                    Submit
                </Button>
                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </Form>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Form Data Submitted</DialogTitle>
                <FormSubmitResult formData={formData} />
            </Dialog>
        </ExampleUsageWrapper>
    );
};

export default ExampleIsPathValid;
