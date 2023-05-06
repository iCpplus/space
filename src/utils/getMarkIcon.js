import loveIcon from '../assets/map-space/love.svg'

const iconMap = {
    love:loveIcon
}

const getMarkIcon =(type)=> iconMap[type]

export default getMarkIcon;