import { api } from '../api/axios-client';
import type { CategoryResponse } from '../@types/categoryResponse';

export const CategoryService = {
  getAll: async (): Promise<CategoryResponse[]> => {
    const response = await api.get<CategoryResponse[]>('/categories');
    return response.data;
  },
  create: async (data: Omit<CategoryResponse, 'id'>): Promise<CategoryResponse> => {
    const response = await api.post<CategoryResponse>('/categories', data);
    return response.data;
  }
};