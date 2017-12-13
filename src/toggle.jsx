import React from "react";
import {Button} from 'react-bootstrap';

export const Toggle = props =>
    <Button
        bsSize={props.size || "lg"}
        bsStyle="link"
        onClick={() => props.update(!props.enabled)}
        style={{width: "100%", textAlign: "right"}}
    >
        {props.enabled
            ? <span className="text-success">{props.labelEnabled || "Enabled"} <i className="fa fa-toggle-on" /></span>
            : <span className="text-danger">{props.labelDisabled || "Disabled"} <i className="fa fa-toggle-off" /></span>
        }
    </Button>
