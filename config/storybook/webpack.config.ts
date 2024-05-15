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


  if (config?.module?.rules) {
    config.module.rules = config.module.rules.map((rule?: ModuleRule) => {
      if (/svg/.test((rule as RuleSetRule)?.test as string)) {
        return rule ? { ...(rule as RuleSetRule), exclude: /\.svg$/i } : rule
      }

      return rule
    })
  }

  config?.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })
  
  config?.module?.rules?.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', {runtime: 'automatic'}]]
      }
    }
  })

  return config
}