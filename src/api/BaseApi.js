import axios from 'axios';

class BaseAPI {
  constructor() {
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async request(endpoint, method = 'GET', body = null, params = {}) {
    try {
      const response = await this.api({
        url: endpoint,
        method,
        data: body,
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async get(endpoint, params = {}) {
    return this.request(endpoint, 'GET', null, params);
  }

  async post(endpoint, body = {}, params = {}) {
    return this.request(endpoint, 'POST', body, params);
  }

  async update(endpoint, body = {}, params = {}) {
    return this.request(endpoint, 'PUT', body, params);
  }

  async delete(endpoint, params = {}) {
    return this.request(endpoint, 'DELETE', null, params);
  }

  handleError(error) {
    if (error.response) {
      console.error('API Response Error:', error.response.data);
      throw new Error(error.response.data.message || 'API Error');
    } else if (error.request) {
      console.error('API Request Error: No response received');
      throw new Error('No response from server');
    } else {
      console.error('API Configuration Error:', error.message);
      throw new Error(error.message);
    }
  }
}

export default new BaseAPI();
