import config from '../pathConfig.json';

export default class FilmApiService {

    BasePath = 'http://localhost:64303';

    Request = async(controller, method, httpMehtod, token = "") => {
        let result = {};
        let headers = {};
        if (token){
            headers = {
                "Authorization": `Bearer ${token}`
            }
        }
        await fetch(`${this.BasePath}/api/${controller}/${method}`, {
                method: httpMehtod,
                mode: 'cors',
                headers: headers
            }
        )

            .then(res => res.json())
            .then((resultRequest) => {
                    result = resultRequest;
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            );
        return result;
    }

    GetAuthRequest = async(controller, method, token) => {
        return await this.Request(controller, method, 'GET', token);
    }

    GetNonAuthRequest = async(controller, method) => {
        return await this.Request(controller, method, 'GET');
    }

    PostAuthRequest = async(controller, method, token) => {
        return await this.Request(controller, method, 'POST', token);
    }

    PostNonAuthRequest = async(controller, method) => {
        return await this.Request(controller, method, 'POST');
    }
}