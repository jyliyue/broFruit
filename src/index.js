import * as PIXI from 'pixi.js'

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

/* 样式 */
const style = {
    title: new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 64,
        fill: 'white',
        stroke: '#ff3300',
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
    }),
    text: new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 'white',
        stroke: '#ff3300',
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
    })
}

/* 定时器 */
const timer = {
    addMonster: null
}

/* 加载游戏资源 */
function loadAssets() {
    const imgs = {
        bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/f7f681ccd9a749dc89ed952765698c7e.png',
        btn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/8207f7c63986402284477874c02b3cb2.png',
        board_bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/fb74707d448749c0af159cddbdb1dbad.png',
        bianbian: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/157233c9fb24483ab8ee227c992c93b0.png',
        apple: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/0b731d24301c4d7a9800a355e8989aeb.png',
        bullet: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/6a97f5db4029410592a6782f3d3fda35.png',
        warn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/add924edf7574237b9df52c5616d0fad.png'
    }
    PIXI.Assets.addBundle('assets', imgs);
    return PIXI.Assets.loadBundle('assets');
}

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
        return target
    }

    setFire = (obj, options) => {
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
    }
}

/* 子弹 */
class Bullet {
    constructor(options) {
        const bullet = new PIXI.Sprite(options.assets.bullet)

        bullet.anchor.x = 0.5
        bullet.anchor.y = 0.5
        bullet.x = options.target.x
        bullet.y = options.target.y

        return bullet
    }
}

/* 怪物 */
class Monster {
    constructor(options) {
        this.assets = options.assets
        const position = utils.randomPosition()
        const monster = this.createMonster(position)
        utils.setAnimate(monster)
        const warn = this.createWarn(position)

        return {
            monster,
            warn
        }
    }

    createMonster = ({ x, y }) => {
        const monster = new PIXI.Sprite(this.assets.bianbian)
        monster.anchor.x = 0.5
        monster.anchor.y = 0.5
        monster.x = x
        monster.y = y  
        return monster
    }

    createWarn = ({ x, y }) => {
        const warn = new PIXI.Sprite(this.assets.warn)
        warn.anchor.x = 0.5
        warn.anchor.y = 0.5
        warn.x = x
        warn.y = y
        return warn
    }
}

/* 看版 */
class Board {
    constructor(options) {
        this.assets = options.assets
        this.state = options.state
        this.score = options.score
        this.historyScore = localStorage.getItem('score') || 0
        this.btnText = options.btnText
        this.btnCallBack = options.btnCallBack

        return this.initBoard()
    }

    initBoard = () => {
        const boardWindow = new PIXI.Sprite(this.assets.board_bg)
        boardWindow.width = 600
        boardWindow.height = 400
        boardWindow.anchor.x = 0.5
        boardWindow.x = 400
        boardWindow.y = 100
        const title = new PIXI.Text('BroFruit 水果兄弟', style.title)
        title.anchor.x = 0.5
        title.y = 70
        boardWindow.addChild(title)
        const historyScore = new PIXI.Text(
            '最高记录：' + this.historyScore,
            style.text
        )
        historyScore.anchor.x = 0.5
        historyScore.y = 180
        boardWindow.addChild(historyScore)
        const score = new PIXI.Text(
            '当前得分：' + this.score,
            style.text
        )
        score.anchor.x = 0.5
        score.y = 250
        boardWindow.addChild(score)
        const btn = new PIXI.Sprite(this.assets.btn)
        btn.anchor.x = 0.5
        btn.y = 320
        const btnText = new PIXI.Text(this.btnText, style.text)
        btnText.anchor.x = 0.5
        btnText.y = 25
        btn.addChild(btnText)
        btn.interactive = true
        btn.on('click', () => {
            this.btnCallBack()
        })
        boardWindow.addChild(btn)

        return boardWindow
    }
}

/* 分数 */
class Count {
    constructor() {
        this.stageTime = 64
        this.currentTime = 0
        this.totalTime = 0
        this.timer = null
        this.sprite = new PIXI.Text('', style.text)
        this.sprite.anchor.x = 0.5
        this.sprite.anchor.y = 0.5
        this.sprite.x = 400
        this.sprite.y = 50
    }

    going = () => {
        this.timer = setTimeout(() => {
            this.currentTime--
            this.totalTime++
            this.sprite.text = this.currentTime
            this.going()
        }, 1000)
    }

    start = () => {
        this.currentTime = this.stageTime
        this.going()
    }

    stop = () => {
        clearTimeout(this.timer)
        this.timer = null
    }

    reset = () => {
        this.currentTime = this.stageTime
        this.totalTime = 0
    }

    nextStage = () => {
        this.stop()
        const historyScore = localStorage.getItem('score') || 0
        if (historyScore < this.totalTime) {
            localStorage.setItem('score', this.totalTime)
        }
        this.currentTime = this.stageTime
    }
}

/* 水果兄弟 */
class BroFruit {
    constructor() {
        this.app = new PIXI.Application()
        this.assets = null
        this.role = null
        this.board = null
        this.count = new Count()
        this.monsterList = []
        this.warnList = []
        this.bulletList = []
        this.shootTime = 60
    }

    /* 初始化 */
    init = async () => {
        this.assets = await loadAssets()
        document.body.appendChild(this.app.view)
        this.addBg()
        this.stagePending()
    }

    resetAll = () => {
        this.removeAnimate()
        this.removeRole()
        this.removeAllBullet()
        this.removeAllMonster()
        this.nextCount()
    }

    /* 添加背景 */
    addBg = () => {
        const bg = new PIXI.TilingSprite(
            this.assets.bg,
            800,
            600
        )
        this.app.stage.addChild(bg)
    }

    /* 面板模块 */
    addBoard = (options) => {
        const board = new Board(options)
        this.board = board
        this.app.stage.addChild(this.board)
    }

    removeBoard = () => {
        this.app.stage.removeChild(this.board)
        this.board = null
    }

    /* 计分模块 */
    addCount = () => {
        this.app.stage.addChild(this.count.sprite)
        this.count.start()
    }

    stopCount = () => {
        this.count.stop()
    }

    nextCount = () => {
        this.count.nextStage()
    }

    resetCount = () => {
        this.count.reset()
    }

    checkCount = () => {
        return this.count.currentTime === 0
    }

    /* 角色模块 */
    addRole = () => {
        const role = new Role(this.assets.apple)
        this.role = role
        this.role.start()
        this.app.stage.addChild(this.role)
    }

    removeRole = () => {
        this.role.stop()
        this.app.stage.removeChild(this.role)
        this.role = null
    }

    addBullet = () => {
        const target = this.role.confirmTarget(this.monsterList)
        if (target) {
            const bullet = new Bullet({
                assets: this.assets,
                target: this.role
            })
            this.role.setFire(bullet, { target: target, speed: 5 })
            this.bulletList.push(bullet)
            this.app.stage.addChild(bullet)
        }
    }

    removeBullet = (index) => {
        const bullet = this.bulletList[index]
        this.app.stage.removeChild(bullet)
        this.bulletList.splice(index, 1)
    }

    removeAllBullet = () => {
        this.bulletList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.bulletList = []
        this.shootTime = 60
    }

    bulletScript = () => {
        if (this.shootTime === 60) {
            this.addBullet()
            this.shootTime = 0
        } else {
            this.shootTime += 10
        }

        for (let i = this.bulletList.length - 1; i >= 0; i--) {
            const bullet = this.bulletList[i]
            if (utils.checkOut(bullet)) {
                this.removeBullet(i)
                continue
            }
            for (let j = this.monsterList.length - 1; j >= 0; j--) {
                const monster = this.monsterList[j]
                if (utils.checkHit(bullet, monster)) {
                    this.removeBullet(i)
                    this.removeMonster(j)
                }
            }
            bullet.animate.move()
        }
    }

    /* 怪物模块 */
    addMonster = () => { 
        const { monster, warn } = new Monster({
            assets: this.assets
        })
        this.warnList.push(warn)
        this.app.stage.addChild(warn)
        timer.addMonster = setTimeout(() => {
            this.app.stage.removeChild(warn)
            this.warnList.shift()
            if (!this.board) {
                this.monsterList.push(monster)
                this.app.stage.addChild(monster)
                this.addMonster()
            }
        }, 1000)
    }

    monsterScript = () => {
        for (let i = this.monsterList.length - 1; i >= 0; i--) {
            const monster = this.monsterList[i]
            monster.animate.move()
        }
    }
    
    removeMonster = (index) => {
        const monster = this.monsterList[index]
        this.app.stage.removeChild(monster)
        this.monsterList.splice(index, 1)
    }

    removeAllMonster = () => {
        this.warnList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.warnList = []
        this.monsterList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.monsterList = []
        clearTimeout(timer.addMonster)
        timer.addMonster = null
    }

    /* 流程模块 */
    stagePending = () => { 
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '开始',
            btnCallBack: () => {
                this.stageStart()
                this.removeBoard()
            }
        }
        this.addBoard(options)
    }
    
    stageStart = () => { 
        this.addRole()
        this.addMonster()
        this.addCount()
        this.addAnimate()
    }

    stagePass = () => {
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '恭喜过关',
            btnCallBack: () => {
                this.stageStart()
                this.removeBoard()
            }
        }
        this.resetAll()
        this.nextCount()
        this.addBoard(options)
    }

    stageEnd = () => {
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '重新开始',
            btnCallBack: () => {
                this.stageStart()
                this.removeBoard()
            }
        }
        this.resetAll()
        this.resetCount()
        this.addBoard(options)
    }

    /* 动画模块 */
    addAnimate = () => {
        this.app.ticker.add(this.animateScript)
    }

    removeAnimate = () => {
        this.app.ticker.remove(this.animateScript)
        // clearTimeout(this.stageTimer)
    }

    animateScript = () => {
        /* 过关判断 */
        if (this.checkCount()) {
            this.stagePass()
            return false
        }
        /* 碰撞判断 */
        const unHited = this.monsterList.every(item => !this.role.isHited(item))
        if (!unHited) {
            this.stageEnd()
            return false
        }
        /* 怪物行动 */
        this.monsterScript()
        /* 子弹动画 */
        this.bulletScript()
    }
}

const broApple = new BroFruit()
broApple.init()