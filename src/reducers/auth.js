export default function auth(state = [], action) {
   switch (action.type) {
      case 'addAuth':
         state = []
         return state.concat(action.payload)

      case 'updateAuth':
         const selectedIndex = state.findIndex((item) => item.user.id === action.payload.id)
         if (selectedIndex >= 0) {
            return state.map((item, index) => {
               if (index === selectedIndex) {
                  console.log('updateAuth:', action.payload);
                  return Object.assign({}, item, {
                     user: {
                        id: action.payload.id,
                        email: action.payload.email,
                        username: action.payload.username,
                     }
                  })
               }
               return item
            })
         }
         break

      case 'resetAuth':
         return state = []
      default:
         return state
   }
}