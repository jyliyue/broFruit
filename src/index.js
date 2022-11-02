import * as PIXI from 'pixi.js'

class BroFruit {
    constructor() {
        this.app = new PIXI.Application()
        // this.assets = PIXI.Assets()
    }

    init = () => {
        document.body.appendChild(this.app.view)
        // this.loader.onComplete.add(() => {
        //     console.log('complete loading')
        // })
    }
}

const broApple = new BroFruit()
broApple.init()