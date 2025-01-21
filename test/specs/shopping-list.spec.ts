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
  await shoppingList.addItem('Apples')
  // remove the item from the shopping list
  // expect the item not to be in the shopping list
})