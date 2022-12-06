import HttpClient from './httpClient';

class ProjectsClient extends HttpClient {
  async create(name, description) {
    return this._instance.post('/', { name, description });
  }
}

export default ProjectsClient;
