import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import RestaurantRegist from './pages/RestaurantRegist';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Error from './pages/Error';
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={ <Main/> }/>
        <Route path = "/" element={ <Layout/> }>
            <Route path="restaurant">
            <Route index element={<Restaurants/>}/>
            <Route path="regist" element={ <RestaurantRegist/> }/>
            <Route path=":id" element={ <RestaurantDetail/> }/>
          </Route> 
        </Route>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
    
  );
}


export default App;
