import { HttpRequest, HttpResponse } from "../Protocolos/https"

export const BadRequest = (error: Error): HttpResponse=> 
    {
         return {
            statusCode: 400,
            body: error
        }
    }
