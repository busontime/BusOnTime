export const validateEmail = (email) => {
  if (email.indexOf(' ') !== -1) {
    return false;
  }

  const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegex.test(email);
};

export const validateCi = (ci) => {
  if (ci.indexOf(' ') !== -1) {
    return false;
  }

  const ciRegex = /^\d{10}$/;
  return ciRegex.test(ci);
};
