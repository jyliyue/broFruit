import * as PIXI from 'pixi.js'

class Role {
    constructor({ container, assets }) {
        const { width, height } = container
        const role = new PIXI.Sprite(assets.apple)
        role.container = container
        role.anchor.x = 0.5
        role.anchor.y = 0.5
        role.x = 400
        role.y = 300

        return role
    }
}

export default Role
