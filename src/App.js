import './styles/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import RecoveryPw from './components/RecoveryPw';


function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/profile' element={<Profile/>} />
  <Route path='/recoveryPw' element={<RecoveryPw/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
