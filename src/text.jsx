/**
 * Created by Andy on 4/13/2017.
 */

import React from "react";
import {isOpen, open, close} from "atp-inline-edit";
import {FormGroup, FormControl, Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const TextInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup>
            <Field name="value" type="text" component="input" className="form-control" value={props.value} />
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
        ? <TextInlineEdit initialValues={{value: props.value}} close={props.close} onSubmit={props.save} />
        : <span>{props.text || props.value} <i className="fa fa-pencil" onClick={() => props.open()}/></span>
    );
