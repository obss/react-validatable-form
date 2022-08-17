import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';

const allMenuItems = [
    {
        title: 'Getting Started',
        itemId: 'group1',
        subNav: [
            {
                title: 'Home',
                itemId: '/getting-started/home',
                keywords: ['home', 'npm', 'yarn'],
            },
            {
                title: 'Installation',
                itemId: '/getting-started/installation',
                keywords: ['npm', 'yarn'],
            },
            {
                title: 'Usage',
                itemId: '/getting-started/usage',
                keywords: ['ReactValidatableFormProvider', 'useValidatableForm'],
            },
        ],
    },
    {
        title: 'Rules',
        itemId: 'group2',
        subNav: [
            {
                title: 'required',
                itemId: '/rules/required',
            },
            {
                title: 'number',
                itemId: '/rules/number',
                keywords: ['onlyIntegers'],
            },
            {
                title: 'length',
                itemId: '/rules/length',
            },
            {
                title: 'listSize',
                itemId: '/rules/list-size',
            },
            {
                title: 'date',
                itemId: '/rules/date',
                keywords: ['time', 'withTime'],
            },
            {
                title: 'email',
                itemId: '/rules/email',
            },
            {
                title: 'url',
                itemId: '/rules/url',
            },
            {
                title: 'iban',
                itemId: '/rules/iban',
            },
            {
                title: 'equality',
                itemId: '/rules/equality',
            },
            {
                title: 'includes',
                itemId: '/rules/includes',
            },
            {
                title: 'regex',
                itemId: '/rules/regex',
            },
            {
                title: 'unique',
                itemId: '/rules/unique',
            },
            {
                title: 'custom on hook',
                itemId: '/rules/custom-on-hook',
            },
            {
                title: 'custom on provider',
                itemId: '/rules/custom-on-provider',
            },
        ],
    },
    {
        title: 'Advanced Settings',
        itemId: 'group3',
        subNav: [
            {
                title: 'Validate Lists',
                itemId: '/advanced/validate-lists',
            },
            {
                title: 'Hide Before Submit',
                itemId: '/advanced/hide-before-submit',
                keywords: ['resetForm'],
            },
            {
                title: 'Show After Blur',
                itemId: '/advanced/show-after-blur',
                keywords: ['resetForm'],
            },
            {
                title: 'Focus to Error After Submit',
                itemId: '/advanced/focus-to-error-after-submit',
            },
            {
                title: 'Focus to Error on List After Submit',
                itemId: '/advanced/focus-to-error-on-list-after-submit',
            },
            {
                title: 'Validate List of Objects',
                itemId: '/advanced/validate-list-of-objects',
            },
            {
                title: 'Validate Complex Forms',
                itemId: '/advanced/validate-complex-forms',
            },
        ],
    },
    {
        title: 'Customizations',
        itemId: 'group4',
        subNav: [
            {
                title: 'Custom Message',
                itemId: '/customizations/custom-message',
            },
            {
                title: 'Custom Translations',
                itemId: '/customizations/translations',
            },
            {
                title: 'Conditional Rules',
                itemId: '/customizations/conditional-rules',
                keywords: ['disableIf', 'enableIf'],
            },
            {
                title: 'Apply to Nulls',
                itemId: '/customizations/apply-to-nulls',
            },
            {
                title: 'Element Focus Handler',
                itemId: '/customizations/custom-element-focus-handler',
            },
        ],
    },
    {
        title: 'Example Usages',
        itemId: 'group5',
        subNav: [
            {
                title: 'Pure React Components',
                itemId: '/examples/pure',
            },
            {
                title: 'MUI Components',
                itemId: '/examples/mui',
                keywords: ['materialui', 'material-ui'],
            },
            {
                title: 'Ant Design Components',
                itemId: '/examples/antd',
            },
            {
                title: 'PrimeReact Components',
                itemId: '/examples/prime-react',
            },
            {
                title: 'React-Bootstrap Components',
                itemId: '/examples/react-bootstrap',
            },
            {
                title: 'React Native Usage',
                itemId: '/examples/react-native',
            },
            {
                title: 'setFormData',
                itemId: '/examples/set-form-data',
            },
            {
                title: 'setPathValue',
                itemId: '/examples/set-path-value',
            },
            {
                title: 'unsetPathValue',
                itemId: '/examples/unset-path-value',
            },
            {
                title: 'setRules',
                itemId: '/examples/set-rules',
            },
            {
                title: 'setFormDataAndRules',
                itemId: '/examples/set-form-data-and-rules',
            },
            {
                title: 'formData',
                itemId: '/examples/form-data',
            },
            {
                title: 'validationError',
                itemId: '/examples/validation-error',
            },
            {
                title: 'validationErrorOriginalResult',
                itemId: '/examples/validation-error-original-result',
            },
            {
                title: 'unsetPathIsBlurred',
                itemId: '/examples/unset-path-is-blurred',
            },
            {
                title: 'isPathValid',
                itemId: '/examples/is-path-valid',
            },
        ],
    },
    {
        title: 'API',
        itemId: 'group6',
        subNav: [
            {
                title: 'ReactValidatableFormProvider',
                itemId: '/api/react-validatable-form-provider',
                keywords: [
                    'lang',
                    'customRules',
                    'translations',
                    'dateFormatterFunction',
                    'dateWithTimeFormatterFunction',
                    'hideBeforeSubmit',
                    'showAfterBlur',
                    'focusToErrorAfterSubmit',
                    'elementFocusHandler',
                ],
            },
            {
                title: 'useValidatableForm',
                itemId: '/api/use-validatable-form',
                keywords: [
                    'rules',
                    'initialFormData',
                    'hideBeforeSubmit',
                    'showAfterBlur',
                    'focusToErrorAfterSubmit',
                    'elementFocusHandler',
                    'isValid',
                    'validationError',
                    'validationErrorOriginalResult',
                    'formData',
                    'formIsSubmitted',
                    'blurredPathList',
                    'setPathValue',
                    'unsetPathValue',
                    'setFormIsSubmitted',
                    'setPathIsBlurred',
                    'unsetPathIsBlurred',
                    'setFormData',
                    'setRules',
                    'setFormDataAndRules',
                    'resetForm',
                    'isPathValid',
                    'getValue',
                    'getError',
                    'forceRunAllValidations',
                ],
            },
            {
                title: 'rules',
                itemId: '/api/rules',
                keywords: [
                    'path',
                    'listPath',
                    'ruleSet',
                    'elementId',
                    'listElementId',
                    'dependantPaths',
                    'disableFocusAfterSubmit',
                    'subRules',
                ],
            },
            {
                title: 'Rule',
                itemId: '/api/rule',
                keywords: [
                    'equalTo',
                    'lessThan',
                    'lessThanOrEqualTo',
                    'greaterThan',
                    'greaterThanOrEqualTo',
                    'notEqualTo',
                    'onlyIntegers',
                    'withTime',
                    'applyToNulls',
                    'disableIf',
                    'enableIf',
                    'customMessage',
                ],
            },
            {
                title: 'path & listPath',
                itemId: '/api/path',
                keywords: ['lodash', 'path', 'listPath'],
            },
        ],
    },
];

export const NavSidebar = ({ menuIsHidden, toggleDrawer }) => {
    const location = useLocation();
    const [searchInput, setSearchInput] = useState('');
    const [expanded, setExpanded] = useState('');

    useEffect(() => {
        setSearchInput('');
        if (location.pathname.includes('/getting-started/')) {
            setExpanded('group1');
        } else if (location.pathname.includes('/rules/')) {
            setExpanded('group2');
        } else if (location.pathname.includes('/advanced/')) {
            setExpanded('group3');
        } else if (location.pathname.includes('/customizations/')) {
            setExpanded('group4');
        } else if (location.pathname.includes('/examples/')) {
            setExpanded('group5');
        } else if (location.pathname.includes('/api/')) {
            setExpanded('group6');
        }
    }, [location]);

    const handleTextInput = (event) => {
        setSearchInput(event.target.value);
        if (event.target.value !== '') {
            setExpanded('open');
        } else {
            setExpanded('');
        }
    };

    const handleAccordionChange = (id) => {
        if (id === expanded) {
            setExpanded('');
        } else {
            setExpanded(id);
        }
    };

    const handleClickList = () => {
        toggleDrawer(false);
    };

    let filteredMenuItems = JSON.parse(JSON.stringify(allMenuItems));
    if (searchInput) {
        filteredMenuItems = filteredMenuItems.filter((m) => {
            let result = false;
            let searchInputUpper = searchInput.toUpperCase();
            if (m.subNav && m.subNav.length > 0) {
                let subsList = [];
                for (let i = 0; i < m.subNav.length; i++) {
                    const subEl = m.subNav[i];
                    const keywords = subEl.keywords || [];
                    if (
                        subEl.title.toUpperCase().includes(searchInputUpper) ||
                        subEl.title.replaceAll(/\s/g, '').toUpperCase().includes(searchInputUpper) ||
                        keywords.filter((k) => k.toUpperCase().includes(searchInputUpper)).length > 0
                    ) {
                        subsList.push(subEl);
                        result = true;
                    }
                }
                if (subsList && subsList.length > 0) {
                    m.subNav = subsList;
                }
            }
            return result;
        });
    }

    const accordionNavigations = filteredMenuItems.map((fm) => {
        return (
            <Accordion
                expanded={expanded === fm.itemId || expanded === 'open'}
                key={fm.itemId}
                onChange={() => handleAccordionChange(fm.itemId)}
            >
                <AccordionSummary aria-controls="panel1a-content" expandIcon={<ExpandMore />}>
                    <Typography> {fm.title} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List disablePadding>
                        {fm.subNav.map((sn) => {
                            return (
                                <div
                                    className={location.pathname === sn.itemId ? 'selectedSideItem' : null}
                                    key={sn.itemId}
                                    onClick={handleClickList}
                                >
                                    <Link to={sn.itemId}>
                                        <ListItem button>
                                            <ListItemText primary={sn.title} />
                                        </ListItem>
                                    </Link>
                                </div>
                            );
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>
        );
    });

    const menuStatus = menuIsHidden ? 'sideMenuHidden' : 'sideMenuOpen';

    return (
        <>
            <div
                className={`${menuStatus} mysidemenu inset-y-0 left-0 z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${'ease-out translate-x-0'}`}
            >
                <div className="flex items-center justify-center text-center">
                    <TextField
                        className="menu-search-input"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={searchInput}
                        onChange={handleTextInput}
                    />
                </div>
                <Box flexGrow={1} pt={1}>
                    {accordionNavigations}
                </Box>
            </div>
        </>
    );
};
