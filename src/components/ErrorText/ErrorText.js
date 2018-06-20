import React, {Component} from "react";
import {isEmpty} from "../../helpers/isEmpty";
import "./style.css";


export default class ErrorText extends Component {

    render() {
        const {errorText}= this.props;

        return (
            isEmpty(errorText) ?
                null
                :
                <div>
                    <span className="error-text">{errorText}</span>
                </div>
        );
    }

}