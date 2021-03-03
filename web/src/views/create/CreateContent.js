import React from "react";
import {Step, Stepper, StepLabel, Button} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";
import {v4 as uuidv4} from 'uuid';

// custom input
import TextInput from "../../components/TextInput";

// forms
import {Controller, useForm} from "react-hook-form";

// styling
import Styles from "./CreateContent.module.css";

// react-router
import {useHistory} from "react-router-dom";

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

const Block = ({label, placeholder, width, name, errors, rules, control}) => (
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
                <Block width="50%" label="時間" placeholder="未定/上午/中午/下午/晚上"
                       name="time"
                       control={control}
                       errors={errors}
                       rules={
                           {
                               required: {value: true, message: '標題為必填欄位'},
                               maxLength: {value: 20, message: '標題至多 20 個字'}
                           }}/>
                <Block width="50%" label="聚會頻率" placeholder="未定/單次活動/每週一次/..."
                       name="frequency" control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
                <Block width="50%" label="地區"
                       placeholder="線上/台北/新北..." name="city"
                       control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
                <Block width="50%" label="預定人數"
                       placeholder="" name="member_limit"
                       control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
                <Block width="100%" label="簡介"
                       placeholder="" name="description"
                       control={control} errors={errors} rules={
                    {
                        required: {value: true, message: '標題為必填欄位'},
                        maxLength: {value: 20, message: '標題至多 20 個字'}
                    }}/>
                <Block width="100%" label="標籤"
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

        if (activeStep === steps.length - 1) history.push("/list");
        else {
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
