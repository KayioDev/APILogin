import { AccountModel } from "../Models/add-account"

export interface AddAccountModel {
    nome: string,
    email: string,
    senha: string
}

export interface AddAccount {
    add(account: AddAccountModel): Promise<AccountModel> 
}