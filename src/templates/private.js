import React, { useState } from 'react';

import PropTypes from 'prop-types';

/**
 * 
 */
const Private = function ({updateParent}) {

    const [password,setPassword] = useState('')
    const goBack =()=>{
        history.go(-1)
    }

    const inputOnChange = (e)=>{
        setPassword(e.target.value);
    }

    const confirmPassWord = ()=>{
        window.sessionStorage.setItem('password',password)
        updateParent()
    }

    return <div className='mask'>
        <div className='main-contain' style={{width:'362px'}}>
            <div>
                <span>输入密码访问隐私内容：</span><input onChange={inputOnChange} style={{width:''}} type='password' />
            </div>
            <div>
                <button type='button' onClick={goBack} style={{ marginRight: '20px' }}>返回</button>
                <button type='button' onClick={confirmPassWord}>确定</button>
            </div>
        </div>

    </div>;
}

Private.propTypes = {
    updateParent: PropTypes.func.isRequired,
  };

export default Private;