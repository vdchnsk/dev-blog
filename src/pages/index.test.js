import { render, screen } from '@testing-library/react'
import Main from './index'

test('renders main', () => {
    render(<Main />)
    const text = screen.findAllByAltText('test')

    expect(text).toBeCalledTimes(1)
})
