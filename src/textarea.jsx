
import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Icon} from 'react-font-awesome-5';

const TextareaInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup bsSize={props.size}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
        </InputGroup>
        <Field name={props.name} type="text" component="textarea" rows={props.rows} className="form-control" value={props.value} />
        <div style={{float: "right"}}>
            <Button bsSize={props.size} bsStyle="link" type="submit" style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>
                <span className="text-success"><Icon.Check /> Save</span>
            </Button>
            <Button bsSize={props.size} onClick={props.close} type="submit" bsStyle="link">
                <span className="text-danger"><Icon.Times /> Cancel</span>
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
        : <span onClick={() => props.open()}>
            {props.text || props.value || <em>{props.placeHolder || "Nothing to see here."}</em>}
            <Icon.PencilAlt />
          </span>
    );
