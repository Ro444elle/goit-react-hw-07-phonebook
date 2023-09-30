import { createSlice } from '@reduxjs/toolkit';
import { contactApi } from 'api/api';
// import { getState } from 'redux';
import { fetchContacts } from './operations';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async () => {
//     try {
//       const response = await contactApi.getAll();
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    fetchContactsStart: state => {
      state.isLoading = true;
    },

    fetchContactsSucces: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchContactsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    filterContacts: state => {
      state.items = state.items.filter(contact =>
        contact.name.toLowerCase().includes(state.filter.toLowerCase())
      );
    },

    createContactError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  fetchContactsStart,
  fetchContactsSucces,
  fetchContactsError,
  setFilter,
  filterContacts,
} = contactsSlice.actions;

// export const applyFilter = filter => dispatch => {
//   dispatch(setFilter(filter));
//   dispatch(filterContacts());
// };

export const setFilterAndFilterContacts = filter => dispatch => {
  dispatch(setFilter(filter));
  dispatch(filterContacts());
};

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contactData, { getState, dispatch }) => {
    try {
      const response = await contactApi.create(contactData);
      dispatch(
        fetchContactsSucces([...getState().contacts.items, response.data])
      );
    } catch (error) {
      console.error('Error creating contact:', error);
      // dispatch(createContactError(error.message));
    }
  }
);

export default contactsSlice.reducer;
