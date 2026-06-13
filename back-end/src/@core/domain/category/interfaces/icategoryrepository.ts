import { IRepositoryGeneric } from '../../basic/irepository';
import Category from '../entitie/category.entitie';

export interface ICategoryRepository extends IRepositoryGeneric<Category> {

    IsNameAlreadyUse( name: string, id?: string): Promise<boolean>;
}