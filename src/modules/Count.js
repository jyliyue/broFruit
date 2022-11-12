import * as PIXI from 'pixi.js'
import style from '../styles'

/* 分数 */
class Count {
    constructor() {
        this.stageTime = 12
        this.addHard = 6
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
        this.stageTime = 12
        this.currentTime = this.stageTime
        this.totalTime = 0
    }

    nextStage = () => {
        this.stop()
        const historyScore = localStorage.getItem('score') || 0
        if (historyScore < this.totalTime) {
            localStorage.setItem('score', this.totalTime)
        }
        
        this.currentTime = this.stageTime + this.addHard
    }
}

export default Count