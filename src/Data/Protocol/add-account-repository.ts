import { AccountModel, AddAccountModel} from "../Usecases/db-add-accounbt-protocols"

export interface AddAccountRepository {
    add(account: AddAccountModel): Promise<AccountModel>
}