import { every } from "lodash"

/* global console */

export default function checkForNotFunctions(collection, name) {
  if (!every(collection, r => r instanceof Function)) {
    const error = new Error(name + ' should all be functions')
    console.error(error.stack) // eslint-disable-line no-console
  }
}

