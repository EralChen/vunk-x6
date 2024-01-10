import type {
  ThemeRegistration,
  BuiltinTheme,
} from 'shikiji'

export type ThemeOptions =
  | ThemeRegistration
  | BuiltinTheme
  | {
      light: ThemeRegistration | BuiltinTheme
      dark: ThemeRegistration | BuiltinTheme
    }
