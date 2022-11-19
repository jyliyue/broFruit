import * as PIXI from 'pixi.js'
import config from '../config'

class Role {
    constructor() {
        this.assets = null
    }

    init = (assets) => {
        this.assets = assets
    }

    setRole = () => {
        const role = new PIXI.Sprite(this.assets.apple)
        role.position.set(config.width / 2, config.height / 2)
        role.anchor.set(0.5)
        role.scale.set(0.6)
        return role
    }

    getRole = () => {
        const role = this.setRole()
        return role
    }
}

export default Role