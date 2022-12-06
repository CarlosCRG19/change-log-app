import HttpClient from './httpClient';

class ProjectsClient extends HttpClient {
  async getList() {
    return this._instance.get('/');
  }

  async create(name, description) {
    return this._instance.post('/', { name, description });
  }
}

export default ProjectsClient;
