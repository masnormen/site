import { FastResponse } from 'srvx'

import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

globalThis.Response = FastResponse

export default createServerEntry({
  fetch: createStartHandler(defaultStreamHandler),
})