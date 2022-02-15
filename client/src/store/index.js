import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';//permite usar la herramienta Redux DevTools en Chrome
import thunk from 'redux-thunk';//permite a redux trabajar con acciones asincronas
import rootReducer from '../reducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


