# facepaint

##### Responsive style values for css-in-js.

## Example

```javascript
import { css } from 'emotion'
import facepaint from 'facepaint'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

const myClassName = css(mq({
  width: ['25%', '50%', '75%', '100%'],
  '& .foo': {
    color: ['red', 'green', 'blue', 'darkorchid'],
    '& img': {
      height: [10, 15, 20, 25]
    }
  }
}))
```

**Note that the first value is considered a default value and is not a child of a media query at-rule.**

**The following css is generated.**

```css
.css-1ohjc6h {
  width: 25%;
}

@media (min-width:420px) {
  .css-1ohjc6h {
    width: 50%;
  }
}

@media (min-width:920px) {
  .css-1ohjc6h {
    width: 75%;
  }
}

@media (min-width:1120px) {
  .css-1ohjc6h {
    width: 100%;
  }
}

.css-1ohjc6h .foo {
  color: red;
}

@media (min-width:420px) {
  .css-1ohjc6h .foo {
    color: green;
  }
}

@media (min-width:920px) {
  .css-1ohjc6h .foo {
    color: blue;
  }
}

@media (min-width:1120px) {
  .css-1ohjc6h .foo {
    color: darkorchid;
  }
}

.css-1ohjc6h .foo img {
  height: 10px;
}

@media (min-width:420px) {
  .css-1ohjc6h .foo img {
    height: 15px;
  }
}

@media (min-width:920px) {
  .css-1ohjc6h .foo img {
    height: 20px;
  }
}

@media (min-width:1120px) {
  .css-1ohjc6h .foo img {
    height: 25px;
  }
}
```
