import config from '../pathConfig.json';

export default class FilmApiService {

    BasePath = config.basePath;

    Request = async(controller, method, httpMehtod, token = "", body = "") => {
        let headers = {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        };

        if (token){
            headers = {
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        let fetchOptions = {
            method: httpMehtod,
            mode: 'cors',
            headers: headers,
        };

        if (body) {
            fetchOptions = {
                method: httpMehtod,
                mode: 'cors',
                headers: headers,
                body: body,
            };
        }

        return await fetch(`${this.BasePath}/api/${controller}/${method}`, fetchOptions);
    };

    GetAuthRequest = async(controller, method, token) => {
        return await this.Request(controller, method, 'GET', token);
    };

    GetNonAuthRequest = async(controller, method) => {
        return await this.Request(controller, method, 'GET');
    };

    PostAuthRequest = async(controller, method, token, body) => {
        return await this.Request(controller, method, 'POST', token, body);
    };

    PostNonAuthRequest = async(controller, method, body) => {
        return await this.Request(controller, method, 'POST', '', body);
    };

    DeleteAuthRequest = async(controller, method, token) => {
        return await this.Request(controller, method, 'DELETE', token);
    };

    DeleteNonAuthRequest = async(controller, method) => {
        return await this.Request(controller, method, 'DELETE', '');
    };
}