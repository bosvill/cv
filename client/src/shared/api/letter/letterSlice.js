import { createSlice } from '@reduxjs/toolkit'

/* const initialState = {
  // user: null,
  //cv: null,
  // template: null,
  hrLast: null,
  companyName: null,
  companyStreet: null,
  companyZip: null,
  companyCity: null,
  position: null,
  refNumber: null
} */

export const letterSlice = createSlice({
  name: 'letter',
  initialState: {letter:{}},
  reducers: {
    setLetter: (state, {payload}) => {
      console.log(payload)
      state.letter=payload
    }
  },
  selectors: {
    selectLetter: state => state.letter
  }
})

export default letterSlice.reducer
export const { setLetter } = letterSlice.actions
export const { selectLetter } = letterSlice.selectors
