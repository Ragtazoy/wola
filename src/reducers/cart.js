export default function cart(state = [], action) {
   switch (action.type) {
      case 'addItem':
         const selectedIndex = state.findIndex((item) => item.id === action.payload.id)
         if (selectedIndex >= 0) {
            return state.map((item, index) => {
               if (index === selectedIndex) {
                  return Object.assign({}, item, {
                     quantity: state[selectedIndex].quantity += action.payload.quantity
                  })
               }
               return item
            })
         } else {
            console.log('===addItem===')
            return state.concat(action.payload)
         }

      case 'removeItem':
         return state = state.filter(item => item.id !== action.payload)
         
      case 'resetCart':
         return state = []
      default:
         return state
   }
}