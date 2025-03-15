import { Errors,InvalidError,InvalidParamError } from "../Errors";
import { BadRequest, Sucesso, serverError } from "../Helpers/Htpp.helpers"; 
import { HttpRequest, HttpResponse, EmailValidator, Controllers } from "../Protocolos";
import { AddAccount } from "../../Domain/Usecases/add-account";

export class SignupController implements Controllers {
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount;

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const CamposObrigatorios = ["nome", "email", "senha", "confirmSenha"];
            for (const campos of CamposObrigatorios) {
                if (!httpRequest.body[campos]) {
                    return BadRequest(new Errors(campos));
                }
            }

            const { nome, email, senha, confirmSenha } = httpRequest.body;
            const isValid = this.emailValidator.isValid(email);
            if (!isValid) {
                return BadRequest(new InvalidError("email"));
            }

            if (senha !== confirmSenha) {
                return BadRequest(new InvalidParamError("confirmSenha"));
            }

            const account = await this.addAccount.add({
                nome,
                email,
                senha
            });
            return Sucesso(account);
        } catch (error) {
            return serverError();
        }
    }
}
