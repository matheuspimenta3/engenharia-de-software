export interface ProductInput {
    name: string;
    description?: string;

    price: number;
    costPrice: number;

    categoryId: string;

    active: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}