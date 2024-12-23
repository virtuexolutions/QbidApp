import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification: false,
  bidDetail: {},
  servicesArray: [
    {id: 'Auto repair', name: 'Auto repair'},
    {id: 'plumbing Projects', name: 'plumbing Projects'},
    {id: 'HAVC repair/Replacement', name: 'HAVC repair/Replacement'},
    {id: 'Handyman Projects', name: 'Handyman Projects'},
    {id: 'Heavy Duty Vehicles', name: 'Heavy Duty Vehicles'},
    {
      id: 'Medium duty mechanical repair diesel',
      name: 'Medium duty mechanical repair diesel',
    },
    {id: 'Roof Replacement', name: 'Roof Replacement'},
    {id: 'Home Remodel', name: 'Home Remodel'},
    {id: 'Pool Builder/Remodel', name: 'Pool Builder/Remodel'},
    {
      id: 'Power Sport Mechanical Repair',
      name: 'Power Sport Mechanical Repair',
    },
    {
      id: 'Garage door install or repair',
      name: 'Garage door install or repair',
    },
    {id: 'Painting int/ext', name: 'Painting int/ext'},
    {id: 'Carpet/tile/wood flooring', name: 'Carpet/tile/wood flooring'},
    {id: 'Back yard Grill installs', name: 'Back yard Grill installs'},
    {id: 'Fence repair/install', name: 'Fence repair/install'},
    {id: 'Landscape projects', name: 'Landscape projects'},
    {id: 'Outdoor kitchen projects', name: 'Outdoor kitchen projects'},
    {id: 'RV/cramper/repairs', name: 'RV/cramper/repairs'},
    {id: 'Marine/boat/ Repairs', name: 'Marine/boat/ Repairs'},
    {id: 'Concrete projects', name: 'Concrete projects'},
    {id: 'Solar installation', name: 'Solar installation'},
    {id: 'Wedding event planners', name: 'Wedding event planners'},
    {
      id: 'Sprinkler installation projects',
      name: 'Sprinkler installation projects',
    },
  ],
  selectedRole: '',
  location: '',
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
      state.selectedRole = '';
    },
    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },
    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setBidDetail(state, action) {
      state.bidDetail = action.payload;
    },
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setSelectedRole,
  setLocation,
  setBidDetail,
} = CommonSlice.actions;

export default CommonSlice.reducer;
