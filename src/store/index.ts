import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import middleware from "./config/middleware";
import { reducer, type RootState } from "./config/reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: []
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type IRootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
