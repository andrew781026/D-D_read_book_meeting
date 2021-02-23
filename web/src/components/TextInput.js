import React from "react";
import {TextField} from "@material-ui/core";

const TextInput = props => (
    <TextField
        fullWidth
        margin="normal"
        variant="filled"
        inputProps={{
            style: {paddingTop: '17px'}
        }}
        {...props}
    />
)

export default TextInput;
