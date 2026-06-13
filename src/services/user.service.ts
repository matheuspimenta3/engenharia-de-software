import { api } from '../api/axios-client';
import { UserResponse } from '../@types/users';

export const UserService = {
  getAll: async (): Promise<UserResponse[]> => {
    const response = await api.get<UserResponse[]>('/users');
    return response.data;
  }
};