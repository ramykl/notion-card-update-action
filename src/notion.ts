import * as core from '@actions/core'
import {Client} from '@notionhq/client'

const updateCard = async (pageId: string, key: string, value: string) => {
  core.info(process.env.NOTION_KEY || '')
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_KEY
  })
  let response = await notion.pages.retrieve({
    page_id: pageId
  })
  console.log(JSON.stringify(response))
  await notion.pages.update({
    page_id: pageId,
    properties: {[key]: value}
  })
  console.log(`${key} was successfully updated to ${value}`)
}

export {updateCard}
