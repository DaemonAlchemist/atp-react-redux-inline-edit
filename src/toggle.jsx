import React from "react";
import {Button} from 'react-bootstrap';
import {Icon} from 'react-font-awesome-5';

export const Toggle = ({size, update, enabled, labelEnabled, labelDisabled, disabled}) =>
    <Button
        bsSize={size || "lg"}
        bsStyle="link"
        onClick={() => update(!enabled)}
        style={{textAlign: "right"}}
        disabled={disabled || false}
    >
        {enabled
            ? <span className="text-success">{labelEnabled || "Enabled"} <Icon.ToggleOn /></span>
            : <span className="text-danger">{labelDisabled || "Disabled"} <Icon.ToggleOff /></span>
        }
    </Button>;
