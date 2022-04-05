import React, { useEffect, useState } from 'react';
import { ReactValidatableFormProvider } from 'react-validatable-form';
import { AppBar, Box, Dialog, DialogTitle, Toolbar } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Main.css';
import BodyWrapper from './BodyWrapper';
import Routes from './Routes';
import ExampleUsageWrapper from './ExampleUsageWrapper';
import Settings from './Settings';
import { HashRouter, Link } from 'react-router-dom';
import MainDrawer from './MainDrawer';
import { HelmetProvider } from 'react-helmet-async';

const MyCustomRuleFunction = (ruleParams) => {
    const { value } = ruleParams;

    if (!value) {
        return 'this field is a required field';
    }

    if (!value.includes('a') && value.length < 5) {
        return `text ${value} should either include letter 'a' or its length should be greater than 4`;
    }

    return null;
};

const MyCustomRule2Function = (ruleParams) => {
    const { value } = ruleParams;

    if (!value) {
        return {};
    }

    if (!value.includes('a') && value.length < 5) {
        return { value: value };
    }

    return null;
};

const MyCustomRule3Function = (ruleParams) => {
    const { value } = ruleParams;

    if (!value) {
        return <span>this field is a required field</span>;
    }

    if (!value.includes('a') && value.length < 10) {
        return (
            <span>
                text <b> {value} </b> should either include letter <i> a </i> or its length should be greater than 9
            </span>
        );
    }

    return null;
};

const customRules = {
    myCustomRule: MyCustomRuleFunction,
    myCustomRule2: MyCustomRule2Function,
    myCustomRule3: MyCustomRule3Function,
};

const defaultSettings = {
    lang: 'en',
    translationsEnabled: false,
    customDateFormatterFunctionEnabled: false,
    customDateWithTimeFormatterFunctionEnabled: false,
    hideBeforeSubmit: false,
    showAfterBlur: false,
    focusToErrorAfterSubmit: false,
    customElementFocusHandlerEnabled: false,
};

const defaultTranslations = {
    en: {
        myCustomRule2:
            "This is myCustomRule2. This field should have letter 'a' or its length should be greater than 4",
    },
    tr: {
        myCustomRule2: "Bu kural myCustomRule2. Bu alan 'a' harfi içermeli veya uzunluğu 4'den büyük olmalı",
    },
};

const customTranslations = {
    en: {
        required: 'This field is really required',
        'length.greaterThan': 'Believe me, this field should really have greater than ${comparisonValue} characters',
        'length.equalTo': 'You should be careful because this field should have ${comparisonValue} characters',
        myCustomRule2: "Believe me, this field should have letter 'a' or its length should be greater than 4",
        email: (
            <span>
                Do you think this is an <b> email </b>?
            </span>
        ),
    },
    de: {
        required: 'Dieses Feld wird benötigt',
        myCustomRule2: 'Dieses Feld sollte den Buchstaben „a“ haben oder länger als 4 sein',
    },
};

const customDateFormatterFunction = (dateParam) => {
    const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = dateParam.getDate();
    const m = strArray[dateParam.getMonth()];
    const y = dateParam.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
};

const customDateWithTimeFormatterFunction = (dateParam) => {
    const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = dateParam.getDate();
    const m = strArray[dateParam.getMonth()];
    const y = dateParam.getFullYear();
    const h = dateParam.getHours();
    const mi = dateParam.getMinutes();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y + ' ' + h + ':' + mi;
};

const defaultLangOptions = ['en', 'tr'];

const Main = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [currentSettings, setCurrentSettings] = useState(defaultSettings);
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [menuIsHidden, setMenuIsHidden] = useState(false);
    const [anchor, setAnchor] = useState(false);

    useEffect(() => {
        setMenuIsHidden(isMobile);
    }, [isMobile]);

    const handleOutsideClick = () => {
        if (isMobile) {
            setMenuIsHidden(true);
        }
    };

    const openSettingsDialog = () => {
        setSettingsDialogOpen(true);
    };

    const handleSettingChange = (key, value) => {
        const newSettings = { ...currentSettings };
        newSettings[key] = value;
        if (key === 'translationsEnabled' && !value) {
            if (currentSettings.lang === 'de') {
                newSettings['lang'] = 'en';
            }
        }
        setCurrentSettings(newSettings);
    };

    let translations = null;
    if (currentSettings.translationsEnabled) {
        translations = customTranslations;
    } else {
        translations = defaultTranslations;
    }

    let dateFormatterFunction = null;
    if (currentSettings.customDateFormatterFunctionEnabled) {
        dateFormatterFunction = customDateFormatterFunction;
    }

    let dateWithTimeFormatterFunction = null;
    if (currentSettings.customDateWithTimeFormatterFunctionEnabled) {
        dateWithTimeFormatterFunction = customDateWithTimeFormatterFunction;
    }

    const currentLangOptions = [...defaultLangOptions];
    if (currentSettings.translationsEnabled) {
        currentLangOptions.push('de');
    }

    let customElementFocusHandler = null;
    if (currentSettings.customElementFocusHandlerEnabled) {
        customElementFocusHandler = (elementId) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.warn(`useValidatableForm warning. Dom element with id ${elementId} is not found to be focused`);
            } else {
                console.log(`I'm currently focusing Dom element with id ${elementId}`);
                element.focus();
            }
        };
    }

    const dialogContent = (
        <div className={'providerDialogContent'}>
            <Autocomplete
                value={currentSettings.lang}
                onChange={(event, newValue) => {
                    handleSettingChange('lang', newValue);
                }}
                options={currentLangOptions}
                renderInput={(params) => <TextField {...params} label="lang" />}
                style={{ width: 200 }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.translationsEnabled}
                        onChange={(e) => handleSettingChange('translationsEnabled', e.target.checked)}
                    />
                }
                label="custom translations"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.customDateFormatterFunctionEnabled}
                        onChange={(e) => handleSettingChange('customDateFormatterFunctionEnabled', e.target.checked)}
                    />
                }
                label="custom dateFormatterFunction"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.customDateWithTimeFormatterFunctionEnabled}
                        onChange={(e) =>
                            handleSettingChange('customDateWithTimeFormatterFunctionEnabled', e.target.checked)
                        }
                    />
                }
                label="custom dateWithTimeFormatterFunction"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.hideBeforeSubmit}
                        onChange={(e) => handleSettingChange('hideBeforeSubmit', e.target.checked)}
                    />
                }
                label="hideBeforeSubmit"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.showAfterBlur}
                        onChange={(e) => handleSettingChange('showAfterBlur', e.target.checked)}
                    />
                }
                label="showAfterBlur"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.focusToErrorAfterSubmit}
                        onChange={(e) => handleSettingChange('focusToErrorAfterSubmit', e.target.checked)}
                    />
                }
                label="focusToErrorAfterSubmit"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentSettings.customElementFocusHandlerEnabled}
                        onChange={(e) => handleSettingChange('customElementFocusHandlerEnabled', e.target.checked)}
                    />
                }
                label="custom elementFocusHandler"
            />
        </div>
    );

    const toggleDrawer = (open) => {
        setAnchor(open);
    };

    const handleMenuButton = () => {
        if (isMobile) {
            toggleDrawer(!anchor);
        } else {
            setMenuIsHidden(!menuIsHidden);
        }
    };

    return (
        <HashRouter>
            <div className={'obssTriangle'}>
                <a className={'triangleIcon'} href={'https://obss.com.tr/'} target={'_blank'} rel="noreferrer">
                    <img src={process.env.PUBLIC_URL + '/obss.png'} alt={'obss'} />
                </a>
            </div>
            <Box flexGrow={1}>
                <AppBar color={'transparent'} position={'relative'}>
                    <Toolbar>
                        <IconButton onClick={handleMenuButton} className="menuButton">
                            <MenuIcon />
                        </IconButton>
                        <Link to={'/'} className="bannerLink">
                            <img
                                width={48}
                                className={'menuLogo'}
                                src={process.env.PUBLIC_URL + '/logo.png'}
                                alt={'logo'}
                            />
                            <span className="bannerText">react-validatable-form</span>
                        </Link>
                        <Box flexGrow={1} />
                        <Settings openSettingsDialog={openSettingsDialog} />
                    </Toolbar>
                </AppBar>
            </Box>
            <MainDrawer anchor={anchor} open={anchor} toggleDrawer={toggleDrawer} />
            <Dialog open={settingsDialogOpen} onClose={() => setSettingsDialogOpen(false)}>
                <DialogTitle>
                    <ExampleUsageWrapper
                        header="Edit ReactValidatableFormProvider Props"
                        codeUrl="components/Main.js"
                        wrapperClassName="modalHeaderWrapper"
                    />
                </DialogTitle>
                {dialogContent}
            </Dialog>
            <ReactValidatableFormProvider
                lang={currentSettings.lang}
                customRules={customRules}
                translations={translations}
                dateFormatterFunction={dateFormatterFunction}
                dateWithTimeFormatterFunction={dateWithTimeFormatterFunction}
                hideBeforeSubmit={currentSettings.hideBeforeSubmit}
                showAfterBlur={currentSettings.showAfterBlur}
                focusToErrorAfterSubmit={currentSettings.focusToErrorAfterSubmit}
                elementFocusHandler={customElementFocusHandler}
            >
                <HelmetProvider>
                    <BodyWrapper>
                        <div className="flex">
                            <Routes
                                openSettingsDialog={openSettingsDialog}
                                menuIsHidden={menuIsHidden}
                                onOutsideClick={handleOutsideClick}
                                toggleDrawer={toggleDrawer}
                            />
                        </div>
                    </BodyWrapper>
                </HelmetProvider>
            </ReactValidatableFormProvider>
        </HashRouter>
    );
};

export default Main;
