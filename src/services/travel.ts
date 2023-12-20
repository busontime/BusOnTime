import { bdService } from '@/utils/bd';
import { convertFirestoreDateToDate } from '@/utils/helpers';

const COLLECTION_NAME = 'travels';

export const travelService = {
  create: async (data) => {
    try {
      return await bdService.createDocument(COLLECTION_NAME, data);
    } catch (error) {
      console.error('Error al agregar recorrido', error);
    }
  },

  getById: async (id) => {
    try {
      return await bdService.getById(COLLECTION_NAME, id);
    } catch (error) {
      console.log('Error al recuperar recorrido: ' + id, error);
    }
  },

  updateById: async (id, data) => {
    try {
      return await bdService.updateById(COLLECTION_NAME, id, data);
    } catch (error) {
      console.log('Ocurrio un error al actualizar el recorrido: ' + id, error);
    }
  },

  deleteById: async (id) => {
    try {
      return await bdService.deleteById(COLLECTION_NAME, id);
    } catch (error) {
      console.log('Ocurrio un error al eliminar el recorrido: ' + id, error);
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
        .sort(
          (a, b) =>
            convertFirestoreDateToDate(b.date).getTime() -
            convertFirestoreDateToDate(a.date).getTime()
        );

      return documents;
    } catch (error) {
      console.log('Error al recuperar todos los recorridos', error);
    }
  },

  getAllByDriverId: async (id) => {
    try {
      const filter = {
        field: 'driver.id',
        condition: '==',
        value: id,
      };

      const data = await bdService.getAllWithFilter(COLLECTION_NAME, filter);

      const documents = data._docs
        .map((doc) => {
          const documentData = doc.data();
          return { id: doc.id, ...documentData };
        })
        .sort(
          (a, b) =>
            convertFirestoreDateToDate(b.date).getTime() -
            convertFirestoreDateToDate(a.date).getTime()
        );

      return documents;
    } catch (error) {
      console.log('Error al recuperar todos los recorridos del conductor ' + id, error);
    }
  },

  getAllInRealTime: (getData = (val) => {}) => {
    try {
      bdService.getAllInRealTime(COLLECTION_NAME, (data) => {
        const documents = data._docs.map((doc) => {
          const documentData = doc.data();
          return { id: doc.id, ...documentData };
        });

        getData(documents.filter((item) => item.state === 'active'));
      });
    } catch (error) {
      console.log('Error al recuperar todos los recorridos en tiempo real', error);
    }
  },
};
