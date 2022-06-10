import {Client} from '@notionhq/client'
import * as core from '@actions/core'

const updateCard = async (pageId: string, key: string, value: string) => {
  core.info(process.env.NOTION_KEY)
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_KEY
  })
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {[key]: value}
  })
  console.log(`${key} was successfully updated to ${value}`)
  console.log(response)
}

export {updateCard}
