import { useState } from 'react';
import { mi2s_translation } from './api/translateApi';
import { mi2sTts } from './api/mi2sVoiceApis';
import { useTranslation } from 'react-i18next';
import Bubbles from './component/BubbleEffect';
import AudioRecorder from './component/AudioRecorder';

import HistoryComponent from './component/History';
import Dialog from './Dialog';
import './App.css';
import './sass/style.scss';
import './i18n';

function App() {
  var emptyData = {
    "after_translation": {
      "bpe_applied": "",
      "candidates": ["", "", "", "", ""], //4
      "domain": "",
      "synonymSub": "", //2
      "nerSub": "", //3
      "postProcessedSentences": ["", "", "", "", ""], //5
      "raw_translation": ["", "", "", "", ""]
    },
    "before_translation": "", // 1
    "message": "",
  };

  const [result, setResult] = useState(emptyData);
  const [input, setInput] = useState("");
  const [domainImgSrc, setDomainImgSrc] = useState("#");
  //後處理
  const [value, setValue] = useState("PostProcessed");
  const [showResult, setShowResult] = useState("");
  //history
  const [history, setHistory] = useState([]);
  const [showFullHistory, setShowFullHistory] = useState(false);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('zh');
  const [inputLanguage, setInputLanguage] = useState('zh');
  const [translateTo, setTranslateTo] = useState('id');


  const languages = [
    { code: 'en', label: t('ENGTAG')},
    { code: 'zh', label: t('ZHTAG') },
    { code: 'id', label: t("INDOTAG") }
  ];

  const handleTranslate = async () => {
    try {
      const res = await mi2s_translation(inputLanguage, translateTo, input);
      setResult(res);

      switch (res.after_translation.domain) {
        case "FOOD":
          setDomainImgSrc("./images/eat.svg");
          break;
        case "CLO":
          setDomainImgSrc("./images/cloth.svg");
          break;
        case "LIV":
          setDomainImgSrc("./images/home.svg");
          break;
        case "COMUT":
          setDomainImgSrc("./images/car.svg");
          break;
        case "EDU":
          setDomainImgSrc("./images/teach.svg");
          break;
        case "SUM":
          setDomainImgSrc("./images/entertainment.svg");
          break;
        default:
          setDomainImgSrc("#");
          break;
      }
      console.log(res.after_translation.candidates[0]);
      setShowResult(res.after_translation.candidates[0]);
      if (res.before_translation !== "") {
        setHistory(prevHistory => [...prevHistory, res]);
      }
      console.log(history);

    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const handleSynthesis = async (inputLanguage, text) => {
    console.log(inputLanguage, text);
    await mi2sTts(inputLanguage, text);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handlePostProcessed = () => {
    if (value === "Candidates") {
      setValue("PostProcessed");
    } else {
      setValue("Candidates");
    }
    updateShowResult();
  };

  const updateShowResult = () => {
    if (value === "Candidates") {
      setShowResult(result.after_translation.candidates[0]);
    } else {
      setShowResult(result.after_translation.postProcessedSentences[0]);
    }
  };

  const handleInputLanguageChange = (event) => {
    setInputLanguage(event.target.value);
  };

  const handleTranslateToChange = (event) => {
    setTranslateTo(event.target.value);
  };

  const handleTranfer = () => {
    const inputLan = translateTo;
    const translateLan = inputLanguage;
    setInputLanguage(inputLan);
    setTranslateTo(translateLan);
  }

  return (

    <div className='container'>
      <h1 className='header'>
        {t("TITLE_TEXT")}
      </h1>

      <Dialog setLanguage={setLanguage} i18n={i18n} />

      <div className='main-content'>

        <div className='input-area'>
          <div className='translation-title'>{t('translate')}</div>

          <select className='input-dropdown' value={inputLanguage} onChange={handleInputLanguageChange}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <label htmlFor='translation-input'></label>
          <textarea
            className='translation-input'
            name='translation-input'
            id='translation-input'
            type="text"
            value={input}
            onChange={handleInput}
            placeholder={t('input_language')}
            required
          />

          <div className='translate-icons'>
            {result.before_translation && (
              <img
                className='domain-icon'
                src={domainImgSrc}
                alt=""
                title={"Domain: " + result.after_translation.domain}
              />
            )}

            
             <div onClick={() => handleSynthesis(inputLanguage, input)}
              className='sound-icon1' />

            {/* <div className='mic-icon-activate' /> */}
            <AudioRecorder inputLanguage={inputLanguage} setInput={setInput}/>
          </div>

        </div>


        {/* translate btn */}
        <div className='translation-btns'>
          <div className='transfer' onClick={handleTranfer}></div>
          <div className='arrow' onClick={handleTranslate}></div>
        </div>


        {/* result */}
        <div className='result-area'>
          <div className='result-title'>{t('result')}</div>

          {/* <div className='custom-select'> */}
          {/* <img className='dropdown-icon' src="./images/triangle-down" alt="" />  */}
          <select className='translate-dropdown' value={translateTo} onChange={handleTranslateToChange}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          {/* </div> */}

          <div className='translation-result'>
            {result.before_translation && (<p>{showResult}</p>)}

            {result.before_translation && (
              <div className='postprocessed' onClick={handlePostProcessed}>
                <img className='arrow2' src="./images/arrow2.svg" alt="" />
                {value}
              </div>
            )}
            {result.before_translation && <div onClick={() => handleSynthesis(translateTo, showResult)}
              className='sound-icon2' />}
          </div>
        </div>


        {/* history */}
        <div className='history-area'>
          <div className='area-title'>{t('history')}</div>
          <div className='history'>
            <div className='history-content history-content-title' aria-hidden="true">
              <div className='history-content-titles'>
                <div>{t('input')}</div>
                <div>{t('post-processing')}</div>
              </div>
              <hr/>

            </div>
            {history.reverse().map((item, index) => (
              <HistoryComponent key={index}
                translationItem={item}
                index={index}
                result={result}
                history={history}
              ></HistoryComponent>
              
            ))}
          </div>
          {/* {history.length > 3 && (
            <div onClick={() => setShowFullHistory(!showFullHistory)} className='expand-collapse'>
              {showFullHistory ? <img className='expand-collapse-icon' src='./images/arrow_up.svg' /> : <img className='expand-collapse-icon' src='./images/arrow_down.svg' />}
            </div>
          )} */}
        </div>
      </div>

      {/* bubbles */}
      <Bubbles />
    </div>
  );
}

export default App;
