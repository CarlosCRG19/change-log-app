import HttpClient from './httpClient';

class ProjectUpdatesClient extends HttpClient {
  async getList(projectId) {
    return this._instance.get(`/${projectId}/updates`);
  }

  async create(projectId, title, type, description, points) {
    return this._instance.post(`/${projectId}/updates`, {
      title, type, description, points,
    });
  }

  async delete(projectId, updateId) {
    console.log(projectId, updateId);
    return this._instance.delete(`/${projectId}/updates/${updateId}`);
  }
}

export default ProjectUpdatesClient;
