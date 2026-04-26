import { screen, within } from '@testing-library/react'

import App from '../src/App'
import { ChatBot } from '../models'
import { setup } from '../utils'
import steps from '../__fixtures__/steps.json'

const groupTableRows = (rows) => rows.reduce((acc, row) => {
  const [name, value] = within(row).getAllByRole('cell')
  return { ...acc, [name.textContent]: value.textContent }
}, {})

it('displays the chat button', () => {
  setup(<App steps={steps} />)
  const chatButton = screen.getByRole('button', { name: 'Открыть Чат' })
  expect(chatButton).toBeVisible()
})

test('widget integration', async () => {
  const widget = setup(<App steps={steps} />)
  const chatBot = new ChatBot(widget)
  await chatBot.open()
  expect(screen.getByText('Виртуальный помощник')).toBeVisible()
  expect(screen.getByText('Начало')).toBeVisible()
  await chatBot.step('Следующий шаг')
  expect(screen.getByText('Куда вы хотите перейти?')).toBeVisible()
  await chatBot.step('В начало')
  expect(screen.queryByRole('button', { name: 'В начало' })).not.toBeInTheDocument()
  await chatBot.close()
  expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument()
})

test('host application with an embedded chatbot widget', async () => {
  const expected = {
    'Email': 'ivan@gmail.com',
    'Пароль': '12345',
    'Адрес': 'Ленинский проспект, 1',
    'Город': 'Москва',
    'Страна': 'Россия',
    'Принять правила': 'true'
  }
  const { user } = setup(<App />)
  await user.type(screen.getByLabelText('Email'), expected['Email'])
  await user.type(screen.getByLabelText('Пароль'), expected['Пароль'])
  await user.type(screen.getByLabelText('Адрес'), expected['Адрес'])
  await user.type(screen.getByLabelText('Город'), expected['Город'])
  await user.selectOptions(screen.getByRole('combobox', { name: 'Страна' }), [expected['Страна']])
  await user.click(screen.getByRole('checkbox', { name: 'Принять правила' }))
  await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))
  const table = screen.getByRole('table')
  expect(table).toBeInTheDocument()
  const result = groupTableRows([...within(table).getAllByRole('row')])
  expect(result).toEqual(expected)
  await user.click(screen.getByRole('button', { name: 'Назад' }))
  expect(screen.getByRole('form')).toBeInTheDocument()
})
