import React, { useLayoutEffect, useState } from 'react';

const themes = [
    { url: '', icon: '' },
    {
        url: 'https://img.picgo.net/2023/05/22/F62693A5EC4421E93510138A6D5FFB12d6e014626935f6e4.jpeg',
        icon: '',
    },
    {
        url: 'https://img.picgo.net/2023/05/25/105796514_p0_master1200e576dce956d100f4.jpeg',
        icon: '',
    },
];

const Setting = function ({ changeTheme, setSimpleTheme }) {
    const [inputValue, setInputValue] = useState(null);
    const [show, setShow] = useState(false);

    const changeThemeSetting = (url) => {
        localStorage.setItem('themeBackgroundUrl', url);
        changeTheme(url);
    };

    const changeThemeSimple = () => {
        const flag = localStorage.getItem('simpleTheme') === '1' ? '0' : '1';
        setSimpleTheme(flag);
        localStorage.setItem('simpleTheme', flag);
    };

    const setCustomThemeBackground = () => {
        changeThemeSetting(inputValue);
        localStorage.setItem('customThemeBackgroundUrl', inputValue);
    };

    useLayoutEffect(() => {
        const url = localStorage.getItem('customThemeBackgroundUrl');
        if (url) {
            setInputValue(url);
        }
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                zIndex: 10,
            }}
        >
            {show && (
                <div className="setting-box">
                    <div style={{ display: 'flex' }}>
                        {themes.map((item, index) => (
                            <button
                                type="button"
                                onClick={() => changeThemeSetting(item.url)}
                                key={item.url}
                                className="setting-item"
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <div>
                        <input
                            placeholder="图片地址可设置为背景哦"
                            value={inputValue || ''}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                        />
                        <button type="button" onClick={setCustomThemeBackground}>
                            确定
                        </button>
                    </div>
                    {setSimpleTheme && (
                        <button type="button" onClick={changeThemeSimple}>
                            极简风
                        </button>
                    )}
                </div>
            )}
            <div
                onClick={() => {
                    setShow(!show);
                }}
                className="setting-btn"
                role="presentation"
            >
                <img className="setting-icon" src="/setting.svg" alt="" />
                <span>主题设置</span>
            </div>
        </div>
    );
};

export default Setting;
