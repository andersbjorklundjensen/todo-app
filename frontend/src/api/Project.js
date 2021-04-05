import api from '../configs/api';

export default class ProjectApiWrapper {
  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  callApi(method, route, body) {
    // console.log(`${method} ${route} ${body}`);

    if (method === 'GET') {
      return fetch(`${api.API_URL}${route}`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.apiToken,
        },
      })
        .then((response) => response.json());
    }

    return fetch(`${api.API_URL}${route}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.apiToken,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json());
  }

  createProject(name) {
    return this.callApi('POST', '/projects', {
      name,
    });
  }

  getAllProjects() {
    return this.callApi('GET', '/projects', null);
  }

  getProjectAndTodos(id) {
    return this.callApi('GET', `/projects/${id}`, null);
  }

  editProject(id, name) {
    return this.callApi('PUT', `/projects/${id}`, {
      name,
    });
  }

  deleteProject(id) {
    return this.callApi('DELETE', `/projects/${id}`, null);
  }
}
