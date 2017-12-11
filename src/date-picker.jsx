/**
 * Created by Andy on 4/13/2017.
 */

import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import DatePicker from "react-16-bootstrap-date-picker";
import dateFormat from 'dateformat';

const Picker = props => <DatePicker {...props} {...props.input} />

const DatepickerInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup bsSize={props.size} style={{zIndex: 999}}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
            <Field
                name={props.name}
                component={Picker}
                showClearButton={false}
                className={"form-control input-" + props.size}
                value={props.value}
            />
            <InputGroup.Button>
                <Button bsStyle="primary" type="submit" style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>
                    <i className="fa fa-check" />
                </Button>
                <Button onClick={props.close} type="submit" bsStyle="default">
                    <i className="fa fa-times" />
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
        : <span>{dateFormat(props.value, props.format)} <i className="fa fa-pencil" onClick={() => props.open()}/></span>
    );
