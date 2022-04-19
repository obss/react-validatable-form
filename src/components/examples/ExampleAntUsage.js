import { useValidatableForm } from '../../lib';
import { useState } from 'react';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { Button, Input, Modal, Select, Typography } from 'antd';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { options } from '../../constants/Data';
import FormSubmitResult from '../FormSubmitResult';

const { Option } = Select;

const rules = [
    { path: 'textVal1', ruleSet: [{ rule: 'required' }] },
    { path: 'textVal2', ruleSet: [{ rule: 'required' }] },
    { path: 'numVal', ruleSet: [{ rule: 'required' }] },
    { path: 'selectVal', ruleSet: [{ rule: 'required' }] },
];

const ExampleAntUsage = () => {
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
            header="Example Usage with Ant Design Components"
            codeUrl="components/examples/ExampleAntUsage.js"
        >
            <div>
                <div>
                    <Input
                        aria-label={'Text1'}
                        type={'text'}
                        status={getError('textVal1') ? 'error' : null}
                        size={'large'}
                        placeholder={'Text1'}
                        value={getValue('textVal1') || ''}
                        onChange={(e) => setPathValue('textVal1', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal1')}
                        id="textVal1"
                    />
                    {getError('textVal1') ? (
                        <Typography.Text type={'danger'}> {getError('textVal1')} </Typography.Text>
                    ) : (
                        <div className={'my-antd-empty-feedback'}></div>
                    )}
                </div>
                <div>
                    <Input
                        type={'text'}
                        status={getError('textVal2') ? 'error' : null}
                        size={'large'}
                        placeholder={'Text2'}
                        value={getValue('textVal2') || ''}
                        onChange={(e) => setPathValue('textVal2', e.target.value)}
                        onBlur={() => setPathIsBlurred('textVal2')}
                        id="textVal2"
                    />
                    {getError('textVal2') ? (
                        <Typography.Text type={'danger'}> {getError('textVal2')} </Typography.Text>
                    ) : (
                        <div className={'my-antd-empty-feedback'}></div>
                    )}
                </div>
                <div>
                    <Input
                        type={'number'}
                        status={getError('numVal') ? 'error' : null}
                        size={'large'}
                        placeholder={'Num Val'}
                        value={getValue('numVal') || ''}
                        onChange={(e) => setPathValue('numVal', e.target.value)}
                        onBlur={() => setPathIsBlurred('numVal')}
                        id="numVal"
                    />
                    {getError('numVal') ? (
                        <Typography.Text type={'danger'}> {getError('numVal')} </Typography.Text>
                    ) : (
                        <div className={'my-antd-empty-feedback'}></div>
                    )}
                </div>
                <div>
                    <Select
                        id={'selectVal'}
                        mode={'multiple'}
                        size={'large'}
                        style={{ width: '100%' }}
                        status={getError('selectVal') ? 'error' : null}
                        placeholder={'Select Val'}
                        onChange={(event) => {
                            setPathValue('selectVal', event);
                        }}
                        optionLabelProp="label"
                        onBlur={() => setPathIsBlurred('selectVal')}
                    >
                        {options.map((element) => {
                            return (
                                <Option key={element} value={element}>
                                    <div>{element}</div>
                                </Option>
                            );
                        })}
                    </Select>
                    {getError('selectVal') ? (
                        <Typography.Text type={'danger'}> {getError('selectVal')} </Typography.Text>
                    ) : (
                        <div className={'my-antd-empty-feedback'}></div>
                    )}
                </div>

                <div>
                    <Button className="mySubmitButton" onClick={handleFormSubmit} type={'primary'}>
                        Submit Form
                    </Button>
                </div>

                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </div>
            <Modal
                title={'Form Data Submitted'}
                visible={dialogOpen}
                footer={null}
                onCancel={() => setDialogOpen(false)}
            >
                <FormSubmitResult formData={formData} />
            </Modal>
        </ExampleUsageWrapper>
    );
};

export default ExampleAntUsage;
