import { PageObject } from './PageObject'

class ChatBot extends PageObject {
  async open() {
    const { user, ...page } = this.root
    const openButton = page.getByRole('button', { name: 'Открыть Чат' })
    await user.click(openButton)
  }

  async close() {
    const { user, ...page } = this.root
    const closeButton = page.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
  }

  async step(name) {
    const { user, ...page } = this.root
    const stepButton = page.getByRole('button', { name })
    await user.click(stepButton)
  }
}

export { ChatBot }
