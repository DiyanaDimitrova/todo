import { Provider } from 'react-redux';
import Page from './page';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;
