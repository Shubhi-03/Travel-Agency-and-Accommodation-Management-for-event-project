
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Body from "./components/body.js";
import axios from "axios";
import {Toaster} from 'react-hot-toast';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API;
function App() {
  return (
      <Provider store = {appStore}>
        <Toaster position="bottom-right" toastOptions={{duration:2000}}/>
           <Body/>
   
      </Provider>
    
  );
}




export default App;