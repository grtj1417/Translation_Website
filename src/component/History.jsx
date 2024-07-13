
import { Component } from 'react';

import { Collapse } from 'react-collapse';

export default class HistoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };
    }

    handleClick = () => {
        this.setState(prevState => ({
            isOpened: !prevState.isOpened
        }));
    }

    render() {
        const { translationItem, index, result } = this.props;
        const { isOpened } = this.state;

        return (
            <div onClick={this.handleClick}>
                <div key={index} className='history-content history-content-hover'>
                    <div className='history-row'>
                    <div className='history-input'>{translationItem.before_translation}</div>
                    <div className='history-post'>{translationItem.after_translation.postProcessedSentences[0]}</div>
                    </div>
                    <Collapse isOpened={isOpened}>
                        <div className='details'>
                            <div className='detail'>
                                <span className='detail-title'>Before_translation:</span>
                                <span>{result.before_translation}</span>
                            </div>

                            <div className='detail-arrow'>❱❱</div>
                            <div className='detail'>
                                <span className='detail-title'>SynonymSub:</span>
                                <span>{result.after_translation.synonymSub}</span>
                            </div>

                            <div className='detail-arrow'>❱❱</div>
                            <div className='detail'>
                                <span className='detail-title'>NerSub:</span>
                                <span>{result.after_translation.nerSub}</span>
                            </div>

                            <div className='detail-arrow'>❱❱</div>
                            <div className='detail'>
                                <span className='detail-title'>Candidates:</span>
                                <span className='detail-content'>{result.after_translation.candidates[0]}</span>
                            </div>

                            <div className='detail-arrow'>❱❱</div>
                            <div className='detail'>
                                <span className='detail-title'>PstProcessedSentences:</span>
                                <span className='detail-content'>{result.after_translation.postProcessedSentences[0]}</span>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
}


// export default function HistoryComponent({ translationItem, index }) {
//     var isOpened = false;

// }