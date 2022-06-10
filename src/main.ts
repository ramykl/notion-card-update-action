import * as core from '@actions/core'
import * as github from '@actions/github'
import {extractNotionLink, getIdFromUrl, valueFromEvent} from './utils'
import {updateCard} from "./notion";
import {PageProperty} from "./constants";

async function run(): Promise<void> {
  try {
    const payload = github.context.payload
    const body = payload.pull_request?.body
    const closed = payload.action === 'closed'
    const merged = payload.pull_request?.merged
    const value = valueFromEvent(merged, closed)

    const url = extractNotionLink(body || '')
    const pageId = getIdFromUrl(url)
    await updateCard(pageId, core.getInput(PageProperty), value)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
