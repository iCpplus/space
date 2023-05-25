import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes, { func } from 'prop-types';

import SettingIcon from '../../assets/setting.svg'
import './Setting.css'

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Setting = function ({ changeTheme, setSimpleTheme }) {
    const [inputValue, setInputValue] = useState(null)
    const [show, setShow] = useState(false)
    const themes = [{ url: '', icon: '' }, { url: 'https://img.picgo.net/2023/05/22/v2-5be85da269fe107f03bca63ef33fddf8_b3ddee6508df67149.jpeg', icon: '' }, { url: 'https://img.picgo.net/2023/05/22/v2-c83a7decb86f518cd823b5685e8c44d2_r24b075b1b1b1f4d6.jpeg', icon: '' }]

    const changeThemeSetting = (url) => {
        localStorage.setItem('themeBackgroundUrl', url)
        changeTheme(url)
    }

    const changeThemeSimple = () => {
        const flag = localStorage.getItem('simpleTheme') === '1' ? '0' : '1'
        console.log(flag);
        setSimpleTheme(flag)
        localStorage.setItem('simpleTheme', flag)
    }

    const setCustomThemeBackground = () => {
        changeThemeSetting(inputValue)
        localStorage.setItem('customThemeBackgroundUrl', inputValue)

    }
    useLayoutEffect(() => {
        const url = localStorage.getItem('customThemeBackgroundUrl')
        if (url) {
            setInputValue(url)
        }
    }, [])

    return <div style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', justifyContent: 'flex-end' }}>
        {show && <div className='setting-box'>
            <div style={{display:'flex'}}>
                {themes.map((item, index) => <button onClick={() => changeThemeSetting(item.url)} key={item.url} className='setting-item'>
                    {index + 1}
                </button>)}
            </div>

            <div>
                <input placeholder='可以输入网络图片地址设置为主题背景哦' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
                <button onClick={setCustomThemeBackground}>确定</button>
            </div>
            <button onClick={changeThemeSimple}>极简风</button>
        </div>}
        <div onClick={() => { setShow(!show) }} className='setting-btn'><img className='setting-icon' src={SettingIcon} alt='' /><span>主题设置</span> </div>
    </div>;
}

Setting.propTypes = propTypes;
Setting.defaultProps = defaultProps;
// #endregion

export default Setting;