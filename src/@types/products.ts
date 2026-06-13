export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  costPrice: number;
  categoryId: string;
  active: boolean;
  quantity: number;
  minimumQuantity: number;
  createdAt?: string;
  updatedAt?: string;
}