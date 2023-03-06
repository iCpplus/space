import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import drawLove from '../utils/drawLove'

/**
 * 
 */


const LoveCom = function ({show}) {

    useEffect(() => {
        const canvas = document.getElementById("cavs");
        if(show){
            drawLove(canvas)
        }
    }, [show])

    return <canvas id='cavs' style={{position:'fixed',zIndex:'999',left:'0',right:'0',top:'0',bottom:'0'}} />;
}

LoveCom.propTypes = {
    show: PropTypes.bool.isRequired,
  };

export default LoveCom;