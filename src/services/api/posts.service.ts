import { WebApi } from "../web-api.service";


export class PostApiService {
    webApi = new WebApi();
    controller = "/post";

    async Get(pageIndex:number) {
        return await this.webApi.Get(`${this.controller}?limit=10&page=${pageIndex}`);
    }
}
