import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mamaSaga } from './sagas';
import { rootReducer, IAppState } from './reducers';

const sagaMiddleware: any = createSagaMiddleware();

const store = createStore(rootReducer as any, applyMiddleware(sagaMiddleware)) as Store<IAppState>;
sagaMiddleware.run(mamaSaga);

export default store;