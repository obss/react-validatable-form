import { Routes, Route } from 'react-router-dom';
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
import ExampleIsPathValid from './examples/ExampleIsPathValid';
import AppRouteWithTitle from './AppRouteWithTitle';

const AppRoutes = (props) => {
    return (
        <>
            <NavSidebar toggleDrawer={props.toggleDrawer} menuIsHidden={props.menuIsHidden} />
            <div className="generalDiv" onClick={props.onOutsideClick}>
                <Routes>
                    <Route
                        exact
                        path="/getting-started/home"
                        element={
                            <AppRouteWithTitle title="React Validatable Form Demo">
                                <Home />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/getting-started/installation"
                        element={
                            <AppRouteWithTitle title="Getting Started - Installation">
                                <Installation />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/getting-started/usage"
                        element={
                            <AppRouteWithTitle title="Getting Started - Usage">
                                <Usage openSettingsDialog={props.openSettingsDialog} />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/required"
                        element={
                            <AppRouteWithTitle title="Rules - Required">
                                <RuleRequired />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/number"
                        element={
                            <AppRouteWithTitle title="Rules - Number">
                                <RuleNumber />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/length"
                        element={
                            <AppRouteWithTitle title="Rules - Length">
                                <RuleLength />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/list-size"
                        element={
                            <AppRouteWithTitle title="Rules - List Size">
                                <RuleListSize />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/date"
                        element={
                            <AppRouteWithTitle title="Rules - Date">
                                <RuleDate />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/email"
                        element={
                            <AppRouteWithTitle title="Rules - Email">
                                <RuleEmail />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/url"
                        element={
                            <AppRouteWithTitle title="Rules - URL">
                                <RuleUrl />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/iban"
                        element={
                            <AppRouteWithTitle title="Rules - Iban">
                                <RuleIban />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/equality"
                        element={
                            <AppRouteWithTitle title="Rules - Equality">
                                <RuleEquality />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/includes"
                        element={
                            <AppRouteWithTitle title="Rules - Includes">
                                <RuleIncludes />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/regex"
                        element={
                            <AppRouteWithTitle title="Rules - Regex">
                                <RuleRegex />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/unique"
                        element={
                            <AppRouteWithTitle title="Rules - Unique">
                                <RuleUnique />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/custom-on-hook"
                        element={
                            <AppRouteWithTitle title="Rules - Custom on Hook">
                                <RuleCustomOnHook />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/rules/custom-on-provider"
                        element={
                            <AppRouteWithTitle title="Rules - Custom on Provider">
                                <RuleCustomOnProvider />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/validate-lists"
                        element={
                            <AppRouteWithTitle title="Advanced - Validate Lists">
                                <AdvancedValidateLists />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/hide-before-submit"
                        element={
                            <AppRouteWithTitle title="Advanced - Hide Before Submit">
                                <AdvancedHideBeforeSubmit />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/show-after-blur"
                        element={
                            <AppRouteWithTitle title="Advanced - Show After Blur">
                                <AdvancedShowAfterBlur />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/focus-to-error-after-submit"
                        element={
                            <AppRouteWithTitle title="Advanced - Focus to Error After Submit">
                                <AdvancedFocusToErrorAfterSubmit />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/focus-to-error-on-list-after-submit"
                        element={
                            <AppRouteWithTitle title="Advanced - Focus to Error on List After Submit">
                                <AdvancedFocusToErrorOnListAfterSubmit />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/validate-list-of-objects"
                        element={
                            <AppRouteWithTitle title="Advanced - Validate List of Objects">
                                <AdvancedValidateListOfObjects />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/advanced/validate-complex-forms"
                        element={
                            <AppRouteWithTitle title="Advanced - Validate Complex Forms">
                                <AdvancedValidateComplexForms />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/customizations/custom-message"
                        element={
                            <AppRouteWithTitle title="Customizations - Custom Message">
                                <CustomMessage />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/customizations/translations"
                        element={
                            <AppRouteWithTitle title="Customizations - Translations">
                                <CustomTranslations />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/customizations/conditional-rules"
                        element={
                            <AppRouteWithTitle title="Customizations - Conditional Rules">
                                <CustomConditionalRules />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/customizations/apply-to-nulls"
                        element={
                            <AppRouteWithTitle title="Customizations - Apply to Nulls">
                                <CustomApplyToNulls />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/customizations/custom-element-focus-handler"
                        element={
                            <AppRouteWithTitle title="Customizations - Element Focus Handler">
                                <CustomElementFocusHandler />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/pure"
                        element={
                            <AppRouteWithTitle title="Examples - Pure">
                                <ExamplePureUsage />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/mui"
                        element={
                            <AppRouteWithTitle title="Examples - MUI">
                                <ExampleMuiUsage />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/antd"
                        element={
                            <AppRouteWithTitle title="Examples - Antd">
                                <ExampleAntUsage />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/prime-react"
                        element={
                            <AppRouteWithTitle title="Examples - Prime React">
                                <ExamplePrimeReact />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/react-bootstrap"
                        element={
                            <AppRouteWithTitle title="Examples - React Bootstrap">
                                <ExampleReactBootstrap />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/react-native"
                        element={
                            <AppRouteWithTitle title="Examples - React Native">
                                <ExampleReactNativeUsage />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/set-form-data"
                        element={
                            <AppRouteWithTitle title="Examples - Set Form Data">
                                <ExampleSetFormData />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/set-path-value"
                        element={
                            <AppRouteWithTitle title="Examples - Set Path Value">
                                <ExampleSetPathValue />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/unset-path-value"
                        element={
                            <AppRouteWithTitle title="Examples - Unset Path Value">
                                <ExampleUnsetPathValue />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/set-rules"
                        element={
                            <AppRouteWithTitle title="Examples - Set Rules">
                                <ExampleSetRules />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/set-form-data-and-rules"
                        element={
                            <AppRouteWithTitle title="Examples - Set Form Data And Rules">
                                <ExampleSetFormDataAndRules />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/form-data"
                        element={
                            <AppRouteWithTitle title="Examples - Form Data">
                                <ExampleFormData />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/validation-error"
                        element={
                            <AppRouteWithTitle title="Examples - Validation Error">
                                <ExampleValidationError />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/validation-error-original-result"
                        element={
                            <AppRouteWithTitle title="Examples - Validation Error Original Result">
                                <ExampleValidationErrorOriginalResult />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/unset-path-is-blurred"
                        element={
                            <AppRouteWithTitle title="Examples - Unset Path Is Blurred">
                                <ExampleUnsetPathIsBlurred />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/is-path-valid"
                        element={
                            <AppRouteWithTitle title="Examples - Is Path Valid">
                                <ExampleIsPathValid />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/api/react-validatable-form-provider"
                        element={
                            <AppRouteWithTitle title="Api - ReactValidatableFormProvider">
                                <ApiReactValidatableFormProvider openSettingsDialog={props.openSettingsDialog} />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/api/use-validatable-form"
                        element={
                            <AppRouteWithTitle title="Api - useValitableForm">
                                <ApiUseValidatableForm />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/api/rules"
                        element={
                            <AppRouteWithTitle title="Api - rules">
                                <ApiRules />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/api/rule"
                        element={
                            <AppRouteWithTitle title="Api - rule">
                                <ApiRule />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/api/path"
                        element={
                            <AppRouteWithTitle title="Api - path">
                                <ApiPath />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={
                            <AppRouteWithTitle title="React Validatable Form">
                                <Homepage />
                            </AppRouteWithTitle>
                        }
                    />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;
