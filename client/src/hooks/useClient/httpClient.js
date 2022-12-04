import autoBind from 'auto-bind';
import axios from 'axios';

class HttpClient {
  constructor(baseURL) {
    if (baseURL === null || baseURL === undefined) {
      throw new Error('Invalid base URL');
    }

    autoBind(this);

    this._instance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    this._initializeInterceptors();
  }

  _initializeInterceptors() {
    this._instance.interceptors.response.use(
      this._handleResponse,
    );
  }

  _handleResponse({ data }) {
    return data;
  }

  async getHelloWorld() {
    return this._instance.get('/');
  }
}

export default HttpClient;