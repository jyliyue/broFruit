import * as PIXI from 'pixi.js'
import config from '../config'
import style from '../styles'

const imgs = {
    bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/f7f681ccd9a749dc89ed952765698c7e.png',
    btn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/8207f7c63986402284477874c02b3cb2.png',
    board_bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/fb74707d448749c0af159cddbdb1dbad.png',
    bianbian: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/157233c9fb24483ab8ee227c992c93b0.png',
    apple: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/0b731d24301c4d7a9800a355e8989aeb.png',
    bullet: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/6a97f5db4029410592a6782f3d3fda35.png',
    warn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/add924edf7574237b9df52c5616d0fad.png',
    quick: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/e1afa6feca3a4e549fa371c03d60aeed.png',
    speed: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/e07c2ccb966046dba8a7b0a927ea2416.png',
    range: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/36e91a0c385a479486ae682c87b4d13d.png'
}

class Loader {
    constructor() {
        this.progress = 0
        PIXI.Assets.addBundle('assets', imgs)
    }

    getProgress = () => {
        this.progress = new PIXI.Text(`加载中: 0`, style.title)
        this.progress.position.set(config.width / 2, config.height / 2)
        this.progress.anchor.set(0.5)
        return this.progress
    }

    getAssets = () => {
        return PIXI.Assets.loadBundle('assets', (res) => {
            this.progress.text = `加载中: ${res*100}%`
        })
    }
}

export default Loader