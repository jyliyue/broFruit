import * as PIXI from 'pixi.js'

const imgs = {
    bg: './static/img/bg.png'
}

class Texture {
    constructor() {
        const assets = {}
        const loader = new PIXI.Loader()
        Object.keys(imgs).forEach((key) => {
            loader.add(key, imgs[key])
        })

        loader.load((loader, resources) => {
            Object.keys(resources).forEach((key) => {
                assets[key] = new PIXI.TilingSprite(resources[key].texture)
            })
        })

        return {
            loader,
            assets
        }
    }
}

export default Texture
