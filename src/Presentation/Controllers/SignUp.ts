import { Errors,InvalidError } from "../Errors";
import { BadRequest, Sucesso, serverError } from "../Helpers/Htpp.helpers"; 
import { HttpRequest, HttpResponse, EmailValidator, Controllers } from "../Protocolos";


export class SignupController implements Controllers {
    private readonly emailValidator : EmailValidator;
    constructor(emailValidator: EmailValidator )
    {
        this.emailValidator = emailValidator;
    }
    handle(httpRequest: HttpRequest): HttpResponse {
        try
        {
            const CamposObrigatorios = ["nome", "email", "senha", "confirmSenha"];
            for(const campos of CamposObrigatorios) {
                if (!httpRequest.body[campos]) {
                    return BadRequest(new Errors(campos));
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if(!isValid){
                return BadRequest(new InvalidError('email'))
            }
            return Sucesso();
        }catch(error)
        {
            return serverError();
        }
    }
}
