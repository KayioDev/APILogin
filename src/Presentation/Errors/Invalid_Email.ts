export class InvalidError extends Error {
    constructor (paramName: string) 
    {
        super(`Email invalido: ${paramName}`); 
        this.name = 'InvalidError'
    }
}