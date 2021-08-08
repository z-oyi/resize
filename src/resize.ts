const attribute: {[key:string]: string} = {
    'style': `display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;`,
    'type': 'text/html',
    'tabindex': '-1',
    'aria-hidden': 'true',
    'data': 'about:blank'
}

const resize = function (element: HTMLElement, eventCallback: (size: {width: number, height: number}) => void):void {
    let position = window.getComputedStyle(element).position
    if (position === 'static' || position === '') {
        element.style.position = 'relative'
    }
    let objectElement = document.createElement('object')
    Object.keys(attribute).forEach(key => objectElement.setAttribute(key, attribute[key]))

    objectElement.addEventListener('load', function () {
        let win = this.contentDocument?.defaultView
        win?.addEventListener('resize', function () {
            let obj = Object.create(null)
            obj.width = this.innerWidth
            obj.height = this.innerHeight
            eventCallback(obj)
        })
        let obj = Object.create(null)
        obj.width = win?.innerWidth
        obj.height = win?.innerHeight
        eventCallback(obj)
    })
    element.appendChild(objectElement)
}

export default resize