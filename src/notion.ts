import * as core from '@actions/core'
import {Client} from '@notionhq/client'

import {PagePropertyType} from './constants'
import {notionTypeToPropValue} from './utils'

const updateCard: (
  pageId: string,
  key: string,
  type: string,
  value: string
) => void = async (
  pageId: string,
  key: string,
  type: string,
  value: string
) => {
  core.info(process.env.NOTION_KEY || '')
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_KEY
  })
  // const response = await notion.pages.retrieve({
  //   page_id: pageId
  // })
  // console.log(JSON.stringify(response))
  await notion.pages.update({
    page_id: pageId,
    properties: {
      [key]: notionTypeToPropValue(core.getInput(PagePropertyType), value)
    } as never
  })
  console.log(`${key} was successfully updated to ${value} on page ${pageId}`)
}

export {updateCard}
