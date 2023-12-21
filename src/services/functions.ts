import Config from 'react-native-config';
import axios from 'axios';

export const adminVerification = async (email: string) => {
  try {
    const { data } = await axios.get(Config.VERIFICATION_API + email);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
