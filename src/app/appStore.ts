import { configureStore } from '@reduxjs/toolkit'

import { aircraftReducer } from '@/entities/aircraft'

export const store = configureStore({
  reducer: {
    aircraft: aircraftReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
