export const registerForm = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const loginForm = {
  email: '',
  password: '',
};

export const initCooperativeForm = {
  name: '',
  date_foundation: new Date(),
  alias: '',
};

export const initDriverForm = {
  birthdate: new Date(),
  email: '',
  lastname: '',
  name: '',
  phone: '',
  ci: '',
  cooperativeId: null,
};

export const initBusForm = {
  name: '',
  license_plate: '',
  cooperativeId: null,
  inUse: false,
};

export const initLineForm = {
  name: '',
  lineColor: '',
  origin: null,
  destination: null,
  stops: [],
  route: [],
};

export const initBusStopForm = {
  name: '',
  coordinate: null,
};

export const initProfile = {
  birthdate: new Date(),
  email: '',
  lastname: '',
  name: '',
  phone: '',
  ci: '',
};

export const initTravelForm = {
  line: null,
  cooperative: null,
  bus: null,
  cancellation_message: '',
};
