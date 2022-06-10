import {Client} from '@notionhq/client'
import * as core from '@actions/core'

const updateCard = async (pageId: string, key: string, value: string) => {
  core.info(process.env.NOTION_KEY || '')
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_KEY
  })
  let response = await notion.pages.retrieve({
    page_id: pageId,
  })
  core.info(JSON.stringify(response))
  response = await notion.pages.update({
    page_id: pageId,
    properties: {[key]: value}
  })
  core.info(`${key} was successfully updated to ${value}`)
  core.info(response)
}

export {updateCard}
