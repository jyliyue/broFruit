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

export default UpdateLog