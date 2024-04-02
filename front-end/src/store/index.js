import { configureStore, createSlice } from "@reduxjs/toolkit";


const dateChangedSlice = createSlice({
    name: "date",
    initialState: {
      dateChanged:'17 Apr 2022',
      showForm:false,
      meetdata:'',
      meetdatadatabase:[{id:0,title:'', date:''}],
      meetuptitle:'',
      meetavailabledata:false
    },
    reducers: {
      setChangedDate: (state, action) => {
        state.dateChanged = action.payload;
      },
      setShowForm: (state, action) => {
        state.showForm = action.payload;
      },
      setMeetData: (state, action) => {
        state.meetdata = action.payload;
      },
      setMeetUpDatabase: (state, action) => {
        state.meetdatadatabase = action.payload;
      },
      setMeetUpTitle: (state, action) => {
        state.meetuptitle = action.payload;
      },
      setDataAvailable: (state, action) => {
        state.meetavailabledata = action.payload;
      },
    },
  });
  



  const store = configureStore({
    reducer: {
      date: dateChangedSlice.reducer, // Corrected slice name to 'chat'
      
  
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });


  export const dateChangedActions = dateChangedSlice.actions;
export default store;