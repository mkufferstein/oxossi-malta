import { env } from '$env/dynamic/private'
import { SquidexClient } from '@squidex/squidex'

let client: SquidexClient | undefined

export function getClient(platform) {
  const realEnv = platform?.env ?? env
  if (!client) {
    client = new SquidexClient({
      appName: realEnv.SQUIDEX_APP_NAME,
      clientId: realEnv.SQUIDEX_CLIENT_ID,
      clientSecret: realEnv.SQUIDEX_CLIENT_SECRET
    })
  }
  return client
}