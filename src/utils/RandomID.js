// import React from 'react';

function RandomID() {
  let length = 6;
  // eslint-disable-next-line
  var str = '';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    // eslint-disable-next-line    
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str.substr(2,10);
};

export default RandomID;