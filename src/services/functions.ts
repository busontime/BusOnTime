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

export const sendMail = async (emailConfig) => {
  try {
    const { data } = await axios.post(Config.SEND_MAIL_API, emailConfig);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createDriver = async (driver) => {
  try {
    const { data } = await axios.post(Config.CREATE_DRIVER_API, driver);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
