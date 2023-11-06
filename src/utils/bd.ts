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
};
