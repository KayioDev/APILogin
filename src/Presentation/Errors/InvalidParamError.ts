export class InvalidParamError extends Error {
    constructor (paramName: string) 
    {
        super(`Parametro invalido: ${paramName}`); 
        this.name = 'InvalidParamError'
    }
}