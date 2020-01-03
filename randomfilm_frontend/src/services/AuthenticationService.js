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

    login = async (login, password) => {

        let data = await this.tokenRequest(login, password);

        if (!data.error) {
            this.setCurrentUser(login, data);
            console.log("token after fetch method: ");
            console.log(data);
        }
        else{
            console.log("something wrong...");
        }
        console.log("localstorage: ");
        console.log(this.getCurrentUser().token);
    };

    logout = () => {
        this.setCurrentUser("", "");
    }


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
                "login": `${login}`,
                "password": `${password}`
            })
        };

        let result = "result";
        result = await fetch(`${this.basePath}/api/${this.authController}/${this.getTokenMethod}`, requestOptions)
            .then((response) => {
                if(response.status == 200) {
                    return response.text();
                }
                else{
                    return{"error": "status " + response.status}
                }
            })
            .then((text) => {
                console.log('Request successful', text);
                return text;
            })
            .catch((error) => {
                console.log('Request failed', error);
                return{"error": error}
            });
        console.log('Result is: ', result);
        return result;
    }
}