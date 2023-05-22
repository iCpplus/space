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
    const themes = [{url:'',icon:''},{ url: 'https://img.picgo.net/2023/05/22/F62693A5EC4421E93510138A6D5FFB12d6e014626935f6e4.jpeg', icon: '' }, { url: 'https://img.picgo.net/2023/05/21/108313985_p0_master12009df002d025ea79b9.jpeg', icon: '' }]

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