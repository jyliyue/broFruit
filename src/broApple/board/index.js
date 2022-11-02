import * as PIXI from 'pixi.js'

class Board {
    static PENDING = 'PENDING'
    static START = 'START'
    static STOP = 'STOP'
    constructor(options) {
        this.assets = options.assets
        this.state = options.state
        this.score = options.score
        this.historyScore = localStorage.getItem('score') || 0
        this.btnText = options.btnText
        this.btnCallBack = options.btnCallBack

        return this.setBoard()
    }

    setBoard = () => {
        const boardWindow = new PIXI.Sprite(this.assets.board_bg)
        boardWindow.width = 600
        boardWindow.height = 400
        boardWindow.anchor.x = 0.5
        boardWindow.x = 400
        boardWindow.y = 100
        const title = new PIXI.Text('BroFruit Game', this.assets.textStyle)
        title.anchor.x = 0.5
        title.y = 100
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
        score.y = 240
        boardWindow.addChild(score)
        const btn = new PIXI.Sprite(this.assets.btn)
        btn.anchor.x = 0.5
        btn.y = 300
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

    // addListenerEvent = () => {
    //     window.addEventListener('keydown', (e) => {
    //         if (e.key == 'Escape') {
    //             this.content.visible = true
    //             if (this.state == Board.START) {
    //                 this.state = Board.STOP
    //                 this.btnText.text = '继续'
    //             }
    //         }
    //     })
    // }
}

export default Board
