import { HttpRequest, HttpResponse } from "../Protocolos/Https"
import { ServerError } from "../Errors"

export const BadRequest = (error: Error): HttpResponse=> 
    {
         return {
            statusCode: 400,
            body: error
        }
    }
export const Sucesso = (data: any) : HttpResponse =>
    {
        return { 
            statusCode: 200,
            body: data };
    }

export const serverError = (): HttpResponse=> 
    {
        return { 
            statusCode: 500,
            body: new ServerError()
        }
    }
