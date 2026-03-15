import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server';
import { createServerEntry } from '@tanstack/react-start/server-entry';
import { FastResponse } from 'srvx';

globalThis.Response = FastResponse;

export default createServerEntry({
  fetch: createStartHandler(defaultStreamHandler),
});
