import { combineReducers } from 'redux'
import { app } from './app'
import { trainingSessions } from './trainingSessions'

const rootReducer = combineReducers({app, trainingSessions})

export default rootReducer
