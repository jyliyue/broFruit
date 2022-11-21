import config from '../config'

class Operate {
    constructor() {
        this.role = null
        this.character = null
        const { width, height } = config
        this.config = {
            w: {
                on: false,
                timer: null,
                move: () => {
                    if (this.role.y <= this.role.width / 2) {
                        return
                    }
                    this.role.y -= this.character.speed
                    this.config.w.timer = setTimeout(() => {
                        this.config.w.move(this.role)
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
                    if (this.role.x <= this.role.width / 2) {
                        return
                    }
                    this.role.x -= this.character.speed
                    this.config.a.timer = setTimeout(() => {
                        this.config.a.move(this.role)
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
                    if (this.role.y >= height - this.role.width / 2) {
                        return
                    }
                    this.role.y += this.character.speed
                    this.config.s.timer = setTimeout(() => {
                        this.config.s.move(this.role)
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
                    if (this.role.x >= width - this.role.width / 2) {
                        return
                    }
                    this.role.x += this.character.speed
                    this.config.d.timer = setTimeout(() => {
                        this.config.d.move(this.role)
                    })
                },
                clear: () => {
                    clearTimeout(this.config.d.timer)
                }
            }
        }
    }

    init = (role, character) => {
        this.role = role
        this.character = character
        role.start = () => {
            this.start()
        }
        role.stop = () => {
            this.stop()
        }
    }

    getKey = (e) => {
        const map = {
            ArrowUp: 'w',
            ArrowDown: 's',
            ArrowLeft: 'a',
            ArrowRight: 'd'
        }
        if (e.key.length > 1) {
            return map[e.key]
        } else {
            return e.key
        }
    }

    keydownHandle = (e) => {
        const key = this.getKey(e)
        if (this.config[key] && !this.config[key].on) {
            this.config[key].on = true
            this.config[key].move()
        }
    }
    keyupHandle = (e) => {
        const key = this.getKey(e)
        if (this.config[key]) {
            this.config[key].on = false
            this.config[key].clear()
        }
    }

    start = () => {
        this.setPosition()
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

    setPosition = () => {
        this.role.position.set(config.width / 2, config.height / 2)
    }
}

export default Operate