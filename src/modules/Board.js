import * as PIXI from 'pixi.js'
import style from "../styles"

/* 看版 */
class Board {
    constructor(options) {
        this.type = options.type
        this.assets = options.assets
        this.state = options.state
        this.score = options.score
        this.historyScore = localStorage.getItem('level') || 0
        this.btnText = options.btnText
        this.btnCallBack = options.btnCallBack

        if (this.type == 'start') {
            return this.createStartBoard()
        } else {
            return this.createPassBoard()
        }
        // return this.createStartBoard()
        // return this.createPassBoard()
    }

    setBoardWindow = () => {
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
        return boardWindow
    }

    createText = (options) => {
        const txt = new PIXI.Text(
            options.txt,
            style.text
        )
        txt.anchor.x = 0.5
        txt.y = options.y

        return txt
    }

    createSkill = (options) => {
        const btn = new PIXI.Sprite(this.assets.btn)
        btn.anchor.x = 0.5
        btn.x = options.x
        btn.y = options.y
        btn.scale.x = 0.6
        btn.scale.y = 0.6
        
        const icon = new PIXI.Sprite(this.assets[options.img])
        icon.x = -100
        icon.y = 20
        icon.scale.x = 1.5
        icon.scale.y = 1.8
        btn.addChild(icon)

        const txt = new PIXI.Text(
            options.txt,
            style.text
        )
        txt.x = -50
        txt.y = 20
        btn.addChild(txt)

        btn.interactive = true    
        btn.on('click', () => {
            this.btnCallBack(options.type)
        })
        return btn
    }

    createStartBoard = () => {
        const boardWindow = this.setBoardWindow()
        boardWindow.addChild(this.createText({
            txt: '最高记录：' + this.historyScore,
            y: 180
        }))
        boardWindow.addChild(this.createText({
            txt: '当前关卡：' + this.score,
            y: 250
        }))

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

    createPassBoard = () => {
        const boardWindow = this.setBoardWindow()
        boardWindow.addChild(this.createText({
            txt: '当前关卡' + this.score,
            y: 180
        }))
        boardWindow.addChild(this.createText({
            txt: '选择属性升级进入下一关',
            y: 250
        }))
        boardWindow.addChild(this.createSkill({
            txt: '移速提升',
            x: -180,
            y: 350,
            type: 'speed',
            img: 'speed'
        }))
        boardWindow.addChild(this.createSkill({
            txt: '攻速提升',
            x: 0,
            y: 350,
            type: 'quick',
            img: 'quick'
        }))
        boardWindow.addChild(this.createSkill({
            txt: '攻击范围',
            x: 180,
            y: 350,
            type: 'range',
            img: 'range'
        }))
        return boardWindow
    }
}

export default Board