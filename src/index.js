/**
 * Created by Andy on 4/13/2017.
 */

import inlineEdit from "./reducer/inline-edit";
import {open, close, isOpen} from "./reducer/inline-edit";
import {Text} from "./text";

export default {
    reducers: {
        inlineEdit
    }
};

const InlineEdit = {Text};

export {InlineEdit, open, close, isOpen};