// import Counter from "./components/Counter";
// import {useState} from 'react';
// function App() {
//   const [state, setState] = useState(true);

//   function handleToggle() {
//     setState(prev => !prev);
//   }

//   return (
//     <>
//       <button onClick={handleToggle}>Toggle</button>
//       {state && 
//         <div>
//           <h1>Counter</h1>
//           <Counter />
//         </div>
//       }
//     </>
//   )
// }

// export default App;

import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';

function App() {

  return(
    <>
      <NavBar />
      <Routes>
          <Route path='/' element = {<Home />}></Route>
          <Route path='/about' element = {<About />}></Route>
          <Route path='/contact' element = {<Contact />}></Route>
          <Route path='/login' element = {<Login/>}></Route>
      </Routes>
    </>
  );
}

export default App;
