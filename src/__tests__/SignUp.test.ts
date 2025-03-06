import { SignupController } from "../Presentation/Controllers/SignUp";
import { Errors, InvalidError, ServerError } from "../Presentation/Errors";
import { EmailValidator } from "../Presentation/Protocolos/emailValidator";

interface SutTypes 
{
    sut: SignupController,
    emailValidatorStub: EmailValidator
}

const MakeEmailValidator = (): EmailValidator =>  {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string) : boolean {
            return true;
        }
    }
        return new EmailValidatorStub();
    }

const MakeEmailValidatorWithTrhow= (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string) : boolean {
            throw new Error();
        }
    }
        return new EmailValidatorStub();
    }

const MakeSut = (): SutTypes =>{  
    const emailValidatorStub = MakeEmailValidator()
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
  
    test('Garantir que e EmailValidator, seja chamado com o email correto', ()=>{
        const {sut, emailValidatorStub} = MakeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'any_email',
                senha: 'any_senha',
                confirmSenha: 'any_confirmSenha'
            }
        }
        sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);

    })

    test('Garantir que retorne 500 se não ocorrer algum erro no servidor', ()=>{
        const emailValidatorStub = MakeEmailValidatorWithTrhow()
        const sut = new SignupController(emailValidatorStub)
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'any_email',
                senha: 'any_senha',
                confirmSenha: 'any_confirmSenha'
            }
        }
        const httResponse = sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(500);
        expect(httResponse.body).toEqual(new ServerError());
    })


})