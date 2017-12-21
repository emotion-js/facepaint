# facepaint

#### Dynamic style values for css-in-js.

```javascript
import { css } from 'emotion'
import facepaint from 'facepaint'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

const myClassName = css(mq({
  color: ['red', 'green', 'blue', 'darkorchid'],
}))
```

## Install

```bash
npm i facepaint -S
```

**or**

```bash
yarn add facepaint
```

## API

#### facepaint `function`

```javascript
facepaint(selectors: Array<Selector>) : DynamicStyleFunction
```

**Arguments**
* *breakpoints*
  ```javascript
  const mq = facepaint([
    '@media(min-width: 420px)',
    '@media(min-width: 920px)',
    '@media(min-width: 1120px)'
  ])
  ```

* *options*
  ```javascript
  const mq = facepaint(
    [...],
    {
      literal: true|false,
      overlap: true|false
    }
  )
  ```
  - literal `boolean` (Default: `false`) - force "slot"
  - overlap `boolean` (Default: `false`) - remove any duplicate values found in multiple "slots"

**Returns**

`facepaint` returns a function that can be exported and used throughout
your app to dynamically style based on your provided selectors.

- The function accepts any number of arrays or objects as arguments.
- Nested arrays are flattened.
- Boolean, `undefined`, and `null` values are ignored.


## Examples
- [emotion](#emotion)
- [styled-components](#styled-components)
- [pseudo selectors](#pseudo-selectors)

### emotion

**[CodeSandbox Demo](https://codesandbox.io/s/lxqmwmyzql)**

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

## Pseudo Selectors

**[CodeSandbox Demo](https://codesandbox.io/s/j5q3m3qy5)**

```javascript
import { css } from 'emotion'
import facepaint from 'facepaint'

const pseudo = facepaint([':hover', ':active', ':focus'])

const myClassName = css(
  pseudo({
    backgroundColor: 'hotpink',
    textAlign: 'center',
    width: ['25%', '50%', '75%', '100%'],
    '& .foo': {
      color: ['red', 'green', 'blue', 'darkorchid'],
      '& img': {
        height: [10, 15, 20, 25]
      }
    }
  })
)
```


```css
.css-1guvnfu {
  background-color: hotpink;
  text-align: center;
  width: 25%;
}

.css-1guvnfu:hover {
  width: 50%;
}

.css-1guvnfu:active {
  width: 75%;
}

.css-1guvnfu:focus {
  width: 100%;
}

.css-1guvnfu .foo {
  color: red;
}

.css-1guvnfu .foo:hover {
  color: green;
}

.css-1guvnfu .foo:active {
  color: blue;
}

.css-1guvnfu .foo:focus {
  color: darkorchid;
}

.css-1guvnfu .foo img {
  height: 10px;
}

.css-1guvnfu .foo img:hover {
  height: 15px;
}

.css-1guvnfu .foo img:active {
  height: 20px;
}

.css-1guvnfu .foo img:focus {
  height: 25px;
}
```
