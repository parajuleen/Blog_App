
import {combineReducers, configureStore} from'@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { blogReducer } from './features/blogslice'
import { loginReducer, logout } from './features/loginSlice'
import { userReducer } from './features/userSlice'
import {registerReducer} from './features/signupslice'


//Create persistconfig
const persistConfig={
    key:'root',
    storage,
    blacklist:['signup'],
}

const combinedReducers=combineReducers({
    blog:blogReducer,  //these keys are used to read value from the state using useselector hook..for ex state.blog//
    login:loginReducer,
    signup:registerReducer,
    user:userReducer
})

const rootReducers=(state,action)=>{
    if(action.type== logout.type){
        state=undefined
    }
    return combinedReducers(state,action)
}

//Create Persisted reducer
const persistedReducers=persistReducer(persistConfig,rootReducers)

export const store =configureStore({
    reducer:persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

 export const persistor=persistStore(store)
