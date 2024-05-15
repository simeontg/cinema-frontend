import type { Preview } from '@storybook/react'

import '../../src/app/styles/index.css'
import { ReactRouterDecorator, i18nDecorator } from './decorators'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [ReactRouterDecorator, i18nDecorator],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'bg', title: 'Bulgarian' },
        ],
        showName: true,
      },
    },
  },
}

export default preview