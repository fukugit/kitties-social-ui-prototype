import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    // 認証情報取得
    // const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error('API Error:', error);
    } else {
      console.error('Network Error:', error.message);
    }
    const httpStatus = error.response ? error.response.status : null;
    if (httpStatus === 401) {
      // 認証情報削除
      // if (typeof window !== 'undefined') {
      //   localStorage.removeItem('access_token');
      // }
      window.location.pathname = "/error";
      return Promise.reject("Unauthorized");
    }
  
    return Promise.reject(error);
  }
);

export default apiClient;