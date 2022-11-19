import * as PIXI from 'pixi.js'
import gsap from "gsap"
import config from '../config'
import utils from '../utils'

class Monster {
    constructor() {
        this.assets = null
        this.app = null
        this.warnList = []
        this.monsterList = []
        this.timer = null
    }

    init = (assets, app) => {
        this.assets = assets
        this.app = app
    }

    createMonster = ({ x, y }) => {
        const monster = new PIXI.Sprite(this.assets.bianbian)
        monster.anchor.set(0.5)
        monster.position.set(x, y)
        monster.scale.set(0.6)
        return monster
    }

    removeMonster = () => {
        this.monsterList.forEach(item => {
            this.app.stage.removeChild(item)
        })
        this.monsterList = []
    }

    createWarn = ({ x, y }) => {
        const warn = new PIXI.Sprite(this.assets.warn)
        warn.anchor.set(0.5)
        warn.position.set(x, y)
        warn.scale.set(0.6)
        return warn
    }

    removeWarn = () => {
        this.warnList.forEach(item => {
            this.app.stage.removeChild(item)
        })
        this.warnList = []
    }

    createPosition = () => {
        const position = {
            x: Math.random() * config.width,
            y: Math.random() * config.height
        }
        return position
    }

    setAnimate = (obj) => {
        const target = this.createPosition()
        const { x, y } = target
        const speed = 100
        const distance = utils.getDistance(obj, { x, y })
        const duration = distance/speed
        gsap.to(obj, {
            duration: duration,
            y: y,
            x: x,
            ease: "none"
        })

        setTimeout(() => {
            if (obj) {
                this.setAnimate(obj)
            }
        }, duration * 1000)
    }

    addMonster = () => {
        const { x, y } = this.createPosition()
        const warn = this.createWarn({ x, y })
        const monster = this.createMonster({ x, y })
        this.warnList.push(warn)
        this.app.stage.addChild(warn)
        this.timer = setTimeout(() => {
            this.app.stage.removeChild(warn)
            this.warnList.shift()
            this.monsterList.push(monster)
            this.app.stage.addChild(monster)
            this.setAnimate(monster)
            this.addMonster()
        }, 1000)
    }

    start = () => {
        this.addMonster()
    }

    remove = () => {
        clearTimeout(this.timer)
        this.removeMonster()
        this.removeWarn()
    }
}

export default Monster