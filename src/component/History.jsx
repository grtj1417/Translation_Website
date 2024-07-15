
import { t } from 'i18next';
import { Component } from 'react';

import { Collapse } from 'react-collapse';

export default class HistoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isSmallThan768px: window.innerWidth < 768
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.checkWindowWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkWindowWidth);
    }

    checkWindowWidth = () => {
        const isSmallThan768px = window.innerWidth < 768;
        this.setState({ isSmallThan768px });
    }

    handleClick = () => {
        this.setState(prevState => ({
            isOpened: !prevState.isOpened
        }));
    }

    render() {
        const { translationItem, index, result, history } = this.props;
        const { isOpened } = this.state;

        return (
            <div onClick={this.handleClick}>
                <div key={index} className='history-content history-content-hover' style={{ backgroundColor: isOpened ? 'rgb(231, 231, 231)' : 'transparent' }}>
                    <div className='history-row'>
                        <div className='history-input'>{translationItem.before_translation}</div>
                        <div className='history-post'>{translationItem.after_translation.postProcessedSentences[0]}</div>
                    </div>
                    <Collapse isOpened={isOpened}>
                        <div className='details'>
                            <hr id='detail-hr' />
                            <div className='detail'>
                                <span className='detail-title'>{t("INPUT")}:</span>
                                <span>{translationItem.before_translation}</span>
                            </div>

                            <div className='detail-arrow'>{this.state.isSmallThan768px ? '▾' : '❱❱'}</div>

                            <div className='detail'>
                                <span className='detail-title'>{t("SYNONYM")}:</span>
                                <span>{translationItem.after_translation.synonymSub}</span>
                            </div>

                            <div className='detail-arrow'>{this.state.isSmallThan768px ? '▾' : '❱❱'}</div>

                            <div className='detail'>
                                <span className='detail-title'>{t("NERREPL")}:</span>
                                <span>{translationItem.after_translation.nerSub}</span>
                            </div>

                            <div className='detail-arrow'>{this.state.isSmallThan768px ? '▾' : '❱❱'}</div>

                            <div className='detail'>
                                <span className='detail-title'>{t("RAWOUTPUT")}:</span>
                                <span className='detail-content'>{translationItem.after_translation.raw_translation[0]}</span>
                            </div>

                            {this.state.isSmallThan768px ? (
                                <div className='detail-arrow'>▾</div>
                            ) : (
                                <div className='detail-arrow'>❱❱</div>
                            )}

                            <div className='detail'>
                                <span className='detail-title'>{t("POSTPROCESSED")}:</span>
                                <span className='detail-content'>{translationItem.after_translation.postProcessedSentences[0]}</span>
                            </div>
                            {this.state.isSmallThan768px ? (
                                <div className='detail-arrow'>▾</div>
                            ) : (
                                <div className='detail-arrow'>❱❱</div>
                            )}
                            <div className='detail'>
                                <span className='detail-title'>{t("NERREPLBACK")}:</span>
                                <span className='detail-content'>{translationItem.after_translation.candidates[0]}</span>
                            </div>
                        </div>
                    </Collapse>
                </div>
                {index !== history.length - 1 && (
                    <hr id='history-content-hr' />
                )}
            </div>
        );
    }
}


// export default function HistoryComponent({ translationItem, index }) {
//     var isOpened = false;

// }