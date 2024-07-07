import { useState } from 'react';
import { translate } from './api/translateApi';
import './App.css';
import './sass/style.scss';

function App() {
  var emptyData = {
    "after_translation": {
      "bpe_applied": "",
      "candidates": ["", "", "", "", ""],
      "domain": "",
      "nerSub": "",
      "postProcessedSentences": ["", "", "", "", ""],
      "raw_translation": ["", "", "", "", ""]
    },
    "before_translation": "",
    "message": "",
  };

  const [result, setResult] = useState(emptyData);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("PostProcessed");
  const [domainImgSrc, setDomainImgSrc] = useState("#");
  const [history, setHistory] = useState([]);
  const [showResult, setShowResult] = useState("");
  const [showFullHistory, setShowFullHistory] = useState(false);

  const handleTranslate = async () => {
    try {
      const element = document.querySelector('.translation-area-title2');
      element.classList.add('move-left-right'); // 添加动画类名
      console.log(input);
      const res = await translate(input, "zh2id_0528");
      console.log(res);
      setResult(res);

      switch (res.after_translation.domain) {
        case "FOOD":
          setDomainImgSrc("./eat.svg");
          break;
        case "CLO":
          setDomainImgSrc("./cloth.svg");
          break;
        case "LIV":
          setDomainImgSrc("./home.svg");
          break;
        case "COMUT":
          setDomainImgSrc("./car.svg");
          break;
        case "EDU":
          setDomainImgSrc("./teach.svg");
          break;
        case "SUM":
          setDomainImgSrc("entertainment.svg");
          break;
        default:
          setDomainImgSrc("#");
          break;
      }
      console.log(res.after_translation.candidates[0]);
      setShowResult(res.after_translation.candidates[0]);
      setHistory(prevHistory => [...prevHistory, res]);
      console.log(history);

      // 等待動畫完成後移除className
      element.addEventListener('animationend', () => {
        element.classList.remove('move-left-right');
      }, { once: true });

    } catch (error) {
      console.error('Translation error:', error);
    }
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
  }

  const updateShowResult = () => {
    if (value === "Candidates") {
      setShowResult(result.after_translation.candidates[0]);
    } else {
      setShowResult(result.after_translation.postProcessedSentences[0]);
    }
  }

  return (
    <div className='container'>
      <h1 className='header'>
        Mi2s Translation Pre-Post  processing displaying website
      </h1>

      <div className='main-content' style={{height: showFullHistory ? "120vh" : "95vh"}}>
        <div className='translation-area'>
          <div className='input-area'>
            <div className='translation-area-title1'>翻譯</div>
            <label htmlFor='translation-input'></label>
            <textarea
              className='translation-input'
              name='translation-input'
              id='translation-input'
              type="text"
              value={input}
              onChange={handleInput}
              placeholder='Leave a comment here'
              required
            />
            {result.before_translation && (
              <img
                className='domain-icon'
                src={domainImgSrc}
                alt=""
                title={"Domain: " + result.after_translation.domain}
              />
            )}
          </div>

          <div className='preprocessed-area'>
            <div className='translation-area-title2'>❱❱ 前處理</div>
            <div className='preprocessed-area-result'>
              {result.before_translation && (<p>SynonymSub : {result.after_translation.synonymSub}</p>)}
              {result.before_translation && (<p>NerSub : {result.after_translation.nerSub}</p>)}
            </div>
          </div>
        </div>

        <div className='translation-submit'>
          <div className='arrow3' onClick={handleTranslate}></div>
        </div>

        <div className='result-area'>
          <div className='area-title'>Result</div>
          <div className='translation-result'>
            {result.before_translation && (<p>{showResult}</p>)}

            <div className='postprocessed' onClick={handlePostProcessed}>
              <img className='arrow2' src="./arrow2.svg" alt="" />
              {value}
            </div>
          </div>
        </div>

        <div className='history-area'>
          <div className='area-title'>History</div>
          <div className='history' style={{
            height: showFullHistory ? "600px" : "360px"
          }}>
            <div className='history-content history-content-title'>
              <div>Input</div>
              <div>PostProcessed</div>
              <hr></hr>
            </div>
            {history.slice(showFullHistory ? 0 : -3).reverse().map((item, index) => (
              <div key={index} className='history-content history-content-hover'>
                <div>{item.before_translation}</div>
                <div>{item.after_translation.postProcessedSentences[0]}</div>
              </div>
            ))}
          </div>
          {history.length > 3 && (
            <div onClick={() => setShowFullHistory(!showFullHistory)} className='expand-collapse'>
              {showFullHistory ? <img className='expand-collapse-icon' src='./arrow_up.svg' /> : <img className='expand-collapse-icon' src='./arrow_down.svg' />}
            </div>
          )}
        </div>
      </div>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

    </div>
  );
}

export default App;
