export interface Encrypter 
{
    encrypt (valor: string): Promise<string>
}