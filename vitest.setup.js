import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import '@hexlet/chatbot-v2/styles'

window.HTMLElement.prototype.scrollIntoView = vi.fn()
