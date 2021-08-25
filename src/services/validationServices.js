const validationService = {
  text: value => {
    return value.trim().length > 0 && value.trim().indexOf(' ') !== 0;
  },
  number: value => {
    return value > 0;
  },
  email: value => {
    return value.includes('@');
  }
};

export default validationService;