/* eslint-disable no-sparse-arrays */
import React from 'react'
import renderer from 'react-test-renderer'
import { css, sheet, flush } from 'emotion'

import facepaint from '../src/index'

const mq = facepaint(
  [
    '@media(min-width: 420px)',
    '@media(min-width: 920px)',
    '@media(min-width: 1120px)',
    '@media(min-width: 11200px)'
  ],
  { overlap: true }
)

const mql = facepaint(
  [
    '@media(min-width: 420px)',
    '@media(min-width: 920px)',
    '@media(min-width: 1120px)',
    '@media(min-width: 11200px)'
  ],
  { literal: true }
)

const pseudo = facepaint([':hover', ':active', ':focus'])

describe('facepaint', () => {
  afterEach(() => flush())
  test('basic', () => {
    const result = css(mq({ color: ['red', 'green', 'blue', 'darkorchid'] }))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>Basic</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('holes', () => {
    const result = css(mq({ color: ['red', , 'blue', 'darkorchid'] }))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>Basic</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('undefined', () => {
    const result = css(mq({ color: ['red', undefined, 'blue', 'darkorchid'] }))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>Basic</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('repeating', () => {
    const result = css(
      mq({ color: ['red', 'blue', undefined, 'blue', 'darkorchid'] })
    )
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>Basic</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('nested arrays', () => {
    const result = css(mq([[[[{ color: ['red', 'blue', 'darkorchid'] }]]]]))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>Basic</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('multiple', () => {
    const result = css(
      mq({
        color: ['red', 'green', 'blue', 'darkorchid'],
        display: ['flex', 'block', 'inline-block', 'table'],
        fontSize: 12,
        alignItems: 'center'
      })
    )
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>multiple</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('nested', () => {
    const result = css(
      mq({
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
    expect(result).toMatchSnapshot()
    const tree = renderer
      .create(
        <div css={result}>
          <div className="foo">foo</div>
          function
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('pseudo', () => {
    const result = css(
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
    expect(result).toMatchSnapshot()
    const tree = renderer
      .create(
        <div css={result}>
          <div className="foo">foo</div>
          function
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('array values with selectors', () => {
    const result = css(
      mq({
        '& .current-index': [
          {
            color: ['blue', 'red']
          },
          {
            marginRight: 15,
            display: ['none', 'block'],
            letterSpacing: 3
          }
        ]
      })
    )
    expect(result).toMatchSnapshot()
    const tree = renderer
      .create(
        <div css={result}>
          <div className="foo">foo</div>
          function
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('boolean, null, and undefined values', () => {
    const result = css(
      mq(
        { color: 'blue' },
        1 === 2 && { color: 'green' },
        false,
        true,
        undefined,
        null,
        [
          { color: 'red' },
          1 === 2 && { color: 'green' },
          false,
          true,
          undefined,
          null
        ]
      )
    )
    expect(result).toMatchSnapshot()
    const tree = renderer
      .create(
        <div css={result}>
          <div className="foo">foo</div>
          function
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('literal 1', () => {
    const result = css(mql({ background: ['red'] }))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>foo</div>).toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('literal 2', () => {
    const result = css(mql({ background: ['red', 'green'] }))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>foo</div>).toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('literal all', () => {
    const result = css(mql({ background: ['red', 'green', 'blue', 'orange'] }))
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>foo</div>).toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
})
