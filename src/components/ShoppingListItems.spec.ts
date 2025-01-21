import { it, setup } from '../../test/utils'
import ShoppingListItems from "./ShoppingListItems.vue";

it('should emit a remove event when clicking an item', () => {
  const { emitted, user } = setup(ShoppingListItems)
})