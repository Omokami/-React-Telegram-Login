import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './App.css';

function App() {
  const [loading, setLoading] = useState(false); // State to track loading status

  // Function to handle Telegram authentication
  const onTelegramAuth = (user) => {
    console.log('User data:', user);
    setLoading(true); // Set loading to true when the request starts

    // Use Axios to send user data to your backend server
    axios.post('https://unigamesbot.vercel.app/auth/telegram', user)
      .then((response) => {
        setLoading(false); // Set loading to false when the request completes
        if (response.status === 200) {
          alert('Logged in successfully!');
        } else {
          alert('Failed to log in.');
        }
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of an error
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again.');
      });
  };

  useEffect(() => {
    // Define the global function that the widget will call upon authentication
    window.onTelegramAuth = onTelegramAuth;

    // Create a script element for the Telegram widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'unigames_tg_bot'); // Replace with your bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-radius', 'default');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');

    // Append the script to the target div
    const targetDiv = document.getElementById('telegram-login-button');
    if (targetDiv) {
      targetDiv.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (targetDiv) {
        targetDiv.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login with Telegram</h1>
        <p>Click the button below to log in with your Telegram account:</p>
        {/* The Telegram login button will be injected here by the widget script */}
        <div id="telegram-login-button"></div>
        {/* Display the loading spinner if the request is in progress */}
        {loading && <div className="spinner"></div>}
      </header>
    </div>
  );
}

export default App;
