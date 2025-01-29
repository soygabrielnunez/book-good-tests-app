import type { Item } from '../../src/entities/shopping-list'
import type { Driver } from '../driver'

const itemsDefault: Item[] = [
  { id: 1, title: 'Nuts' },
  { id: 2, title: 'Oranges' },
]

const hasItemsPrecondition = (items: Item[]) => ({ localStorage }: { localStorage: Storage }) => {
  localStorage.setItem('shopping-list', JSON.stringify(items))
}

export const makeShoppingList = ({ driver }: { driver: Driver }) => {
  return {
    async open() {
      await driver.prepare(hasItemsPrecondition(itemsDefault))
      await driver.goTo('/')
    },
    async addItem(itemTitle: Item['title']) {
      await driver.findByLabelText('Item').type(itemTitle)
      await driver.findByRole('button', { name: 'Add item' }).click()
    },
    async editItem(oldItemTitle: Item['title'], newItemTitle: Item['title']) {
      await driver.findByRole('button', { name: `Edit ${oldItemTitle}` }).click()
      await driver.findByLabelText('New item').type(newItemTitle)
      await driver.findByRole('button', { name: 'Save' }).click()
    },
    async removeItem(itemTitle: Item['title']) {
      await driver.findByRole('button', { name: `Remove ${itemTitle}` }).click()
    },
    async expectItemToBeOnList(itemTitle: Item['title']) {
      await driver.findByText(itemTitle).shouldBeVisible()
    },
    async expectItemNotToBeOnList(itemTitle: Item['title']) {
      await driver.queryByText(itemTitle).shouldNotBeVisible()
    },
  }
}