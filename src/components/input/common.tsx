import { FieldError } from 'react-hook-form';

const getInputErrorMessage = (error: FieldError) => {
    var errorMessage = error.message
    if (!errorMessage) {
        switch (error.type) {
            case 'required': errorMessage = 'This is required.'; break;
            case 'maxLength': errorMessage = 'This must not exceed the maximum length.'; break;
            case 'minLength': errorMessage = 'This must satisfy the minimum length.'; break;
            case 'max': errorMessage = 'This must not exceed the maximum value.'; break;
            case 'min': errorMessage = 'This must satisfy the minimum value.'; break;
            case 'pattern': errorMessage = 'This does not match the regular expression.'; break;
            case 'validate':
            default: errorMessage = 'Invalid input.'; break;
        }
    }

    return errorMessage;
}

export { 
    getInputErrorMessage 
};