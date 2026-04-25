import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const setup = (jsx) => {
  const user = userEvent.setup()
  const renderResult = render(jsx)
  return { user, ...renderResult }
}