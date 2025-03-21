import { SignupController } from "../Presentation/Controller/SignUp";
import { Errors, InvalidError, ServerError, InvalidParamError } from "../Presentation/Errors";
import { EmailValidator } from "../Presentation/Protocolos/emailValidator";
import { AccountModel } from "../Domain/Models/add-account";
import { AddAccount } from "../Domain/Usecases/add-account";
import { AddAccountModel } from "../Domain/Usecases/add-account";




const MakeAddAccount = (): AddAccount => {
    class addAccountStub implements AddAccount {
      async add(account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'validado_id',
                nome: 'validado_nome',
                email: 'validado_email',
                senha: 'validado_senha',
            }
            return new Promise(resolve => resolve(fakeAccount));
        }
    }
    return new addAccountStub();
}

const MakeEmailValidator = (): EmailValidator =>  {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string) : boolean {
            return true;
        }
    }
        return new EmailValidatorStub();
}


interface SutTypes {
    sut: SignupController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
 }

const MakeSut = (): SutTypes =>{  
    const emailValidatorStub = MakeEmailValidator()
    const addAccountStub = MakeAddAccount();
    const sut = new SignupController(emailValidatorStub, addAccountStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}

describe ('SignupController', ()=>{

    test('Garantir que retorne 400 se um nome não for informado', async()=> {
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
        const httResponse = await sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('nome'));
    })
    test('Garantir que retorne 400 se um email não for informado',async ()=> {
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
        const httResponse = await sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('email'));
    })

    test('Garantir que retorne 400 se a senha não for informada', async ()=> {
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
        const httResponse = await sut.handle(httpRequest)
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('senha'));
    })

    test('Garantir que retorne 400 se não for informado confirmação de senha',async ()=>{
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
        const httResponse = await sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new Errors('confirmSenha'))
    })

    
    test('Garantir que retorne 400 se não for informado um email valido',async ()=>{
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
        const httResponse = await sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new InvalidError('email'))
    })
  
    test('Garantir que e EmailValidator, seja chamado com o email correto',async ()=>{
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
        await sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);

    })

    test('Garantir que retorne 500 se o emailValidator Throw',async ()=>{
        const {sut, emailValidatorStub} = MakeSut();    
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(()=>{
            throw new Error();
        })
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
        const httResponse = await sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(500);
        expect(httResponse.body).toEqual(new ServerError());
    })
    
    
  
    test('Garantir que retorne 500 se o AddAccount Throw',async ()=>{
        const {sut, addAccountStub} = MakeSut();    
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(()=>{
            return Promise.reject(new Error)
        })
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'any_email',
                senha: 'any_senha',
                confirmSenha: 'any_senha'
            }
        }
        const httResponse = await sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(500);
        expect(httResponse.body).toEqual(new ServerError());
    })
    



    test('Garantir que retorne 400 se a confirmação de senha for invalida',async ()=>{
        const {sut} = MakeSut();
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'any_email',
                senha: 'any_senha',
                confirmSenha: 'invalid_senha'
            }
        }
        const httResponse = await sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(400);
        expect(httResponse.body).toEqual(new InvalidParamError('confirmSenha'))
    })

    test('Garantir que e AddAccount, seja chamado ', ()=>{
        const {sut, addAccountStub} = MakeSut();
        const AddSpy = jest.spyOn(addAccountStub, 'add')
        const httpRequest = 
        {
            body: 
            {
                nome: 'any_nome',
                email: 'any_email',
                senha: 'any_senha',
                confirmSenha: 'any_senha'
            }
        }
        sut.handle(httpRequest);
        expect(AddSpy).toHaveBeenCalledWith({
            nome: 'any_nome',
            email: 'any_email',
            senha: 'any_senha',
        });

    })

    test('Garantir que retorne 200 se todos os dados estiverem corretos ', async ()=>{
        const {sut} = MakeSut();
        const httpRequest = 
        {
            body: {
                nome: 'validado_nome',
                email: 'validado_email',
                senha: 'validado_senha',
                confirmSenha: 'validado_senha'
            }
        }
        const httResponse = await sut.handle(httpRequest);
        expect(httResponse.statusCode).toBe(200)
        expect(httResponse.body).toEqual({
            id: 'validado_id',
            nome: 'validado_nome',
            email: 'validado_email',
            senha: 'validado_senha',
        });

    })
    


})