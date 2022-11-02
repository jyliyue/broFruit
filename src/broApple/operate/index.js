class Operate {
    constructor({ role, container }) {
        const { width, height } = container

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
}

export default Operate
