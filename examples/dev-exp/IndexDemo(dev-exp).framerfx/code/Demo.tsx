import { Override } from "framer"
import { IndexController, SelectionController } from "../../../../lib"

/* 
Index and Selection Demo
Demos: SelectionController, IndexController

See bottom of file for comments!
*/

// [1]
const selectController = new SelectionController({
    selected: null,
    toggle: true,
})

// [2]
const indexController = new IndexController({
    items: ["item_a", "item_b", "item_c", "item_d"],
    loop: false,
})

// [3]
const getItemOverride = (item, props) => {
    const zIndex = indexController.order[item]

    const saturation =
        !selectController.hasSelected || selectController.isSelected(item)
            ? 100
            : 20

    return {
        initial: {
            y: zIndex * -40,
        },
        animate: {
            y: zIndex * -40,
        },
        transition: {
            duration: 0.24,
        },
        style: {
            filter: `saturate(${saturation}%)`,
            boxShadow: `0 ${2 + zIndex * 2}px ${3 +
                zIndex * 3}px rgba(0,0,0,.45)`,
            zIndex: zIndex,
        },
        onClick: () => selectController.select(item),
    }
}

// [4]
export const isIndex0: Override = props => getItemOverride("item_a", props)
export const isIndex1: Override = props => getItemOverride("item_b", props)
export const isIndex2: Override = props => getItemOverride("item_c", props)
export const isIndex3: Override = props => getItemOverride("item_d", props)

// [5]
export const clearSelection: Override = () => ({
    onClick: selectController.clear,
})

// [6]
export const toggleLoop: Override = () => ({
    opacity: indexController.loop ? 1 : 0.5,
    onClick: () => (indexController.loop = !indexController.loop),
})

// [7]
const dimAtSelectedIndex = (index: number, canLoop = false) => {
    const selectedIndex = indexController.order[selectController.selected]
    let cantMove = selectedIndex === index
    if (cantMove && indexController.loop && canLoop) cantMove = false
    return !selectController.hasSelected || cantMove ? 0.5 : 1
}

// [8]
export const moveToBack: Override = () => ({
    opacity: dimAtSelectedIndex(0),
    onClick: () => indexController.moveToBack(selectController.selected),
})

export const moveBackward: Override = () => ({
    opacity: dimAtSelectedIndex(0, true),
    onClick: () => indexController.moveBackward(selectController.selected),
})

export const moveForward: Override = () => ({
    opacity: dimAtSelectedIndex(indexController.items.length - 1, true),
    onClick: () => indexController.moveForward(selectController.selected),
})

export const moveToFront: Override = () => ({
    opacity: dimAtSelectedIndex(indexController.items.length - 1),
    onClick: () => indexController.moveToFront(selectController.selected),
})

/* ---------- Comments

This demo shows how two controllers can work together to control
a complex state. We'll use a SelectionController to keep track
of which item is selected and an IndexController to determine the
z order of our items, or which item is in front of which. In both
cases, we'll be able to use controller methods, like `moveToBack`
to make managing this state much easier.

[1]
We'll use a SelectionController to track which item is selected.
It keeps track of two (stateful) properties: `selected` and `hasSelected`,
and gives us two methods, `select` and `clear`, to set the `selected`
property. We'll set it to handle toggle logic too, so that selecting a
selected item will deselect it.

[2]
We'll use an IndexController to manage our z-indexes. It takes an array
of `items` and exposes an object, `order`, with an index for each one
of those items. We can use common order management methods (`moveForward`,
`moveToFront`, `moveBack` and `moveToBack`) to handle changes to the order.

[3]
Each of our controlled items will behave the same way, so we'll use a helper
to generate the overrides for those items. Some of the style values are
set depending on `selectController`, some from `indexController`, and
a few are dependant on both. This is a good example of how a user might
compose logic from multiple controllers.

[4]
...and now let's create some overrides to assign to our items.

[5]
Let's also set an override that clears the selection, so that a user
can deselect by clicking the background.

[6]
First, let's make a quick button to toggle the indexController's
`loop` feature. When active, `indexController.loop` will let an item
in the top position move "forward" to the bottom position, and vis versa. 

[7]
Our buttons also share some logic depending on the index of the
selected item. Unless we're looping, We can't move the top item up 
or the lowest item down, so let's dim those buttons when they wouldn't
 have an effect.

 [8]
... and now let's make our button overrides. Note that the overrides
are passing `selectController.selected` to `indexController`'s methods.
If selected is `null` (or just not an item in the IndexController), the
method will return false.
*/
