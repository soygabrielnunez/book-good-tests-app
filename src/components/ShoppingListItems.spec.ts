import { expect, it, screen, setup } from '../../test/utils'
import ShoppingListItems from "./ShoppingListItems.vue";

it('should emit a remove event when the user removes an item', async () => {
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

it('should emit an edit event when the user edits and saves an item', async () => {
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

  const editFirstItemButton = await screen.findByRole('button', { name: 'Edit Item 1' })
  await user.click(editFirstItemButton)

  const input = await screen.findByLabelText('New item')
  await user.type(input, ' - Edited')

  const saveButton = await screen.findByRole('button', { name: 'Save' })
  await user.click(saveButton)

  const editEvent = emitted().edit as unknown[][]; 
  expect(editEvent[0][0]).toEqual({ id: 1, title: 'Item 1 - Edited' })
})