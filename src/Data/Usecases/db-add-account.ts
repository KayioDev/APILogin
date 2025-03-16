import { AddAccountModel, AddAccount,AccountModel ,Encrypter } from "./../Usecases/db-add-accounbt-protocols";
import { AddAccountRepository } from "../Protocol/add-account-repository";
export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter;
    private readonly addAccountRepository: AddAccountRepository;
    
    constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository){
        this.encrypter = encrypter;
        this.addAccountRepository = addAccountRepository;
    }
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedSenha = await this.encrypter.encrypt(accountData.senha)
        await this.addAccountRepository.add(Object.assign({}, accountData, {senha: hashedSenha}))
        console.log(accountData.senha)
        return new Promise(resolve => resolve(null));
    }
}