'use strict';

const Peer = require('skyway-js');
const peer = new Peer({key: '6c484e4b-71d6-40a9-9db2-b94d143bdfaf'});

peer = new Peer({
    key: '6c484e4b-71d6-40a9-9db2-b94d143bdfaf',
    debug: 3
});

peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
});

document.getElementById('make-call').onclick = () => {
    const theirID = document.getElementById('their-id').value;
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
  };

  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      // Set a camera image to the video element and play it
      const videoElm = document.getElementById('their-video')
      videoElm.srcObject = stream;
      videoElm.play();
    });
  }

  peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
  });

  peer.on('error', err => {
    alert(err.message);
  });

  peer.on('close', () => {
    alert('We have lost communication.');
  });
