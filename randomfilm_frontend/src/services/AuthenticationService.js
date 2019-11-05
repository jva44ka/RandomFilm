
    const basePath = 'http://localhost:64303';
    const authController = 'Auth';
    const getTokenMethod = 'token';

    const loginUser = userObj => ({
        type: 'LOGIN_USER',
        payload: userObj
    })

    export const getToken = (login = this.login, password) => {
        return dispatch
        {
            return fetch(`${this.BasePath}/api/${authController}/${getTokenMethod}`, {
                method: 'GET',
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
                        token = resultRequest;
                        console.log(resultRequest);
                        localStorage.setItem("token", resultRequest);
                        dispatch(loginUser(login))
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                        this.errorMessage = error;
                    });
        }
    }


}