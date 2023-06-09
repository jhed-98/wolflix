import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

// Podemos ponerla a disposición de nuestros componentes de React colocando un React-Redux <Provider>

import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    // </React.StrictMode>,
  )
