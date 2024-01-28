import React, { useState, useEffect } from 'react';


const Sidebar = ({ setMainTitle, setMainGroup, onSidebarHide,selectedGroup, setSelectedGroup }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [existingGroupNames, setExistingGroupNames] = useState([]);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [isNameTaken, setIsNameTaken] = useState(false);
 

  useEffect(() => {
    const storedGroups = localStorage.getItem('createdGroups');
    if (storedGroups) {
      setCreatedGroups(JSON.parse(storedGroups));
      const names = JSON.parse(storedGroups).map((group) => group.name);
      setExistingGroupNames(names);
    }
  }, []);

  const saveGroupsToLocalStorage = (groups) => {
    localStorage.setItem('createdGroups', JSON.stringify(groups));
  };

 
  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setGroupName('');
    setSelectedColor('');
    setIsNameTaken(false);
  };

  const handleGroupNameChange = (event) => {
    const newName = event.target.value;
    setGroupName(newName);

    if (existingGroupNames.includes(newName)) {
      setIsNameTaken(true);
    } else {
      setIsNameTaken(false);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() === '' || existingGroupNames.includes(groupName)) {
      alert('Name already exists. Please choose another name.');
      return;
    }

    let initials;
    if (groupName.length === 1) {
      initials = groupName.toUpperCase();
    } else {
      initials = groupName[0] + groupName[1];
    }

    const newGroup = {
      name: groupName,
      color: selectedColor,
      initials: initials.toUpperCase(),
    };

    setCreatedGroups([...createdGroups, newGroup]);
    setExistingGroupNames([...existingGroupNames, groupName]);
    saveGroupsToLocalStorage([...createdGroups, newGroup]);

    handlePopupClose();
    setMainTitle(groupName);
    setMainGroup(newGroup);

    setSelectedGroup(groupName);

    // Hiding the sidebar when a group is selected
    onSidebarHide();
  };

  const colorOptions = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  return (
    <div className={`app-sidebar ${selectedGroup ? 'hidden' : 'overlap'}`}>
      <div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create Group</h2>
            <div className='popup-content-group'>
              Group Name
              <input
                type="text"
                value={groupName}
                onChange={handleGroupNameChange}
                placeholder={isNameTaken ? 'Name already taken. Choose another name.' : 'Enter group name'}
              />
            </div>
            <div className='popup-content-color'>
              Choose Color
              <div className="color-circle-container">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className="color-circle"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
            </div>
            <button onClick={handleCreateGroup}>Create</button>
          </div>
        </div>
      )}

      <div className="app-sidebar-notes">
        <div className="header" onClick={() => onSidebarHide()}>
          <h1>Pocket Notes</h1>
        </div>
        {createdGroups.map((group, index) => (
          <div
            key={index}
            className={`app-sidebar-group ${selectedGroup === group.name ? 'selected' : 'overlap'}`}
            onClick={() => {
              setSelectedGroup(group.name);
              setMainTitle(group.name);
              setMainGroup(group);
              onSidebarHide();
              
            }}
          >
            <p className='app-sidebar-initials' style={{ backgroundColor: group.color }}>
              {group.initials}
            </p>
            <p className='app-sidebar-name'>{group.name}</p>
          </div>
        ))}
      </div>
      <div className="app-button">
        <button onClick={handleAddButtonClick}>
          <img src="./images/add.png" alt="image1" />
        </button>
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
