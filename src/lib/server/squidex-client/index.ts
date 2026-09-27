import { env } from '$env/dynamic/private'

import { SquidexClient } from '@squidex/squidex'

const Squidex = new SquidexClient({
    appName: env.SQUIDEX_APP_NAME,
    clientId: env.SQUIDEX_CLIENT_ID,
    clientSecret: env.SQUIDEX_CLIENT_SECRET
})

export {
  Squidex,
}