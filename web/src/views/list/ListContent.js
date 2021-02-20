import React, {useState} from "react";
import {Button, Card, CardContent, CardActions, Typography, AppBar, Tab, Tabs} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EventService from "../../services/event";
import Styles from "./ListContent.module.css";

const events = [
    {
        "question": {
            "question": "問題",
            "answer": "回答 - 當作加入此 '讀書會' 的密碼"
        },
        "status": {
            "id": 5,
            "name": "狀態 (發起 . 組建中. 進行中. 已結束)",
            "label": "ended"
        },
        "type": {
            "id": 11,
            "name": "類型 (商業經營 / 投資理財 / 藝術設計 / 生活體驗...)",
            "label": "art"
        },
        "city": "地區 (台北 / 高雄) - 可能先接公開的資料",
        "member_limit": "預定人數 ( ex: 3 - 10 人 )",
        "frequency": "頻率 - (未定 / 單次活動 / 每週一次 ...)",
        "time": "時間 ( 讀書會 - 區間時間 )",
        "comment": "備註 ( 頻率 / 時間 / 人數 )",
        "title": "標題",
        "content": "內文 ( about ) - ( 格式 : markdown 格式 )",
        "create_at": "建立時間 ( 格式 : 毫秒的 Timestamp / 2021-01-22T01:20:17.024+08:00 / 2021-01-22T01:20:17.024Z )",
        "update_at": "最後修改時間",
        "img_url": "圖片 URL - 可用 cloudinary : https://res.cloudinary.com/andrew781026/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1586022982/background/button-bg_xusgay.jpg",
        "tags": [
            "firebase",
            "TypeScript"
        ],
        "members": [
            {
                "user_id": "S017",
                "user_name": "阿低",
                "avatar_url": "頭像 URL",
                "description": "自我描述 - ( 格式 : markdown 格式 )",
                "interest": "興趣書單 / 目標 - 有 '書庫' 的 issue , 可能要跟設計師討論 ",
                "level": "admin"
            },
            {
                "user_id": "S034",
                "user_name": "至七",
                "avatar_url": "頭像 URL",
                "level": "admin"
            },
            {
                "user_id": "S021",
                "user_name": "管長",
                "avatar_url": "頭像 URL",
                "level": "common"
            },
            {
                "user_id": "S007",
                "user_name": "九妹",
                "avatar_url": "頭像 URL",
                "level": "common"
            }
        ]
    }
];

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
        width: '300px'
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
                    <a href="https://www.books.com.tw/products/0010590581" target="_blank" rel="noreferrer">查看 🛵</a>
                </Button>
            </CardActions>
        </Card>
    );
}

function NewCard(props) {

    const event = {
        "question": {
            "question": "問題",
            "answer": "回答 - 當作加入此 '讀書會' 的密碼 => 有後端做驗證"
        },
        "status": {
            "id": 5,
            "name": "狀態 (發起 . 組建中. 進行中. 已結束)",
            "label": "ended"
        },
        "type": {
            "id": 11,
            "name": "類型 (商業經營 / 投資理財 / 藝術設計 / 生活體驗...)",
            "label": "art"
        },
        "city": "地區 (台北 / 高雄) - 可能先接公開的資料",
        "member_limit": "預定人數 ( ex: 3 - 10 人 )",
        "frequency": "頻率 - (未定 / 單次活動 / 每週一次 ...)",
        "time": "時間 ( 讀書會 - 區間時間 )",
        "comment": "備註 ( 頻率 / 時間 / 人數 )",
        "title": "標題",
        "content": "內文 ( about ) - ( 格式 : markdown 格式 )",
        "create_at": "建立時間 ( 格式 : 毫秒的 Timestamp )",
        "update_at": "最後修改時間",
        "img_url": "圖片 URL - 可用 cloudinary : https://res.cloudinary.com/andrew781026/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1586022982/background/button-bg_xusgay.jpg",
        "tags": [
            "firebase",
            "TypeScript"
        ],
        "members": [
            {
                "user_id": "S017",
                "user_name": "阿低",
                "avatar_url": "頭像 URL",
                "description": "自我描述 - ( 格式 : markdown 格式 )",
                "interest": "興趣書單 / 目標 - 有 '書庫' 的 issue , 可能要跟設計師討論 ",
                "level": "admin"
            },
            {
                "user_id": "S034",
                "user_name": "至七",
                "avatar_url": "頭像 URL",
                "level": "admin"
            },
            {
                "user_id": "S021",
                "user_name": "管長",
                "avatar_url": "頭像 URL",
                "level": "common"
            },
            {
                "user_id": "S007",
                "user_name": "九妹",
                "avatar_url": "頭像 URL",
                "level": "common"
            }
        ]
    }

    // 隨機中文文章產生器 - moretext.js - http://more.handlino.com/

    return (
        <div className={Styles.card}>
            <div className={Styles.content}>
                <div className={Styles.flex_1}>
                    <Typography variant="h3" className={Styles.pb_10}>
                        類型 - 商業經營
                    </Typography>
                    <Typography variant="h5" className={Styles.pb_10}>
                        標題 - 要命，隔晚，就尋不出別的原因？
                    </Typography>
                    <Typography variant="h7" className={Styles.pb_10}>
                        內文 :
                        看似完美，呵呵、甚至他沒有出席過任何一堂課、呵呵，呵呵、甚至他沒有出席過任何一堂課、呵呵，但從頭到尾那些網頁也不是他自己寫的，在學期末之後，請他的交通大學資訊工程系朋友幫忙他，請他的交通大學資訊工程系朋友幫忙他，我是網頁設計課的同學，老師好；老師好，甚至他沒有出席過任何一堂課。我什麼都不要，ㄟ那就結婚吧；前世的五百次回眸，如果是真的，如果是真的，現在我不敢肯定，ㄟ那就結婚吧；前世的五百次回眸，請允許我，我沒有妳會死，如果是真的，我沒有妳會死，照顧你生命中的每一天，但我可以肯定地告訴你，你是世界上最幸福的人，讓我的存在帶給你快樂。不然不曉得奮鬥，女孩富著養，樹不要皮，打你的娃！請他的交通大學資訊工程系朋友幫忙他，甚至他沒有出席過任何一堂課；甚至他沒有出席過任何一堂課，看似完美，看似完美，同學一整學期沒有上過任何課，請他的交通大學資訊工程系朋友幫忙他，甚至他沒有出席過任何一堂課。母體主機系統，說夠了沒，右左右左下上下上左右，咦，這個月的房租，、橋歸橋，；奧魯，、學長…不對，真是沒禮貌耶，、哎唷，另一方面，、快點進行下集預告，恭喜，；不斷重複地播放，不愧是達令，不只是這樣而己，師傅呢，；故意的，痛苦，喂！那就來一顆榴槤；你哼著，新的大頭照，你靜靜，只為了訓練我堅強、隨著你離去，密密麻麻，月光找到了海­洋、我想跟你凱薩加沙茶，顯露所有鋒芒，含著眼淚，你說鬥牛脾氣非常差，新的朋友舊的朋友，散場，我就是我自己的神，突然好想跟你去烤肉，我哼著，已習慣忽略，你會在哪裡，改變既有的模式！
                    </Typography>
                </div>
                <div className={Styles.cardAction}>
                    <span>已有三人加入</span>
                    <Button variant="contained" color="primary">
                        修改描述
                    </Button>
                    <Button variant="contained" color="primary">
                        成立
                    </Button>
                </div>
            </div>
            <img className={Styles.img} src="https://picsum.photos/300/400?random=1" alt="照片-書/主題相關的照片"/>
        </div>
    );
}

// 招募中 or 進行中的列表
const RunningList = ({events = []}) => {

    const classes = useStyles();

    console.log('events=', events)

    return (
        <>
            <Typography className={classes.description} variant="h3">
                招募中活動
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
                <NewCard/>
                <NewCard/>
                <NewCard/>
            </div>
            <Typography className={classes.description} variant="h3">
                進行中活動
            </Typography>
        </>
    )
};

// 已結束
const EndedList = () => {

    const classes = useStyles();

    return (
        <>
            <Typography className={classes.description} variant="h3">
                活動列表
                // 進行中
                // 已結束
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
        </>
    )
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

const Content = function () {

    const classes = useStyles();

    const events = EventService.listEvent();
    console.log('events=', events)

    const [showType, setShowType] = useState(0);

    const changeType = (event, newValue) => setShowType(newValue);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={showType} onChange={changeType}>
                    <Tab label="進行中"/>
                    <Tab label="已結束"/>
                </Tabs>
            </AppBar>
            <TabPanel value={showType} index={0}>
                <RunningList/>
            </TabPanel>
            <TabPanel value={showType} index={1}>
                <EndedList/>
            </TabPanel>
        </div>
    )
}

export default Content;
