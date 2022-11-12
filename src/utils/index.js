const utils = {
    randomPosition: (w = 800, y = 600) => {
        const position = {
            x: Math.random() * w,
            y: Math.random() * y
        }
        return position
    },
    checkHit: (obj, target) => {
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
    setAnimate: (obj) => {
        obj.animate = {
            speed: Math.random() + 0.5,
            target: utils.randomPosition(),
            move: () => {
                const { x, y } = obj.animate.target
                const { speed } = obj.animate
                if (!utils.checkHit(obj, obj.animate.target)) {
                    obj.x = obj.x > x ? obj.x - speed : obj.x + speed
                    obj.y = obj.y > y ? obj.y - speed : obj.y + speed
                } else {
                    obj.animate.target = utils.randomPosition()
                }
            }
        }
    },
    getDistance: (obj, target) => {
        const a = obj.x - target.x
        const b = obj.y - target.y
        return a * a + b * b
    },
    checkOut: (obj) => {
        const width = 800
        const height = 600
        if (obj.x > width || obj.x < 0 || obj.y > height || obj.y < 0) {
            return true
        } else {
            return false
        }
    }
}

export default utils