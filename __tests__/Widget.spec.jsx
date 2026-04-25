import { screen, within } from '@testing-library/react'

import Widget from '@hexlet/chatbot-v2'
import { setup } from '../utils'
import steps from '../__fixtures__/steps.json'

test('widget initialization', () => {
  setup(Widget(steps))
  const chatButton = screen.getByRole('button', { name: 'Открыть Чат' })
  expect(chatButton).toBeInTheDocument()
})

it('opens and closes chatbot dialog', async () => {
  const { user } = setup(Widget(steps))
  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument()
})

test('moving through the chatbot steps', async () => {
  const { user } = setup(Widget(steps))
  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  expect(screen.getByText('Начало')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Следующий шаг' }))
  expect(screen.getByText('Куда вы хотите перейти?')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Следующий шаг' }))
  expect(screen.getByText('Конец')).toBeInTheDocument()
  expect(screen.getByText('Выберите вариант!')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Предыдущий шаг' }))
  await user.click(screen.getByRole('button', { name: 'В начало' }))
  expect(screen.getAllByText('Начало')).toHaveLength(2)
})

it('is empty if no steps are passed', async () => {
  const { user } = setup(Widget([]))
  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  const chatBot = screen.getByRole('dialog')
  expect(within(chatBot).queryAllByRole('paragraph')).toHaveLength(0)
  expect(within(chatBot).queryAllByRole('button', { name: /^(?!close$)/i })).toHaveLength(0)
})

it('throws a runtime error', () => {
  expect(() => setup(Widget())).toThrow()
})
