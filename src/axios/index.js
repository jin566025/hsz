import axios from 'axios';
// here, you can config the axios
axios.defaults.baseURL = "http://nbhh.xlylai.com";
axios.create({
  timeout: 5000
});

export default axios;