import React from "react";
import {Button, Card, CardContent, CardActions, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EventService from "../../services/event";

const useStyles = makeStyles(theme => ({
    root: {
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 64px)',
        [theme.breakpoints.down('xs')]: {
            maxHeight: 'calc(100vh - 56px)',
        },
    },
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

const useSimpleCardStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: '0 0 5px 2px rgba(0,0,0,0.2)',
        margin: '20px'
    },
});

function SimpleCard(props) {
    const classes = useSimpleCardStyles();

    const formatTime = time => {

        const dateTime = new Date(time);

        return `${dateTime.getFullYear()}年${dateTime.getMonth() + 1}月${dateTime.getDate()}日 ${dateTime.getHours()}時${dateTime.getMinutes()}分`
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {props.title}
                </Typography>
                <Typography variant="h5" component="h2">
                    活動時間 : {props.time}
                </Typography>
                <Typography>
                    活動地點 : {props.place}
                </Typography>
                <Typography variant="body2" component="p">
                    活動內容 : {props.describe}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <a href="https://www.books.com.tw/products/0010590581" target="_blank">查看 🛵</a>
                </Button>
            </CardActions>
        </Card>
    );
}

const Content = function () {

    const classes = useStyles();

    const events = EventService.listEvent();
    console.log('events=', events)

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h2">
                歡迎來到 "讀書會之家" 😊
            </Typography>
            <Typography className={classes.description} variant="h3">
                活動列表
            </Typography>
            <div className={classes.container}>
                {
                    events.map(evt => (
                        <SimpleCard
                            title={evt.title}
                            time={evt.time}
                            place={evt.place}
                            describe={evt.describe}
                        />
                    ))
                }
                <SimpleCard
                    title="哈佛這樣教談判力：增強優勢，談出利多人和的好結果"
                    time="2021-01-30T05:22:31.00+08:00"
                    place="台北車站"
                    describe="志琪 77 介紹的書籍 : '哈佛這樣教談判力：增強優勢，談出利多人和的好結果'"
                />
                <SimpleCard
                    title="哈佛這樣教談判力：增強優勢，談出利多人和的好結果"
                    time="2021-01-30T05:22:31.00+08:00"
                    place="台北車站"
                    describe="志琪 77 介紹的書籍 : '哈佛這樣教談判力：增強優勢，談出利多人和的好結果'"
                />
                <SimpleCard
                    title="哈佛這樣教談判力：增強優勢，談出利多人和的好結果"
                    time="2021-01-30T05:22:31.00+08:00"
                    place="台北車站"
                    describe="志琪 77 介紹的書籍 : '哈佛這樣教談判力：增強優勢，談出利多人和的好結果'"
                />
            </div>
        </div>
    )
}

export default Content;