import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { 
    firstTimeReducer, modeReducer, 
    modalReducer, themeReducer, 
    languageReducer, allSignsReducer,
    connectionReducer
} from './reducers'

const rootReducer = combineReducers({
    firstTimeState:firstTimeReducer,
    modeState:modeReducer,
    modalState:modalReducer,
    themeState:themeReducer,
    languageState:languageReducer,
    signsState:allSignsReducer,
    connectionState:connectionReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store