import React, {Component} from "react";
import Loading from "../Loading/Loading";
import ErrorText from "../ErrorText/ErrorText";
import logic from "./logic";
import "./style.css";


export default class Login extends Component {

    logic = null;

    constructor() {
        super();
        this.logic = new logic(this);

        this.state = {
            username: "",
            password: "",
            message: '',
            errorText: '',
            loading: true,
            apiLoading: false,
            userNameHint: '',
            passwordHint: '',
        };
    }

    componentDidMount() {
        this.logic.checkExistTokenIfExistNavigateToDashboard();
    }

    render() {
        const {
            username, password, loading, apiLoading,
            userNameHint, passwordHint, errorText
        } = this.state;

        return (
            loading ?
                <Loading/>
                :
                <div className="form">

                    <h2 className="login-title">Login Form</h2>

                    <div className="form-group">
                        <label className="label">Username: </label>
                        <input type="text"
                               className="input"
                               value={username}
                               onChange={(e)=>this.logic.updateUsername(e)}
                               data-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Password: </label>
                        <input type="password"
                               className="input"
                               value={password}
                               onChange={(e)=>this.logic.updatePassword(e)}
                               data-required="true"
                        />
                    </div>

                    <div className="form-group button-container">
                        <button
                            className="button"
                            onClick={()=>this.logic.sendFormToAPI()}
                        >
                            {
                                apiLoading ?
                                    <Loading/>
                                    :
                                    <span>Login</span>
                            }
                        </button>
                    </div>

                    <div className="form-group">
                        <ErrorText errorText={userNameHint}/>
                        <ErrorText errorText={passwordHint}/>
                        <ErrorText errorText={errorText}/>
                    </div>

                </div>
        );
    }

}