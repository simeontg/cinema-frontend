import { useCallback } from 'react'

import { type Callback, type TFunction } from 'i18next'
import { useTranslation as useTranslationLib } from 'react-i18next'

interface UseTranslationReturn {
  t: (key: string, ns?: string) => string
  changeLanguage: (lng?: string, callback?: Callback) => Promise<TFunction>
  currentLanguage: string
}

export const useTranslation = (nameSpace: string | string[] = 'common'): UseTranslationReturn => {
  const { t, i18n } = useTranslationLib(nameSpace)

  const currentLanguage = i18n.language

  const tFunc = useCallback(
    (key: string, ns?: string) => {
      // empty string by default
      return t(key, { ns, defaultValue: '' })
    },
    [t],
  )

  return {
    t: tFunc,
    changeLanguage: i18n.changeLanguage,
    currentLanguage,
  }
}