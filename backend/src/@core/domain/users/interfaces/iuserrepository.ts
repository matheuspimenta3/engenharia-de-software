import { IRepositoryGeneric } from 'src/@core/domain/basic/irepository';
import User from '../entitie/user.entitie';


export interface IUserRepository extends IRepositoryGeneric<User> {

    findByEmail(
        email: string,
    ): Promise<Boolean>;
}