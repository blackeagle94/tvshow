import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import episodesFetchingReducer from './episodes/episodesActions'
import seasonsFetchingReducer from './seasons/seasonsActions'
import showsFetchingReducer from './shows/showActions'
import SEARCHFetchingReducer from './serach/searchActions'

const rootReducer = combineReducers({
    shows: showsFetchingReducer,
    seasons: seasonsFetchingReducer,
    episodes: episodesFetchingReducer,
    searches: SEARCHFetchingReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))


export default store