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
})
