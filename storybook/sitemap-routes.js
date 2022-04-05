import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default (
    <Switch>
        <Route exact path="/getting-started/installation"></Route>
        <Route exact path="/getting-started/usage"></Route>
        <Route exact path="/rules/required"></Route>
        <Route exact path="/rules/number"></Route>
        <Route exact path="/rules/length"></Route>
        <Route exact path="/rules/list-size"></Route>
        <Route exact path="/rules/date"></Route>
        <Route exact path="/rules/email"></Route>
        <Route exact path="/rules/url"></Route>
        <Route exact path="/rules/iban"></Route>
        <Route exact path="/rules/equality"></Route>
        <Route exact path="/rules/regex"></Route>
        <Route exact path="/rules/unique"></Route>
        <Route exact path="/rules/custom-on-hook"></Route>
        <Route exact path="/rules/custom-on-provider"></Route>
        <Route exact path="/advanced/validate-lists"></Route>
        <Route exact path="/advanced/hide-before-submit"></Route>
        <Route exact path="/advanced/show-after-blur"></Route>
        <Route exact path="/advanced/focus-to-error-after-submit"></Route>
        <Route exact path="/advanced/focus-to-error-on-list-after-submit"></Route>
        <Route exact path="/advanced/validate-list-of-objects"></Route>
        <Route exact path="/advanced/validate-complex-forms"></Route>
        <Route exact path="/customizations/custom-message"></Route>
        <Route exact path="/customizations/translations"></Route>
        <Route exact path="/customizations/conditional-rules"></Route>
        <Route exact path="/customizations/apply-to-nulls"></Route>
        <Route exact path="/customizations/custom-element-focus-handler"></Route>
        <Route exact path="/examples/pure"></Route>
        <Route exact path="/examples/mui"></Route>
        <Route exact path="/examples/prime-react"></Route>
        <Route exact path="/examples/react-bootstrap"></Route>
        <Route exact path="/api/react-validatable-form-provider"></Route>
        <Route exact path="/api/use-validatable-form"></Route>
        <Route exact path="/api/rules"></Route>
        <Route exact path="/api/rule"></Route>
        <Route exact path="/api/path"></Route>
        <Route exact path="/"></Route>
    </Switch>
);
