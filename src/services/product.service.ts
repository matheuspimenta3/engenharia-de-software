import { api } from '../api/axios-client';
import { ProductResponse } from '../@types/products';

export const ProductService = {
  getAll: async (): Promise<ProductResponse[]> => {
    const response = await api.get<ProductResponse[]>('/products');
    return response.data;
  },
  create: async (data: Omit<ProductResponse, 'id'>): Promise<ProductResponse> => {
    const response = await api.post<ProductResponse>('/products', data);
    return response.data;
  }
};