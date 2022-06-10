import * as core from '@actions/core'

import {OnMerge, OnPR} from './constants'

const getIdFromUrl: (page: string) => string = (page: string) => {
  return page.slice(-32)
}

const extractNotionLink: (body: string) => string = (body: string) => {
  const markdownRegex = new RegExp(
    `(https?://)?(www.notion.so|notion.so)/?[^(\s)]+`,
    'g'
  )
  const results = [...body.matchAll(markdownRegex)]

  if (results.length < 1) {
    console.error('No Notion URL was found')
  } else if (results.length >= 1) {
    console.log('First URL matched was:', results[0][0])
  }

  return results[0][0]
}

const valueFromEvent: (merged: boolean, closed: boolean) => string = (
  merged,
  closed
) => {
  if (!merged && !closed) {
    return core.getInput(OnPR)
  } else if (merged && closed) {
    return core.getInput(OnMerge)
  } else {
    return ''
  }
}

const notionTypeToPropValue: (type: string, value: string) => any = (type, value) => {
  switch (type) {
    case 'select': {
      return {[type]: {name: value}}
    }
    case 'checkbox': {
      return {[type]: value}
    }
  }
}

export {getIdFromUrl, extractNotionLink, valueFromEvent, notionTypeToPropValue}
