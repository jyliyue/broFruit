import * as PIXI from 'pixi.js'

const utils = {
    setAnimate: (obj) => {
        obj.animate = {
            speed: Math.random() + 0.5,
            target: utils.createTarget(obj.container),
            move: () => {
                const { x, y } = obj.animate.target
                const { speed } = obj.animate
                if (!utils.checkCrash(obj, obj.animate.target)) {
                    obj.x = obj.x > x ? obj.x - speed : obj.x + speed
                    obj.y = obj.y > y ? obj.y - speed : obj.y + speed
                } else {
                    obj.animate.target = utils.createTarget(obj.container)
                }
            }
        }
    },
    setFire: (obj, options) => {
        const k = (options.target.y - obj.y) / (options.target.x - obj.x)

        const target = {
            x: options.target.x * 100 * (options.target.x - obj.x),
            y: options.target.y * 100 * (options.target.y - obj.y),
            k: k
        }
        // console.log(target);
        obj.animate = {
            speed: options.speed,
            target: target,
            move: () => {
                const { x, y } = obj.animate.target
                const k = Math.abs(obj.animate.target.k)
                const speed = obj.animate.speed
                obj.x = obj.x > x ? obj.x - speed : obj.x + speed
                obj.y = obj.y > y ? obj.y - speed * k : obj.y + speed * k
            }
        }
    },
    createTarget: () => {
        const target = {
            x: Math.random() * 800,
            y: Math.random() * 600
        }
        return target
    },
    checkOut: (obj) => {
        const { width, height } = obj.container
        if (obj.x > width || obj.x < 0 || obj.y > height || obj.y < 0) {
            return true
        } else {
            return false
        }
    },
    checkCrash: (obj, target) => {
        let result = null
        const c = target.width ? (obj.width + target.width) / 2 : 2
        const a = obj.x - target.x
        const b = obj.y - target.y
        if (c * c > a * a + b * b) {
            result = true
        } else {
            result = false
        }
        return result
    },
    getDistance: (obj, target) => {
        const a = obj.x - target.x
        const b = obj.y - target.y
        return a * a + b * b
    },
    confirmTarget: (obj, targetList) => {
        let target = null
        let min = Infinity
        targetList.forEach((item, index) => {
            const distance = utils.getDistance(obj, item)
            if (min > distance) {
                min = distance
                target = item
            }
        })

        return target
    },
    countTime: (time, fn) => {
        setTimeout(() => {
            fn()
        }, time)
    }
}

export default utils
