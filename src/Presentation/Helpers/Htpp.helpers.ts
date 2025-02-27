import { HttpRequest, HttpResponse } from "../Protocolos/Https"

export const BadRequest = (error: Error): HttpResponse=> 
    {
         return {
            statusCode: 400,
            body: error
        }
    }
export const Sucesso = () : HttpResponse =>
    {
        return { statusCode: 200, body: { message: "Sucesso" } };
    }
