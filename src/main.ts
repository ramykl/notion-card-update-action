import * as core from '@actions/core'
import * as github from '@actions/github'

import {PageProperty, PagePropertyType} from './constants'
import {updateCard} from './notion'
import {extractNotionLink, getIdFromUrl, notionTypeToPropValue, valueFromEvent} from './utils'

async function run(): Promise<void> {
  try {
    const payload = github.context.payload
    const body = payload.pull_request?.body
    const closed = payload.action === 'closed'
    const merged = payload.pull_request?.merged
    const value = valueFromEvent(merged, closed)

    const url = extractNotionLink(body || '')
    const pageId = getIdFromUrl(url)
    await updateCard(pageId, core.getInput(PageProperty), notionTypeToPropValue(core.getInput(PagePropertyType), value))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
