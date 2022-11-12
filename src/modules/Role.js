import * as PIXI from 'pixi.js'
import gsap from "gsap"
import utils from '../utils'

/* 角色 */
class Role {
    constructor(cate) {
        this.role = new PIXI.Sprite(cate)
        const role = this.role
        role.anchor.x = 0.5
        role.anchor.y = 0.5
        role.x = 400
        role.y = 300

        const width = 800
        const height = 600
        this.config = {
            w: {
                on: false,
                timer: null,
                move: () => {
                    if (role.y <= role.width / 2) {
                        return
                    }
                    role.y--
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
                    role.x--
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
                    role.y++
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
                    role.x++
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

    start = () => {
        window.addEventListener('keydown', this.keydownHandle)
        window.addEventListener('keyup', this.keyupHandle)
    }

    stop = () => {
        window.removeEventListener('keydown', this.keydownHandle)
        window.removeEventListener('keyup', this.keyupHandle)
        this.config.w.clear()
        this.config.a.clear()
        this.config.s.clear()
        this.config.d.clear()
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
        // console.log(min);
        if (min > 80000) {
            return null
        } else {
            return target
        }
    }

    setFire = (obj, options) => {
        // console.log(obj.x, obj.y);
        // console.log(options.target.x, options.target.y);
        // console.log('====');
        
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


        // obj.animate = {
        //     speed: options.speed,
        //     target: target,
        //     move: () => {
        //         const { x, y } = obj.animate.target
        //         const k = Math.abs(obj.animate.target.k)
        //         const speed = obj.animate.speed

        //         obj.x = obj.x > x ? obj.x - speed : obj.x + speed
        //         obj.y = obj.y > y ? obj.y - speed * k : obj.y + speed * k
        //     }
        // }
    }
}

export default Role