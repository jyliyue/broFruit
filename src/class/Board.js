import * as PIXI from 'pixi.js'
import config from '../config'
import style from "../styles"

class Board {
    constructor() {
        this.assets = null
        this.stage = 1
    }

    init = (assets) => {
        this.assets = assets
    }

    setWindow = () => {
        const window = new PIXI.Sprite(this.assets.board_bg)
        window.position.set(config.width / 2, config.height / 2)
        window.anchor.set(0.5)
        return window
    }

    setTitle = (text) => {
        const title = new PIXI.Text(text, style.title)
        title.y = -150
        title.anchor.set(0.5)
        return title
    }

    setHistoryScore = () => {
        const score = localStorage.getItem('level') || 0
        const hostoryScore = new PIXI.Text('最高记录：' + score, style.text)
        hostoryScore.y = -50
        hostoryScore.anchor.set(0.5)
        return hostoryScore
    }

    setCurrentStage = () => {
        const currentStage = new PIXI.Text('当前关卡：' + this.stage, style.text)
        currentStage.y = 0
        currentStage.anchor.set(0.5)
        return currentStage
    }

    setStartBtn = (callBack) => {
        const btn = new PIXI.Sprite(this.assets.btn)
        btn.y = 100
        btn.anchor.set(0.5)
        const btnText = new PIXI.Text('开始游戏', style.text)
        btnText.anchor.set(0.5)
        btn.addChild(btnText)
        btn.interactive = true
        btn.on('click', () => {
            callBack()
        })
        return btn
    }

    getStartBoard = (options) => {
        const window = this.setWindow()
        const title = this.setTitle('BroFruit 水果兄弟')
        window.addChild(title)
        const hostoryScore = this.setHistoryScore()
        window.addChild(hostoryScore)
        const currentStage = this.setCurrentStage()
        window.addChild(currentStage)
        const startBtn = this.setStartBtn(options.callBack)
        window.addChild(startBtn)
        return window
    }
    
    getPassBoard = () => { }
    
    getRestartBoard = () => { }
}

export default Board