import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField, Typography, Button} from '@material-ui/core';

// react-router
import {useHistory} from "react-router-dom";

// services
import EventService from "../../services/event";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        maxWidth: '80%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '60%',
        },
    },
    label: {
        width: '150px',
        margin: '10px',
        fontSize: '30px',
        textAlign: 'right',
    },
    description: {
        borderLeft: '5px solid black',
        marginLeft: '8px',
        padding: '15px',
        backgroundColor: '#3ce2fa',
        width: '250px'
    },
    title: {
        lineHeight: '150px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '40px',
            fontWeight: '900'
        },
    },
    button: {
        margin: '20px',
        width: 'calc(80% + 160px)',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(60% + 160px)',
        },
    }
}));

const addEvent = (history, {title, time, place, describe}) => {

    const event = {title, time, place, describe};
    EventService.insertEvent(event);

    history.push("/list");
}

const Content = function () {

    const classes = useStyles();
    const labels = ['主題(標題)', '時間', '地點', '描述'];
    const names = ['title', 'time', 'place', 'describe'];
    const history = useHistory();

    // 宣告一個新的 state 變數，我們稱作為「count」。
    const [state, setState] = useState({});

    const handleChange = e => {
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log('state=', state);
    };

    return (
        <React.Fragment>
            <Typography className={classes.title} variant="h2">
                歡迎來到 "讀書會之家" 😊
            </Typography>
            <Typography className={classes.description} variant="h3">
                新增活動
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">

                {labels.map((label, index) => {

                    return (
                        <div key={label} className={classes.container}>
                            <span className={classes.label}>{label}</span>
                            <TextField
                                name={names[index]}
                                className={classes.textField}
                                onChange={handleChange}
                                label={label}
                                fullWidth
                                margin="normal"
                                variant="filled"
                            />
                        </div>
                    )
                })}

                <Button className={classes.button} fullWidth size="large" variant="contained" color="primary"
                        onClick={() => {

                            addEvent(history, state);
                        }}>
                    建立 "新的讀書會"
                </Button>
            </form>
        </React.Fragment>
    )
}

export default Content;