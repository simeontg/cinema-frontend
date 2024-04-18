import path from 'path'
import webpack from 'webpack'
import { type RuleSetRule } from 'webpack'

interface ConfigProps {
  config: webpack.Configuration
}

type ModuleRule = undefined | null | false | '' | 0 | RuleSetRule | '...'

export default ({ config }: ConfigProps) => {
  const absolutePath = path.resolve(__dirname, '..', '..', 'src')

  config?.resolve?.modules?.push(absolutePath)
  config?.resolve?.extensions?.push('.ts', '.tsx')

  config?.plugins?.push(
    new webpack.DefinePlugin({
      _IS_DEV_: true,
    }),
  )


  if (config?.module?.rules) {
    config.module.rules = config.module.rules.map((rule?: ModuleRule) => {
      if (/svg/.test((rule as RuleSetRule)?.test as string)) {
        return rule ? { ...(rule as RuleSetRule), exclude: /\.svg$/i } : rule
      }

      return rule
    })
  }

  return config
}