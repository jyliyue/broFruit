import * as PIXI from 'pixi.js'

/* 加载游戏资源 */
function loadAssets() {
    const imgs = {
        bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/f7f681ccd9a749dc89ed952765698c7e.png',
        btn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/8207f7c63986402284477874c02b3cb2.png',
        board_bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/fb74707d448749c0af159cddbdb1dbad.png',
        bianbian: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/157233c9fb24483ab8ee227c992c93b0.png',
        apple: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/0b731d24301c4d7a9800a355e8989aeb.png',
        bullet: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/6a97f5db4029410592a6782f3d3fda35.png',
        warn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/add924edf7574237b9df52c5616d0fad.png'
    }
    PIXI.Assets.addBundle('assets', imgs);
    return PIXI.Assets.loadBundle('assets');
}

export default loadAssets