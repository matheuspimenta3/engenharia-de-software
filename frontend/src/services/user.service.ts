import { api } from '../api/axios-client';
import type { UserResponse } from '../@types/users';

export const UserService = {
  getAll: async (): Promise<UserResponse[]> => {
    const response = await api.get<UserResponse[]>('/users');
    return response.data;
  }
};