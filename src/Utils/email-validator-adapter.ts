import validator from 'validator'

export class emailValidatorAdapter {
    isValid(email: string) : boolean {
        return validator.isEmail(email);
    }
}