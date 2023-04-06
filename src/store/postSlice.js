const {createSlice}  = require('@reduxjs/toolkit');

const postSlice = createSlice({
    name : "postList",
    initialState: [],

    reducers :{
        select(state,action) {
            state.push(action.payload)
        }
    }
})


export const {select} = postSlice.actions;
export default postSlice.reducer
