import './FormSubmitResult.css';

const stringifyWithFunction = (obj) => {
    var placeholder = '____PLACEHOLDER____';
    var fns = [];
    var json = JSON.stringify(
        obj,
        function (key, value) {
            if (typeof value === 'function') {
                fns.push(value);
                return placeholder;
            }
            return value;
        },
        2
    );
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function () {
        return fns.shift();
    });
    return json;
};

const FormSubmitResult = ({ formData }) => {
    return (
        <div>
            <span className={'formDataString'}>{stringifyWithFunction(formData)}</span>
        </div>
    );
};

export default FormSubmitResult;
