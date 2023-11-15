import { bdService } from '@/utils/bd';

import { ROLES_ID } from '@/constants/bd';

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

  updateById: async (userId, data) => {
    try {
      return await bdService.updateById(COLLECTION_NAME, userId, data);
    } catch (err) {
      console.error('Ocurrió un error al actualizar el usuario: ' + userId, err);
    }
  },

  deleteById: async (userId) => {
    try {
      return await bdService.deleteById(COLLECTION_NAME, userId);
    } catch (error) {
      console.log('Ocurrió un error al eliminar el usuario: ' + userId, error);
    }
  },

  getAllDrivers: async () => {
    try {
      const data = await bdService.getAll(COLLECTION_NAME);
      const { _docs } = data;

      const documents = _docs
        .map((doc) => {
          const documentData = doc.data();
          return { id: doc.id, ...documentData };
        })
        .filter((item) => item.roleId === ROLES_ID.driver)
        .sort((a, b) => a.name.localeCompare(b.name));

      return documents;
    } catch (error) {
      console.error('Error al recuperar los conductores: ', error);
    }
  },
};
