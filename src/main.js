import * as PIXI from 'pixi.js'
import Loader from './class/Loader'
import config from './config'
import Board from './class/Board'
import Role from './class/Role'
import Count from './class/Count'


class BroFruit {
    constructor() {
        this.app = new PIXI.Application(config)
        this.loader = new Loader()
        this.board = new Board()
        this.role = new Role()
        this.count = new Count()
        this.assets = null
    }

    init = async () => {
        document.body.appendChild(this.app.view)
        await this.loading()
        this.addBg()
        this.board.init(this.assets)
        this.role.init(this.assets)
        this.count.init()
        this.stagePending()
    }

    loading = async () => {
        const progress = this.loader.getProgress()
        this.app.stage.addChild(progress)
        this.assets = await this.loader.getAssets()
    }

    addBg = () => {
        const bg = new PIXI.TilingSprite(
            this.assets.bg,
            800,
            600
        )
        this.app.stage.addChild(bg)
    }
    /* 角色 */
    addRole = () => {
        const role = this.role.getRole()
        role.start()
        this.app.stage.addChild(role)
    }

    removeRole = () => {
        const role = this.role.getRole()
        role.stop()
        this.app.stage.removeChild(role)
    }
    /* 计数 */
    addCount = () => {
        const count = this.count.getCount()
        this.app.stage.addChild(count) 
        this.count.start()
    }

    removeCount = () => {
        const count = this.count.getCount()
        this.app.stage.removeChild(count) 
    }

    /* 流程 */
    stagePending = () => {
        const options = {
            stageLevel: this.count.currentLevel,
            callBack: () => {
                this.app.stage.removeChild(board)
                this.stageStart()
            }
        }
        const board = this.board.getStartBoard(options)
        this.app.stage.addChild(board)
    }

    stageStart = () => {
        this.addRole()
        this.addCount()
        this.runScript()
    }
    stagePass = () => {
        this.count.pass()
        this.resetStage()
        const options = {
            stageLevel: this.count.currentLevel,
            callBack: () => {
                this.app.stage.removeChild(board)
                this.stageStart()
            }
        }
        const board = this.board.getPassBoard(options)
        this.app.stage.addChild(board)
    }
    resetStage = () => {
        this.removeRole()
        this.removeCount()
        this.removeScript()
    }

    /* 运行脚本 */
    runScript = () => {
        this.app.ticker.add(this.gameScript)
    }

    removeScript = () => {
        this.app.ticker.remove(this.gameScript)
    }

    gameScript = () => {
        /* 过关判断 */
        if (this.count.checkPass()) {
            this.stagePass()
            return false
        }
    }
}

const broFruit = new BroFruit()
broFruit.init()