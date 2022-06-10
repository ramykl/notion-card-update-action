import {Client} from '@notionhq/client'

const updateCard = async (pageId: string, key: string, value: string) => {
  console.log(process.env.NOTION_KEY)
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
