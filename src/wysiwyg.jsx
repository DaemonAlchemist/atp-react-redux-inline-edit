/**
 * Created by Andy on 4/13/2017.
 */

import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import RichTextEditor from 'react-rte';
import marked from "marked";

class RichText extends React.Component {
    constructor(props) {
        super(props);
        console.log("rich text constructor")
        this.state = { value: undefined }
    }

    componentDidMount() {
        console.log("rich text did mount");
        console.log(this.props.input);
        this.setState({
            value: this.props.input.value ?
                RichTextEditor.createValueFromString(this.props.input.value, 'markdown') :
                RichTextEditor.createEmptyValue()
        })
    }

    handleChange(value) {
        console.log("rich text handleChange");
        this.setState({ value })
        let markdown = value.toString('markdown')
        if(markdown.length === 2 && markdown.charCodeAt(0) === 8203 && markdown.charCodeAt(1) === 10) {
            markdown = ''
        }
        this.props.input.onChange(markdown)
    }

    render() {
        if(!this.state.value) return null;
        console.log("rich text render");
        return <RichTextEditor
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
        />
    }
}

const WysiwygInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit}>
        <InputGroup bsSize={props.size}>
            {props.label && <InputGroup.Addon>{props.label}</InputGroup.Addon>}
        </InputGroup>
        <Field
            name={props.name}
            type="text"
            component={RichText}
            rows={props.rows}
            className="form-control"
            value={props.value}
        />
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

export const Wysiwyg = connect(
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
        ? <WysiwygInlineEdit
            label={props.label || null}
            name={props.name || "value"}
            initialValues={{[props.name || "value"]: props.value}}
            close={props.close}
            onSubmit={props.save}
            size={props.size || "lg"}
            rows={props.rows}
          />
        : <div onClick={() => props.open()} style={{position: "relative"}}>
            <div dangerouslySetInnerHTML={{__html: marked(props.text || props.value || "*Nothing to see here*")}} style={{paddingRight: "16px"}} />
            <i className="fa fa-pencil" style={{position: "absolute", top: "3px", right: "0"}}/>
          </div>
    );
