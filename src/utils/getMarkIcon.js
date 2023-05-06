import loveIcon from '../assets/map-space/love.svg'
import collegeIcon from '../assets/map-space/college.svg'

const iconMap = {
    love:loveIcon,
    college:collegeIcon
}

const getMarkIcon =(type)=> iconMap[type]

export default getMarkIcon;