// App.js
import React, { useState } from 'react';
import './App.css'; 
import Sidebar from './Sidebar';
import Main from './Main';

function App() {
  const [mainTitle, setMainTitle] = useState('');
  const [mainGroup, setMainGroup] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const[selectedGroup, setSelectedGroup] = useState(null);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsActive(false); // Ensuring Main is not active when toggling sidebar
  };
  const disableSelectedGroup=() =>{
    setSelectedGroup(null);
  };
  return (
    <div className="App">
      <Sidebar
        setMainTitle={setMainTitle}
        setMainGroup={setMainGroup}
        isVisible={isSidebarVisible}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        onSidebarHide={() => {
          setIsSidebarVisible(false);
          setIsActive(true); // Seting Main as active when hiding sidebar
        }}
      />
      <Main
        mainTitle={mainTitle}
        mainGroup={mainGroup}
        isSidebarVisible={isSidebarVisible}
        onSidebarToggle={handleSidebarToggle} // Passing the callback to toggle the sidebar visibility
        isActive={isActive} // Passing the isActive prop to Main.js
        disableSelectedGroup={disableSelectedGroup}
      
      />
    </div>
  );
}

export default App;
