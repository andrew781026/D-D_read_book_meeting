import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField, Typography, Button} from '@material-ui/core';

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

const Content = function () {

    const classes = useStyles();
    const labels = ['主題(標題)', '時間', '地點', '描述'];

    return (
        <React.Fragment>
            <Typography className={classes.title} variant="h2">
                歡迎來到 "讀書會之家" 😊
            </Typography>
            <Typography className={classes.description} variant="h3">
                新增活動
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">

                {labels.map(label => {

                    return (
                        <div key={label} className={classes.container}>
                            <span className={classes.label}>{label}</span>
                            <TextField
                                id="filled-basic"
                                className={classes.textField}
                                label={label}
                                fullWidth
                                margin="normal"
                                variant="filled"
                            />
                        </div>
                    )
                })}

                <Button className={classes.button} fullWidth size="large" variant="contained" color="primary">
                    建立 "新的讀書會"
                </Button>
            </form>
        </React.Fragment>
    )
}

export default Content;