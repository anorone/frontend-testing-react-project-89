import { render, screen } from '@testing-library/react'

import Widget from '@hexlet/chatbot-v2'
import steps from '../__fixtures__/steps.json'

test('widget initialization', () => {
  render(Widget(steps))
  const chatButton = screen.getByRole('button', { name: 'Открыть Чат' })
  expect(chatButton).toBeInTheDocument()
})
