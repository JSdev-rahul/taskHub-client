/* eslint-disable-next-line padded-blocks */
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { BrowserRouter as Router } from "react-router-dom"
// import 'sweetalert2/src/sweetalert2.scss'
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
