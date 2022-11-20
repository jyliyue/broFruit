import * as PIXI from 'pixi.js'

/* 子弹 */
class Bullet {
    static SPEED = 500
    constructor(options) {
        const bullet = new PIXI.Sprite(options.asset)
        bullet.anchor.set(0.5)
        bullet.position.set(options.x, options.y)

        return bullet
    }
}

export default Bullet