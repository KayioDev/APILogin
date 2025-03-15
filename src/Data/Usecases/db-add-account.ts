import { AddAccountModel, AddAccount } from "../../Domain/Usecases/add-account";
import {AccountModel} from '../../Domain/Models/add-account'
import { Encrypter } from "../Protocol/encrypter";

export class DbAddAccount {
    private readonly encrypter: Encrypter;
    constructor(encrypter: Encrypter){
        this.encrypter = encrypter;
    }
    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.senha)
        return new Promise(resolve => resolve(null));
    }
}