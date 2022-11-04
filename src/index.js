import * as PIXI from 'pixi.js'

const utils = {
    randomPosition: (w = 800, y = 600) => {
        const position = {
            x: Math.random() * w,
            y: Math.random() * y
        }
        return position
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
        const role = new PIXI.Sprite(cate)
        role.anchor.x = 0.5
        role.anchor.y = 0.5
        role.x = 400
        role.y = 300

        return role
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
        this.stageTime = 5
        this.currentTime = 0
        this.totalTime = 0
        this.timer = null
        this.sprite = new PIXI.Text()
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
        this.bulletList = []
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
        this.removeBullet()
        this.removeMonster()
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

    checkCount = () => {
        return this.count.currentTime === 0
    }

    /* 角色模块 */
    addRole = () => {
        const role = new Role(this.assets.apple)
        this.role = role
        this.app.stage.addChild(this.role)
    }

    removeRole = () => {
        this.app.stage.removeChild(this.role)
    }

    addBullet = () => {
        const bullet = new Bullet({
            assets: this.assets,
            target: this.role
        })
        this.bulletList.push(bullet)
        this.app.stage.addChild(bullet)
    }

    removeBullet = () => {
        this.bulletList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.bulletList = []
    }

    /* 怪物模块 */
    addMonster = () => { 
        const { monster, warn } = new Monster({
            assets: this.assets
        })
        
        this.app.stage.addChild(warn)
        setTimeout(() => {
            this.app.stage.removeChild(warn)
            if (!this.board) {
                this.monsterList.push(monster)
                this.app.stage.addChild(monster)
                this.addMonster()
            }
        }, 1000)
    }
    
    removeMonster = (index) => {
        const monster = this.monsterList[index]
        this.app.stage.removeChild(monster)
        this.monsterList.splice(index, 1)
    }

    /* 流程模块 */
    stagePending = () => { 
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '开始',
            btnCallBack: () => {
                this.stageStart()
                this.app.stage.removeChild(this.board)
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
        this.resetAll()
        this.nextCount()
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '恭喜过关',
            btnCallBack: () => {
                this.stageStart()
                this.app.stage.removeChild(this.board)
            }
        }

        this.addBoard(options)
    }

    stageEnd = () => {
        const options = {
            assets: this.assets,
            btnText: '重新开始',
            btnCallBack: () => {
                this.stageStart()
                this.app.stage.removeChild(this.board)
            }
        }

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
        /* 刷怪 */
        for (let monsterIdx = this.monsterList.length - 1; monsterIdx >= 0; monsterIdx--) {
            const monster = this.monsterList[monsterIdx]
        }
    }
}

const broApple = new BroFruit()
broApple.init()