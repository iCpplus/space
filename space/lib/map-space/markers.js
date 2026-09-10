/**
 * Marker data for the map-space page. Ported from the original
 * `src/pages/map-space/index.js`.
 */
const allMarkers = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                type: 'love',
                iconSize: [25, 25],
                title: '西安',
                content: '我们在西安相遇，放大来看看我们在西安的足迹吧...',
                time: '2022-02-12',
                defaultShow: true,
                minZoom: 0,
                maxZoom: 9,
                images: 'https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg',
            },
            geometry: {
                type: 'Point',
                coordinates: [108.94226774033302, 34.26107578232728],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'college',
                iconSize: [20, 20],
                title: '我的大学',
                content: '中原工学院',
                time: '2018-2022',
                minZoom: 9,
                maxZoom: 25,
                images:
                    'https://img.picgo.net/2023/05/11/u6633969572711341980fm253fmtautoapp138fJPEG6cb01f37391fb16a.webp,https://img.picgo.net/2023/05/11/u1632480379555032645fm253fmtautoapp138fJPEGa78fa5df103e8c76.webp',
            },
            geometry: {
                type: 'Point',
                coordinates: [113.68159999812144, 34.58654005236434],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'college',
                iconSize: [20, 20],
                title: '郑州',
                content: '我的大学所在城市，在这里度过了四年时光。2018年来到这里，2022年离开这里去了西安工作。',
                time: '2018-2022',
                minZoom: 0,
                maxZoom: 9,
                images:
                    'https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg,https://img.picgo.net/2023/05/10/107818736_p004dfe1bcd16f9c43.jpeg,https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg,https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg,https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg,https://img.picgo.net/2023/05/10/107818736_p004dfe1bcd16f9c43.jpeg,https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg,https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg',
            },
            geometry: {
                type: 'Point',
                coordinates: [113.66059481348998, 34.75320922469756],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'travel',
                iconSize: [20, 20],
                title: '洛阳',
                content: '去看了洛阳牡丹，去十字街吃了小吃...',
                time: '2021-04',
                minZoom: 0,
                maxZoom: 9,
                images: '',
            },
            geometry: {
                type: 'Point',
                coordinates: [112.44385199971475, 34.64322687651129],
            },
        },
        {
            type: 'Feature',
            properties: {
                type: 'travel',
                iconSize: [20, 20],
                title: '开封',
                content: '去了清明上河园、七圣角、龙亭、书店街、开封府...',
                time: '2021-03',
                minZoom: 0,
                maxZoom: 9,
                images: '',
            },
            geometry: {
                type: 'Point',
                coordinates: [114.34458206784211, 34.80203332944437],
            },
        },
    ],
};

export default allMarkers;
