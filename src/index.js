/**
 * Created by Andy on 4/13/2017.
 */

import inlineEdit from "./reducer/inline-edit";
import {open, close, isOpen} from "./reducer/inline-edit";
import {Text} from "./text";
import {Textarea} from "./textarea";
import {Datepicker} from "./date-picker";
import {Toggle} from './toggle';
import {Wysiwyg} from "./wysiwyg";

export default {
    reducers: {
        inlineEdit
    }
};

const InlineEdit = {Text, Textarea, Datepicker, Toggle, Wysiwyg};

export {InlineEdit, open, close, isOpen};
