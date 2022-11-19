import * as PIXI from 'pixi.js'
import config from '../config'
import style from "../styles"
import Btn from './Btn'

class Board {
    constructor() {
        this.assets = null
        this.window = null
    }

    init = (assets) => {
        this.assets = assets
        this.window = this.setWindow()
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

    setCurrentStage = (stageLevel) => {
        const currentStage = new PIXI.Text('当前关卡：' + stageLevel, style.text)
        currentStage.y = 0
        currentStage.anchor.set(0.5)
        return currentStage
    }

    getStartBoard = (options) => {
        const title = this.setTitle('BroFruit 水果兄弟')
        this.window.addChild(title)
        const hostoryScore = this.setHistoryScore()
        this.window.addChild(hostoryScore)
        const currentStage = this.setCurrentStage(options.stageLevel)
        this.window.addChild(currentStage)
        const startBtn = new Btn({
            asset: this.assets.btn,
            x: 0,
            y: 100,
            text: '开始游戏',
            callBack: options.callBack
        })
        this.window.addChild(startBtn)
        return this.window
    }
    
    getPassBoard = (options) => {
        this.window = this.setWindow()
        const title = this.setTitle('恭喜过关')
        this.window.addChild(title)
        const hostoryScore = this.setHistoryScore()
        this.window.addChild(hostoryScore)
        const currentStage = this.setCurrentStage(options.stageLevel)
        this.window.addChild(currentStage)
        const startBtn = new Btn({
            asset: this.assets.btn,
            x: 0,
            y: 100,
            text: '下一关',
            callBack: options.callBack
        })
        this.window.addChild(startBtn)
        return this.window
    }
    
    getRestartBoard = () => { }
}

export default Board