import * as PIXI from 'pixi.js'
import utils from '../utils'

class Monster {
    constructor({ app, assets }) {
        this.app = app
        this.assets = assets
        this.monster = new PIXI.Sprite(assets.bianbian)
        this.monster.anchor.x = 0.5
        this.monster.anchor.y = 0.5
        const x = (800 - 10) * Math.random()
        const y = (600 - 10) * Math.random()
        this.monster.x = x
        this.monster.y = y

        const monster = this.monster
        const warn = this.createWarn({ x, y })
        utils.setAnimate(monster)
        return {
            warn,
            monster
        }
    }

    createWarn = ({ x, y }) => {
        const warn = new PIXI.Sprite(this.assets.warn)
        warn.anchor.x = 0.5
        warn.anchor.y = 0.5
        warn.x = x
        warn.y = y
        return warn
    }
}

export default Monster
