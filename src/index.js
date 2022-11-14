import * as PIXI from 'pixi.js'

import Board from './modules/Board'
import Role from './modules/Role'
import Bullet from './modules/Bullet'
import Monster from './modules/Monster'
import Count from './modules/Count'
import loadAssets from './utils/loadAssets'
import utils from './utils'

/* 更新日志 */
class UpdateLog {
    static list = [
        '2022/11/13 过关提供属性升级，刷怪数量增加',
        '2022/11/13 w,a,s,d操作移动水果兄弟,撑过时间进入下一关,难度,角色,武器系统开发中...'
    ]
    constructor() {
        UpdateLog.list.forEach(txt => {
            const p = document.createElement('p')
            p.innerHTML = txt
            document.body.appendChild(p)
        })
    }
}

/* 定时器 */
const timer = {
    addMonster: null
}

/* 水果兄弟 */
class BroFruit {
    static ROLECONFIG = {
        speed: 0.5,
        quick: 30,
        range: 100
    }
    constructor() {
        this.app = new PIXI.Application()
        this.assets = null
        this.role = null
        this.roleConfig = BroFruit.ROLECONFIG
        this.board = null
        this.count = new Count()
        this.monsterList = []
        this.warnList = []
        this.bulletList = []
        this.shootTime = this.roleConfig.quick
        this.monsterTime = 6
    }

    /* 初始化 */
    init = async () => {
        this.assets = await loadAssets()
        document.body.appendChild(this.app.view)
        new UpdateLog()
        this.addBg()
        this.stagePending()
    }

    resetAll = () => {
        this.removeAnimate()
        this.removeRole()
        this.removeAllBullet()
        this.removeAllMonster()
        // this.nextCount()
    }

    /* 添加背景 */
    addBg = () => {
        const bg = new PIXI.TilingSprite(
            this.assets.bg,
            800,
            600
        )
        this.app.stage.addChild(bg)
    }

    /* 面板模块 */
    addBoard = (options) => {
        const board = new Board(options)
        this.board = board
        this.app.stage.addChild(this.board)
    }

    removeBoard = () => {
        this.app.stage.removeChild(this.board)
        this.board = null
    }

    /* 计分模块 */
    addCount = () => {
        this.app.stage.addChild(this.count.sprite)
        this.count.start()
    }

    continueCount = () => {
        this.app.stage.addChild(this.count.sprite)
        this.count.continue()
    }

    stopCount = () => {
        this.count.stop()
    }

    nextCount = () => {
        this.count.nextStage()
    }

    resetCount = () => {
        this.count.reset()
    }

    checkCount = () => {
        return this.count.currentTime === 0
    }

    /* 角色模块 */
    addRole = () => {
        const role = new Role({
            cate: this.assets.apple,
            ...this.roleConfig
        })
        this.role = role
        this.role.start()
        this.app.stage.addChild(this.role)
    }

    removeRole = () => {
        this.role.stop()
        this.app.stage.removeChild(this.role)
        this.role = null
    }

    addBullet = () => {
        const target = this.role.confirmTarget(this.monsterList)
        if (target) {
            const bullet = new Bullet({
                assets: this.assets,
                target: this.role
            })
            this.bulletList.push(bullet)
            this.app.stage.addChild(bullet)
            this.role.setFire(bullet, { target: target, speed: 400 })
            // bullet.animate.move()
        }
    }

    removeBullet = (index) => {
        const bullet = this.bulletList[index]
        this.app.stage.removeChild(bullet)
        this.bulletList.splice(index, 1)
    }

    removeAllBullet = () => {
        this.bulletList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.bulletList = []
        this.shootTime = this.roleConfig.quick
    }

    bulletScript = () => {
        if (this.shootTime === this.roleConfig.quick) {
            this.addBullet()
            this.shootTime = 0
        } else {
            this.shootTime += 1
        }

        for (let i = this.bulletList.length - 1; i >= 0; i--) {
            const bullet = this.bulletList[i]
            if (utils.checkOut(bullet)) {
                this.removeBullet(i)
                continue
            }
            for (let j = this.monsterList.length - 1; j >= 0; j--) {
                const monster = this.monsterList[j]
                if (utils.checkHit(bullet, monster)) {
                    this.removeBullet(i)
                    this.removeMonster(j)
                }
            }
            // bullet.animate.move()
        }
    }

    /* 怪物模块 */
    addMonster = () => { 
        const { monster, warn } = new Monster({
            assets: this.assets
        })
        this.warnList.push(warn)
        this.app.stage.addChild(warn)
        timer.addMonster = setTimeout(() => {
            this.app.stage.removeChild(warn)
            this.warnList.shift()
            if (!this.board) {
                this.monsterList.push(monster)
                this.app.stage.addChild(monster)
                this.addMonster()
                utils.setAnimate(monster)
                // monster.move()
            }
        }, 1000)
    }
    
    removeMonster = (index) => {
        // console.log(this.monsterList);
        const monster = this.monsterList[index]
        this.app.stage.removeChild(monster)
        this.monsterList.splice(index, 1)
        // console.log(this.monsterList);
        // console.log('====');
    }

    removeAllMonster = () => {
        this.warnList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.warnList = []
        this.monsterList.forEach((item) => {
            this.app.stage.removeChild(item)
        })
        this.monsterList = []
        clearTimeout(timer.addMonster)
        timer.addMonster = null
    }

    /* 流程模块 */
    stagePending = () => { 
        const options = {
            type: 'start',
            assets: this.assets,
            score: this.count.level,
            btnText: '开始',
            btnCallBack: () => {
                this.stageStart()
                this.removeBoard()
            }
        }
        this.addBoard(options)
    }
    
    stageStart = () => { 
        this.addRole()
        const level = this.count.level
        for (let i = level; i > 0; i--) {
            this.addMonster()
        }
        this.addCount()
        this.addAnimate()
    }

    stageContinue = () => {
        this.addRole()
        const level = this.count.level
        for (let i = level; i > 0; i--) {
            this.addMonster()
        }
        this.continueCount()
        this.addAnimate()
    }

    stagePass = () => {
        this.nextCount()
        const options = {
            type: 'pass',
            assets: this.assets,
            score: this.count.level,
            btnText: '恭喜过关',
            btnCallBack: (type) => {
                switch (type) {
                    case 'speed':
                        this.roleConfig.speed = this.roleConfig.speed + this.roleConfig.speed * Math.random()
                        break;
                    case 'quick':
                        this.roleConfig.quick --
                        break;
                    case 'range':
                        this.roleConfig.range += 10
                        break;
                }
                this.shootTime = this.roleConfig.quick
                this.stageContinue()
                this.removeBoard()
            }
        }
        this.resetAll()
        this.addBoard(options)
    }

    stageEnd = () => {
        const options = {
            type: 'start',
            assets: this.assets,
            score: this.count.level,
            btnText: '重新开始',
            btnCallBack: () => {
                this.stageStart()
                this.removeBoard()
            }
        }
        this.resetAll()
        this.resetCount()
        this.roleConfig = BroFruit.ROLECONFIG
        this.addBoard(options)
    }

    /* 动画模块 */
    addAnimate = () => {
        this.app.ticker.add(this.animateScript)
    }

    removeAnimate = () => {
        this.app.ticker.remove(this.animateScript)
        // clearTimeout(this.stageTimer)
    }

    animateScript = () => {
        /* 过关判断 */
        if (this.checkCount()) {
            this.stagePass()
            return false
        }
        /* 碰撞判断 */
        const unHited = this.monsterList.every(item => !this.role.isHited(item))
        if (!unHited) {
            this.stageEnd()
            return false
        }
        /* 子弹动画 */
        this.bulletScript()
    }
}

const broApple = new BroFruit()
broApple.init()




