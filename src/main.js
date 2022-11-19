import * as PIXI from 'pixi.js'
import Loader from './class/Loader'
import config from './config'
import Board from './class/Board'
import Role from './class/Role'


class BroFruit {
    constructor() {
        this.app = new PIXI.Application(config)
        this.loader = new Loader()
        this.board = new Board()
        this.role = new Role()
        this.assets = null
    }

    init = async () => {
        document.body.appendChild(this.app.view)
        await this.loading()
        this.addBg()
        this.board.init(this.assets)
        this.role.init(this.assets)
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

    addRole = () => {
        const role = this.role.getRole()
        this.app.stage.addChild(role)
    }

    /* 流程 */
    stagePending = () => {
        const options = {
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
    }
}

const broFruit = new BroFruit()
broFruit.init()