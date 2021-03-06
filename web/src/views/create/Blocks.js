import React from "react";
import Styles from "./CreateContent.module.css";
import {Controller} from "react-hook-form";
import TextInput from "../../components/TextInput";
import {FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";

export const InputBlock = ({label, placeholder, width, name, errors, rules, control}) => (
    <div className={Styles.cell} style={{width}}>
        <span className={Styles.label}>{label}</span>
        <div>
            <Controller rules={rules}
                        control={control} defaultValue=""
                        placeholder={placeholder}
                        as={TextInput} name={name}/>
            <p style={{color: 'red', margin: '0 0 6px 0'}}>{errors[name]?.message}</p>
        </div>
    </div>
)

export const SelectBlock = ({
                                defaultValue,
                                label,
                                placeholder,
                                width,
                                name,
                                errors,
                                rules,
                                control,
                                items = [{}]
                            }) => (
    <div className={Styles.cell} style={{width}}>
        <span className={Styles.label}>{label}</span>
        <div>
            <Controller
                control={control}
                rules={rules}
                name={name}
                render={(
                    { onChange, onBlur, value, name, ref },
                    { invalid, isTouched, isDirty }
                ) => (
                    <FormControl variant="outlined" style={{minWidth: '200px'}}>
                        <InputLabel>{placeholder}</InputLabel>
                        <Select
                            label={placeholder}
                            defaultValue={defaultValue}
                            value={value}
                            onChange={onChange}
                        >
                            {items.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                )}
            />
            <p style={{color: 'red', margin: '0 0 6px 0'}}>{errors[name]?.message}</p>
        </div>
    </div>
)

