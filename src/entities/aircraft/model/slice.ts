import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type AircraftType } from './types'

const initialState = {
  data: [] as AircraftType[],
}

export const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<AircraftType[]>) {
      state.data = action.payload
    },
    addAircraft: (state, action) => {
      state.data.push(action.payload)
    },
    removeAircraft: (state, action) => {
      state.data = state.data.filter(aircraft => aircraft.id !== action.payload)
    },
    editAircraft: (state, action) => {
      const index = state.data.findIndex(aircraft => aircraft.id === action.payload.id)
      if (index !== -1) {
        state.data[index] = action.payload
      }
    },
  },
})

export const { setData, removeAircraft, addAircraft, editAircraft } = aircraftSlice.actions
export const aircraftReducer = aircraftSlice.reducer
