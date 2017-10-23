/* eslint-disable no-sparse-arrays */
import React from 'react'
import renderer from 'react-test-renderer'
import styled from 'styled-components'

import facepaint from '../src/index'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

describe('facepaint', () => {
  test('basic', () => {
    const Div = styled('div')`
      ${mq({ color: ['red', 'green', 'blue', 'darkorchid'] })};
    `
    const tree = renderer.create(<Div>Basic</Div>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('holes', () => {
    const Div = styled('div')`
      ${mq({ color: ['red', , 'blue', 'darkorchid'] })};
    `
    const tree = renderer.create(<Div>Holes</Div>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('multiple', () => {
    const Div = styled('div')`
      ${mq({
        color: ['red', 'green', 'blue', 'darkorchid'],
        display: ['flex', 'block', 'inline-block', 'table'],
        fontSize: '12px',
        alignItems: 'center'
      })};
    `
    const tree = renderer.create(<Div>Multiple</Div>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('nested', () => {
    const Div = styled('div')`
      ${mq({
        backgroundColor: 'hotpink',
        textAlign: 'center',
        width: ['25%', '50%', '75%', '100%'],
        '& .foo': {
          color: ['red', 'green', 'blue', 'darkorchid'],
          '& img': {
            height: ['10px', '15px', '20px', '25px']
          }
        }
      })};
    `
    const tree = renderer
      .create(
        <Div>
          <div className="foo">foo</div>
          nested
        </Div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
