import * as core from '@actions/core'

import {OnMerge, OnPR} from './constants'

const getIdFromUrl: (page: string) => string = (page: string) => {
  return page.slice(-32)
}

const extractNotionLinks: (body: string) => RegExpMatchArray[] = (
  body: string
) => {
  const markdownRegex = new RegExp(
    `(https?://)?(www.notion.so|notion.so)/?[^(s)]+`,
    'g'
  )
  const results = [...body.matchAll(markdownRegex)]

  if (results.length < 1) {
    console.error('No Notion URL was found')
  } else if (results.length >= 1) {
    for (const match of results) {
      const index = results.indexOf(match)
      console.log(match)
      console.log(`${index} URL matched was: ${match[0]}`)
      console.log(`id: ${match[0][0]}`)
    }
  }

  return results
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

const notionTypeToPropValue: (type: string, value: string) => {} = (
  type,
  value
) => {
  switch (type) {
    case 'select': {
      return {[type]: {name: value}}
    }
    case 'checkbox':
    default: {
      return {[type]: value}
    }
  }
}

export {getIdFromUrl, extractNotionLinks, valueFromEvent, notionTypeToPropValue}
