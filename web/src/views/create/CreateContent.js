import Styles from "./CreateContent.module.css";
import Stepper from '@material-ui/core/Stepper';
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import React from "react";
import Button from "@material-ui/core/Button";

// react-router
import {useHistory} from "react-router-dom";

const FirstStep = () => {

    const typeList = [
        '商業經營',
        '投資理財',
        '藝術設計',
        '生活體驗',
        '社會文學',
        '心理勵志',
        '語言學習',
        '資訊科技',
        '考試衝刺',
        '組隊競賽',
    ];

    return (
        <div className={Styles.container}>
            <h1>這次想要成立什麼讀書會呢？</h1>
            <p>標題</p>
            <input type="text"/>
            <p>請選擇類別</p>
            <div className={Styles.types}>
                {
                    typeList.map((type, index) => (
                        <div key={index}>
                            {type}
                        </div>
                    ))
                }
            </div>
            <p>書籍圖片</p>
            <div className={Styles.img}>上傳圖片...</div>
        </div>
    )
}

const SecondStep = () => {

    const typeList = [
        '商業經營',
        '投資理財',
        '藝術設計',
        '生活體驗',
        '社會文學',
        '心理勵志',
        '語言學習',
        '資訊科技',
        '考試衝刺',
        '組隊競賽',
    ];

    const Block = ({label,placeholder})=> (
        <div style={{display:'flex'}}>
            <p style={{margin:'10px'}}>{label}</p>
            <input type="text" placeholder={placeholder} />
        </div>
    )

    return (
        <div className={Styles.container}>
            <h1>填入資訊讓你的成員參考！</h1>
            <div className={Styles.form}>
                <Block label="時間" placeholder="未定/上午/中午/下午/晚上"/>
                <Block label="聚會頻率" placeholder="未定/單次活動/每週一次/..."/>
                <Block label="地區" placeholder="線上/台北/新北..."/>
                <Block label="預定人數" placeholder=""/>
            </div>
            <Block label="簡介" placeholder=""/>
            <Block label="標籤" placeholder=""/>
            <p>輸入最核心的三個標籤 ex.行銷  </p>
        </div>
    )
}

const ThirdStep = () => {

    return (
        <div className={Styles.container}>
            <h1>標題:魔球投資學</h1>
            <h1>類型:商業經營</h1>
            <h1>時間:上午</h1>
            <h1>地區:新北</h1>
            <h1>聚會頻率:每週一次</h1>
            <h1>預定人數:3</h1>
            <h1>標籤:股票 . 基金 </h1>
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

        console.log(activeStep);

        if (activeStep === 0) return <FirstStep/>
        else if (activeStep === 1) return <SecondStep/>
        else if (activeStep === 2) return <ThirdStep/>
        else return <div/>
    };

    return (
        <>
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
        </>
    )
}

export default Content;
