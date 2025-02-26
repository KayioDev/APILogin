import { SignupController } from "../Presentation/Controllers/SignUp";
import { Errors } from "../Presentation/Errors/Errors";

describe ('SignupController', ()=>{
    test('Garantir que retorne 400 se um nome não for informado', ()=> {
        const sut = new SignupController;
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
        const sut = new SignupController;
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
        const sut = new SignupController;
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
        const sut = new SignupController();
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

})