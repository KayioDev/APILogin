import { Encrypter } from "../Data/Protocol/encrypter";
import { DbAddAccount } from "../Data/Usecases/db-add-account";
interface SutTypes {
    sut: DbAddAccount,
    encriptyStub: Encrypter
}
const makeSut = ():SutTypes => {
    class EncriptStub {
        async encrypt (valor: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_value'));
        }
    }
    const encriptyStub = new EncriptStub();
    const sut = new DbAddAccount(encriptyStub);
    return {
        sut,
        encriptyStub
    }
}


describe ('DbAddAccount Usecases', ()=> {
    test ('Quarantir que encrypter seja chamado com a senha correta', async () =>{
        const {encriptyStub, sut} = makeSut()
        const encriptSpy = jest.spyOn(encriptyStub, 'encrypt')
        const accountData = {
            nome:'nome_valido',
            email:'email_valido',
            senha:'senha_valida'
        }
        await sut.add(accountData);
        expect(encriptSpy).toHaveBeenCalledWith('senha_valida')
    })
})