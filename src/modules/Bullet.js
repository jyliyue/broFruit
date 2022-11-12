import * as PIXI from 'pixi.js'

/* 子弹 */
class Bullet {
    constructor(options) {
        const bullet = new PIXI.Sprite(options.assets.bullet)

        bullet.anchor.x = 0.5
        bullet.anchor.y = 0.5
        bullet.x = options.target.x
        bullet.y = options.target.y

        return bullet
    }
}

export default Bullet