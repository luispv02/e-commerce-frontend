import axios from 'axios';

const ecommerceApi = axios.create({
    baseURL: import.meta.env.VITE_ECOMMERCE_URL
})

ecommerceApi.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');

  if(authStorage){
    const { state } = JSON.parse(authStorage);

    if(state.token){
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

export default ecommerceApi;