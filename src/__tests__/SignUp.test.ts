import { SignupController } from "../Presentation/Controllers/SignUp";
import { Errors } from "../Presentation/Errors/Errors";
import { InvalidError } from "../Presentation/Errors/Invalid_Email";
import { EmailValidator } from "../Presentation/Protocolos/emailValidator";

interface SutTypes 
{
    sut: SignupController,
    emailValidatorStub: EmailValidator
}

const MakeSut = (): SutTypes =>{  
    class EmailValidatorStub implements EmailValidator {
    isValid(email: string) : boolean {
        return true;
    }
}
    const emailValidatorStub = new EmailValidatorStub ()
    const sut = new SignupController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

describe ('SignupController', ()=>{
    test('Garantir que retorne 400 se um nome não for informado', ()=> {
        const {sut} = MakeSut();
        const httpRequest = 
        {
            body: 
            {  
                email: 'any_email',
                senha: 'any_senha',
                confirmSenha: 'any_confirmSenha'
            }
        }
        const httResponse = sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('nome'));
    })
    test('Garantir que retorne 400 se um email não for informado', ()=> {
        const {sut} = MakeSut();
        const httpRequest = 
        {
            body: 
            { 
                nome: 'any_nome',
                senha: 'any_senha',
                confirmSenha: 'any_confirmSenha'
            }
        }
        const httResponse = sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('email'));
    })

    test('Garantir que retorne 400 se a senha não for informada', ()=> {
        const {sut} = MakeSut();
        const httpRequest = 
        {
            body: 
            { 
                nome: 'any_nome',
                email: 'any_email',
                confirmSenha: 'any_confirmSenha'
            }
        }
        const httResponse = sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('senha'));
    })

    test('Garantir que retorne 400 se não for informado confirmação de senha', ()=>{
        const {sut} = MakeSut();
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'any_email',
                senha: 'any_senha'
            }
        }
        const httResponse = sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('confirmSenha'))
    })

    
    test('Garantir que retorne 400 se não for informado um email valido', ()=>{
        const {sut, emailValidatorStub} = MakeSut();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'invalid_email',
                senha: 'any_senha',
                confirmSenha: 'any_confirmSenha'
            }
        }
        const httResponse = sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new InvalidError('email'))
    })

})