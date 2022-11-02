import * as PIXI from 'pixi.js'

class Count {
    constructor() {
        this.stageTime = 5
        this.currentTime = 0
        this.totalTime = 0
        this.timer = null
        this.sprite = new PIXI.Text()
    }

    timing = () => {
        this.timer = setTimeout(() => {
            this.currentTime--
            this.totalTime++
            this.sprite.text = this.currentTime
            this.timing()
        }, 1000)
    }

    start = () => {
        this.currentTime = this.stageTime
        this.timing()
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

export default Count
