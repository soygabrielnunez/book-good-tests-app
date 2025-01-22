import { expect, it, screen, setup } from '../../test/utils'
import ShoppingListItems from "./ShoppingListItems.vue";

it('should emit a remove event when clicking an item', async () => {
  const { emitted, user } = setup(ShoppingListItems, {
    renderOptions: {
      props: {
        items: [
          { id: 1, title: 'Item 1' },
          { id: 2, title: 'Item 2' },
          { id: 3, title: 'Item 3' }
        ]
      }
    }
  })

  const removeFirstItemButton = await screen.findByRole('button', { name: 'Remove Item 1' })
  await user.click(removeFirstItemButton)

  const removeEvent = emitted().remove as unknown[][]; 
  expect(removeEvent[0][0]).toEqual({ id: 1, title: 'Item 1' })
})