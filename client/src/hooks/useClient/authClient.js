import HttpClient from './httpClient';

class AuthClient extends HttpClient {
  async signup(email, username, password) {
    return this._instance.post('/signup', { email, username, password });
  }

  async login(email, password) {
    return this._instance.post('/login', { email, password });
  }

  async me() {
    return this._instance.get('/me');
  }
}

export default AuthClient;
