import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Password gate for private posts, ported from `src/templates/private.js`.
 */
const Private = function ({ updateParent, question, answer, cover = '' }) {
    const [password, setPassword] = useState('');

    const goBack = () => {
        window.history.go(-1);
    };

    const inputOnChange = (e) => {
        setPassword(e.target.value);
    };

    const confirmPassWord = () => {
        window.sessionStorage.setItem('password', password);
        updateParent();
        if (password !== answer) {
            window.alert('回答错误');
        }
    };

    return (
        <div className="mask" style={cover ? { backgroundImage: `url(${cover})` } : undefined}>
            <div className="main-contain">
                <div>
                    <span>{question}</span>
                </div>
                <div style={{ margin: '5px 0' }}>
                    <input onChange={inputOnChange} />
                </div>
                <div>
                    <button type="button" onClick={goBack} style={{ marginRight: '10px' }}>
                        返回
                    </button>
                    <button type="button" onClick={confirmPassWord}>
                        确定
                    </button>
                </div>
            </div>
        </div>
    );
};

Private.propTypes = {
    updateParent: PropTypes.func.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    cover: PropTypes.string,
};

export default Private;
