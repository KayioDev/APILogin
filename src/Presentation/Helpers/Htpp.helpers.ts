import { HttpRequest, HttpResponse } from "../Protocolos/Https"
import { ServerError } from "../Errors"

export const BadRequest = (error: Error): HttpResponse=> 
    {
         return {
            statusCode: 400,
            body: error
        }
    }
export const Sucesso = () : HttpResponse =>
    {
        return { statusCode: 200,
             body: { message: "Sucesso" } };
    }

export const serverError = (): HttpResponse=> 
    {
        return { 
            statusCode: 500,
            body: new ServerError()
        }
    }
