import { HttpRequest, HttpResponse } from "./Https"
export interface Controllers {
     handle(httpRequest: HttpRequest): HttpResponse
}