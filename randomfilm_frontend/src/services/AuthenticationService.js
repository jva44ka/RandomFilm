export  default class AuthenticationService {
    basePath = 'http://localhost:64303';
    authController = 'Auth';
    getTokenMethod = 'token';

    getCurrentUser = () => {
        return {
            login: localStorage.getItem('currentLogin'),
            token: localStorage.getItem('currentToken')
        }
    };

    setCurrentUser = (login, token) => {
        console.log("params: ");
        console.log(JSON.stringify({login, token}));
        localStorage.setItem('currentLogin', login);
        localStorage.setItem('currentToken', token);
        console.log("setted local storage: ");
        console.log(JSON.stringify({login, token}));
    }

    login = (login, password) => {

        let token;
        this.tokenRequest(login, password).then(res => token = res);
        console.log("token after fetch method: ");
        console.log(token);

        this.setCurrentUser(login, token);
        console.log("localstorage: ");
        console.log(this.getCurrentUser().token);
    };

    logout = () => {
        this.setCurrentUser("", "");
    }

    // Задача данного метода получить token (с этим вроде нет проблем) и ВЕРНУТЬ его из функции (возвращает undefined)
    tokenRequest = async(login, password) => {
        const requestOptions = {
            method: "POST",
            mode: 'cors',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
            ,
            body: JSON.stringify({
                "login": /*"Anton",*/`${login}`,
                "password": /*"1234"*/`${password}`
            })
        };

        let result = "result";
        result = await fetch(`${this.basePath}/api/${this.authController}/${this.getTokenMethod}`, requestOptions)
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                console.log('Request successful', text);
                //result = text;
                return text;
            })
            .catch(function(error) {
                console.log('Request failed', error)
            });
        console.log('Result is: ', result);
        //this.setCurrentUser(login, result);
        return result;
    }
}