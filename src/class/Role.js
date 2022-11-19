import * as PIXI from 'pixi.js'
import config from '../config'
import Operate from './Operate'
import utils from '../utils'

class Role {
    static CHARACTER = {
        speed: 0.5,
        quick: 1,
        range: 100
    }
    constructor() {
        this.assets = null
        this.operate = new Operate()
        this.role = null
        this.character = Role.CHARACTER
    }

    init = (assets) => {
        this.assets = assets
        this.setRole()
    }

    setRole = () => {
        const role = new PIXI.Sprite(this.assets.apple)
        role.position.set(config.width / 2, config.height / 2)
        role.anchor.set(0.5)
        role.scale.set(0.6)
        this.operate.init(role, this.character)
        this.role = role
    }

    getRole = () => {
        return this.role
    }

    isHited = (target) => {
        return utils.checkHit(this.role, target)
    }
}

export default Role