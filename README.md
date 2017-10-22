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
  backgroundColor: 'hotpink',
  textAlign: 'center',
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
.css-rbuh8g {
  background-color: hotpink;
  text-align: center;
  width: 25%;
}

@media (min-width:420px) {
  .css-rbuh8g {
    width: 50%;
  }
}

@media (min-width:920px) {
  .css-rbuh8g {
    width: 75%;
  }
}

@media (min-width:1120px) {
  .css-rbuh8g {
    width: 100%;
  }
}

.css-rbuh8g .foo {
  color: red;
}

@media (min-width:420px) {
  .css-rbuh8g .foo {
    color: green;
  }
}

@media (min-width:920px) {
  .css-rbuh8g .foo {
    color: blue;
  }
}

@media (min-width:1120px) {
  .css-rbuh8g .foo {
    color: darkorchid;
  }
}

.css-rbuh8g .foo img {
  height: 10px;
}

@media (min-width:420px) {
  .css-rbuh8g .foo img {
    height: 15px;
  }
}

@media (min-width:920px) {
  .css-rbuh8g .foo img {
    height: 20px;
  }
}

@media (min-width:1120px) {
  .css-rbuh8g .foo img {
    height: 25px;
  }
}
```
