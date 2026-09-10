const iconMap = {
    love: '/map-space/love.svg',
    college: '/map-space/college.svg',
    travel: '/map-space/travel.svg',
};

const getMarkIcon = (type) => iconMap[type];

export default getMarkIcon;
