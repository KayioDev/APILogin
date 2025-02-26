
import { Errors } from "../Errors/Errors";
import { BadRequest } from "../Helpers/Htpp.helpers"; 
import { HttpRequest, HttpResponse } from "../Protocolos/https";

export class SignupController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const CamposObrigatorios = ["nome", "email", "senha", "confirmSenha"];
        for(const campos of CamposObrigatorios) {
            if (!httpRequest.body[campos]) {
                return BadRequest(new Errors(campos));
            }
        }
        return {
            statusCode: 200,
            body: { message: "Usuário cadastrado com sucesso!" }
        };
    }
}
