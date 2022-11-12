import * as PIXI from 'pixi.js'
import style from '../styles'

/* 分数 */
class Count {
    static STAGETIME = 4
    static ADDHARD = 2
    constructor() {
        this.stageTime = Count.STAGETIME
        this.addHard = Count.ADDHARD
        this.level = 1
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
        this.level = 1
        this.currentTime = this.stageTime
        this.going()
    }

    continue = () => {
        this.currentTime = this.stageTime + this.addHard
        this.going()
    }

    stop = () => {
        clearTimeout(this.timer)
        this.timer = null
    }

    reset = () => {
        this.stop()
        this.level = 1
        this.stageTime = Count.STAGETIME
        this.currentTime = this.stageTime
        this.totalTime = 0
    }

    nextStage = () => {
        this.stop()
        this.level++
        const historyScore = localStorage.getItem('score') || 0
        if (historyScore < this.totalTime) {
            localStorage.setItem('score', this.totalTime)
        }
    }
}

export default Count