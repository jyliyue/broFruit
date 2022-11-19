import * as PIXI from 'pixi.js'
import style from "../styles"
import config from '../config'

class Count {
    static STAGE_TIME = 4
    static STAGE_LEVEL = 1
    static ADD_HARD = 2
    constructor() {
        this.stageTime = Count.STAGE_TIME
        this.currentTime = Count.STAGE_TIME
        this.currentLevel = Count.STAGE_LEVEL
        this.timer = null
        this.count = null
    }

    init = () => {
        this.count = this.setCount()
    }

    setCount = () => {
        const count = new PIXI.Text(this.currentTime, style.text)
        count.position.set(config.width / 2, config.height / 10)
        count.anchor.set(0.5)
        return count
    }

    getCount = () => {
        return this.count
    }

    setTimer = () => {
        this.timer = setTimeout(() => {
            this.currentTime --
            this.count.text = this.currentTime
            this.setTimer()
        }, 1000)
    }

    start = () => {
        this.setTimer()
    }

    pass = () => {
        clearTimeout(this.timer)
        this.currentLevel++
        this.stageTime += Count.ADD_HARD
        this.currentTime = this.stageTime
        this.count.text = this.currentTime
    }

    end = () => {
        clearTimeout(this.timer)
        const historyScore = localStorage.getItem('level') || 0
        if (historyScore < this.currentLevel) {
            localStorage.setItem('level', this.currentLevel)
        }
        this.currentLevel = 1
        this.stageTime = Count.STAGE_TIME
        this.currentTime = this.stageTime
        this.count.text = this.currentTime
    }

    checkPass = () => {
        return this.currentTime === 0
    }
}

export default Count