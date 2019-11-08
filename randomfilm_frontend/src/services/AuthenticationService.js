import { BehaviorSubject } from 'rxjs';

    const basePath = 'http://localhost:64303';
    const authController = 'Auth';
    const getToken = 'token';

    const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

    const loginUser = userObj => ({
        type: 'LOGIN_USER',
        payload: userObj
    })

    /*export const getTokenFetch = (login = this.login, password) => {
        return fetch(`${this.basePath}/api/${authController}/${getToken}`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "login": `${login}`,
                    "password": `${password}`
                })
            })
                .then(res => {
                    if (res.status == '404') {
                        this.errorMessage = 'Пользователь не найден';
                    }
                    res.json()
                })
                .then((resultRequest) => {
                        console.log(resultRequest);
                        localStorage.setItem("token", resultRequest);
                        currentUserSubject.next({
                            "login": login
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                        this.errorMessage = error;
                    });
    }
}*/

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(login, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    };

    return fetch(`${this.basePath}/api/${authController}/${getToken}`, requestOptions)
        .then(res => {
            if (res.status == '404') {
                this.errorMessage = 'Пользователь не найден';
            }
            res.json()
        })
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', {
                "login": login
            });
            localStorage.setItem('currentToken', {
                "token": token
            }
            currentUserSubject.next(user);

            return token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    currentUserSubject.next(null);
}