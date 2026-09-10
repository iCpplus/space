import withBasePath from 'utils/basePath';

const iconMap = {
    love: withBasePath('/map-space/love.svg'),
    college: withBasePath('/map-space/college.svg'),
    travel: withBasePath('/map-space/travel.svg'),
};

const getMarkIcon = (type) => iconMap[type];

export default getMarkIcon;
