import React from "react";
import {Button} from 'react-bootstrap';
import {Icon} from 'react-font-awesome-5';

export const Toggle = props =>
    <Button
        bsSize={props.size || "lg"}
        bsStyle="link"
        onClick={() => props.update(!props.enabled)}
        style={{textAlign: "right"}}
    >
        {props.enabled
            ? <span className="text-success">{props.labelEnabled || "Enabled"} <Icon.ToggleOn /></span>
            : <span className="text-danger">{props.labelDisabled || "Disabled"} <Icon.ToggleOff /></span>
        }
    </Button>;
