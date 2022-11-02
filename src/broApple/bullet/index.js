import * as PIXI from 'pixi.js'

class Bullet {
    constructor({ role, assets }) {
        const bullet = new PIXI.Sprite(assets.bullet)

        bullet.container = role.container
        bullet.pivot.set(0.5, 0.5)
        bullet.x = role.x
        bullet.y = role.y

        return bullet
    }
}

export default Bullet
