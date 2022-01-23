import { I18nManager } from 'react-native';

export class WebApi {
    debug = false;
    apiUrl = 'https://dummyapi.io/data/v1';
    async getHeaders() {
        let headers = {
            'app-id': '61ec46ff4c83678c238aea9e',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'AccessToken': '',
        }
      
        return headers;
    }

    private logging(path: string, response: any, rowBody: string = "") {
        this.debug && console.log({ rowBody, path, response });
        return response;
    }
    async Get(controller: string): Promise<any> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'GET', headers: await this.getHeaders() }).then(response => response.json()).then(response => this.logging(controller, response));
    }
    async Post(controller: string, body?: any): Promise<any> {
        return await fetch(`${this.apiUrl}${controller}`, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(body)
        }).then(response => response.json()).then(response => this.logging(controller, response, JSON.stringify(body)));
    }
    async Put(controller: string, body: any): Promise<any> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'PUT', headers: await this.getHeaders(), body: JSON.stringify(body) }).then((response) => response.json()).then(response => this.logging(controller, response, JSON.stringify(body)));
    }
    async Delete(controller: string): Promise<any> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'DELETE', headers: await this.getHeaders() }).then((response) => response.json()).then(response => this.logging(controller, response));
    }
    async FilePost(controller: string, body: any): Promise<any> {
        return await fetch(`${this.apiUrl}${controller}`, { method: 'POST', headers: {}, body }).then(response => response.json()).then(response => this.logging(controller, response));
    }

}
