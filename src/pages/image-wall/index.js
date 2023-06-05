import React, { useEffect } from 'react'

import waterfall from 'utils/waterfall';

function ImageWall() {
    const images = ['https://img.picgo.net/2023/05/26/108282874_p0_master1200a7bdc39745a71e67.jpeg', 'https://img.picgo.net/2023/05/22/F62693A5EC4421E93510138A6D5FFB12d6e014626935f6e4.jpeg', 'https://img.picgo.net/2023/05/26/107005305_p0_master120034a1ad8996e9aff6.jpeg', 'https://img.picgo.net/2023/05/26/0AD3630461EA002E895CCE7F22526045cfba3b4531f96fb5.jpeg', 'https://img.picgo.net/2023/05/26/107882088_p0_master1200b0f40f956184cc74.jpeg', 'https://img.picgo.net/2023/05/21/108313985_p0_master12009df002d025ea79b9.jpeg']
    console.log(waterfall);
    useEffect(() => {
        waterfall('.image-wall');
    }, [])
    return <div className='image-wall' style={{position:'absolute',width:'100vw',height:'100vh',overflow:'auto'}}>
        {
            images.map((item, index) => <div key={index} className='item' style={{width:'49.9%'}}>
                <img src={item}></img>
            </div>)
        }
    </div>
}

export default ImageWall