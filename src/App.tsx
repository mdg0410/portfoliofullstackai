import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import router from './router';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </Provider>
  );
}

export default App;
