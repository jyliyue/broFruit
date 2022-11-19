import * as PIXI from 'pixi.js'
import style from "../styles"

class Btn {
    constructor(options) {
        const btn = new PIXI.Sprite(options.asset)
        btn.x = options.x
        btn.y = options.y
        btn.anchor.set(0.5)
        const btnText = new PIXI.Text(options.text, style.text)
        btnText.anchor.set(0.5)
        btn.addChild(btnText)
        btn.interactive = true
        btn.on('click', () => {
            options.callBack()
        })
        return btn
    }
}

export default Btn