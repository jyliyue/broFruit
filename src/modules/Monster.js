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
        return monster
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