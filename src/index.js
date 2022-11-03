import * as PIXI from 'pixi.js'

/* 加载游戏资源 */
function loadAssets() {
    const imgs = {
        bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/f7f681ccd9a749dc89ed952765698c7e.png',
        btn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/8207f7c63986402284477874c02b3cb2.png',
        board_bg: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/add924edf7574237b9df52c5616d0fad.png',
        bianbian: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/157233c9fb24483ab8ee227c992c93b0.png',
        apple: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/0b731d24301c4d7a9800a355e8989aeb.png',
        bullet: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/fb74707d448749c0af159cddbdb1dbad.png',
        warn: 'https://kuka-iretail-test.oss-cn-hangzhou.aliyuncs.com/salorder/6a97f5db4029410592a6782f3d3fda35.png'
    }
    PIXI.Assets.addBundle('assets', imgs);
    return PIXI.Assets.loadBundle('assets');
}

/* 角色 */
class Role {
    constructor(role) {
        const role = new PIXI.Sprite(role)
        role.anchor.x = 0.5
        role.anchor.y = 0.5
        role.x = 400
        role.y = 300
    }
}

/* 怪物 */
class Monster {
    constructor(monster) {

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
        const title = new PIXI.Text('BroFruit 水果兄弟', this.assets.titleStyle)
        title.anchor.x = 0.5
        title.y = 70
        boardWindow.addChild(title)
        const historyScore = new PIXI.Text(
            '最高记录：' + this.historyScore,
            this.assets.textStyle
        )
        historyScore.anchor.x = 0.5
        historyScore.y = 180
        boardWindow.addChild(historyScore)
        const score = new PIXI.Text(
            '当前得分：' + this.score,
            this.assets.textStyle
        )
        score.anchor.x = 0.5
        score.y = 250
        boardWindow.addChild(score)
        const btn = new PIXI.Sprite(this.assets.btn)
        btn.anchor.x = 0.5
        btn.y = 320
        const btnText = new PIXI.Text(this.btnText, this.assets.textStyle)
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

/* 水果兄弟 */
class BroFruit {
    constructor() {
        this.app = new PIXI.Application()
        this.assets = null
        this.role = null
        this.board = null
        this.monsterList = []
    }

    /* 初始化 */
    init = async () => {
        this.assets = await loadAssets()
        document.body.appendChild(this.app.view)
        this.addBg()
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

    /* 角色模块 */
    addRole = () => {
        const role = new Role(this.assets.apple)
        this.role = role
        this.app.stage.addChild(this.role)
    }

    removeRole = () => {
        this.app.stage.removeChild(this.role)
    }

    /* 怪物模块 */
    addMonster = () => { 
        const monster = new Monster(this.assets.bianbian)
        this.monsterList.push(monster)
    }
    
    removeMonster = (index) => {
        const monster = this.monsterList[index]
        this.app.stage.removeChild(monster)
        this.monsterList.splice(index, 1)
    }
}

const broApple = new BroFruit()
broApple.init()