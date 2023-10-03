import { bdService } from '@/utils/bd';

const COLLECTION_NAME = 'users';

export const userService = {
  createUser: async (userId, data) => {
    try {
      bdService.setDocument(COLLECTION_NAME, userId, data);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  },

  getById: async (userId) => {
    try {
      const user = await bdService.getById(COLLECTION_NAME, userId);

      const { _data } = user;

      return _data;
    } catch (error) {
      console.error('Error al recuperar usuario: ' + userId, error);
    }
  },
};
