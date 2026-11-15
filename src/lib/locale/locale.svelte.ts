const DEFAULT_LOCALE = 'en'

const ALLOWED_LOCALES = ['en']

let store : { current: string } = $state({ current: DEFAULT_LOCALE })

export const locale = {
  get: () : string => store.current,
  set: (newLocale : string) : void => {
    if (ALLOWED_LOCALES.indexOf(newLocale) !== -1) {
      store.current = newLocale
    }
  }
}