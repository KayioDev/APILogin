export class Errors extends Error {
    constructor (paramName: string) 
    {
        super(`Está faltando o parametro: ${paramName}`); 
        this.name = 'Errors'
    }
}