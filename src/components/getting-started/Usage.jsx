import { Link } from 'react-router-dom';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import './Usage.css';

const Usage = (props) => {
    const providerCode = `import { ReactValidatableFormProvider } from '../../../lib';

    //....
    return <ReactValidatableFormProvider>
                <App />
        </ReactValidatableFormProvider>;
    `;

    const hookCode = `import { useValidatableForm } from '../../../lib';
import TextField from '@mui/material/TextField';

//....
    
const initialFormData = {};
const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

//....

    const { isValid, formData, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return <TextField
        error={!!getError('val')}
        helperText={getError('val') || ' '}
        label="val"
        type="text"
        value={getValue('val') || ''}
        onChange={(e) => setPathValue('val', e.target.value)}
    />;
    `;

    return (
        <ExampleUsageWrapper header="Usage">
            <div className="infoParagraph">
                <b>react-validatable-form</b> is based on{' '}
                <a
                    className="outsideUrlSpan"
                    href={'https://reactjs.org/docs/context.html'}
                    target="_blank"
                    rel="noreferrer"
                >
                    Context
                </a>
                . <b>useValidatableForm</b> hook should be used inside <b>ReactValidatableFormProvider</b>. Wrap your
                App inside <b>ReactValidatableFormProvider</b> and pass the app-scoped{' '}
                <span className="inner-link" onClick={props.openSettingsDialog}>
                    props
                </span>
                . Example usage of <b>ReactValidatableFormProvider</b>:{' '}
                <Link className="inner-link" to="/api/react-validatable-form-provider">
                    See API
                </Link>
            </div>
            <div className="codeBox">
                <span>{providerCode}</span>
            </div>
            <div className="infoParagraph">
                <b>useValidatableForm</b> is a React hook that runs validations according to given form data and rules
                and returns validation results. <b>isValid</b> a boolean value that returns true if form does not
                contain any validation errors. validationError is a JSON object that keeps the validation errors on the
                form according to the{' '}
                <Link className="inner-link" to="/api/path">
                    path
                </Link>{' '}
                keys. Example usage of <b>useValidatableForm</b> hook:{' '}
                <Link className="inner-link" to="/api/use-validatable-form">
                    See API
                </Link>
            </div>
            <div className="codeBox">
                <span>{hookCode}</span>
            </div>
            <iframe
                src="https://stackblitz.com/edit/react-validatable-form?embed=1&file=src%2FApp.js"
                className="stackBlitzIFrame"
                title="react-validatable-form-embed"
            ></iframe>
        </ExampleUsageWrapper>
    );
};

export default Usage;
