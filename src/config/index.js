import axios from 'axios'


export const httpRequest = axios.create({
  baseURL: 'https://finalhackathon.herokuapp.com/api/'
});
