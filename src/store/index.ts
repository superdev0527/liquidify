import { configureStore } from '@reduxjs/toolkit'
import handleSidebar from './handleSidebar';

export default configureStore({
  reducer: {
    handleSidebar: handleSidebar,
  },
});

