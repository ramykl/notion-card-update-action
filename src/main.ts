import * as core from '@actions/core'
import * as github from '@actions/github'

import {PageProperty, PagePropertyType} from './constants'
import {updateCard} from './notion'
import {extractNotionLinks, valueFromEvent} from './utils'

async function run(): Promise<void> {
  try {
    const payload = github.context.payload
    const body = payload.pull_request?.body
    const closed = payload.action === 'closed'
    const merged = payload.pull_request?.merged
    const value = valueFromEvent(merged, closed)
    if (value !== undefined) {
      const notionIds = extractNotionLinks(body || '')
      const promises = notionIds.map(id => {
        return updateCard(
          id,
          core.getInput(PageProperty),
          core.getInput(PagePropertyType),
          value
        )
      })
      await Promise.all(promises)
    } else {
      core.warning("The action type doesn't match so there is nothing to do")
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
