import React, {useState} from "react";
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

const FirstStep = () => {

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

    const [types, setTypes] = useState(typeList);

    /*
        useForm() >>>
        --------------------------------------
        clearErrors: ƒ clearErrors(name)
        control: {shouldUnregister: true, isFormDirty: ƒ, updateWatchedValue: ƒ, updateFormState: ƒ, removeFieldEventListener: ƒ, …}
        errors: {}
        formState: Proxy {isDirty: false, isValidating: false, dirtyFields: {…}, isSubmitted: false, submitCount: 0, …}
        getValues: ƒ getValues(payload)
        handleSubmit: (onValid, onInvalid) => {…}
        register: ƒ register(refOrRegisterOptions, options)
        reset: (values, omitResetState = {}) => {…}
        setError: ƒ setError(name, error)
        setValue: ƒ setValue(name, value, config)
        trigger: async name => {…}
        unregister: ƒ unregister(name)
        watch: ƒ watch(fieldNames, defaultValue)
     */

    // useForm API : https://react-hook-form.com/api#useForm
    const form = useForm({
        mode: 'onChange',  // Validation will trigger on the change event
    });

    const {
        // clearErrors,
        // setError,
        control,
        // errors,
        // formState,
        // handleSubmit,
        // getValues,

    } = form;

    const setSelected = type => e => {

        const newTypes = [...types].map(item => (item.uuid === type.uuid) ? {...item, selected: !item.selected} : item);
        setTypes(newTypes);
    }

    // console.log('getValues()=', getValues())
    // console.log('form=', form)
    // console.log('errors=', errors)

    return (
        <div className={Styles.container}>
            <h1 style={{margin:'16px 0'}}>這次想要成立什麼讀書會呢？</h1>
            <p>標題</p>
            <Controller rules={{required: true, maxLength: 20}} control={control} defaultValue=""
                        style={{width: '940px', maxWidth: 'calc(100% - 40px)'}}
                        placeholder='請輸入標題'
                        as={TextInput} name="title"/>
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
    )
}

const SecondStep = () => {

    const Block = ({label, placeholder, width}) => (
        <div className={Styles.cell} style={{width}}>
            <span className={Styles.label}>{label}</span>
            <TextInput
                onChange={_ => _}
                placeholder={placeholder}
            />
        </div>
    )

    return (
        <div className={Styles.container}>
            <h1>填入資訊讓你的成員參考！</h1>
            <div className={Styles.form}>
                <Block width="50%" label="時間" placeholder="未定/上午/中午/下午/晚上"/>
                <Block width="50%" label="聚會頻率" placeholder="未定/單次活動/每週一次/..."/>
                <Block width="50%" label="地區" placeholder="線上/台北/新北..."/>
                <Block width="50%" label="預定人數" placeholder=""/>
                <Block width="100%" label="簡介" placeholder=""/>
                <Block width="100%" label="標籤" placeholder="輸入最核心的三個標籤 ex.行銷"/>
            </div>
        </div>
    )
}

const ThirdStep = () => {

    return (
        <div className={Styles.container}>
            <div className={Styles.showInfo}>
                <h1>標題:魔球投資學</h1>
                <h1>類型:商業經營</h1>
                <h1>時間:上午</h1>
                <h1>地區:新北</h1>
                <h1>聚會頻率:每週一次</h1>
                <h1>預定人數:3</h1>
                <h1>標籤:股票 . 基金 </h1>
            </div>
        </div>
    )
}

const Content = () => {

    const history = useHistory();
    const [activeStep, setActiveStep] = React.useState(0);

    const steps = ['選擇讀書會類型', '選擇規模 / 時間 / 地點', '建立資訊確認'];

    const handleNext = () => {

        if (activeStep === steps.length - 1) history.push("/list");
        else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const stepContent = activeStep => {

        if (activeStep === 0) return <FirstStep/>
        else if (activeStep === 1) return <SecondStep/>
        else if (activeStep === 2) return <ThirdStep/>
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
