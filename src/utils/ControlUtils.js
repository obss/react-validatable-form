import { isValidElement } from 'react';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line
const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,256}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const objectConstructor = {}.constructor;

export const isString = (param) => {
    return typeof param === 'string';
};

export const isObject = (param) => {
    return param.constructor === objectConstructor;
};

export const isJsx = (param) => {
    return isValidElement(param);
};

export const isValidNumber = (param) => {
    return !isNaN(param);
};

export const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

export const isValidDate = (date) => {
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
};

export const isNullOrUndefined = (param) => {
    const result = param === undefined || param === null;
    return result;
};

export const isEmptyString = (param) => {
    const result = param === undefined || param === null || param === '';
    return result;
};

export const isValidEmail = (param) => {
    return EMAIL_REGEX.test(String(param));
};

export const isValidUrl = (param) => {
    const result = param && param.match(URL_REGEX);
    return !!result;
};

export const isArray = (param) => {
    return Array.isArray(param);
};

export const isValidIban = (param) => {
    var CODE_LENGTHS = {
        AD: 24,
        AE: 23,
        AT: 20,
        AZ: 28,
        BA: 20,
        BE: 16,
        BG: 22,
        BH: 22,
        BR: 29,
        CH: 21,
        CY: 28,
        CZ: 24,
        DE: 22,
        DK: 18,
        DO: 28,
        EE: 20,
        ES: 24,
        FI: 18,
        FO: 18,
        FR: 27,
        GB: 22,
        GI: 23,
        GL: 18,
        GR: 27,
        GT: 28,
        HR: 21,
        HU: 28,
        IE: 22,
        IL: 23,
        IS: 26,
        IT: 27,
        JO: 30,
        KW: 30,
        KZ: 20,
        LB: 28,
        LI: 21,
        LT: 20,
        LU: 20,
        LV: 21,
        MC: 27,
        MD: 24,
        ME: 22,
        MK: 19,
        MR: 27,
        MT: 31,
        MU: 30,
        NL: 18,
        NO: 15,
        PK: 24,
        PL: 28,
        PS: 29,
        PT: 25,
        QA: 29,
        RO: 24,
        RS: 22,
        SA: 24,
        SE: 24,
        SI: 19,
        SK: 24,
        SM: 27,
        TN: 24,
        TR: 26,
        AL: 28,
        BY: 28,
        CR: 22,
        EG: 29,
        GE: 22,
        IQ: 23,
        LC: 32,
        SC: 31,
        ST: 25,
        SV: 28,
        TL: 23,
        UA: 29,
        VA: 22,
        VG: 24,
        XK: 20,
    };
    var iban = String(param)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
        code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
        digits;
    // check syntax and length
    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
        return false;
    }
    // rearrange country code and check digits, and convert chars to ints
    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
        return letter.charCodeAt(0) - 55;
    });
    // final check
    return mod97(digits);
};

const mod97 = (string) => {
    var checksum = string.slice(0, 2),
        fragment;
    for (var offset = 2; offset < string.length; offset += 7) {
        fragment = String(checksum) + string.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
};

export const defaultEnFormatDate = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const result = [month, day, year].join('/');
    return result;
};

export const defaultEnFormatDateWithTime = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    let hours = '' + date.getHours();
    let minutes = '' + date.getMinutes();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    if (hours.length < 2) {
        hours = '0' + hours;
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    let result = [month, day, year].join('/');
    result += ' ' + hours + ':' + minutes;
    return result;
};

export const defaultTrFormatDate = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const result = [day, month, year].join('.');
    return result;
};

export const defaultTrFormatDateWithTime = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    let hours = '' + date.getHours();
    let minutes = '' + date.getMinutes();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    if (hours.length < 2) {
        hours = '0' + hours;
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    let result = [day, month, year].join('.');
    result += ' ' + hours + ':' + minutes;
    return result;
};
