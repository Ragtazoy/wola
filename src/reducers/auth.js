export default function auth(state = [], action) {
   switch (action.type) {
      case 'addAuth':
         state = []
         return state.concat(action.payload)
      case 'resetAuth':
         return state = []
      default:
         return state
   }
}