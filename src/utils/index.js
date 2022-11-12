import gsap from "gsap"

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
        const target = utils.randomPosition()
        const { x, y } = target
        const speed = 100
        const distance = Math.sqrt(utils.getDistance(obj, { x, y }))
        const duration = distance/speed
        gsap.to(obj, {
            duration: duration,
            y: y,
            x: x,
            ease: "none"
        })

        setTimeout(() => {
            if (obj) {
                utils.setAnimate(obj)
            }
        }, duration * 1000)

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