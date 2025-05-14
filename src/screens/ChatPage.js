  // import React, { useState, useEffect } from 'react';
  // import axios from 'axios';
  // import { io } from 'socket.io-client';
  // import themes from '../screens/themes'; // Import the themes
  // import '../styles/ChatPage.css';

  // // Socket connection
  // const socket = io('https://chataapp-server-1.onrender.com');

  // function ChatPage() {
  //   const [search, setSearch] = useState('');
  //   const [selectedUser, setSelectedUser] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [messageInput, setMessageInput] = useState('');
  //   const [userMessages, setUserMessages] = useState([]);
  //   const [users, setUsers] = useState([]);
  //   const [loggedInUser, setLoggedInUser] = useState(null);
  //   const [isUserOnline, setIsUserOnline] = useState(false);
  //   const [showProfileCard, setShowProfileCard] = useState(false);
  //   const [showSettingsCard, setShowSettingsCard] = useState(false); // New state for Settings card
  //   const [selectedTheme, setSelectedTheme] = useState('light'); // Default theme is 'light'

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //          const response = await axios.get('https://chataapp-server-1.onrender.com/api/all-users');
          
  //         if (Array.isArray(response.data.users)) {
  //           setUsers(response.data.users);
  //         } else {
  //           setError('Fetched data is not an array');
  //         }
  //       } catch (err) {
  //         console.error('Error fetching users:', err);
  //         setError('Failed to fetch users.');
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchUsers();

  //     const storedUser = JSON.parse(localStorage.getItem('user'));
  //     if (storedUser) {
  //       setLoggedInUser(storedUser);
  //       setIsUserOnline(true);
  //     }

  //     socket.connect();

  //     const timer = setTimeout(() => {
  //       setIsUserOnline(false);
  //     }, 2 * 60 * 1000);

  //     return () => {
  //       socket.disconnect();
  //       clearTimeout(timer);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       if (selectedUser && loggedInUser) {
  //         try {
  //           const response = await axios.get(
  //              `https://chataapp-server-1.onrender.com/api/messages/conversation/${loggedInUser.name}/${selectedUser}`
              
  //           );
  //           if (response.data && Array.isArray(response.data.messages)) {
  //             setUserMessages(response.data.messages);
  //           } else {
  //             setError('No messages found or invalid response format.');
  //           }
  //         } catch (err) {
  //           console.error('Error fetching messages:', err);
  //           setError('Failed to fetch messages: ' + err.message);
  //         }
  //       }
  //     };

  //     fetchMessages();
  //   }, [selectedUser, loggedInUser]);

  //   const handleMessageSend = async () => {
  //     if (!messageInput.trim() || !selectedUser) return;

  //     try {
  //        const response = await axios.post('https://chataapp-server-1.onrender.com/api/messages/send', {
      
  //         senderName: loggedInUser.name,
  //         receiverName: selectedUser,
  //         message: messageInput,
  //       });

  //       const newMessage = response.data.data;

  //       setUserMessages((prevMessages) => [...prevMessages, newMessage]);
  //       setMessageInput('');

  //       socket.emit('send_message', {
  //         senderName: loggedInUser.name,
  //         receiverName: selectedUser,
  //         message: messageInput,
  //       });
  //     } catch (error) {
  //       console.error('Error sending message:', error);
  //       setError('Failed to send message.');
  //     }
  //   };

  //   const handleChangeUser = (user) => {
  //     setSelectedUser(user);
  //     setMessageInput('');
  //     setUserMessages([]);
  //   };

  //   useEffect(() => {
  //     socket.on('receive_message', (message) => {
  //       if (
  //         (message.senderName === loggedInUser.name && message.receiverName === selectedUser) ||
  //         (message.receiverName === loggedInUser.name && message.senderName === selectedUser)
  //       ) {
  //         setUserMessages((prevMessages) => [...prevMessages, message]);
  //       }
  //     });

  //     return () => {
  //       socket.off('receive_message');
  //     };
  //   }, [selectedUser, loggedInUser]);

  //   const filteredUsers = users.filter((user) => user !== loggedInUser?.name);

  //   const theme = themes[selectedTheme]; // Get the selected theme colors

  //   return (
  //     <div
  //       className="chat-container"
  //       style={{ backgroundColor: theme.background, color: theme.text }}
  //     >
  //       <header
  //         className="top-nav"
  //         style={{ backgroundColor: theme.formBackground }}
  //       >
  //         <h1 className="app-title">Blabby</h1>
  //         <div className="nav-actions">
  //           <button className="nav-btn" onClick={() => setShowSettingsCard(!showSettingsCard)}>
  //             Settings
  //           </button>
  //           <button className="nav-btn" onClick={() => setShowProfileCard(!showProfileCard)}>
  //             Profile
  //           </button>
  //           <button
  //             className="nav-btn logout"
  //             onClick={() => {
  //               localStorage.removeItem('authToken');
  //               localStorage.removeItem('user');
  //               window.location.href = '/';
  //             }}
  //           >
  //             Logout
  //           </button>
  //         </div>
  //       </header>

  //       {showProfileCard && loggedInUser && (
  //         <div className="profile-card" style={{ backgroundColor: theme.formBackground }}>
  //           <h2>{loggedInUser.name}'s Profile</h2>
  //           <p>Email: {loggedInUser.email}</p>
  //           <button onClick={() => setShowProfileCard(false)}>Close</button>
  //         </div>
  //       )}

  //       {showSettingsCard && (
  //         <div className="settings-card" style={{ backgroundColor: theme.formBackground, padding: '20px', margin: '10px', borderRadius: '10px' }}>
  //            <span
  //       onClick={() => setShowSettingsCard(false)}
  //       style={{
  //         position: 'absolute',
  //         top: '10px',
  //         right: '15px',
  //         cursor: 'pointer',
  //         fontWeight: 'bold',
  //         fontSize: '18px',
  //         color: theme.text
  //       }}
  //     >
  //       ×
  //     </span>
  //           <h2>Select Theme</h2>
  //           <ul>
  //             {Object.keys(themes).map((themeName) => (
  //               <li
  //                 key={themeName}
  //                 style={{ cursor: 'pointer', margin: '10px 0', color: theme.text }}
  //                 onClick={() => setSelectedTheme(themeName)}
  //               >
  //                 {themeName}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}

  //       <div className="main-section">
  //         <aside
  //           className="sidebar"
  //           style={{ backgroundColor: theme.square }}
  //         >
  //           <div className="search-bar">
  //             <input
  //               type="text"
  //               placeholder="Search or start a new chat"
  //               value={search}
  //               onChange={(e) => setSearch(e.target.value)}
  //               style={{
  //                 backgroundColor: theme.formBackground,
  //                 color: theme.text,
  //                 border: `1px solid ${theme.placeholder}`,
  //               }}
  //             />
  //           </div>
  //           <ul className="chat-list">
  //             {loading ? (
  //               <p>Loading users...</p>
  //             ) : error ? (
  //               <p>{error}</p>
  //             ) : (
  //               filteredUsers
  //                 .filter((user) => user.toLowerCase().includes(search.toLowerCase()))
  //                 .map((user, index) => (
  //                   <li
  //                     key={index}
  //                     className={`chat-user ${selectedUser === user ? 'active' : ''}`}
  //                     onClick={() => handleChangeUser(user)}
  //                     style={{
  //                       backgroundColor:
  //                         selectedUser === user ? theme.buttonHover : 'transparent',
  //                       color: theme.text,
  //                     }}
  //                   >
  //                     <div className="user-details">
  //                       <span className="name">{user}</span>
  //                       <span className="last-msg">Last message preview...</span>
  //                     </div>
  //                     <span className="chat-time">12:34</span>
  //                   </li>
  //                 ))
  //             )}
  //           </ul>
  //         </aside>

  //         <section
  //           className="chat-window"
  //           style={{ backgroundColor: theme.formBackground }}
  //         >
  //           {selectedUser ? (
  //             <>
  //               <div className="chat-header">
  //                 <div>
  //                   <span className="name">{selectedUser}</span>
  //                   <span className="status">{isUserOnline ? 'Online' : 'Offline'}</span>
  //                 </div>
  //               </div>
  //               <div className="chat-body">
  //                 {userMessages.map((message, index) => (
  //                   <div
  //                     key={index}
  //                     className={`message ${message.senderName === loggedInUser.name ? 'sent' : 'received'}`}
  //                   >
  //                     <strong>{message.senderName}:</strong> {message.message}
  //                   </div>
  //                 ))}
  //               </div>
  //               <div className="chat-input-area">
  //                 <input
  //                   type="text"
  //                   placeholder="Type a message..."
  //                   value={messageInput}
  //                   onChange={(e) => setMessageInput(e.target.value)}
  //                   style={{
  //                     backgroundColor: theme.formBackground,
  //                     color: theme.text,
  //                     border: `1px solid ${theme.placeholder}`,
  //                   }}
  //                 />
  //                 <button
  //                   onClick={handleMessageSend}
  //                   style={{
  //                     backgroundColor: theme.button,
  //                     color: '#fff',
  //                     border: 'none',
  //                   }}
  //                 >
  //                   Send
  //                 </button>
  //               </div>
  //             </>
  //           ) : (
  //             <div className="no-chat-selected">
  //               <p>Select a conversation to begin</p>
  //             </div>
  //           )}
  //         </section>
  //       </div>
  //     </div>
  //   );
  // }

  // export default ChatPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import themes from '../screens/themes';
import '../styles/ChatPage.css';

const socket = io('https://chataapp-server-1.onrender.com');

function ChatPage() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showSettingsCard, setShowSettingsCard] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [mobileChatView, setMobileChatView] = useState(false); // mobile view toggle

  useEffect(() => {
    const fetchUsers = async () => {
      try {
         const response = await axios.get('https://chatapp-server-cq7p.onrender.com/api/all-users');
          // const response = await axios.get('http://localhost:1000/api/all-users');
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          setError('Fetched data is not an array');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setLoggedInUser(storedUser);
      setIsUserOnline(true);
    }

    socket.connect();

    const timer = setTimeout(() => {
      setIsUserOnline(false);
    }, 2 * 60 * 1000);

    return () => {
      socket.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && loggedInUser) {
        try {
          const response = await axios.get(
             `https://chatapp-server-cq7p.onrender.com/api/messages/conversation/${loggedInUser.name}/${selectedUser}`
            //  `http://localhost:1000/api/messages/conversation/${loggedInUser.name}/${selectedUser}`
          );
          if (response.data && Array.isArray(response.data.messages)) {
            setUserMessages(response.data.messages);
          } else {
            setError('No messages found or invalid response format.');
          }
        } catch (err) {
          console.error('Error fetching messages:', err);
          setError('Failed to fetch messages: ' + err.message);
        }
      }
    };

    fetchMessages();
  }, [selectedUser, loggedInUser]);

  const handleMessageSend = async () => {
    if (!messageInput.trim() || !selectedUser) return;

    try {
       const response = await axios.post('https://chatapp-server-cq7p.onrender.com/api/messages/send', {
      // const response = await axios.post('http://localhost:1000/api/messages/send', {
        senderName: loggedInUser.name,
        receiverName: selectedUser,
        message: messageInput,
      });

      const newMessage = response.data.data;
      setUserMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput('');

      socket.emit('send_message', {
        senderName: loggedInUser.name,
        receiverName: selectedUser,
        message: messageInput,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message.');
    }
  };

  const handleChangeUser = (user) => {
    setSelectedUser(user);
    setMessageInput('');
    setUserMessages([]);
    if (window.innerWidth <= 480) {
      setMobileChatView(true);  // Show chat on mobile when a user is selected
    }
  };

  const handleCloseChat = () => {
    setMobileChatView(false);  // Close chat and show the sidebar again
    setSelectedUser(null); // Reset selected user
  };

  const filteredUsers = users.filter((user) => user !== loggedInUser?.name);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      if (
        (message.senderName === loggedInUser.name && message.receiverName === selectedUser) ||
        (message.receiverName === loggedInUser.name && message.senderName === selectedUser)
      ) {
        setUserMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [selectedUser, loggedInUser]);

  const theme = themes[selectedTheme];

  return (
    <div className="chat-container" style={{ backgroundColor: theme.background, color: theme.text }}>
      <header className="top-nav" style={{ backgroundColor: theme.formBackground }}>
        <h1 className="app-title">Blabby</h1>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => setShowSettingsCard(!showSettingsCard)}>Settings</button>
          <button className="nav-btn" onClick={() => setShowProfileCard(!showProfileCard)}>Profile</button>
          <button
            className="nav-btn logout"
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {showProfileCard && loggedInUser && (
        <div className="profile-card" style={{ backgroundColor: theme.formBackground }}>
          <h2>{loggedInUser.name}'s Profile</h2>
          <p>Email: {loggedInUser.email}</p>
          <button onClick={() => setShowProfileCard(false)}>Close</button>
        </div>
      )}

      {showSettingsCard && (
        <div className="settings-card" style={{ backgroundColor: theme.formBackground }}>
          <span
            onClick={() => setShowSettingsCard(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '18px',
              color: theme.text
            }}
          >
            ×
          </span>
          <h2>Select Theme</h2>
          <ul>
            {Object.keys(themes).map((themeName) => (
              <li key={themeName} style={{ cursor: 'pointer', margin: '10px 0', color: theme.text }} onClick={() => setSelectedTheme(themeName)}>
                {themeName}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="main-section">
        {!mobileChatView && (
          <aside className="sidebar" style={{ backgroundColor: theme.square }}>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search or start a new chat"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  backgroundColor: theme.formBackground,
                  color: theme.text,
                  border: `1px solid ${theme.placeholder}`,
                }}
              />
            </div>
            <ul className="chat-list">
              {loading ? (
                <p>Loading users...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                filteredUsers
                  .filter((user) => user.toLowerCase().includes(search.toLowerCase()))
                  .map((user, index) => (
                    <li
                      key={index}
                      className={`chat-user ${selectedUser === user ? 'active' : ''}`}
                      onClick={() => handleChangeUser(user)}
                      style={{
                        backgroundColor: selectedUser === user ? theme.buttonHover : 'transparent',
                        color: theme.text,
                      }}
                    >
                      <div className="user-details">
                        <span className="name">{user}</span>
                        <span className="last-msg">Last message preview...</span>
                      </div>
                      <span className="chat-time">12:34</span>
                    </li>
                  ))
              )}
            </ul>
          </aside>
        )}

        {mobileChatView && selectedUser && (
  <section className="chat-window mobile" style={{ backgroundColor: theme.formBackground }}>
    <div className="chat-header">
      <span className="back-arrow" onClick={handleCloseChat}>←</span>
      <div>
        <span className="name">{selectedUser}</span>
        <span className="status">{isUserOnline ? 'Online' : 'Offline'}</span>
      </div>
    </div>
    <div className="chat-body">
      {userMessages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.senderName === loggedInUser.name ? 'sent' : 'received'}`}
        >
          <strong>{message.senderName}:</strong> {message.message}
        </div>
      ))}
    </div>
    <div className="chat-input-area">
      <input
        type="text"
        placeholder="Type a message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        style={{
          backgroundColor: theme.formBackground,
          color: theme.text,
          border: `1px solid ${theme.placeholder}`,
        }}
      />
      <button
        onClick={handleMessageSend}
        style={{
          backgroundColor: theme.button,
          color: '#fff',
          border: 'none',
        }}
      >
        Send
      </button>
    </div>
  </section>
)}
      </div>
    </div>
  );
}

export default ChatPage;
