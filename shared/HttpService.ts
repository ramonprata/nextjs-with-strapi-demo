const STRAPI_API_BASE_URL = process.env.STRAPI_API_BASE_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export class HttpService {
  private getAuthHader() {
    return {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    };
  }
  get(path: string) {
    const url = `${STRAPI_API_BASE_URL}/${path}`;

    return fetch(url, {
      ...this.getAuthHader(),
    });
  }
}

const httpInstance = new HttpService();

export default httpInstance;
