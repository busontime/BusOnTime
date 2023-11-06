import { bdService } from '@/utils/bd';

const NAME_COLLECTION = 'cooperative';

export const cooperativeService = {
  createCooperative: async (data) => {
    try {
      return await bdService.createDocument(NAME_COLLECTION, data);
    } catch (error) {
      console.error('Error al agregar cooperativa:', error);
    }
  },

  getCooperativeById: async (coopId) => {
    try {
      const cooperativa = await bdService.getById(NAME_COLLECTION, coopId);
      return cooperativa;
    } catch (error) {
      console.log('no se encontro el id de la cooperativa', error, coopId);
    }
  },

  updateCooperativeById: async (coopId, data) => {
    try {
      return await bdService.updateById(NAME_COLLECTION, coopId, data);
    } catch (error) {
      console.log('error al obtener el id de la cooperativa', error, coopId);
    }
  },

  deleteCooperativeById: async (coopId) => {
    try {
      return await bdService.deleteById(NAME_COLLECTION, coopId);
    } catch (error) {
      console.log('error al eliminar la cooperativa', error, coopId);
    }
  },

  getAllCooperative: async () => {
    try {
      const data = await bdService.getAll(NAME_COLLECTION);
      const documents = data._docs.map((doc) => {
        const documentId = doc.id;
        const documentData = doc.data();
        return { id: documentId, ...documentData };
      });
      return documents;
    } catch (error) {
      console.log('error al obtener todas las cooperativas', error);
    }
  },
};
