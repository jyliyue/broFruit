import * as PIXI from 'pixi.js'
import config from '../config'
import Operate from './Operate'
import utils from '../utils'
import Bullet from './Bullet'
import gsap from "gsap"

class Role {
    static CHARACTER = {
        speed: 0.5,
        quick: 1 * 1000,
        range: 500,
    }
    constructor() {
        this.assets = null
        this.app = null
        this.operate = new Operate()
        this.role = null
        this.character = Role.CHARACTER
        this.bulletList = []
        this.timer = null
    }

    init = (assets, app) => {
        this.assets = assets
        this.app = app
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

    confirmTarget = (monsterList) => {
        let target = null
        let min = Infinity
        monsterList.forEach((item) => {
            const distance = utils.getDistance(this.role, item)
            if (min > distance) {
                min = distance
                target = item
            }
        })
        if (min > this.character.range) {
            return null
        } else {
            this.setFire(target)
        }
    }

    createBullet = () => {
        const bullet = new Bullet({
            asset: this.assets.bullet,
            x: this.role.x,
            y: this.role.y
        })
        this.bulletList.push(bullet)
        this.app.stage.addChild(bullet)

        return bullet
    }

    removeBullet = (index) => {
        const bullet = this.bulletList[index]
        this.app.stage.removeChild(bullet)
        this.bulletList.splice(index, 1)
    }

    removeBullets = () => {
        this.bulletList.forEach(item => {
            this.app.stage.removeChild(item)
        })
        this.bulletList = []
    }

    getBulletList = () => {
        return this.bulletList
    }

    setFire = (target) => {
        const bullet = this.createBullet()
        let x = 0
        let y = 0
        const [x1, y1, x2, y2] = [bullet.x, bullet.y, target.x, target.y]
        
        if (x2 > x1 && y2 > y1) {
            y = 610
            x = (y - y1)*(x2 - x1)/(y2 - y1) + x1
        } else if (x2 > x1 && y2 < y1) {
            y = - 10
            x = (y - y1)*(x2 - x1)/(y2 - y1) + x1
        } else if (x2 < x1 && y2 > y1) {
            y = 610
            x = (y - y1)*(x2 - x1)/(y2 - y1) + x1
        } else if (x2 < x1 && y2 < y1) {
            y = - 10
            x = (y - y1)*(x2 - x1)/(y2 - y1) + x1
        }

        const distance = utils.getDistance(bullet, { x, y })
        gsap.to(bullet, {
            duration: distance/Bullet.SPEED,
            y: y,
            x: x,
            ease: "none"
        })
    }
}

export default Role