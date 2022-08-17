import { Switch, Route } from 'react-router-dom';
import { NavSidebar } from './NavSidebar';
import Homepage from './Homepage';
import RuleRequired from './rules/RuleRequired';
import RuleNumber from './rules/RuleNumber';
import RuleLength from './rules/RuleLength';
import RuleListSize from './rules/RuleListSize';
import RuleDate from './rules/RuleDate';
import RuleEmail from './rules/RuleEmail';
import RuleUrl from './rules/RuleUrl';
import RuleIban from './rules/RuleIban';
import RuleCustomOnHook from './rules/RuleCustomOnHook';
import RuleCustomOnProvider from './rules/RuleCustomOnProvider';
import AdvancedHideBeforeSubmit from './advanced/AdvancedHideBeforeSubmit';
import AdvancedShowAfterBlur from './advanced/AdvancedShowAfterBlur';
import AdvancedFocusToErrorAfterSubmit from './advanced/AdvancedFocusToErrorAfterSubmit';
import CustomMessage from './customizations/CustomMessage';
import CustomTranslations from './customizations/CustomTranslations';
import AdvancedValidateComplexForms from './advanced/AdvancedValidateComplexForms';
import AdvancedValidateLists from './advanced/AdvancedValidateLists';
import CustomConditionalRules from './customizations/CustomConditionalRules';
import RuleRegex from './rules/RuleRegex';
import AdvancedFocusToErrorOnListAfterSubmit from './advanced/AdvancedFocusToErrorOnListAfterSubmit';
import AdvancedValidateListOfObjects from './advanced/AdvancedValidateListOfObjects';
import Installation from './getting-started/Installation';
import Usage from './getting-started/Usage';
import CustomApplyToNulls from './customizations/CustomApplyToNulls';
import CustomElementFocusHandler from './customizations/CustomElementFocusHandler';
import RuleUnique from './rules/RuleUnique';
import RuleEquality from './rules/RuleEquality';
import ExamplePureUsage from './examples/ExamplePureUsage';
import ExampleMuiUsage from './examples/ExampleMuiUsage';
import ExamplePrimeReact from './examples/ExamplePrimeReact';
import ExampleReactBootstrap from './examples/ExampleReactBootstrap';
import ExampleSetFormData from './examples/ExampleSetFormData';
import ExampleSetPathValue from './examples/ExampleSetPathValue';
import ExampleSetFormDataAndRules from './examples/ExampleSetFormDataAndRules';
import ExampleFormData from './examples/ExampleFormData';
import ApiUseValidatableForm from './api/ApiUseValidatableForm';
import ApiReactValidatableFormProvider from './api/ApiReactValidatableFormProvider';
import ApiRules from './api/ApiRules';
import ApiRule from './api/ApiRule';
import ApiPath from './api/ApiPath';
import ExampleValidationError from './examples/ExampleValidationError';
import ExampleSetRules from './examples/ExampleSetRules';
import ExampleUnsetPathValue from './examples/ExampleUnsetPathValue';
import ExampleValidationErrorOriginalResult from './examples/ExampleValidationErrorOriginalResult';
import ExampleUnsetPathIsBlurred from './examples/ExampleUnsetPathIsBlurred';
import RuleIncludes from './rules/RuleIncludes';
import Home from './getting-started/Home';
import ExampleAntUsage from './examples/ExampleAntUsage';
import '../App.css';
import ExampleReactNativeUsage from './examples/ExampleReactNativeUsage';
import { Helmet } from 'react-helmet-async';
import ExampleIsPathValid from './examples/ExampleIsPathValid';

const Routes = (props) => {
    return (
        <>
            <NavSidebar toggleDrawer={props.toggleDrawer} menuIsHidden={props.menuIsHidden} />
            <div className="generalDiv" onClick={props.onOutsideClick}>
                <Switch>
                    <Route exact path="/getting-started/home">
                        <Helmet>
                            <title> React Validatable Form Demo </title>
                        </Helmet>
                        <Home />
                    </Route>
                    <Route exact path="/getting-started/installation">
                        <Helmet>
                            <title> Getting Started - Installation </title>
                        </Helmet>
                        <Installation />
                    </Route>
                    <Route exact path="/getting-started/usage">
                        <Helmet>
                            <title> Getting Started - Usage </title>
                        </Helmet>
                        <Usage openSettingsDialog={props.openSettingsDialog} />
                    </Route>
                    <Route exact path="/rules/required">
                        <Helmet>
                            <title> Rules - Required </title>
                        </Helmet>
                        <RuleRequired />
                    </Route>
                    <Route exact path="/rules/number">
                        <Helmet>
                            <title> Rules - Number </title>
                        </Helmet>
                        <RuleNumber />
                    </Route>
                    <Route exact path="/rules/length">
                        <Helmet>
                            <title> Rules - Length </title>
                        </Helmet>
                        <RuleLength />
                    </Route>
                    <Route exact path="/rules/list-size">
                        <Helmet>
                            <title> Rules - List Size </title>
                        </Helmet>
                        <RuleListSize />
                    </Route>
                    <Route exact path="/rules/date">
                        <Helmet>
                            <title> Rules - Date </title>
                        </Helmet>
                        <RuleDate />
                    </Route>
                    <Route exact path="/rules/email">
                        <Helmet>
                            <title> Rules - Email </title>
                        </Helmet>
                        <RuleEmail />
                    </Route>
                    <Route exact path="/rules/url">
                        <Helmet>
                            <title> Rules - URL </title>
                        </Helmet>
                        <RuleUrl />
                    </Route>
                    <Route exact path="/rules/iban">
                        <Helmet>
                            <title> Rules - Iban </title>
                        </Helmet>
                        <RuleIban />
                    </Route>
                    <Route exact path="/rules/equality">
                        <Helmet>
                            <title> Rules - Equality </title>
                        </Helmet>
                        <RuleEquality />
                    </Route>
                    <Route exact path="/rules/includes">
                        <Helmet>
                            <title> Rules - Includes </title>
                        </Helmet>
                        <RuleIncludes />
                    </Route>
                    <Route exact path="/rules/regex">
                        <Helmet>
                            <title> Rules - Regex </title>
                        </Helmet>
                        <RuleRegex />
                    </Route>
                    <Route exact path="/rules/unique">
                        <Helmet>
                            <title> Rules - Unique </title>
                        </Helmet>
                        <RuleUnique />
                    </Route>
                    <Route exact path="/rules/custom-on-hook">
                        <Helmet>
                            <title> Rules - Custom on Hook </title>
                        </Helmet>
                        <RuleCustomOnHook />
                    </Route>
                    <Route exact path="/rules/custom-on-provider">
                        <Helmet>
                            <title> Rules - Custom on Provider </title>
                        </Helmet>
                        <RuleCustomOnProvider />
                    </Route>
                    <Route exact path="/advanced/validate-lists">
                        <Helmet>
                            <title> Advanced - Validate Lists </title>
                        </Helmet>
                        <AdvancedValidateLists />
                    </Route>
                    <Route exact path="/advanced/hide-before-submit">
                        <Helmet>
                            <title> Advanced - Hide Before Submit </title>
                        </Helmet>
                        <AdvancedHideBeforeSubmit />
                    </Route>
                    <Route exact path="/advanced/show-after-blur">
                        <Helmet>
                            <title> Advanced - Show After Blur </title>
                        </Helmet>
                        <AdvancedShowAfterBlur />
                    </Route>
                    <Route exact path="/advanced/focus-to-error-after-submit">
                        <Helmet>
                            <title> Advanced - Focus to Error After Submit </title>
                        </Helmet>
                        <AdvancedFocusToErrorAfterSubmit />
                    </Route>
                    <Route exact path="/advanced/focus-to-error-on-list-after-submit">
                        <Helmet>
                            <title> Advanced - Focus to Error on List After Submit </title>
                        </Helmet>
                        <AdvancedFocusToErrorOnListAfterSubmit />
                    </Route>
                    <Route exact path="/advanced/validate-list-of-objects">
                        <Helmet>
                            <title> Advanced - Validate List of Objects </title>
                        </Helmet>
                        <AdvancedValidateListOfObjects />
                    </Route>
                    <Route exact path="/advanced/validate-complex-forms">
                        <Helmet>
                            <title> Advanced - Validate Complex Forms </title>
                        </Helmet>
                        <AdvancedValidateComplexForms />
                    </Route>
                    <Route exact path="/customizations/custom-message">
                        <Helmet>
                            <title> Customizations - Custom Message </title>
                        </Helmet>
                        <CustomMessage />
                    </Route>
                    <Route exact path="/customizations/translations">
                        <Helmet>
                            <title> Customizations - Translations </title>
                        </Helmet>
                        <CustomTranslations />
                    </Route>
                    <Route exact path="/customizations/conditional-rules">
                        <Helmet>
                            <title> Customizations - Conditional Rules </title>
                        </Helmet>
                        <CustomConditionalRules />
                    </Route>
                    <Route exact path="/customizations/apply-to-nulls">
                        <Helmet>
                            <title> Customizations - Apply to Nulls </title>
                        </Helmet>
                        <CustomApplyToNulls />
                    </Route>
                    <Route exact path="/customizations/custom-element-focus-handler">
                        <Helmet>
                            <title> Customizations - Element Focus Handler </title>
                        </Helmet>
                        <CustomElementFocusHandler />
                    </Route>
                    <Route exact path="/examples/pure">
                        <Helmet>
                            <title> Examples - Pure </title>
                        </Helmet>
                        <ExamplePureUsage />
                    </Route>
                    <Route exact path="/examples/mui">
                        <Helmet>
                            <title> Examples - MUI </title>
                        </Helmet>
                        <ExampleMuiUsage />
                    </Route>
                    <Route exact path="/examples/antd">
                        <Helmet>
                            <title> Examples - Antd </title>
                        </Helmet>
                        <ExampleAntUsage />
                    </Route>
                    <Route exact path="/examples/prime-react">
                        <Helmet>
                            <title> Examples - Prime React </title>
                        </Helmet>
                        <ExamplePrimeReact />
                    </Route>
                    <Route exact path="/examples/react-bootstrap">
                        <Helmet>
                            <title> Examples - React Bootstrap </title>
                        </Helmet>
                        <ExampleReactBootstrap />
                    </Route>
                    <Route exact path="/examples/react-native">
                        <Helmet>
                            <title> Examples - React Native </title>
                        </Helmet>
                        <ExampleReactNativeUsage />
                    </Route>
                    <Route exact path="/examples/set-form-data">
                        <Helmet>
                            <title> Examples - Set Form Data </title>
                        </Helmet>
                        <ExampleSetFormData />
                    </Route>
                    <Route exact path="/examples/set-path-value">
                        <Helmet>
                            <title> Examples - Set Path Value </title>
                        </Helmet>
                        <ExampleSetPathValue />
                    </Route>
                    <Route exact path="/examples/unset-path-value">
                        <Helmet>
                            <title> Examples - Unset Path Value </title>
                        </Helmet>
                        <ExampleUnsetPathValue />
                    </Route>
                    <Route exact path="/examples/set-rules">
                        <Helmet>
                            <title> Examples - Set Rules </title>
                        </Helmet>
                        <ExampleSetRules />
                    </Route>
                    <Route exact path="/examples/set-form-data-and-rules">
                        <Helmet>
                            <title> Examples - Set Form Data And Rules </title>
                        </Helmet>
                        <ExampleSetFormDataAndRules />
                    </Route>
                    <Route exact path="/examples/form-data">
                        <Helmet>
                            <title> Examples - Form Data </title>
                        </Helmet>
                        <ExampleFormData />
                    </Route>
                    <Route exact path="/examples/validation-error">
                        <Helmet>
                            <title> Examples - Validation Error </title>
                        </Helmet>
                        <ExampleValidationError />
                    </Route>
                    <Route exact path="/examples/validation-error-original-result">
                        <Helmet>
                            <title> Examples - Validation Error Original Result </title>
                        </Helmet>
                        <ExampleValidationErrorOriginalResult />
                    </Route>
                    <Route exact path="/examples/unset-path-is-blurred">
                        <Helmet>
                            <title> Examples - Unset Path Is Blurred </title>
                        </Helmet>
                        <ExampleUnsetPathIsBlurred />
                    </Route>
                    <Route exact path="/examples/is-path-valid">
                        <Helmet>
                            <title> Examples - Is Path Valid </title>
                        </Helmet>
                        <ExampleIsPathValid />
                    </Route>
                    <Route exact path="/api/react-validatable-form-provider">
                        <Helmet>
                            <title> Api - React Validatable Form Provider </title>
                        </Helmet>
                        <ApiReactValidatableFormProvider openSettingsDialog={props.openSettingsDialog} />
                    </Route>
                    <Route exact path="/api/use-validatable-form">
                        <Helmet>
                            <title> Api - useValitableForm </title>
                        </Helmet>
                        <ApiUseValidatableForm />
                    </Route>
                    <Route exact path="/api/rules">
                        <Helmet>
                            <title> Api - Rules </title>
                        </Helmet>
                        <ApiRules />
                    </Route>
                    <Route exact path="/api/rule">
                        <Helmet>
                            <title> Api - Rules </title>
                        </Helmet>
                        <ApiRule />
                    </Route>
                    <Route exact path="/api/path">
                        <Helmet>
                            <title> Api - Path </title>
                        </Helmet>
                        <ApiPath />
                    </Route>
                    <Route exact path="/">
                        <Helmet>
                            <title> React Validatable Form </title>
                        </Helmet>
                        <Homepage />
                    </Route>
                </Switch>
            </div>
        </>
    );
};

export default Routes;
