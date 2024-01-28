import React, { useState, useEffect } from 'react';

const Main = ({ mainTitle, mainGroup, isSidebarVisible, onSidebarToggle,disableSelectedGroup }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const defaultImage1Url = './images/imaee1.png';
  const defaultImage2Url = './images/lock.png';

  useEffect(() => {
    const storedNotes = localStorage.getItem(mainTitle);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      setNotes([]);
    }
  }, [mainTitle]);

  const saveNotesToLocalStorage = (notesToSave) => {
    localStorage.setItem(mainTitle, JSON.stringify(notesToSave));
  };

  const formatDateTime = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;

    return `${formattedDate} \u2022 ${formattedTime}`;
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const timestamp = formatDateTime();
      const newNoteObject = { timestamp, content: newNote };
      const updatedNotes = [...notes, newNoteObject];
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setNewNote('');
    }
  };

  const handleBackButtonClick = () => {
    onSidebarToggle();
    disableSelectedGroup();
     // Toggling the visibility of the sidebar
  };

  return (
    <div className={`app-main ${isSidebarVisible ? 'selected' : 'overlap'}`}>
      {mainGroup ? (
        <div className='app-main-note-preview'>
          <h1 className='preview-title'>
            <button className='back-button'  onClick={handleBackButtonClick } >
              <img src='./images/vector.png' alt='Back' />
            </button>
            <span className='preview-title-color' style={{ backgroundColor: mainGroup.color }}>
              {mainGroup.initials}
            </span>
            <div className='app-titlee'>{mainTitle}</div>
          </h1>
          <ul className='app-input-list'>
            {notes.map((note, index) => (
              <li className='app-not' key={index}>
                <div className='app-not-content'>{note.content}</div>
                <div className='app-not-timestamp'>{note.timestamp}</div>
              </li>
            ))}
          </ul>
          <div className='app-main-note-edit'>
            <textarea
              className='app-text'
              id='body'
              placeholder='Write your note here...'
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button className='app-imagess' onClick={addNote}>
              <img className='app-image0' src='./images/arrow 0.png' alt='image0' />
              <img className='app-image1' src='./images/arrow 1.png' alt='image1' />
            </button>
          </div>
        </div>
      ) : (
        <div className='initial-blank-page'>
          <div className='default-image-container1'>
            <img className='default-image' src={defaultImage1Url} alt='Default Imag1' />
            <h1> Pocket Notes</h1>
            <p className='default-text'>
              Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices
              and 1 mobile phone
            </p>
          </div>
          <div className='default-content-container2'>
            <img className='default-image1' src={defaultImage2Url} alt='Default Ima 2' />
            <p className='default-text1'>end-to-end encrypted</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
