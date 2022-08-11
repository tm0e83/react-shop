import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    products: [],
    selectedProducts: [],
    pageIndex: 0,
    productsPerPage: 5,
    productsTotal: 0,
    uid: null,
  },
  reducers: {
    setUID: (state, action) => {
      state.uid = action.payload;
    },

    setProductsTotal: (state, action) => {
      state.productsTotal = action.payload;
    },

    resetPageIndex: state => {
      state.pageIndex = 0;
    },

    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addProductToBasket: (state, action) => {
      state.selectedProducts.push(action.payload);
    },

    removeProductFromBasket: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(product => product.id !== action.payload.id);
    },
  },
});

export const { addProductToBasket, removeProductFromBasket, setProducts, setProductsTotal, setPageIndex, setUID } = generalSlice.actions;
export default generalSlice.reducer;
