
import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Icon} from 'react-font-awesome-5';
import Style from 'style-it';

const TextInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit} style={{verticalAlign: "bottom", margin: "-1px", display: props.inline ? "inline-block" : "block"}}>
        <InputGroup bsSize={props.size} style={{zIndex: 999}}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
            <Field name={props.name} type="text" component="input" className="form-control" value={props.value} />
            <InputGroup.Button>
                <Button bsStyle="link" type="submit" style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}>
                    <span className="text-success"><Icon.Check /></span>
                </Button>
                <Button onClick={props.close} type="submit" bsStyle="link">
                    <span class="text-danger"><Icon.Times /></span>
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
            inline={props.inline}
          />
        : <span>
            <Style>{`
                .inlineEditText {
                    border: solid 1px rgba(1,1,1,0);
                    position: relative;
                }
                .inlineEditText:hover {
                    border: solid 1px rgba(255,255,255,0.25);
                    background: rgba(255,255,255,0.1);
                }
                .inlineEditText svg {
                    display: none;
                }
                .inlineEditText:hover svg {
                    display: block;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    color: #fff;
                    font-size: small;
                    width: 16px;
                    heightL 16px;
                    padding: 2px;
                    vertical-align: top;
                }
            `}</Style>
            <span className="inlineEditText" onClick={() => props.open()}>
                {props.text || props.value || <em>{props.placeHolder || "No value"}</em>}
                <Icon.PencilAlt />
            </span>
          </span>
    );
