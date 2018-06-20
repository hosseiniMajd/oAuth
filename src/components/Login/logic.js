import {HTTP} from "../../helpers/HTTP";
import {browserHistory} from "react-router";
import {setToken, isNotExistToken} from "../../helpers/token";
import {isEmpty} from "../../helpers/isEmpty";


export default class logic {

    component = null;

    constructor(c) {
        this.component = c;
    }

    checkExistTokenIfExistNavigateToDashboard = () => {
        if (isNotExistToken()) {
            this.component.setState({loading: false});
        } else {
            this.navigateToDashboard();
        }
    };

    updateUsername = (e) => {
        this.component.setState({username: e.target.value});
    };

    updatePassword = (e) => {
        this.component.setState({password: e.target.value});
    };

    sendFormToAPI = async() => {
        try {
            this.component.setState({
                apiLoading: true,
                errorText: '',
            });

            if (this.ifUsernameOrPasswordIsNullShowHintToUser()) {
                HTTP.POST(
                    'token',
                    this.provideDataForTokenAPI(),
                    (response) => {
                        this.saveTokenInLocalStorageThenNavigateToDashboard(response.data);
                    },
                    (error) => {
                        this.showError(error.message);
                        console.log(error);
                    }
                );
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    ifUsernameOrPasswordIsNullShowHintToUser = () => {
        const {username, password}= this.component.state;

        let username_hint = '';
        let password_hint = '';

        if (isEmpty(username)) {
            username_hint = 'Please Insert Your Username!'
        }
        if (isEmpty(password)) {
            password_hint = 'Please Insert Your Password!'
        }

        if (isEmpty(username) || isEmpty(password)) {
            this.component.setState({
                userNameHint: username_hint,
                passwordHint: password_hint,
                apiLoading: false
            });
            return false;
        }
        else {
            this.component.setState({
                userNameHint: '',
                passwordHint: '',
            });
            return true;
        }
    };

    provideDataForTokenAPI = () => {
        const {username, password}= this.component.state;

        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('grant_type', 'password');

        return data;
    };

    saveTokenInLocalStorageThenNavigateToDashboard = (result) => {
        setToken(result.access_token);
        this.navigateToDashboard();
    };

    navigateToDashboard = () => {
        browserHistory.push("/dashboard");
    };

    showError = (error_message) => {
        this.component.setState({
            apiLoading: false,
            errorText: error_message
        });
    };

}