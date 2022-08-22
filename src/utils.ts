import * as core from '@actions/core'

import {OnMerge, OnPR} from './constants'

const getIdFromUrl: (page: string) => string = (page: string) => {
  return page.slice(-32)
}

const extractNotionLinks: (body: string) => string[] = (body: string) => {
  const markdownRegex = new RegExp(
    `(https?://)?(www.notion.so|notion.so)/?[^(\\s)]+`,
    'g'
  )
  const results = [...body.matchAll(markdownRegex)]
  let links = results.map(match => {
    return match[0]
  })

  if (links.length < 1) {
    console.error('No Notion URL was found')
  } else if (results.length >= 1) {
    links = links.map(match => {
      return getIdFromUrl(match)
    })
  }

  return [...new Set(links)]
}

const valueFromEvent: (
  merged: boolean,
  closed: boolean
) => string | undefined = (merged, closed) => {
  if (!merged && !closed) {
    return core.getInput(OnPR)
  } else if (merged && closed) {
    return core.getInput(OnMerge)
  } else {
    return undefined
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
