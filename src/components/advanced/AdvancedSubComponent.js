import TextField from '@mui/material/TextField';

const AdvancedSubComponent = (props) => {
    const { setPathValue, setPathIsBlurred, getValue, getError } = props;
    return (
        <div>
            <div className={'formField'}>
                <TextField
                    error={!!getError('subComponentElement1')}
                    helperText={getError('subComponentElement1') || ' '}
                    label="subComponentElement1"
                    type="text"
                    value={getValue('subComponentElement1') || ''}
                    onChange={(e) => setPathValue('subComponentElement1', e.target.value)}
                    onBlur={() => setPathIsBlurred('subComponentElement1')}
                    id="subComponentElement1"
                />
                <TextField
                    error={!!getError('subComponentElement2')}
                    helperText={getError('subComponentElement2') || ' '}
                    label="subComponentElement2"
                    type="text"
                    value={getValue('subComponentElement2') || ''}
                    onChange={(e) => setPathValue('subComponentElement2', e.target.value)}
                    onBlur={() => setPathIsBlurred('subComponentElement2')}
                    id="subComponentElement2"
                />
            </div>
        </div>
    );
};

export default AdvancedSubComponent;
