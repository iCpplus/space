import loveIcon from '../assets/map-space/love.svg'
import collegeIcon from '../assets/map-space/college.svg'
import travelIcon from '../assets/map-space/travel.svg'

const iconMap = {
    love:loveIcon,
    college:collegeIcon,
    travel:travelIcon
}

const getMarkIcon =(type)=> iconMap[type]

export default getMarkIcon;