import {configureStore} from "@reduxjs/toolkit";

import postSliceReducer  from "./postSlice";


const store = configureStore({
    reducer :{
        postList  : postSliceReducer
    }
})


export default store
