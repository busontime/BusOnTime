import { support } from '@/templates/support';

export const supportEmail = (message: string, userData) => {
  const template = support(message, userData);

  return {
    from: 'Ayuda y Soporte busontimea@gmail.com',
    to: 'busontimea@gmail.com',
    subject: 'Ayuda y Soporte',
    message: template,
    importance: 'high',
  };
};
