import { emailValidatorAdapter } from "../Utils/email-validator-adapter";
import validator from 'validator'


jest.mock('validator', ()=>({
    isEmail() : boolean{
        return true;
    }
}))

const makeSut = (): emailValidatorAdapter => {
    return new emailValidatorAdapter();
}

describe('Email validator adaptert',()=>{
    test('Garantir que que retorne false se emailValidator for false', () =>{
        const sut = makeSut()
        jest.spyOn(validator,'isEmail').mockReturnValueOnce(false);
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(false);
    } )
})

describe('Email validator adaptert',()=>{
    test('Garantir que que retorne true se emailValidator for true', () =>{
        const sut = makeSut()
        const isValid = sut.isValid('valid_email@mail.com')
        expect(isValid).toBe(true);
    } )
})

describe('Email validator adaptert',()=>{
    test('Garantir que que retorne true se emailValidator for true', () =>{
        const sut = makeSut()
        const isEmailSpy = jest.spyOn(validator, 'isEmail')
        sut.isValid('any_email@mail.com')
        expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
    })
})