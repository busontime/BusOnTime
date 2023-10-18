import { bdService } from '@/utils/bd';

const COLLECTION_NAME = 'bus_stops';

export const busStopService = {
  getAll: async () => {
    try {
      const data = await bdService.getAll(COLLECTION_NAME);

      const { _docs } = data;

      return _docs;
    } catch (error) {
      console.error('Error al recuperar las paradas de buses: ', error);
    }
  },
};
