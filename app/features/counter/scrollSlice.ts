import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface ScrollState {
    activeSection: string;
  }

// Define the initial state using that type
const initialState: ScrollState = {
    activeSection: "",
  }; 

export const scrollSlice = createSlice({
  name: "scroll",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
        state.activeSection = action.payload;
      },
  },
})

export const { setActiveSection } = scrollSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default scrollSlice.reducer