import React, {useState} from "react";
import {Button, Typography, Tab, Tabs, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EventService from "../../services/event";
import Styles from "./ListContent.module.css";

/*
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
 */

const useStyles = makeStyles(theme => ({
    list: {
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 64px - 48px)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
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
        margin: '20px',
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

function NewCard(props) {

    // 隨機中文文章產生器 - moretext.js - http://more.handlino.com/

    return (
        <div className={Styles.card}>
            <div className={Styles.content}>
                <div className={Styles.flex_1}>
                    <Typography variant="h3" className={Styles.pb_10}>
                        {props.type}
                    </Typography>
                    <Typography variant="h5" className={Styles.pb_10}>
                        {props.title}
                    </Typography>
                    <Typography className={`${Styles.mb_10} ${Styles.three_line_truncate}`}>
                        {props.content}
                    </Typography>
                </div>
                <div className={Styles.cardAction}>
                    <span>已有 {props.members?.length} 人加入</span>
                    <Button variant="contained" color="primary">
                        修改描述
                    </Button>
                    <Button variant="contained" color="primary">
                        成立
                    </Button>
                </div>
            </div>
            <img className={Styles.img} src={props.img_url} alt="照片-書/主題相關的照片"/>
        </div>
    );
}

const ActivityList = ({title = '', activities = []}) => {

    const classes = useStyles();

    return (
        <>
            <Typography className={classes.description} variant="h3">
                {title}
            </Typography>
            <div className={classes.container}>
                {activities.map(activity => <NewCard key={`activity-${activity.uuid}`} {...activity} />)}
            </div>
        </>
    )
}

// 招募中 or 進行中的列表
const RunningList = ({prepare = [], running = []}) => {

    return (
        <>
            <ActivityList title='招募中活動' activities={prepare}/>
            <ActivityList title='進行中活動' activities={running}/>
        </>
    )
};

// 已結束
const EndedList = ({ended = []}) => <ActivityList title='過去的活動' activities={ended}/>

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

    const activities = {
        prepare: [
            {
                uuid: '02982f96-6afa-414f-8e00-2d3d4bc27448',
                type: '類型',
                title: '標題',
                content: '內文',
                members: [],
                img_url: 'https://picsum.photos/300/400?random=1',
            },
            {
                uuid: 'd1e42cfb-1e5e-4d71-b1df-4405b4fb93bc',
                type: '職場生存',
                title: '要命，隔晚，就尋不出別的原因？',
                content: '看似完美，呵呵、甚至他沒有出席過任何一堂課、呵呵，呵呵、甚至他沒有出席過任何一堂課、呵呵，但從頭到尾那些網頁也不是他自己寫的，在學期末之後，請他的交通大學資訊工程系朋友幫忙他，請他的交通大學資訊工程系朋友幫忙他，我是網頁設計課的同學，老師好；老師好，甚至他沒有出席過任何一堂課。我什麼都不要，ㄟ那就結婚吧；前世的五百次回眸，如果是真的，如果是真的，現在我不敢肯定，ㄟ那就結婚吧；前世的五百次回眸，請允許我，我沒有妳會死，如果是真的，我沒有妳會死，照顧你生命中的每一天，但我可以肯定地告訴你，你是世界上最幸福的人，讓我的存在帶給你快樂。不然不曉得奮鬥，女孩富著養，樹不要皮，打你的娃！請他的交通大學資訊工程系朋友幫忙他，甚至他沒有出席過任何一堂課；甚至他沒有出席過任何一堂課，看似完美，看似完美，同學一整學期沒有上過任何課，請他的交通大學資訊工程系朋友幫忙他，甚至他沒有出席過任何一堂課。母體主機系統，說夠了沒，右左右左下上下上左右，咦，這個月的房租，、橋歸橋，；奧魯，、學長…不對，真是沒禮貌耶，、哎唷，另一方面，、快點進行下集預告，恭喜，；不斷重複地播放，不愧是達令，不只是這樣而己，師傅呢，；故意的，痛苦，喂！那就來一顆榴槤；你哼著，新的大頭照，你靜靜，只為了訓練我堅強、隨著你離去，密密麻麻，月光找到了海­洋、我想跟你凱薩加沙茶，顯露所有鋒芒，含著眼淚，你說鬥牛脾氣非常差，新的朋友舊的朋友，散場，我就是我自己的神，突然好想跟你去烤肉，我哼著，已習慣忽略，你會在哪裡，改變既有的模式！',
                members: [{}, {}, {}],
                img_url: 'https://picsum.photos/300/400?random=2',
            },
            {
                uuid: '62176b36-0666-4143-a059-957cce23583e',
                type: '宗教信仰',
                title: '還不賴，還不賴，還不賴？',
                content: '感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！小學生遜大陸，曼城主場連勝，Pro，10年債得標利率，南投鹿神祭，兩岸/臺北兩岸和平發展論壇：鞏固九二共識，蘇打綠連兩天破蛋，10KM超越三人，宿舍門禁卡壞，《鬼滅》不只手遊，富者越富卻是為何？波蘭火車相撞事故已致16死58傷，陶冬：希債稍緩，朴敏英化身短髮俏護士，Mana》釋出體驗版，3，國內油價連3漲，英日台語全用上，華為發布Ascend，《電腦設備》華擎Q2不看淡，兩會前夕，主人惡作劇，3D，黨改啟動曾永權與黨內會商。感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…會中假想中國與日本因為釣魚台發生戰事，Air展示機，請收拾好心情，遠比上Google搜尋更有效率，世界最矮的男人，以為幫別人求婚，我相信我此生都不會跟他們有交集的...一定不會有的，總裁~~不三思嗎?!正想說要不要投訴一下...今天就報出來...AV女優大學開講，這個要打馬嗎？感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！',
                members: [{}, {}],
                img_url: 'https://picsum.photos/300/400?random=3',
            },
            {
                uuid: '880926a2-9d8a-4a06-b11c-9b38b73ecd5c',
                type: '心理勵志',
                title: '容易；生活，一旦累死了，OK？',
                content: '失眠只怪罪喝过量咖啡---萧亚轩，白馬-東方之星-數位全釉拋石英磚，可是唱片只有這一盤嗎？未被判侵權，中港E型肝炎病例增，小戴超威，蒙地卡羅網賽／苦吞19記ACE，店家：師大走味，熱門話題－籠飼蛋雞，《鬼滅》不只手遊，台紐政府基金，烏坎村選舉落幕，杉林溪吉野櫻盛開，中職／6局飆11K，陶冬：希債稍緩，水手官網專訪，近兩年最大，級別對不上，台灣最新英語能力表現報告！荊棘刺入了行路人的脛踝，偶爾記起斷片的音調，我拉著他的手，她們又講你怎樣喜歡拿著一根短棍站在桌上摹仿音樂會的導師，永遠鏤上了我的心版。喝了杯咖啡，跟喝中药一样，第一次喝就愛上那個味，見過我這麼忙的人嗎？吃面包喝咖啡、新的一天；吃了水餃6顆，我不敢带咖啡去学校喝了=.=我做完考卷要睡觉睡不着很痛苦==，”女的说：“太好了，对男的说：“到我家里喝杯咖啡再走吧。更不是一種高深空洞的理念，這個世界不是因為你能做什麼，創業者的激情有的在表面上，小企業有大的胸懷，每一筆生意必須掙錢，一個公司小白兔多了以後，請了一大堆人幫你做，由於你解決了以後會逐漸傳出去，什麼是團隊呢？',
                members: [{}, {}, {}, {}, {}],
                img_url: 'https://picsum.photos/300/400?random=4',
            },
        ],
        running: [
            {
                uuid: '08783eea-84b1-4426-b551-3dc9788b5642',
                type: '類型',
                title: '標題',
                content: '內文',
                members: [],
                img_url: 'https://picsum.photos/300/400?random=5',
            },
            {
                uuid: '74ed7d56-c722-4257-ad39-858ab49e7c6a',
                type: '飲食健康',
                title: '呵呵；呵呵，看似完美，…',
                content: '噢，焉知非福，隔壁部門主管貢，透理血气，【預告】明天2/24會上傳新刊預購資料，在一家白色的咖啡廳裡，我就可以丟下巨重包包，他媽的不長進，于是吵起来了……剛慢跑完就下大雨，やすことドライブなう♪♪寺門ん家→門井ん家→小山ん家→川商→台中→台南→舊小山ん家→小山ん家→西武ドーム！他絕對是個傳奇人物，但記者訪問時，我無法相信弗格森爵士真的退休了，...，眼明手快，我真的笑了，中央氣象局長辛在勤表示，陳之藩肺炎病逝香港。永遠記住每次成功都可能導致你的失敗，你應該做的不是去挑戰它，千萬別告訴別人，一個一流的創意，但它只是一環，領導力在順境的時候，最大的挑戰和突破在於用人，一個創業者最重要的，很多人失敗的原因不是錢太少，做小了，創意是企業運營中一個很重要的一環，沒有一個良好的過程，…甚至他沒有出席過任何一堂課，看似完美，看似完美，呵呵；呵呵，看似完美，同學一整學期沒有上過任何課，我是網頁設計課的同學，呵呵；呵呵，甚至他沒有出席過任何一堂課，同學一整學期沒有上過任何課，架構了一個網站寫好原始碼之後過來打分數，呵呵；呵呵，呵呵、甚至他沒有出席過任何一堂課。自从海处开始煮咖啡以后，20年来不吃的起司，買了個越南壺，早上花₩2750買咖啡，鴨肉便輕而易舉地撕下…慢慢嚼，不知道是真装修还是关门了……唉。感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…',
                members: [{}, {}, {}],
                img_url: 'https://picsum.photos/300/400?random=6',
            },
            {
                uuid: 'a95a6859-88a1-43f1-93e9-3036e7b23761',
                type: '宗教信仰',
                title: '奇蹟，只要將實物立體掃描之後。',
                content: '你決定不恨了也決定不愛了、時間不肯快走，淚眼開了一扇窗；我哼著，我哼著，我們像一首最美麗的歌曲，該過去就過去，改變既有的模式！自己走出家來，黑暗的氣氛愈加濃厚起來，就使我發生了許多疑問，了。還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？我身邊的朋友們啊，但又找不到出路．早起的鳥兒有蟲吃，不怕虎一樣的敵人，念了十幾年書，但又找不到出路．早起的鳥兒有蟲吃，女人之美，如果有錢也是一種錯，請你以後不要在我面前說英文了，睡你的老公，如果有錢也是一種錯，樹不要皮，不然不曉得奮鬥，在於蠢的無怨無悔，工作，我的衣服又瘦了！以及為什麼會發生的原因，總是對於他們不喜歡的新政策大聲抱怨，有另外兩個看其他傳統產業的分析師，我們常常讀到黑暗面，有空打個電話給她，那假設你是台灣政治人物，而他想幫我介紹一下，但最重要的，他們回來，不留遺憾，為了成功，沒錯！在學期末之後，架構了一個網站寫好原始碼之後過來打分數，甚至他沒有出席過任何一堂課，但從頭到尾那些網頁也不是他自己寫的，呵呵；呵呵，…',
                members: [{}, {}],
                img_url: 'https://picsum.photos/300/400?random=7',
            },
            {
                uuid: '21244e85-7c13-406b-9767-2dfa8dc8b39b',
                type: '創業聖經',
                title: '是制度，一個成功的創業者，…',
                content: '盾牌，機械Nyororo，我想想，；別擔心啦，讓你們逛街的時候，、你，、真是命大，全體成員，；在我浪費時間之際，；別過來，；我去的話，各位成員，妳快抄小路，說什麼避難，；游游，不用你說，、紅色也很熱情，麻煩舉著這個，、還有小母豹，、當然好，；月神，；我要血，；果然不能憋尿是也。也是你最大的財富，永遠要把對手想得非常強大，必須先去了解市場和客戶的需求，沒有一個良好的過程，做企業不是做俠客，什麼是團隊呢？或痛，我，還要被懲罰呢；消失在離去的地平線，」中斷，對著每個人說撒哇低咖，我站在終點的面前，一度剝落了的青春，愛我的人別緊張，你靜靜忍著緊緊把昨天在拳心握著；想念如果會有聲音，當時心願；隨著你離去，再見吧天長地久；我，夜容易特別黑；而回憶越是甜，心容易悄悄破碎，改變既有的模式！中職》二軍開幕戰扛4番雙響，曼城主場連勝，in，淡水低溫開唱，薄熙來棄紅，父離家十多年，開推土機衝火場，雞牛夾攻馬政府，總統二度召開國安會議，Mana》釋出體驗版，武漢肺炎》連2日新增境外移入確診，超正！沒有突破，以商業的形式執行，永遠把別人對你的批評記在心裡，請了一大堆人幫你做，一定要記住重點突破，你的項目感覺是一個生意，有時候你的心在哪裡，必須跟風險投資共擔風險，這個世界不是因為你能做什麼，小企業有大的胸懷，別人的表揚，永遠把別人對你的批評記在心裡，地不怕，什麼是團隊呢？投資在研發創新，你必須意識到這一點，總是很認真努力、念最好的高中，經濟已經卡住好幾年了，你能想像在好幾年的嘗試後，或許可能還單身，沒有針對亞洲的長期戰略，大多四五十歲上下，我們應該歡迎最優秀的人才，過去四年和我們一同做事。',
                members: [{}, {}, {}, {}, {}],
                img_url: 'https://picsum.photos/300/400?random=8',
            },
        ],
        ended: [
            {
                uuid: '3ac1064a-1529-4f1b-aecb-a691019f7385',
                type: '類型',
                title: '標題',
                content: '內文',
                members: [],
                img_url: 'https://picsum.photos/300/400?random=9',
            },
            {
                uuid: '16f9cccd-7855-46c2-8cde-f4494fcf757d',
                type: '心靈雞湯',
                title: '記住，你拿到的可能性會更大。',
                content: '一條孤單的走廊，你的笑只是你穿的保護色、如果相識，全都一個樣；你的身影閃過月台間，還是要勉強自己，看到了我的翅膀，每一天，人群推擠將我向前，緊緊把昨天在拳心握著；幸福，殊途同歸？讓事情簡單一點：我愛我的城市，左邊，看著窗外的圓山大飯店，不管是好是壞，在這之後，所以如果公司成功了，比如說學生社團、工作、友情、或甚至追尋夢想都一樣：盡你所能，好吧，我所有的同學和我在大學第一天就發現，很巧，我走上車，很妙的，你越會了解我們每天追逐爭執的這些東西有多不重要。妳幹嘛臉紅啊，；吵死了，；己經匯到您指定的帳號，；不對，、我被咬了一口，還有什麼，現在怎麼辦，；看來，開始囉，、等…等一下，；對不起啦，夏美回來後，不用介意，；晚飯做好了，；二獎，子彈，、況且，；請您多加油啊，轉寄，；是姊姊跟…Giroro。ㄟ那就結婚吧、現在已經過了人生的四分之一，你是世界上最幸福的人，現在我不敢肯定，ㄟ那就結婚吧，請允許我，我沒有妳會死，我誰都不要，前世的五百次回眸，請允許我，我什麼都不要，讓妳做我一生的公主吧！你會在台灣餐飲界留下名聲，但這就是重點：最終，說他今天下午會和一個老朋友喝咖啡，而加上晚上這場雪，沒錯，各種類型的補習班，他們總是假設：喔，我的電腦出現熟悉的Skype來電音樂，是否有興趣當醫生；有30％的人說他們完全沒興趣，我們總是會受傷嗎？戰略不等於結果，蒙牛不是策劃出來的，聰明是智慧者的天敵，你的路可能就走偏掉。',
                members: [{}, {}, {}],
                img_url: 'https://picsum.photos/300/400?random=10',
            },
            {
                uuid: 'd4a12297-6286-4192-af1a-0d85d39e8d47',
                type: '眼睛保健',
                title: '乾眼症嚴重可致失明，歷史次低。',
                content: '還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？也是要值得保存的才定為古蹟，所以實現正義一定要披荊斬棘，我們中華民國是獨立的國家，為何一個翁奇楠槍擊案、一個連勝文槍擊案，如果能夠通過可行性評估，多年前就被熱烈討論過，已經有法律了，委員要選哪一種？你應該脫下你穿的保護色；我站在你左側，拍張照片，按怎攏想袂曉妳的心留袂條、那，然後這麼說：「那未知的；愛的氣球輕輕墜落、捕捉水中的月亮，沒有人願意丟下你不管；重複在被遺忘的邊緣；關了燈，然後留下，殊途同歸？也剛好是台幣100==(1:36)早上喝著咖啡，叫化雞，中午連瞇一會的地方都沒有，就開始挑咖啡豆了⋯⋯、剛慢跑完就下大雨，^_^；说实在的，捨てる神あれば拾う神ありだ。容易；生活，那麼你至少得吃一對兒鯨魚……爺爺都是從孫子走過來的……愛情就像二個拉著橡皮筋的人，天哪，睡你的老公，樹不要皮，但又找不到出路．早起的鳥兒有蟲吃，必死無疑；人不要臉，錢對你來說真的就那麼重要嗎？一旦累死了，我們常常衝著鏡子做鬼臉，一旦累死了，念了十幾年書，然後選中一張百元大鈔，一旦累死了，錢不是問題，容易；活，愛情，講了三個多小時了一分錢都不降？你就會在青草裡坐地仰臥，我問為什麼，或是看見小貓追他自己的尾巴，',
                members: [{}, {}],
                img_url: 'https://picsum.photos/300/400?random=11',
            },
            {
                uuid: '34c66de8-4852-4f9e-9875-f5818452caf9',
                type: '學習方法',
                title: '現在的民主則是不同價值觀的對話。',
                content: '今天跟一位大哥好朋友學習，預估搖晃時間長達20-30秒，家里正好没咖啡了！如果多吃魚可以補腦讓人變聰明的話，樹不要皮，再不對你好點，就會有別的女人花你的錢，沒有錢，我想早戀，老闆，男孩窮著養，女孩富著養，但又找不到出路．早起的鳥兒有蟲吃，就怕豬一樣的隊友。會中假想中國與日本因為釣魚台發生戰事，不只是上班族女孩，國安人士透露，大一生抽刀，傳陳冠希示愛，駕駛無傷。《金融》保險業持股，Fridays法樂琪，、5D，《鬼滅》不只手遊，熱門話題－籠飼蛋雞，級別對不上，《金融》保險業持股，主人惡作劇，徐若瑄首戰台語歌，扁戒護就醫，級別對不上，到銅鑼看杭菊!，6旬病翁撞火車亡，搞不懂穿戴裝置？我現在準備要去刮痧；重複在被遺忘的邊緣，好想有誰能出現、在充滿你的回憶裡面，突然好想跟你去烤肉；為何我們還是要奔向各自的幸福和遺憾中老去、真的捨不得你的溫柔、燦爛而直接，卻像隔著銀河，改變既有的模式！他幫我介紹了兩個同事，但那些具體的細節並不是很重要，在我們走之前，到那時，如果台灣最好的學生都是被這樣教，為了要和新的人才見面，他幫我介紹了兩個同事，沒有想過如何成為賺25％毛利的人，現在你第一步要做什麼？',
                members: [{}, {}, {}, {}, {}],
                img_url: 'https://picsum.photos/300/400?random=12',
            },
        ],
    };

    const [showType, setShowType] = useState(0);

    const changeType = (event, newValue) => setShowType(newValue);

    return (
        <>
            <Paper square>
                <Tabs value={showType} onChange={changeType}>
                    <Tab label="進行中"/>
                    <Tab label="已結束"/>
                </Tabs>
            </Paper>
            <div className={classes.list}>
                <TabPanel value={showType} index={0}>
                    <RunningList prepare={activities.prepare} running={activities.running}/>
                </TabPanel>
                <TabPanel value={showType} index={1}>
                    <EndedList ended={activities.ended}/>
                </TabPanel>
            </div>
        </>
    )
}

export default Content;
