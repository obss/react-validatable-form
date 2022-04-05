import ExampleUsageWrapper from '../ExampleUsageWrapper';

const pathFormCode = `
////////////-- example rules --///////////
const rules = [
    { path: 'child1', ruleSet: ['required'] },
    { path: 'child2', ruleSet: ['required'] },
    { path: 'child3.subchild1', ruleSet: ['required'] },
    { path: 'child3.subchild2', ruleSet: ['required'] },
    {
        listPath: 'listChild',
        subRules: [
            {path: 'subkey1', ruleSet: ['required', { rule: 'length', greaterThan: 3 }]},
            {path: 'subkey2', ruleSet: [{rule: 'required', }, { rule: 'number', greaterThan: 5 }]}
        ]
    },
    {path: 'listChild', ruleSet: [{ rule: 'required'}, { rule: 'listSize', greaterThan: 2 }]}
];

////////////-- example formData --///////////
const formData = {
    child1: "child1 value",
    child2: "child2 value",
    child3: {
        subchild1: "child3 subchild1 value",
        subchild2: "child3 subchild2 value",
    },
    listChild: [
        {
            subkey1: "list 0th element subkey1 value",
            subkey2: "list 0th element subkey2 value",
        },
        {
            subkey1: "list 1st element subkey1 value",
            subkey2: "list 1st element subkey2 value",
        }
    ]
};

////////////-- example validationError result object --///////////
const validationError = {
    "child1": "This field is required",                 // first level child
    "child2": "This field is required",                 // first level child
    "child3.subchild1": "This field is required",       // second level child
    "child3.subchild2": "This field is required",       // second level child
    "listChild": "This field is required",              // first level list child
    "listChild{0}.subkey1": "This field is required",   // list of object's child
    "listChild{0}.subkey2": "This field is required",   // list of object's child
    "listChild{1}.subkey1": "This field is required",   // list of object's child
    "listChild{1}.subkey2": "This field is required",   // list of object's child
}

`;

const ApiPath = () => {
    return (
        <ExampleUsageWrapper header="Path">
            <div className="infoParagraph">
                <p>
                    <b>Path</b> is a string value that is used to access any value on the formData using{' '}
                    <a
                        className="inner-link"
                        href="https://lodash.com/docs/4.17.15#get"
                        target="_blank"
                        rel="noreferrer"
                    >
                        lodash get
                    </a>{' '}
                    method.
                </p>
                <p>This table shows how to use path and listPath keys for the following code.</p>
                <table className="pathApiTable">
                    <thead>
                        <tr>
                            <td className="pathApiTableInfoCol">Path Type</td>
                            <td className="pathApiTableExampleCol">Usage Example</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Update value of first level child</td>
                            <td>setPathValue({"'child1'"}, newValue)</td>
                        </tr>
                        <tr>
                            <td>Update value of second level child</td>
                            <td>setPathValue({"'child3.subchild1'"}, newValue)</td>
                        </tr>
                        <tr>
                            <td>Update value of list&apos;s element at 0th index</td>
                            <td>setPathValue({"'listChild[0]'"}, newValue)</td>
                        </tr>
                        <tr>
                            <td>Update value of list of object&apos;s element at 0th index with key subkey1</td>
                            <td>setPathValue({"'listChild[0].subkey1'"}, newValue)</td>
                        </tr>
                        <tr>
                            <td>Get value of first level child</td>
                            <td>getValue({"'child1'"})</td>
                        </tr>
                        <tr>
                            <td>Get value of second level child</td>
                            <td>getValue({"'child3.subchild1'"})</td>
                        </tr>
                        <tr>
                            <td>Get value of list&apos;s element at 0th index</td>
                            <td>getValue({"'listChild[0]'"})</td>
                        </tr>
                        <tr>
                            <td>Get value of list of object&apos;s element at 0th index with key subkey1</td>
                            <td>getValue({"'listChild[0].subkey1'"})</td>
                        </tr>
                        <tr>
                            <td>Get error of first level child</td>
                            <td>getError({"'child1'"})</td>
                        </tr>
                        <tr>
                            <td>Get error of second level child</td>
                            <td>getError({"'child3.subchild1'"})</td>
                        </tr>
                        <tr>
                            <td>Get error of list&apos;s element at 0th index</td>
                            <td>getError({"'listChild{0}'"})</td>
                        </tr>
                        <tr>
                            <td>Get error of list of object&apos;s element at 0th index with key subkey1</td>
                            <td>getError({"'listChild{0}.subkey1'"})</td>
                        </tr>
                        <tr>
                            <td>Unset value and key of first level child</td>
                            <td>unsetPathValue({"'child1'"})</td>
                        </tr>
                        <tr>
                            <td>Unset value and key of second level child</td>
                            <td>unsetPathValue({"'child3.subchild1'"})</td>
                        </tr>
                        <tr>
                            <td>Unset value and key of list&apos;s element at 0th index</td>
                            <td>unsetPathValue({"'listChild[0]'"})</td>
                        </tr>
                        <tr>
                            <td>Unset value and key of list of object&apos;s element at 0th index with key subkey1</td>
                            <td>unsetPathValue({"'listChild[0].subkey1'"})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pageCodeWrapper">
                <span className="pageCode">{pathFormCode}</span>
            </div>
        </ExampleUsageWrapper>
    );
};

export default ApiPath;
