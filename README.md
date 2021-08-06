# oyi-resize
Monitor element size change

### Steps

```
npm i @oyi/resize -S
```

```javascript
import oresize form 'oyi-resize'
let el = document.getElementById('id')
oresize(el, (size) => {
    console.log(size.width)
    console.log(size.height)
})
```
