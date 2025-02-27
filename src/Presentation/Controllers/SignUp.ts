import { Controllers } from "../Protocolos/Controller";
import { Errors } from "../Errors/Errors";
import { BadRequest, Sucesso } from "../Helpers/Htpp.helpers"; 
import { HttpRequest, HttpResponse } from "../Protocolos/Https";
import { EmailValidator } from "../Protocolos/emailValidator";
import { InvalidError } from "../Errors/Invalid_Email";

export class SignupController implements Controllers {
    private readonly emailValidator : EmailValidator;
    constructor(emailValidator: EmailValidator )
    {
        this.emailValidator = emailValidator;
    }
    handle(httpRequest: HttpRequest): HttpResponse {
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
    }
}
