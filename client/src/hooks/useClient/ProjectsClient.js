import HttpClient from './httpClient';

class ProjectsClient extends HttpClient {
  async getList(params) {
    return this._instance.get('/', { params });
  }

  async get(projectId) {
    return this._instance.get(`/${projectId}`);
  }

  async create(name, description) {
    return this._instance.post('/', { name, description });
  }

  async update(projectId, name, description) {
    return this._instance.put(`/${projectId}`, { name, description });
  }

  async delete(projectId) {
    return this._instance.delete(`/${projectId}`);
  }
}

export default ProjectsClient;
