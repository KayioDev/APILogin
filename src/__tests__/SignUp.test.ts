import { SignupController } from "../Presentation/Controllers/SignUp";
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
    })
})