import antiShake from './antiShake';

const setCatalog = (anchors, catalogs, anchorsContain) => {
    let anchorsInfo = [];
    const anchorsContainScroll = () => {
        const newAnchorsInfo = [];

        for (let index = 0; index < anchors.length; index += 1) {
            const { bottom } = anchors[index].getBoundingClientRect();
            const isShow = bottom <= window.innerHeight && bottom >= 0;
            if (isShow) {
                newAnchorsInfo.push(true);
            } else {
                newAnchorsInfo.push(false);
            }
        }

        const highlightAnchorIndex = newAnchorsInfo.findIndex((item) => item === true);
        const oldHighlightAnchorIndex = newAnchorsInfo.findIndex((item) => item === true);

        const highlightIndex =
            highlightAnchorIndex > -1
                ? highlightAnchorIndex
                : oldHighlightAnchorIndex > -1
                    ? highlightAnchorIndex
                    : -1;
        if (highlightIndex > -1) {
            [...catalogs].forEach((item, index) => {
                if (index === highlightAnchorIndex) {
                    item.style.borderLeft = '8px solid #6d4534';
                    item.style.textDecoration = 'underline 1.5px';
                } else {
                    item.style.borderLeft = '8px solid transparent';
                    item.style.textDecoration = 'unset';
                }
            });
        }
        anchorsInfo = newAnchorsInfo;
    };

    const antiShakeAnchorsContainScroll = antiShake(anchorsContainScroll, 10);
    anchorsContain.addEventListener('scroll', antiShakeAnchorsContainScroll);
    return antiShakeAnchorsContainScroll;
};

export default setCatalog;
