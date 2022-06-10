import {OnMerge, OnPR} from './constants'
import * as core from '@actions/core'

const getIdFromUrl = (page: string) => {
  return page.slice(-32)
}

const extractNotionLink = (body: string) => {
  const markdownRegex = new RegExp(
    `(https?://)?(www\.notion\.so|notion\.so)/?[^(\s)]+`
  )
  const results = [...body.matchAll(markdownRegex)]

  if (results.length < 1) {
    console.error('No Notion URL was found')
  } else if (results.length >= 1) {
    console.log('First URL matched was:', results[0][0])
  }

  return results[0][0]
}

const valueFromEvent = (merged: boolean, closed: boolean) => {
  if (!merged && !closed) {
    return core.getInput(OnPR)
  } else if (merged && closed) {
    return core.getInput(OnMerge)
  } else {
    return ''
  }
}

export {getIdFromUrl, extractNotionLink, valueFromEvent}
