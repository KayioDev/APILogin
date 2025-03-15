import { Encrypter } from "../Data/Protocol/encrypter";
import { DbAddAccount } from "../Data/Usecases/db-add-account";
interface SutTypes {
    sut: DbAddAccount,
    encriptyStub: Encrypter
}

const makeEncrypter = ():Encrypter =>{
    class EncriptStub implements Encrypter {
        async encrypt (valor: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_value'));
        }
    }
    return new EncriptStub;
}
const makeSut = ():SutTypes => {
    const encriptyStub = makeEncrypter();
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