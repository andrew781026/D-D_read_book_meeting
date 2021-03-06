import React from "react";
import {Step, Stepper, StepLabel, Button} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";
import {v4 as uuidv4} from 'uuid';

// custom input
import TextInput from "../../components/TextInput";
import {InputBlock, SelectBlock} from "./Blocks";

// forms
import {Controller, useForm} from "react-hook-form";

// styling
import Styles from "./CreateContent.module.css";

// react-router
import {useHistory} from "react-router-dom";
import EventService from "../../services/event";

// 縣市別 : https://gist.github.com/abc873693/2804e64324eaaf26515281710e1792df
const area_data = {
    '臺北市': [
        '中正區', '大同區', '中山區', '萬華區', '信義區', '松山區', '大安區', '南港區', '北投區', '內湖區', '士林區', '文山區'
    ],
    '新北市': [
        '板橋區', '新莊區', '泰山區', '林口區', '淡水區', '金山區', '八里區', '萬里區', '石門區', '三芝區', '瑞芳區', '汐止區', '平溪區', '貢寮區', '雙溪區', '深坑區', '石碇區', '新店區', '坪林區', '烏來區', '中和區', '永和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '蘆洲區', '五股區'
    ],
    '基隆市': [
        '仁愛區', '中正區', '信義區', '中山區', '安樂區', '暖暖區', '七堵區'
    ],
    '桃園市': [
        '桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '龜山區', '龍潭區', '大溪區', '大園區', '觀音區', '新屋區', '復興區'
    ],
    '新竹縣': [
        '竹北市', '竹東鎮', '新埔鎮', '關西鎮', '峨眉鄉', '寶山鄉', '北埔鄉', '橫山鄉', '芎林鄉', '湖口鄉', '新豐鄉', '尖石鄉', '五峰鄉'
    ],
    '新竹市': [
        '東區', '北區', '香山區'
    ],
    '苗栗縣': [
        '苗栗市', '通霄鎮', '苑裡鎮', '竹南鎮', '頭份鎮', '後龍鎮', '卓蘭鎮', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '造橋鄉', '三灣鄉', '南庄鄉', '大湖鄉', '獅潭鄉', '泰安鄉'
    ],
    '臺中市': [
        '中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '東勢區', '石岡區', '新社區', '和平區', '神岡區', '潭子區', '大雅區', '大肚區', '龍井區', '沙鹿區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'
    ],
    '南投縣': [
        '南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'
    ],
    '彰化縣': [
        '彰化市', '員林鎮', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'
    ],
    '雲林縣': [
        '斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '莿桐鄉', '林內鄉', '古坑鄉', '大埤鄉', '崙背鄉', '二崙鄉', '麥寮鄉', '臺西鄉', '東勢鄉', '褒忠鄉', '四湖鄉', '口湖鄉', '水林鄉', '元長鄉'
    ],
    '嘉義縣': [
        '太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'
    ],
    '嘉義市': [
        '東區', '西區'
    ],
    '臺南市': [
        '中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'
    ],
    '高雄市': [
        '楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '小港區', '旗津區', '鳳山區', '大寮區', '鳥松區', '林園區', '仁武區', '大樹區', '大社區', '岡山區', '路竹區', '橋頭區', '梓官區', '彌陀區', '永安區', '燕巢區', '田寮區', '阿蓮區', '茄萣區', '湖內區', '旗山區', '美濃區', '內門區', '杉林區', '甲仙區', '六龜區', '茂林區', '桃源區', '那瑪夏區'
    ],
    '屏東縣': [
        '屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '霧台鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉', '三地門鄉'
    ],
    '宜蘭縣': [
        '宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'
    ],
    '花蓮縣': [
        '花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '秀林鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '萬榮鄉', '富里鄉', '卓溪鄉'
    ],
    '臺東縣': [
        '臺東市', '成功鎮', '關山鎮', '長濱鄉', '海端鄉', '池上鄉', '東河鄉', '鹿野鄉', '延平鄉', '卑南鄉', '金峰鄉', '大武鄉', '達仁鄉', '綠島鄉', '蘭嶼鄉', '太麻里鄉'
    ],
    '澎湖縣': [
        '馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'
    ],
    '金門縣': [
        '金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'
    ],
    '連江縣': [
        '南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'
    ]
}

const FirstStep = React.forwardRef((props, ref) => {

    const createType = (label) => ({uuid: uuidv4(), label, selected: false})

    const typeList = [
        createType('商業經營'),
        createType('投資理財'),
        createType('藝術設計'),
        createType('生活體驗'),
        createType('社會文學'),
        createType('心理勵志'),
        createType('語言學習'),
        createType('資訊科技'),
        createType('考試衝刺'),
        createType('組隊競賽'),
    ];

    // useForm API : https://react-hook-form.com/api#useForm
    const form = useForm({
        mode: 'onChange',  // Validation will trigger on the change event
        defaultValues: {types: typeList},
    });

    const {control, errors, getValues, setValue, register} = form;

    // the method will reveal to parent
    React.useImperativeHandle(ref, () => ({getValues,}));

    const [types, setTypes] = React.useState(typeList);

    const setSelected = type => e => {

        const newTypes = [...types].map(item => (item.uuid === type.uuid) ? {...item, selected: !item.selected} : item);
        setTypes(newTypes);

        // set the value of types
        setValue("types", newTypes.filter(item => item.selected).map(item => item.label))
    }

    return (
        <div className={Styles.container}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '940px',
                maxWidth: 'calc(100% - 40px)'
            }}>
                <input type="text" hidden name="types" ref={register}/>
                <h1 style={{margin: '16px 0'}}>這次想要成立什麼讀書會呢？</h1>
                <p>標題*</p>
                <Controller rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}
                            control={control} defaultValue=""
                            placeholder='請輸入標題'
                            as={TextInput} name="title"/>
                <p style={{alignSelf: 'start', color: 'red', margin: '0 0 6px 0'}}>{errors?.title?.message}</p>
                <p>請選擇類別</p>
                <div className={Styles.types}>
                    {
                        types.map((type) => (
                            <ToggleButton
                                key={type.uuid}
                                value="check"
                                selected={type.selected}
                                onChange={setSelected(type)}
                            >
                                {type.label}
                            </ToggleButton>
                        ))
                    }
                </div>
                <p>書籍圖片</p>
                <div className={Styles.img}>上傳圖片...</div>
            </div>
        </div>
    )
})

const SecondStep = React.forwardRef((props, ref) => {

    // useForm API : https://react-hook-form.com/api#useForm
    const form = useForm({
        mode: 'onChange',  // Validation will trigger on the change event
    });

    const {control, errors, getValues,} = form;

    React.useImperativeHandle(ref, () => ({getValues,}));

    return (
        <div className={Styles.container}>
            <h1>填入資訊讓你的成員參考！</h1>
            <div className={Styles.form}>
                <SelectBlock width="50%" label="時間" placeholder="時間"
                             defaultValue='none'
                             items={[
                                 {value: 'none', label: '未定'},
                                 {value: 'morning', label: '上午'},
                                 {value: 'noon', label: '中午'},
                                 {value: 'afternoon', label: '下午'},
                                 {value: 'night', label: '晚上'},
                             ]}
                             name="time"
                             control={control}
                             errors={errors}
                             rules={
                                 {
                                     required: {value: true, message: '時間不能為 - 未定'}, // value must not be none
                                 }}/>
                <SelectBlock width="50%" label="聚會頻率" placeholder="頻率"
                             defaultValue='none'
                             items={[
                                 {value: 'none', label: '未定'},
                                 {value: 'single', label: '單次活動'},
                                 {value: 'day', label: '每天一次'},
                                 {value: 'week', label: '每週一次'},
                                 {value: 'two-week', label: '每兩週一次'},
                                 {value: 'month', label: '每月一次'},
                                 {value: 'quarter', label: '每季一次'},
                                 {value: 'half-year', label: '每半年一次'},
                                 {value: 'year', label: '每年一次'},
                             ]}
                             name="frequency" control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '頻率不能為 - 未定'},
                    }}/>


                <SelectBlock width="50%" label="地區"
                             placeholder="縣市" name="city"
                             defaultValue='none'
                             items={[
                                 {value: 'none', label: '未定'},
                                 {value: '01', label: '基隆市'},
                                 {value: '12', label: '嘉義市'},
                                 {value: '02', label: '台北市'},
                                 {value: '13', label: '嘉義縣'},
                                 {value: '03', label: '新北市'},
                                 {value: '14', label: '台南市'},
                                 {value: '04', label: '桃園縣'},
                                 {value: '15', label: '高雄市'},
                                 {value: '05', label: '新竹市'},
                                 {value: '16', label: '屏東縣'},
                                 {value: '06', label: '新竹縣'},
                                 {value: '17', label: '台東縣'},
                                 {value: '07', label: '苗栗縣'},
                                 {value: '18', label: '花蓮縣'},
                                 {value: '08', label: '台中市'},
                                 {value: '19', label: '宜蘭縣'},
                                 {value: '09', label: '彰化縣'},
                                 {value: '20', label: '澎湖縣'},
                                 {value: '10', label: '南投縣'},
                                 {value: '21', label: '金門縣'},
                                 {value: '11', label: '雲林縣'},
                                 {value: '22', label: '連江縣'},
                             ]}
                             control={control} errors={errors} rules={
                    {
                        validate: {
                            isNone: value => value === 'none' && '縣市不能為 *未定*',
                        },
                    }}/>
                <InputBlock width="50%" label="預定人數"
                            placeholder="" name="member_limit"
                            control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
                <InputBlock width="100%" label="簡介"
                            placeholder="" name="description"
                            control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
                <InputBlock width="100%" label="標籤"
                            placeholder="輸入最核心的三個標籤 ex.行銷"
                            control={control} name="labels" errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
            </div>
        </div>
    )
})

const ThirdStep = ({values}) => {

    console.log(values)

    return (
        <div className={Styles.container}>
            <div className={Styles.showInfo}>
                <h1>標題:{values.title || '魔球投資學'}</h1>
                <h1>類型:{values.types || '商業經營'}</h1>
                <h1>時間:{values.time || '上午'}</h1>
                <h1>地區:{values.city || '新北'}</h1>
                <h1>聚會頻率:{values.frequency || '每週一次'}</h1>
                <h1>預定人數:{values.member_limit || '3'}</h1>
                <h1>標籤:{values.labels || '股票 . 基金'} </h1>
            </div>
        </div>
    )
}

const Content = () => {

    const history = useHistory();
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const firstStepRef = React.useRef(null);
    const secondStepRef = React.useRef(null);

    const steps = ['選擇讀書會類型', '選擇規模 / 時間 / 地點', '建立資訊確認'];

    console.log('formData=', formData);

    const handleFormData = (activeStep) => {

        const refMap = {
            0: firstStepRef,
            1: secondStepRef,
        }

        if (refMap[activeStep]) {

            const partialFormData = refMap[activeStep].current.getValues();
            setFormData(prevFormData => ({...prevFormData, ...partialFormData}))
        }
    }

    const handleNext = () => {

        if (activeStep === steps.length - 1) {

            // save formData to events
            EventService.insertEvent(formData);

            history.push("/list");
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            handleFormData(activeStep);
        }
    }

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const stepContent = activeStep => {

        if (activeStep === 0) return <FirstStep ref={firstStepRef}/>
        else if (activeStep === 1) return <SecondStep ref={secondStepRef}/>
        else if (activeStep === 2) return <ThirdStep values={formData}/>
        else return <div/>
    };

    return (
        <div className={Styles.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {stepContent(activeStep)}
            <div className={Styles.btn_wrapper}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    返回
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? '完成' : '下一步'}
                </Button>
            </div>
        </div>
    )
}

export default Content;
