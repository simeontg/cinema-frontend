import { useEffect } from 'react'

import { type StoryContext, type StoryFn } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import i18n from '../i18n/i18n'

export const ReactRouterDecorator = (Story: StoryFn) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
)

export const i18nDecorator = (Story: StoryFn, context: StoryContext) => {
  const { locale } = context.globals

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  )
}