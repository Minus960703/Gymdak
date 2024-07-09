import { composeStories } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import * as ButtonStories from './Button.stories'
// import * as TextButtonStories from './TextButton.stories'

const { Text: TextButton } = composeStories(ButtonStories)

describe('<TextButton />', () => {
  test('<button> 태그가 렌더링된다', () => {
    const { container } = render(<TextButton />)
    const buttons = container.querySelectorAll('button')
    expect(buttons).toHaveLength(1)
  })

  test('버튼의 내용이 렌더링된다', () => {
    render(<TextButton />)
    expect(screen.getByText('다운로드')).not.toBeNull()
  })

  test('클릭 시 이벤트가 발생한다', () => {
    const onClickSpy = jest.fn()
    render(<TextButton onClick={onClickSpy}></TextButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClickSpy).toHaveBeenCalled()
  })
})