import firestore from '@react-native-firebase/firestore';

export const bdService = {
  setDocument: (collection, id, data) => {
    firestore().collection(collection).doc(id).set(data);
  },

  getById: async (collection, id) => {
    return await firestore()
      .collection(collection)
      .doc(id)
      .get()
      .then((res) => res)
      .catch((err) => err);
  },
};