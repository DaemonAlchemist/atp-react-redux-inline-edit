
import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import DatePicker from "react-16-bootstrap-date-picker";
import dateFormat from 'dateformat';
import {Icon} from 'react-font-awesome-5';

const Picker = props => <DatePicker {...props} {...props.input} />

const DatepickerInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup bsSize={props.size} style={{zIndex: 999, position: "relative"}}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
            <Field
                name={props.name}
                component={Picker}
                showClearButton={false}
                className={"form-control input-" + props.size}
                autoFocus
                value={props.value}
            />
            <InputGroup.Button>
                <Button bsStyle="link" type="submit">
                    <span className="text-success"><Icon.Check /></span>
                </Button>
                <Button onClick={props.close} type="submit" bsStyle="link">
                    <span className="text-danger"><Icon.Times /></span>
                </Button>
            </InputGroup.Button>
        </InputGroup>
    </form>
);

export const Datepicker = connect(
        (state, props) => ({
            isOpen: isOpen(state, props.id),
            format: props.format || "fullDate"
        }),
        (dispatch, props) => ({
            open: () => dispatch(open(props.id)),
            close: () => dispatch(close(props.id)),
            save: data => {
                props.onSave(data, dispatch);
                dispatch(close(props.id));
            }
        })
    )(props => props.isOpen
        ? <DatepickerInlineEdit
            label={props.label || null}
            name={props.name || "value"}
            initialValues={{[props.name || "value"]: props.value}}
            close={props.close}
            onSubmit={props.save}
            size={props.size || "lg"}
          />
        : <span onClick={() => props.open()}>{dateFormat(props.value, props.format, true)} <Icon.PencilAlt /></span>
    );
