import storage from '@react-native-firebase/storage';

export const uploadImage = async (image, imagePath = 'files/default.png') => {
  try {
    const reference = storage().ref(imagePath);
    await reference.putFile(image);
    return await reference.getDownloadURL();
  } catch (error) {
    throw new Error('Error al subir imagen');
  }
};
