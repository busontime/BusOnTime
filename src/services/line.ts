import { bdService } from '@/utils/bd';

const COLLECTION_NAME = 'lines';

export const lineService = {
  createLine: async (data) => {
    try {
      return await bdService.createDocument(COLLECTION_NAME, data);
    } catch (error) {
      console.log('Error al crear la linea', error);
    }
  },

  getLineById: async (lineID) => {
    try {
      return await bdService.getById(COLLECTION_NAME, lineID);
    } catch (error) {
      console.log('error al obtener la linea por el id', error);
    }
  },

  updateLineById: async (lineId, data) => {
    try {
      return await bdService.updateById(COLLECTION_NAME, lineId, data);
    } catch (error) {
      console.log('error al actualizar la linea', error);
    }
  },

  deleteLineById: async (lineId) => {
    try {
      return await bdService.deleteById(COLLECTION_NAME, lineId);
    } catch (error) {
      console.log('error al eliminar la linea', error);
    }
  },

  getAll: async () => {
    try {
      const data = await bdService.getAll(COLLECTION_NAME);
      const documents = data._docs.map((doc) => {
        const documentId = doc.id;
        const documentData = doc.data();
        return { id: documentId, ...documentData };
      });
      return documents;
    } catch (error) {
      console.error('Error al recuperar las lineas de rutas: ', error);
    }
  },
};
