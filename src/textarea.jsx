/**
 * Created by Andy on 4/13/2017.
 */

import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const TextareaInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup bsSize={props.size}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
        </InputGroup>
        <Field name={props.name} type="text" component="textarea" rows={props.rows} className="form-control" value={props.value} />
        <div style={{float: "right"}}>
            <Button bsSize={props.size} bsStyle="primary" type="submit" style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>
                <i className="fa fa-check" /> Save
            </Button>
            <Button bsSize={props.size} onClick={props.close} type="submit" bsStyle="default">
                <i className="fa fa-times" /> Cancel
            </Button>
        </div>
    </form>
);

export const Textarea = connect(
        (state, props) => ({
            isOpen: isOpen(state, props.id),
            rows: props.rows || 5
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
        ? <TextareaInlineEdit
            label={props.label || null}
            name={props.name || "value"}
            initialValues={{[props.name || "value"]: props.value}}
            close={props.close}
            onSubmit={props.save}
            size={props.size || "lg"}
            rows={props.rows}
          />
        : <span>{props.text || props.value} <i className="fa fa-pencil" onClick={() => props.open()}/></span>
    );
