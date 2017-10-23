# facepaint

##### Responsive style values for css-in-js.

## Examples
- [emotion](#emotion)
- [styled-components](#styled-components)

### emotion

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

### styled-components

```javascript
import styled from 'styled-components'
import facepaint from 'facepaint'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

const Div = styled('div')`
  ${mq({
    backgroundColor: 'hotpink',
    textAlign: 'center',
    width: ['25%', '50%', '75%', '100%'],
    '& .foo': {
      color: ['red', 'green', 'blue', 'papayawhip'],
      '& img': {
        height: ['10px', '15px', '20px', '25px']
      }
    }
  })};
`

<Div/>
```

**The following css is generated.**

```css
.c0 {
  background-color: hotpink;
  text-align: center;
  width: 25%;
}

.c0 .foo {
  color: red;
}

.c0 .foo img {
  height: 10px;
}

@media (min-width:420px) {
  .c0 {
    width: 50%;
  }
}

@media (min-width:920px) {
  .c0 {
    width: 75%;
  }
}

@media (min-width:1120px) {
  .c0 {
    width: 100%;
  }
}

@media (min-width:420px) {
  .c0 .foo {
    color: green;
  }
}

@media (min-width:920px) {
  .c0 .foo {
    color: blue;
  }
}

@media (min-width:1120px) {
  .c0 .foo {
    color: papayawhip;
  }
}

@media (min-width:420px) {
  .c0 .foo img {
    height: 15px;
  }
}

@media (min-width:920px) {
  .c0 .foo img {
    height: 20px;
  }
}

@media (min-width:1120px) {
  .c0 .foo img {
    height: 25px;
  }
}
```
