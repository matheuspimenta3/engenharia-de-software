import { IRepositoryGeneric } from '../../basic/irepository';
import User from '../entitie/user.entitiy';


export interface IUserRepository extends IRepositoryGeneric<User> {

    findByEmail(
        email: string,
    ): Promise<Boolean>;
}