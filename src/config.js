const config = {
  apiUrl: process.env.VUE_APP_API_URL || '$VUE_APP_API_URL',
  baseUrl: process.env.BASE_URL || '$BASE_URL'
};

Object.keys(config).forEach(key => {
  if (config[key].startsWith('$')) {
    config[key] = null;
  }
});

export default config;