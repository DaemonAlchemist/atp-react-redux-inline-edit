
import React from "react";
import {isOpen, open, close} from "./reducer/inline-edit";
import {Button, InputGroup} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import RichTextEditor from 'react-rte';
import marked from "marked";
import {Icon} from 'react-font-awesome-5';

class RichText extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: undefined }
    }

    componentDidMount() {
        this.setState({
            value: this.props.input.value ?
                RichTextEditor.createValueFromString(this.props.input.value, 'markdown') :
                RichTextEditor.createEmptyValue()
        })
    }

    handleChange(value) {
        this.setState({ value })
        let markdown = value.toString('markdown')
        if(markdown.length === 2 && markdown.charCodeAt(0) === 8203 && markdown.charCodeAt(1) === 10) {
            markdown = ''
        }
        this.props.input.onChange(markdown)
    }

    render() {
        if(!this.state.value) return null;

        return <RichTextEditor
            value={this.state.value}
            autoFocus
            onChange={this.handleChange.bind(this)}
        />
    }
}

const WysiwygInlineEdit = reduxForm({
    form: 'inline-edit-text'
})(props =>
    <form onSubmit={props.handleSubmit} style={{color: "#000000"}}>
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
            <Button bsSize={props.size} bsStyle="link" type="submit">
                <span className="text-success"><Icon.Check /> Save</span>
            </Button>
            <Button bsSize={props.size} onClick={props.close} type="submit" bsStyle="link">
                <span className="text-danger"><Icon.Times /> Cancel</span>
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
            <div
                dangerouslySetInnerHTML={{
                    __html: marked(props.text || props.value || "*" + (props.placeHolder || "Nothing to see here") + "*")
                }}
                style={{paddingRight: "16px"}}
            />
                <Icon.PencilAlt style={{position: "absolute", top: "3px", right: "0"}}/>
            </div>
    );
