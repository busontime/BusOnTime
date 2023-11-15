import { bdService } from '@/utils/bd';

const COLLECTION_NAME = 'cooperatives';

export const cooperativeService = {
  create: async (data) => {
    try {
      return await bdService.createDocument(COLLECTION_NAME, data);
    } catch (error) {
      console.error('Error al agregar cooperativa', error);
    }
  },

  getById: async (id) => {
    try {
      return await bdService.getById(COLLECTION_NAME, id);
    } catch (error) {
      console.log('Error al recuperar la cooperativa: ' + id, error);
    }
  },

  updateById: async (id, data) => {
    try {
      return await bdService.updateById(COLLECTION_NAME, id, data);
    } catch (error) {
      console.log('Ocurrio un error al actualizar la cooperativa: ' + id, error);
    }
  },

  deleteById: async (id) => {
    try {
      return await bdService.deleteById(COLLECTION_NAME, id);
    } catch (error) {
      console.log('Ocurrio un error al eliminar la cooperativa: ' + id, error);
    }
  },

  getAll: async () => {
    try {
      const data = await bdService.getAll(COLLECTION_NAME);

      const documents = data._docs
        .map((doc) => {
          const documentData = doc.data();
          return { id: doc.id, ...documentData };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      return documents;
    } catch (error) {
      console.log('Error al recuperar todas las cooperativas', error);
    }
  },
};
