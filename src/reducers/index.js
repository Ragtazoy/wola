import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import {
   FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import authReducer from './auth'
import cartReducer from './cart'

// const rootPersistConfig = {
//    key: 'root',
//    storage: storage
// }

// const authPersistConfig = {
//    key: 'auth',
//    storage: storage
// }

// const rootReducer = combineReducers({
//    auth: persistReducer(authPersistConfig, authReducer),
//    cart: cartReducer
// })

// export default persistReducer(rootPersistConfig, rootReducer)

const persistConfig = {
   key: 'root',
   storage
};

const reducers = combineReducers({
   auth: authReducer,
   cart: cartReducer
})

const store = configureStore({
   reducer: persistReducer(persistConfig, reducers),
   middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
   })
})

export default store;