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
    }

    setWindow = () => {
        const window = new PIXI.Sprite(this.assets.board_bg)
        window.position.set(config.width / 2, config.height / 2)
        window.anchor.set(0.5)
        return window
    }

    setText = (options) => {
        const text = new PIXI.Text(options.text, options.style)
        text.anchor.set(0.5)
        text.position.set(options.x, options.y)
        return text
    }

    getStartBoard = (options) => {
        this.window = this.setWindow()
        const title = this.setText({
            x: 0,
            y: -150,
            text: 'BroFruit 水果兄弟',
            style: style.title
        })
        this.window.addChild(title)
        const score = localStorage.getItem('level') || 0
        const hostoryScore = this.setText({
            x: 0,
            y: -50,
            text: '最高记录：' + score,
            style:  style.text
        })
        this.window.addChild(hostoryScore)
        const currentStage = this.setText({
            x: 0,
            y: 10,
            text: '当前关卡：' + options.stageLevel,
            style:  style.text
        })
        this.window.addChild(currentStage)
        const startBtn = new Btn({
            asset: this.assets.btn,
            x: 0,
            y: 120,
            text: '开始游戏',
            callBack: options.callBack
        })
        this.window.addChild(startBtn)
        return this.window
    }
    
    getPassBoard = (options) => {
        this.window = this.setWindow()
        const title = this.setText({
            x: 0,
            y: -150,
            text: 'BroFruit 水果兄弟',
            style: style.title
        })
        this.window.addChild(title)
        const currentStage = this.setText({
            x: 0,
            y: -50,
            text: '当前关卡：' + options.stageLevel,
            style:  style.text
        })
        this.window.addChild(currentStage)
        const describe = this.setText({
            x: 0,
            y: 20,
            text: '选择属性升级进入下一关',
            style:  style.text
        })
        this.window.addChild(describe)

        const upSpeedBtn = new Btn({
            asset: this.assets.btn,
            x: -180,
            y: 120,
            scale: 0.6,
            text: '移速提升',
            icon: this.assets.speed,
            params: 'speed',
            callBack: options.callBack
        })
        this.window.addChild(upSpeedBtn)
        const upQuickBtn = new Btn({
            asset: this.assets.btn,
            x: 0,
            y: 120,
            scale: 0.6,
            text: '攻速提升',
            icon: this.assets.quick,
            params: 'quick',
            callBack: options.callBack
        })
        this.window.addChild(upQuickBtn)
        const upRangeBtn = new Btn({
            asset: this.assets.btn,
            x: 180,
            y: 120,
            scale: 0.6,
            text: '攻击范围',
            icon: this.assets.range,
            params: 'range',
            callBack: options.callBack
        })
        this.window.addChild(upRangeBtn)
        return this.window
    }
    
    getRestartBoard = (options) => { 
        this.window = this.setWindow()
        const title = this.setText({
            x: 0,
            y: -150,
            text: 'BroFruit 水果兄弟',
            style: style.title
        })
        this.window.addChild(title)
        const score = localStorage.getItem('level') || 0
        const hostoryScore = this.setText({
            x: 0,
            y: -50,
            text: '最高记录：' + score,
            style:  style.text
        })
        this.window.addChild(hostoryScore)
        const currentStage = this.setText({
            x: 0,
            y: 10,
            text: '当前关卡：' + options.stageLevel,
            style:  style.text
        })
        this.window.addChild(currentStage)
        const startBtn = new Btn({
            asset: this.assets.btn,
            x: 0,
            y: 120,
            text: '重新开始',
            callBack: options.callBack
        })
        this.window.addChild(startBtn)
        return this.window
    }
}

export default Board