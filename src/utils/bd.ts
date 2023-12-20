import firestore from '@react-native-firebase/firestore';

export const bdService = {
  setDocument: (collection, id, data) => {
    firestore().collection(collection).doc(id).set(data);
  },

  createDocument: async (collection, data) => {
    return await firestore()
      .collection(collection)
      .add(data)
      .then((res) => res)
      .catch((err) => err);
  },

  getById: async (collection, id) => {
    return await firestore()
      .collection(collection)
      .doc(id)
      .get()
      .then((res) => res)
      .catch((err) => err);
  },

  getAll: async (collection) => {
    return await firestore()
      .collection(collection)
      .get()
      .then((res) => res)
      .catch((err) => err);
  },

  updateById: async (collection, id, data) => {
    return await firestore()
      .collection(collection)
      .doc(id)
      .update(data)
      .then((res) => res)
      .catch((err) => err);
  },

  deleteById: async (collection, id) => {
    return await firestore()
      .collection(collection)
      .doc(id)
      .delete()
      .then((res) => res)
      .catch((err) => err);
  },

  getAllWithFilter: async (collection, filter) => {
    const { field, condition, value } = filter;

    return await firestore()
      .collection(collection)
      .where(field, condition, value)
      .get()
      .then((res) => res)
      .catch((err) => err);
  },

  getAllInRealTime: (collection, getData = (val) => {}) => {
    firestore()
      .collection(collection)
      .onSnapshot(getData, (err) => {
        console.log('Erro al obtener todos los datos en tiempo real de: ' + collection, err);
      });
  },
};
