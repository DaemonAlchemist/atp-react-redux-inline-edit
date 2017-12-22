
import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Icon} from 'react-font-awesome-5';

const TextInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup bsSize={props.size} style={{zIndex: 999}}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
            <Field name={props.name} type="text" component="input" className="form-control" value={props.value} />
            <InputGroup.Button>
                <Button bsStyle="primary" type="submit" style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>
                    <Icon.Check />
                </Button>
                <Button onClick={props.close} type="submit" bsStyle="default">
                    <Icon.Times />
                </Button>
            </InputGroup.Button>
        </InputGroup>
    </form>
);

export const Text = connect(
        (state, props) => ({
            isOpen: isOpen(state, props.id)
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
        ? <TextInlineEdit
            label={props.label || null}
            name={props.name || "value"}
            initialValues={{[props.name || "value"]: props.value}}
            close={props.close}
            onSubmit={props.save}
            size={props.size || "lg"}
          />
        : <span onClick={() => props.open()}>
            {props.text || props.value || <em>{props.placeHolder || "No value"}</em>}
            &nbsp;<Icon.PencilAlt />
          </span>
    );
