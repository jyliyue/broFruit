import * as PIXI from 'pixi.js'
import utils from "../utils"

/* 怪物 */
class Monster {
    constructor(options) {
        this.assets = options.assets
        const position = utils.randomPosition()
        const monster = this.createMonster(position)
        const warn = this.createWarn(position)

        return {
            monster,
            warn
        }
    }

    createMonster = ({ x, y }) => {
        const monster = new PIXI.Sprite(this.assets.bianbian)
        monster.anchor.x = 0.5
        monster.anchor.y = 0.5
        monster.x = x
        monster.y = y  
        monster.scale.x = 0.6
        monster.scale.y = 0.6
        return monster
    }

    createWarn = ({ x, y }) => {
        const warn = new PIXI.Sprite(this.assets.warn)
        warn.anchor.x = 0.5
        warn.anchor.y = 0.5
        warn.x = x
        warn.y = y
        warn.scale.x = 0.5
        warn.scale.y = 0.5
        return warn
    }
}

export default Monster