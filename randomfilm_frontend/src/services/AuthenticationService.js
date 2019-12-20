export  default class AuthenticationService {
    basePath = 'http://localhost:64303';
    authController = 'Auth';
    getTokenMethod = 'token';

    getCurrentUser = () =>{
        return localStorage.getItem('currentUser');
    };

    login = (login, password) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                //'Content-Type': 'application/problem+json; charset=utf-8'
            },
            mode: 'no-cors',
            body: JSON.stringify({
                "login": `${login}`,
                "password": `${password}`
            })
        };

        let data = this.tokenRequest(requestOptions);

        localStorage.setItem('currentUser', {
            "login": login,
            "token": data
        });
        console.log("localstorage: " + {
            "login": login,
            "token": data
        });
    };

    logout = () => {
        localStorage.removeItem('currentUser');
    }

    tokenRequest = async(requestOptions) => {
        let data = await fetch(`${this.basePath}/api/${this.authController}/${this.getTokenMethod}`, requestOptions);
        if (data.status == '404') {
            this.errorMessage = 'Пользователь не найден';
        }
        console.log("response: " + data);
        console.log("body: " + data.body);
        return data.body;
    }
}