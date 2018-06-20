import React, {Component} from "react";
import logic from "./logic";
import Loading from "../Loading/Loading";
import ErrorText from "../ErrorText/ErrorText";
import {isEmpty} from "../../helpers/isEmpty";
import "./style.css";


export default class Dashboard extends Component {

    logic = null;

    constructor(props) {
        super(props);
        this.logic = new logic(this);

        this.state = {
            exp: null,
            userName: "",
            authorities: [],
            jti: "",
            clientId: "",
            scope: [],
            loading: true,
            errorText: '',
        };
    }

    async componentDidMount() {
        await this.logic.ifExistTokenLoadUserInfoElseNavigateToLogin();
    }

    render() {
        const {loading, userName, authorities, clientId, scope, errorText}= this.state;

        return (
            loading ?
                <Loading/>
                :
                <div >
                    {
                        isEmpty(errorText) ?
                            <div>
                                <div className="info-box">
                                    <label className="label">Username: </label>
                                    <div className="user-value-container">
                                        <span className="user-value">{userName}</span>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <label className="label">Authorities: </label>

                                    <div className="user-value-container">
                                        {
                                            authorities.map((item, index)=> {
                                                    return (
                                                        <div key={index}>
                                                            <span className="user-value">{item}</span>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="info-box">
                                    <label className="label">ClientId: </label>
                                    <div className="user-value-container">
                                        <span className="user-value">{clientId}</span>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <label className="label">Scope: </label>
                                    <div className="user-value-container">
                                        {
                                            scope.map((item, index)=> {
                                                    return (
                                                        <div key={index}>
                                                            <span className="user-value">{item}</span>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <ErrorText errorText={errorText}/>
                    }
                </div>
        );
    }
}