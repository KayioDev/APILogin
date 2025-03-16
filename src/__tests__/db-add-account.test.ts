import { DbAddAccount } from "../Data/Usecases/db-add-account";
import { Encrypter, AddAccountModel, AccountModel } from "../Data/Usecases/db-add-accounbt-protocols";
import { AddAccountRepository } from "../Data/Protocol/add-account-repository";
interface SutTypes {
    sut: DbAddAccount,
    encriptyStub: Encrypter
    addAccountReposityStub: AddAccountRepository
}

const makeEncrypter = ():Encrypter =>{
    class EncriptStub implements Encrypter {
        async encrypt (valor: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_senha'));
        }
    }
    return new EncriptStub;
}

const makeAddAccountRepository = (): AddAccountRepository =>{
    class AddAccountRepositoryStub implements AddAccountRepository {
       add(account: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
            id: 'id_valido',
            nome:'nome_valido',
            email:'email_valido',
            senha:'senha_valida'
        }
            return new Promise(resolve => resolve(fakeAccount));
        }
    }
    return new AddAccountRepositoryStub;
}

const makeSut = ():SutTypes => {
    const addAccountReposityStub = makeAddAccountRepository()
    const encriptyStub = makeEncrypter();
    const sut = new DbAddAccount(encriptyStub, addAccountReposityStub);
    return {
        sut,
        encriptyStub,
        addAccountReposityStub
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
    
    test ('Quarantir que throws se encrypter throws', async () =>{
        const {encriptyStub, sut} = makeSut()
        jest.spyOn(encriptyStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
        const accountData = {
            nome:'nome_valido',
            email:'email_valido',
            senha:'senha_valida'
        }
         const promise = sut.add(accountData);
         await expect(promise).rejects.toThrow()
    })
    
    test ('Quarantir que seja chamado addAccountRepository se todos os valores forem validos', async () =>{
        const { sut, addAccountReposityStub} = makeSut()
        const addSpy = jest.spyOn(addAccountReposityStub, 'add')
        const accountData = {
            nome:'nome_valido',
            email:'email_valido',
            senha:'senha_valida'
        }
        await sut.add(accountData);
         expect(addSpy).toHaveBeenCalledWith({
            nome:'nome_valido',
            email:'email_valido',
            senha:'hashed_senha'
         })
    })
})