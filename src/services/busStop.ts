import { bdService } from '@/utils/bd';

const COLLECTION_NAME = 'bus_stops';

export const busStopService = {
  getAllStops: async () => {
    try {
      const data = await bdService.getAll(COLLECTION_NAME);
      return data._docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al recuperar las paradas de buses: ', error);
    }
  },

  createStop: async (data) => {
    try {
      return await bdService.createDocument(COLLECTION_NAME, data);
    } catch (error) {
      console.log('error al crear la parada', error);
    }
  },

  updateStopById: async (stopId, data) => {
    try {
      return await bdService.updateById(COLLECTION_NAME, stopId, data);
    } catch (error) {
      console.log('error al actualizar la parada', error);
    }
  },

  deleteStopById: async (stopId) => {
    try {
      return await bdService.deleteById(COLLECTION_NAME, stopId);
    } catch (error) {
      console.log('error al eliminar la parada', error);
    }
  },

  getStopById: async (stopId) => {
    try {
      return await bdService.getById(COLLECTION_NAME, stopId);
    } catch (error) {
      console.log('error al obtener el id del documento');
    }
  },
};
