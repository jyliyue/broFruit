import * as PIXI from 'pixi.js'
import gsap from "gsap"
import utils from '../utils'
import Operate from './Operate'

/* 角色 */
class Role extends Operate {
    static CHARACTER = {
        speed: 0.5,
        quick: 1,
        range: 100
    }
    constructor(options) {
        const role = new PIXI.Sprite(options.cate)
        super(role)
        this.initRole(role)

        this.options = options
        this.role = role

        
        role.start = () => {
            this.start(role.character.speed)
        }
        role.stop = () => {
            this.stop()
        }
        role.isHited = this.isHited
        role.confirmTarget = this.confirmTarget
        role.setFire = this.setFire
        return role
    }

    initRole = (role) => {
        role.anchor.x = 0.5
        role.anchor.y = 0.5
        role.x = 400
        role.y = 300
        role.scale.x = 0.6
        role.scale.y = 0.6
        role.character = Role.CHARACTER
    }

    isHited = (target) => {
        return utils.checkHit(this.role, target)
    }

    confirmTarget = (targetList) => {
        let target = null
        let min = Infinity
        targetList.forEach((item) => {
            const distance = utils.getDistance(this.role, item)
            if (min > distance) {
                min = distance
                target = item
            }
        })
        if (min / 500 > this.options.range) {
            return null
        } else {
            this.setFire()
            // return target
        }
    }

    setFire = (obj, options) => {
        
        let x = 0
        let y = 0
        const [ x1, y1, x2, y2 ] = [ obj.x, obj.y, options.target.x, options.target.y ]
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

        
        const distance = Math.sqrt(utils.getDistance(obj, { x, y }))
        gsap.to(obj, {
            duration: distance/options.speed,
            y: y,
            x: x,
            ease: "none"
        })

    }
}

export default Role