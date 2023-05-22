import React, {  useState } from 'react';
import PropTypes, { func } from 'prop-types';

import SettingIcon from '../../assets/setting.svg'
import './Setting.css'

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Setting = function ({ changeTheme }) {

    const [show, setShow] = useState(false)
    const themes = [{url:'',icon:''},{url:'https://img.picgo.net/2023/05/22/v2-5be85da269fe107f03bca63ef33fddf8_b3ddee6508df67149.jpeg',icon:''},{url:'https://img.picgo.net/2023/05/22/v2-c83a7decb86f518cd823b5685e8c44d2_r24b075b1b1b1f4d6.jpeg',icon:''}]

    const changeThemeSetting = (url) => {
        localStorage.setItem('themeBackgroundUrl', url)
        changeTheme(url)
    }
    


    return <div style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', justifyContent: 'flex-end' }}>
        {show && <div className='setting-box'>

            {themes.map((item, index) => <div onClick={() => changeThemeSetting(item.url)} key={item.url} className='setting-item'>
                {index + 1}
            </div>)}
            <input />
        </div>}
        <div onClick={() => { setShow(!show) }} className='setting-btn'><img className='setting-icon' src={SettingIcon} alt='' /><span>主题设置</span> </div>
    </div>;
}

Setting.propTypes = propTypes;
Setting.defaultProps = defaultProps;
// #endregion

export default Setting;