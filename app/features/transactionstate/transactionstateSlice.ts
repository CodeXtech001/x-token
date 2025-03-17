import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TransactionState {
    openDialogPay: boolean;
  }

// Define the initial state using that type
const initialState: TransactionState = {
    openDialogPay: false,
  }; 

export const transactionstateSlice = createSlice({
  name: "transactionstate",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOpenDialogPay: (state) => {
        state.openDialogPay = !state.openDialogPay;
      },
  },
})

export const { setOpenDialogPay } = transactionstateSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default transactionstateSlice.reducer