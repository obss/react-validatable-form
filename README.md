
# React Validatable Form <!-- omit in toc -->


> React validatable form hook that is used to create dynamic client side validations on React forms.


[![NPM (scoped)](https://img.shields.io/npm/v/react-validatable-form?label=npm%20%7C%20web)](https://www.npmjs.com/package/react-validatable-form)
[![License](https://img.shields.io/github/license/obss/react-validatable-form.svg)](https://github.com/obss/react-validatable-form/blob/master/LICENSE) 
[![GitHub contributors](https://img.shields.io/github/contributors/obss/react-validatable-form)](https://github.com/obss/react-validatable-form/graphs/contributors) 
[![Github Issues](https://img.shields.io/github/issues/obss/react-validatable-form.svg)](https://github.com/obss/react-validatable-form/issues)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/obss/react-validatable-form)](https://github.com/obss/react-validatable-form)
[![Downloads](https://img.shields.io/npm/dw/react-validatable-form.svg)](https://www.npmjs.com/package/react-validatable-form)
[![Bundle Size](https://img.shields.io/bundlephobia/min/react-validatable-form)](https://www.npmjs.com/package/react-validatable-form)

---

## Table of Contents <!-- omit in toc -->

  
-  [Installation](#installation)

-  [Getting Started](#getting-started)

    -  [Setup ReactValidatableFormProvider](#setup-reactvalidatableformprovider)
    -  [useValidatableForm Hook Usage](#usevalidatableform-hook-usage)

-  [Examples](#examples)

-  [Contributing](#contributing)

-  [License](#license)
  

---


## Installation


**react-validatable-form** requires:


- React **17.0.2** or later


```shell

yarn add react-validatable-form

```

or

```shell

npm install react-validatable-form

```

## Getting Started

### Setup ReactValidatableFormProvider

Wrap your App inside `ReactValidatableFormProvider`.

```js
import { ReactValidatableFormProvider } from 'react-validatable-form';

// Wrap your app inside ReactValidatableFormProvider
const App = () => {
    return (
        <ReactValidatableFormProvider
            lang={'en'}
            customRules={null}
            translations={null}
            hideBeforeSubmit={true}
            showAfterBlur={true}
            focusToErrorAfterSubmit={true}
            elementFocusHandler={null}
        >
            <Main />
        </ReactValidatableFormProvider>
    );
};
```

### useValidatableForm Hook Usage

```js
import { useValidatableForm } from 'react-validatable-form';

const initialFormData = {};
const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const MyComponent = () => {
    const { isValid, formData, setPathValue, 
    setFormIsSubmitted, setPathIsBlurred, getValue, getError } = 
    useValidatableForm({
        rules,
        initialFormData,
    });

    return <>
        <input
            type="text"
            value={getValue('val') || ''}
            onChange={(e) => setPathValue('val', e.target.value)}
            onBlur={() => setPathIsBlurred('val')}
            id="val"
        />
        <div className="errorText">{getError('val') || ' '}</div>
        <div>
            <button onClick={() => setFormIsSubmitted()}>
               Submit Form
            </button>
        </div>
    </>;
};
```

## Examples

[![Edit form-quickstart](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/vigorous-paper-dht66q)

Checkout live examples on [react-validatable-form-demo](https://obss.github.io/react-validatable-form-demo) page for various customizations.

  
## Contributing


Please review the [contributing guide](https://github.com/obss/react-validatable-form/blob/master/CONTRIBUTING.md) before contributing to the repository.


## License


MIT


---

