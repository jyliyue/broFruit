import * as PIXI from 'pixi.js'
import style from "../styles"

class Btn {
    constructor(options) {
        const btn = this.createBtn(options)
        const btnText = this.createBtnText(options)
        btn.addChild(btnText)
        if (options.icon) {
            const icon = this.createIcon(options)
            btn.addChild(icon)
        }
        btn.interactive = true
        btn.on('click', () => {
            options.callBack(options.params)
        })
        return btn
    }

    createBtn = (options) => {
        const btn = new PIXI.Sprite(options.asset)
        btn.position.set(options.x, options.y)
        btn.scale.set(options.scale || 1)
        btn.anchor.set(0.5)

        return btn
    }

    createBtnText = (options) => {
        const btnText = new PIXI.Text(options.text, style.text)
        btnText.anchor.set(0.5)
        if (options.icon) {
            btnText.x = 20
        }
        return btnText
    }

    createIcon = (options) => {
        const icon = new PIXI.Sprite(options.icon)
        icon.x = -80
        icon.y = 0
        icon.anchor.set(0.5)
        icon.scale.x = 1.5
        icon.scale.y = 1.8

        return icon
    }
}

export default Btn