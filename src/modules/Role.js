import * as PIXI from 'pixi.js'
import gsap from "gsap"
import utils from '../utils'

/* 角色 */
class Role {
    static CHARACTER = {
        speed: 0.5,
        quick: 1,
        range: 100
    }
    constructor(options) {
        this.options = options
        this.timer = null
        this.role = new PIXI.Sprite(options.cate)
        const role = this.role
        role.anchor.x = 0.5
        role.anchor.y = 0.5
        role.x = 400
        role.y = 300
        role.scale.x = 0.6
        role.scale.y = 0.6
        role.character = Role.CHARACTER

        const width = 800
        const height = 600
        const speed = role.character.speed

        this.config = {
            w: {
                on: false,
                timer: null,
                move: () => {
                    if (role.y <= role.width / 2) {
                        return
                    }
                    role.y -= speed
                    this.config.w.timer = setTimeout(() => {
                        this.config.w.move(role)
                    })
                },
                clear: () => {
                    clearTimeout(this.config.w.timer)
                }
            },
            a: {
                on: false,
                timer: null,
                move: () => {
                    if (role.x <= role.width / 2) {
                        return
                    }
                    role.x -= speed
                    this.config.a.timer = setTimeout(() => {
                        this.config.a.move(role)
                    })
                },
                clear: () => {
                    clearTimeout(this.config.a.timer)
                }
            },
            s: {
                on: false,
                timer: null,
                move: () => {
                    if (role.y >= height - role.width / 2) {
                        return
                    }
                    role.y += speed
                    this.config.s.timer = setTimeout(() => {
                        this.config.s.move(role)
                    })
                },
                clear: () => {
                    clearTimeout(this.config.s.timer)
                }
            },
            d: {
                on: false,
                timer: null,
                move: () => {
                    if (role.x >= width - role.width / 2) {
                        return
                    }
                    role.x += speed
                    this.config.d.timer = setTimeout(() => {
                        this.config.d.move(role)
                    })
                },
                clear: () => {
                    clearTimeout(this.config.d.timer)
                }
            }
        }
        role.start = this.start
        role.stop = this.stop
        role.isHited = this.isHited
        role.confirmTarget = this.confirmTarget
        role.setFire = this.setFire
        return role
    }

    keydownHandle = (e) => {
        const { key } = e
        if (this.config[key] && !this.config[key].on) {
            this.config[key].on = true
            this.config[key].move()
        }
    }
    keyupHandle = (e) => {
        const { key } = e
        if (this.config[key]) {
            this.config[key].on = false
            this.config[key].clear()
        }
    }

    start = (fns) => {
        window.addEventListener('keydown', this.keydownHandle)
        window.addEventListener('keyup', this.keyupHandle)
        this.timer = setTimeout(() => {
            fns.forEach(fn => {
                fn()
            })
        }, this.role.character.speed)
    }

    stop = () => {
        window.removeEventListener('keydown', this.keydownHandle)
        window.removeEventListener('keyup', this.keyupHandle)
        this.config.w.clear()
        this.config.a.clear()
        this.config.s.clear()
        this.config.d.clear()
        clearTimeout(this.timer)
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
            return target
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