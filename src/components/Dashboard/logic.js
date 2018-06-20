import {browserHistory} from "react-router";
import {HTTP} from "../../helpers/HTTP";
import {getToken, isNotExistToken} from "../../helpers/token";


export default class logic {

    component = null;

    constructor(c) {
        this.component = c;
    }

    ifExistTokenLoadUserInfoElseNavigateToLogin = async() => {
        try {
            if (isNotExistToken()) {
                this.navigateToLogin();
            } else {
                await this.loadUserInfoFromAPI();
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    loadUserInfoFromAPI = async() => {
        HTTP.POST(
            'check_token',
            this.provideTokenDataForCheckTokenAPI(),
            (response) => {
                this.showUserInfo(response.data);
            },
            (error) => {
                this.showError(error.message);
                console.log(error);
            }
        );
    };

    provideTokenDataForCheckTokenAPI = () => {
        let data = new FormData();
        data.append('token', getToken());
        return data;
    };

    showUserInfo = (result) => {
        const {exp, user_name, authorities, jti, client_id, scope}= result;

        this.component.setState({
            exp: exp,
            userName: user_name,
            authorities: authorities,
            jti: jti,
            clientId: client_id,
            scope: scope,
            loading: false,
            errorText: ''
        });
    };

    navigateToLogin = () => {
        browserHistory.push("/login");
    };

    showError = (error_message) => {
        this.component.setState({
            loading: false,
            errorText: error_message
        });
    };

}