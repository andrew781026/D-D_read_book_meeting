import React from "react";
import {TextField} from "@material-ui/core";

const TextInput = React.forwardRef((props, ref) => (
    <TextField
        ref={ref}
        fullWidth
        margin="normal"
        variant="filled"
        inputProps={{
            style: {paddingTop: '17px'}
        }}
        {...props}
    />
))

export default TextInput;
