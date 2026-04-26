import { screen, within } from '@testing-library/react'

import Widget from '@hexlet/chatbot-v2'
import { ChatBot } from '../models'
import { setup } from '../utils'
import steps from '../__fixtures__/steps.json'

test('widget initialization', () => {
  setup(Widget(steps))
  const chatButton = screen.getByRole('button', { name: 'Открыть Чат' })
  expect(chatButton).toBeInTheDocument()
})

it('opens and closes chatbot dialog', async () => {
  const widget = setup(Widget(steps))
  const chatBot = new ChatBot(widget)
  await chatBot.open()
  expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument()
  await chatBot.close()
  expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument()
})

test('moving through the chatbot steps', async () => {
  const widget = setup(Widget(steps))
  const chatBot = new ChatBot(widget)
  await chatBot.open()
  expect(screen.getByText('Начало')).toBeInTheDocument()
  await chatBot.step('Следующий шаг')
  expect(screen.getByText('Куда вы хотите перейти?')).toBeInTheDocument()
  await chatBot.step('Следующий шаг')
  expect(screen.getByText('Конец')).toBeInTheDocument()
  expect(screen.getByText('Выберите вариант!')).toBeInTheDocument()
  await chatBot.step('Предыдущий шаг')
  await chatBot.step('В начало')
  expect(screen.getAllByText('Начало')).toHaveLength(2)
})

it('is empty if no steps are passed', async () => {
  const widget = setup(Widget([]))
  const chatBot = new ChatBot(widget)
  await chatBot.open()
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).queryAllByRole('paragraph')).toHaveLength(0)
  expect(within(dialog).queryAllByRole('button', { name: /^(?!close$)/i })).toHaveLength(0)
})

it('throws a runtime error', () => {
  expect(() => setup(Widget())).toThrow()
})
