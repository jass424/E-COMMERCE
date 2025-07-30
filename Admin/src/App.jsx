import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import Addproduct from './Components/Addproduct/Addproduct';
import Listproduct from './Components/Listproduct/Listproduct';
import Viewusers from './Components/Viewusers/Viewusers'
import Allstocks from './Components/Allstocks/Allstocks'
import Taxes from './Components/Taxes/Taxes'

const App = () => {
  return (
    <>
      <Navbar />
      <div className='admin-container' style={{ display: 'flex' }}>
        <Sidebar />
        <div className='admin-content' style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Addproduct />} />

            {/* Other routes */}
            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/listproduct" element={<Listproduct />} />
            <Route path="/viewusers" element={<Viewusers />} />
             <Route path="/taxes" element={<Taxes />} />
           
            <Route path="/allstocks" element={<Allstocks />} />


            {/* 404 fallback */}
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
