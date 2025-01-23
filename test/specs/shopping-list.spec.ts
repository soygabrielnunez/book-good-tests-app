import { it } from '@application-test-utils'
import { makeShoppingList } from '../dsl/shopping-list'

it('should be possible to add items to the list', async ({ driver }) => {
  const shoppingList = makeShoppingList({ driver })
  await shoppingList.open()
  await shoppingList.addItem('Apples')
  await shoppingList.expectItemToBeOnList('Apples')
})

it('should be possible to remove items', async ({ driver }) => {
  const shoppingList = makeShoppingList({ driver })
  await shoppingList.open()
  await shoppingList.removeItem('Oranges')
  await shoppingList.expectItemNotToBeOnList('Oranges')
})

it('should be possible to edit items', async ({ driver }) => {
  const shoppingList = makeShoppingList({ driver })
  await shoppingList.open()
  await shoppingList.editItem('Nuts', 'Bananas')
  await shoppingList.expectItemToBeOnList('Bananas')
})