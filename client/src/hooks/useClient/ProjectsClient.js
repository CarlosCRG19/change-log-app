import HttpClient from './httpClient';

class ProjectsClient extends HttpClient {
  async getList(params) {
    return this._instance.get('/', { params });
  }

  async create(name, description) {
    return this._instance.post('/', { name, description });
  }
}

export default ProjectsClient;
