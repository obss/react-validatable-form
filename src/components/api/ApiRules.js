import { Link } from 'react-router-dom';
import ApiInfo from '../ApiInfo';
import CodeAccordion from '../CodeAccordion';
import ExampleUsageWrapper from '../ExampleUsageWrapper';

const rulesFormCode = `const rules = [
    {
        listPath: 'listChild',
        subRules: [
            {
                path: 'subkey1',
                ruleSet: ['required', { rule: 'length', greaterThan: 3 }],
                disableFocusAfterSubmit: true,
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
];`;

const rulesParametersApiInfoList = [
    {
        label: (
            <div>
                path (string){' '}
                <Link className="inner-link" to="/api/path">
                    See Path API
                </Link>
            </div>
        ),
        desc: 'Path of the value on formData to run the rule.',
    },
    {
        label: (
            <div>
                listPath (string){' '}
                <Link className="inner-link" to="/api/path">
                    See Path API
                </Link>
            </div>
        ),
        desc: 'Path of the values of a list on formData to run the rules on each elements of the list.',
    },
    {
        label: (
            <div>
                ruleSet (array){' '}
                <Link className="inner-link" to="/api/rule">
                    See Rule API
                </Link>
            </div>
        ),
        desc: 'Rules to be applied to the value on path (Can be string or rule object).',
    },
    {
        label: 'elementId (string)',
        desc: 'Custom elementId to focus after submit (path is used if empty).',
    },
    {
        label: 'listElementId (string)',
        desc: 'Custom listElementId prefix to focus to elements with validation errors after submit (listPath is used if empty).',
    },
    {
        label: 'dependantPaths (array)',
        desc: 'Array of paths that should trigger running the validation when there is a change on those paths.',
    },
    {
        label: 'disableFocusAfterSubmit (boolean)',
        desc: 'Disable searching for element with given path to focus after submit if there is a validation error.',
    },
    {
        label: 'subRules (array)',
        desc: 'Rules to be applied to the subpaths of the given list (can only be used with listPath).',
    },
];

const ApiRules = () => {
    return (
        <ExampleUsageWrapper header="rules">
            <CodeAccordion code={rulesFormCode} />
            <div className="apiInfoSectionHeader">Rules Array Parameters</div>
            <ApiInfo apiInfoList={rulesParametersApiInfoList} />
        </ExampleUsageWrapper>
    );
};

export default ApiRules;
