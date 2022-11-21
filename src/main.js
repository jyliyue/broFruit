import * as PIXI from 'pixi.js'
import Loader from './class/Loader'
import config from './config'
import Board from './class/Board'
import Role from './class/Role'
import Count from './class/Count'
import Monster from './class/Monster'
import utils from './utils'


class BroFruit {
    constructor() {
        this.app = new PIXI.Application(config)
        this.loader = new Loader()
        this.board = new Board()
        this.role = new Role()
        this.count = new Count()
        this.monster = new Monster()
        this.assets = null
    }

    init = async () => {
        document.body.appendChild(this.app.view)
        await this.loading()
        this.addBg()
        this.board.init(this.assets)
        this.role.init(this.assets, this.app)
        this.monster.init(this.assets, this.app)
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
        this.startShoot()
    }

    startShoot = () => {
        this.role.timer = setTimeout(() => {
            this.role.confirmTarget(this.monster.getMonsterList())
            this.startShoot()
        }, this.role.character.quick)
    }

    stopShoot = () => {
        clearTimeout(this.role.timer)
    }

    bulletHit = () => {
        const bulletList = this.role.getBulletList()
        const monsterList = this.monster.getMonsterList()
        for (let i = bulletList.length - 1; i >= 0; i--) {
            const bullet = bulletList[i]
            if (utils.checkOut(bullet)) {
                this.role.removeBullet(i)
                continue
            }
            for (let j = monsterList.length - 1; j >= 0; j--) {
                const monster = monsterList[j]
                if (utils.checkHit(bullet, monster)) {
                    this.role.removeBullet(i)
                    this.monster.removeMonster(j)
                }
            }
        }
    }

    removeRole = () => {
        const role = this.role.getRole()
        role.stop()
        this.stopShoot()
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
        this.monster.start()
        this.runScript()
    }
    
    stagePass = () => {
        this.count.pass()
        this.resetStage()
        const options = {
            stageLevel: this.count.currentLevel,
            callBack: (type) => {
                console.log(type)
                switch (type) {
                    case 'speed':
                        this.role.character.speed = this.role.character.speed + this.role.character.speed * Math.random()
                        break;
                    case 'quick':
                        this.role.character.quick --
                        break;
                    case 'range':
                        this.role.character.range += 10
                        break;
                }
                this.app.stage.removeChild(board)
                this.stageStart()
            }
        }
        const board = this.board.getPassBoard(options)
        this.app.stage.addChild(board)
    }

    stageEnd = () => {
        this.count.end()
        this.resetStage()
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

    resetStage = () => {
        this.removeRole()
        this.removeCount()
        this.removeScript()
        this.monster.remove()
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
        /* 角色碰撞 */
        const unHited = this.monster.getMonsterList().every(item => !this.role.isHited(item))
        if (!unHited) {
            this.stageEnd()
            return false
        }
        /* 子弹碰撞 */
        this.bulletHit()
    }
}

const broFruit = new BroFruit()
broFruit.init()