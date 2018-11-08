/* eslint-env jest */
import serializer from 'jest-emotion/serializer'
import 'jest-styled-components'
import { sheet } from 'emotion'
import { parse, stringify } from 'css'

expect.addSnapshotSerializer(serializer)

expect.addSnapshotSerializer({
  test: val => val === sheet,
  print(val, printer) {
    return printer(
      stringify(parse(sheet.tags.map(tag => tag.textContent || '').join('')))
    )
  }
})
