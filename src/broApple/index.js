import * as PIXI from 'pixi.js'
import utils from './utils'
import Role from './role'
import Bullet from './bullet'
import Operate from './operate'
import Monster from './monster'
import Board from './board'
import Assets from './assets'
import Count from './count'

class Brotato {
    constructor() {
        this.app = new PIXI.Application()
        this.loader = new PIXI.Loader()
        this.assets = new Assets(this.loader)
        this.board = null
        this.role = null
        this.operate = null
        this.actors = []
        this.warns = []
        this.bullets = []
        this.shootTimer = 0
        this.gameTimer = 2048
        this.stageTimer = null
        this.count = new Count()

        this.init()
    }

    init = () => {
        document.body.appendChild(this.app.view)
        this.loader.onComplete.add(() => {
            const bg = new PIXI.TilingSprite(
                this.assets.bg,
                800,
                600
            )
            this.app.stage.addChild(bg)
            this.stagePending()
        })
    }

    resetAll = () => {
        this.removeAnimate()
        this.removeRole()
        this.removeBullet()
        this.removeMonster()
        this.nextCount()
    }

    addBoard = (options) => {
        this.board = new Board(options)
        this.app.stage.addChild(this.board)
    }

    addRole = () => {
        this.role = new Role({
            container: this.app.screen,
            assets: this.assets
        })
        this.operate = new Operate({
            role: this.role,
            container: this.app.screen
        })
        this.app.stage.addChild(this.role)
        this.operate.start()
    }

    removeRole = () => {
        this.operate.stop()
        this.app.stage.removeChild(this.role)
        this.role = null
    }

    addBullet = (target) => {
        const bullet = new Bullet({ role: this.role, assets: this.assets })
        utils.setFire(bullet, { target: target, speed: 5 })
        this.bullets.push(bullet)
        this.app.stage.addChild(bullet)
    }

    removeBullet = () => {
        this.bullets.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.bullets = []
    }

    addMonster = () => {
        const { monster, warn } = new Monster({
            app: this.app,
            assets: this.assets
        })
        this.warns.push(warn)
        this.app.stage.addChild(warn)
        this.stageTimer = setTimeout(() => {
            this.app.stage.removeChild(warn)
            this.warns.shift()
            this.app.stage.addChild(monster)
            this.actors.push(monster)
            this.addMonster()
        }, 1000)
    }

    removeMonster = () => {
        this.warns.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.warns = []
        this.actors.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.actors = []
    }

    addAnimate = () => {
        this.app.ticker.add(this.animateScript)
    }

    removeAnimate = () => {
        this.app.ticker.remove(this.animateScript)
        clearTimeout(this.stageTimer)
    }

    addCount = () => {
        this.app.stage.addChild(this.count.sprite)
        this.count.start()
    }

    stopCount = () => {
        this.count.stop()
    }

    nextCount = () => {
        this.count.nextStage()
    }

    checkCount = () => {
        return this.count.currentTime === 0
    }

    stagePending = () => {
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '开始',
            btnCallBack: () => {
                this.stageStart()
                this.app.stage.removeChild(this.board)
            }
        }
        this.addBoard(options)
    }

    stageStart = () => {
        this.addRole()
        this.addMonster()
        this.addCount()
        this.addAnimate()
    }

    stageStop = () => {
        clearTimeout(this.stageTimer)
        this.timer = null
    }

    stagePass = () => {
        console.log('pass')
        this.resetAll()
        const options = {
            assets: this.assets,
            score: this.count.totalTime,
            btnText: '恭喜过关',
            btnCallBack: () => {
                this.stageStart()
                this.app.stage.removeChild(this.board)
            }
        }

        this.addBoard(options)
    }

    stageEnd = () => {
        console.log('end')

        this.resetAll()
        const options = {
            assets: this.assets,
            btnText: '重新开始',
            btnCallBack: () => {
                this.stageStart()
                this.app.stage.removeChild(this.board)
            }
        }

        this.addBoard(options)
    }

    animateScript = () => {
        if (this.checkCount()) {
            this.stagePass()
            return false
        }
        if (this.actors.length) {
            this.shootTimer += 10
        }
        for (let actorIdx = this.actors.length - 1; actorIdx >= 0; actorIdx--) {
            const actor = this.actors[actorIdx]
            if (utils.checkCrash(actor, this.role)) {
                this.stageEnd()
                return false
            } else {
                actor.animate.move()
            }
            if (this.shootTimer == 240) {
                const target = utils.confirmTarget(this.role, this.actors)
                this.addBullet(target)
                this.shootTimer = 0
            }
        }

        for (
            let bulletIdx = this.bullets.length - 1;
            bulletIdx >= 0;
            bulletIdx--
        ) {
            const bullet = this.bullets[bulletIdx]
            if (utils.checkOut(bullet)) {
                this.app.stage.removeChild(bullet)
                this.bullets.splice(bulletIdx, 1)
                continue
            }
            for (
                let actorIdx = this.actors.length - 1;
                actorIdx >= 0;
                actorIdx--
            ) {
                const actor = this.actors[actorIdx]
                if (utils.checkCrash(bullet, actor)) {
                    this.app.stage.removeChild(bullet)
                    this.bullets.splice(bulletIdx, 1)
                    this.app.stage.removeChild(actor)
                    this.actors.splice(actorIdx, 1)
                }
            }
            bullet.animate.move()
        }
    }
}

export default Brotato
