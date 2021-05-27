import axios from 'axios';

export default axios.create({
  baseURL: 'https://advert-app.herokuapp.com/api/v1/',
});
