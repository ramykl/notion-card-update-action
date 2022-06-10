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
  core.info(JSON.stringify(response))
  // response = await notion.pages.update({
  //   page_id: pageId,
  //   properties: {[key]: value}
  // })
  // core.info(`${key} was successfully updated to ${value}`)
  // core.info(JSON.stringify(response))
}

export {updateCard}
