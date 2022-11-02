import * as PIXI from 'pixi.js'

const imgs = {
    bg: './static/img/bg.png',
    btn: './static/img/btn.png',
    board_bg: './static/img/board.png',
    bianbian: './static/img/bianbian.png',
    apple: './static/img/apple.png',
    bullet: './static/img/bullet.png',
    warn: './static/img/warn.png'
}

class Assets {
    constructor() {
        const assets = {}
        const loader = new PIXI.Loader()
        Object.keys(imgs).forEach((key) => {
            loader.add(key, imgs[key])
        })

        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        })
        assets.textStyle = textStyle

        loader.load((loader, resources) => {
            Object.keys(resources).forEach((key) => {
                assets[key] = resources[key].texture
            })
        })

        return {
            loader,
            assets
        }
    }
}

export default Assets
