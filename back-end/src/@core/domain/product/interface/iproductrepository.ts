import { IRepositoryGeneric } from '../../basic/irepository';
import Product from '../entitie/product.entitie';

export interface IProductRepository extends IRepositoryGeneric<Product> {

    IsNameAlreadyUse( name: string, id?: string,): Promise<boolean>;
}