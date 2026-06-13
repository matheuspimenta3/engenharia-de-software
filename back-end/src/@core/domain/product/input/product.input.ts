export interface ProductInput {
    name: string;
    description?: string;

    price: number;
    costPrice: number;

    categoryId: string;

    quantity: number;
    minimumQuantity: number;
    
    active: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}