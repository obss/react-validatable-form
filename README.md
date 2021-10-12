
# React Validatable Form <!-- omit in toc -->


> React validatable form hook that is used to create dynamic client side validations on React forms.


[![NPM (scoped)](https://img.shields.io/npm/v/react-validatable-form?label=npm%20%7C%20web)](https://www.npmjs.com/package/react-validatable-form) [![License](https://img.shields.io/github/license/obss/react-validatable-form.svg)](https://github.com/obss/react-validatable-form/blob/master/LICENSE) [![GitHub contributors](https://img.shields.io/github/contributors/obss/react-validatable-form)](https://github.com/obss/react-validatable-form/graphs/contributors) [![Github Issues](https://img.shields.io/github/issues/obss/react-validatable-form.svg)](https://github.com/obss/react-validatable-form/issues)

---

## Table of Contents <!-- omit in toc -->

  
-  [Install](#install)

    -  [Setup ReactValidatableFormProvider](#setup-provider)
    -  [useValidatableForm Hook Usage](#hook-usage)

-  [Getting Started](#getting-started)

-  [Examples](#examples)

-  [Contributing](#contributing)

-  [License](#license)
  

---
  

## Install


**react-validatable-form** requires:


- React **17.0.2** or later


```shell

yarn add react-validatable-form

```

or

```shell

npm install --save react-validatable-form

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
import get from 'lodash.get';

const initialFormData = {};
const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const MyComponent = () => {
    const [isValid, validationError, formData, 
    { setPathValue, setFormIsSubmitted, setPathIsBlurred }] = 
    useValidatableForm({
        rules,
        initialFormData,
    });

    return <>
        <input
            type="text"
            value={get(formData, 'val') || ''}
            onChange={(e) => setPathValue('val', e.target.value)}
            onBlur={() => setPathIsBlurred('val')}
            id="val"
        />
        <div className="errorText">{get(validationError, 'val') || ' '}</div>
    </>;
};
```

## Examples


Checkout live examples on [react-validatable-form-demo](https://obss.github.io/react-validatable-form-demo) page for various customizations.

  
## Contributing


Please review the [contributing guide](https://github.com/obss/react-validatable-form/blob/master/CONTRIBUTING.md) before contributing to the repository.


## License


MIT


---

