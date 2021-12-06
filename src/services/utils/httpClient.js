import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    let body = null;

    const response = await fetch(`${this.baseURL}${path}`);
    await delay(500);

    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) body = await response.json();

    if (response.ok) return body;

    throw new Error(body?.error || `${response.status} - ${response.statusText}`);
  }
}

export default HttpClient;
