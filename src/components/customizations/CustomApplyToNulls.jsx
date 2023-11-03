import { useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { options } from '../../constants/Data';

const initialFormData = { listChild: ['', ''] };

const rules = [
    { path: 'val1', ruleSet: [{ rule: 'required', applyToNulls: true }] },
    { path: 'val2', ruleSet: [{ rule: 'number', equalTo: 3, applyToNulls: true }] },
    { path: 'val3', ruleSet: [{ rule: 'length', equalTo: 3, applyToNulls: true }] },
    { path: 'val4', ruleSet: [{ rule: 'listSize', equalTo: 3, applyToNulls: true }] },
    { path: 'val5', ruleSet: [{ rule: 'date', applyToNulls: true }] },
    { path: 'val6', ruleSet: [{ rule: 'email', applyToNulls: true }] },
    { path: 'val7', ruleSet: [{ rule: 'url', applyToNulls: true }] },
    { path: 'val8', ruleSet: [{ rule: 'iban', applyToNulls: true }] },
    { path: 'val9', ruleSet: [{ rule: 'equality', equalTo: 'aaa', applyToNulls: true }] },
    { path: 'val10', ruleSet: [{ rule: 'regex', regex: /a/, applyToNulls: true }] },
    {
        listPath: 'listChild',
        ruleSet: [{ rule: 'unique', applyToNulls: true }],
    },
];

const CustomApplyToNulls = () => {
    const { isValid, formData, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    let listChildJsx = null;

    const handleAddElement = () => {
        const newListChild = formData.listChild ? [...formData.listChild] : [];
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
                        label="unique"
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
        <ExampleUsageWrapper header="applyToNulls" codeUrl="components/customizations/CustomApplyToNulls.js">
            <p className="infoParagraph">
                By default <b>react-validatable-form</b> interprets <b>undefined</b>, <b>null</b>, <b>empty string</b>{' '}
                or <b>empty array</b> values as valid values. If you want any rule to be applied to these values,{' '}
                <b>applyToNulls</b> parameter should be used.
            </p>
            <div>
                <TextField
                    error={!!getError('val1')}
                    helperText={getError('val1') || ' '}
                    label="requiredApplyToNulls"
                    type="text"
                    value={getValue('val1') || ''}
                    onChange={(e) => setPathValue('val1', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val2')}
                    helperText={getError('val2') || ' '}
                    label="numberApplyToNulls"
                    type="number"
                    value={getValue('val2') || ''}
                    onChange={(e) => setPathValue('val2', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val3')}
                    helperText={getError('val3') || ' '}
                    label="lengthApplyToNulls"
                    type="text"
                    value={getValue('val3') || ''}
                    onChange={(e) => setPathValue('val3', e.target.value)}
                />
            </div>
            <div>
                <Autocomplete
                    multiple
                    value={getValue('val4') || []}
                    onChange={(event, newValue) => {
                        setPathValue('val4', newValue);
                    }}
                    options={options}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!getError('val4')}
                            helperText={getError('val4') || ' '}
                            label="listSizeApplyToNulls"
                        />
                    )}
                />
            </div>
            <div>
                <DatePicker
                    label="dateApplyToNulls"
                    value={getValue('val5') || null}
                    onChange={(val) => setPathValue('val5', val)}
                    slotProps={{ textField: { error: !!getError('val5'), helperText: getError('val5') || ' ' } }}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val6')}
                    helperText={getError('val6') || ' '}
                    label="emailApplyToNulls"
                    type="text"
                    value={getValue('val6') || ''}
                    onChange={(e) => setPathValue('val6', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val7')}
                    helperText={getError('val7') || ' '}
                    label="urlApplyToNulls"
                    type="text"
                    value={getValue('val7') || ''}
                    onChange={(e) => setPathValue('val7', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val8')}
                    helperText={getError('val8') || ' '}
                    label="ibanApplyToNulls"
                    type="text"
                    value={getValue('val8') || ''}
                    onChange={(e) => setPathValue('val8', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val9')}
                    helperText={getError('val9') || ' '}
                    label="equalityApplyToNulls"
                    type="text"
                    value={getValue('val9') || ''}
                    onChange={(e) => setPathValue('val9', e.target.value)}
                />
            </div>
            <div>
                <TextField
                    error={!!getError('val10')}
                    helperText={getError('val10') || ' '}
                    label="regexApplyToNulls"
                    type="text"
                    value={getValue('val10') || ''}
                    onChange={(e) => setPathValue('val10', e.target.value)}
                />
            </div>
            <div>
                <Button className="myAddButton" variant="contained" onClick={handleAddElement}>
                    <span className="myShinkableButtonSpan">Add New Element</span>
                    <AddIcon className="myShinkableButtonIcon" />
                </Button>
            </div>
            <div className={'formListField'}>{listChildJsx}</div>
            <div className={'errorInfoText'}>{getError('listChild')}</div>

            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default CustomApplyToNulls;
