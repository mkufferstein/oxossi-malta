import { SquidexClient } from '@squidex/squidex'

const Squidex = new SquidexClient({
    appName: "oxossi-malta",
    clientId: "oxossi-malta:read-only",
    clientSecret: "ovepsemzeupqqwn72dfymxipcug26epbwf1safvwyhmx",
    environment: "https://cloud.squidex.io"
})

export {
  Squidex
}