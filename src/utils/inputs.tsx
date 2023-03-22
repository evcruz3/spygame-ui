import { isString, isEmpty } from 'lodash';

// Unset input if it is an empty string.
// https://github.com/react-hook-form/react-hook-form/issues/656
const unsetIfEmpty = (str: string) => {
    if (isString(str) && isEmpty(str)) return undefined;
    return str;
}

export { unsetIfEmpty };