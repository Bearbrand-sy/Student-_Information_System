const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('Signaling server running on ws://localhost:8080');

let clients = [];

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  clients.push(ws);

  ws.on('message', function incoming(message) {
    // Relay messages to the other client
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== ws);
  });
});
const startCallBtn = document.getElementById('startCallBtn');
const hangupCallBtn = document.getElementById('hangupCallBtn');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let pc;
let ws;

const signalingServerUrl = 'ws://localhost:8080'; // Change if hosted remotely
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

startCallBtn.onclick = async () => {
  startCallBtn.disabled = true;

  // Connect to signaling server
  ws = new WebSocket(signalingServerUrl);

  ws.onopen = () => {
    console.log('Connected to signaling server');
  };

  ws.onmessage = async (message) => {
    const data = JSON.parse(message.data);
    console.log('Received message', data);

    if (!pc) createPeerConnection();

    if (data.offer) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      ws.send(JSON.stringify({ answer }));
    } else if (data.answer) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch(e) {
        console.error('Error adding received ICE candidate', e);
      }
    }
  };

  ws.onclose = () => {
    console.log('Disconnected from signaling server');
  };

  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  createPeerConnection();

  // Create offer and send to signaling server
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  ws.send(JSON.stringify({ offer }));

  hangupCallBtn.disabled = false;
};

hangupCallBtn.onclick = () => {
  if (pc) pc.close();
  pc = null;

  if (ws) ws.close();
  ws = null;

  localVideo.srcObject.getTracks().forEach(track => track.stop());
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;

  startCallBtn.disabled = false;
  hangupCallBtn.disabled = true;
};

function createPeerConnection() {
  pc = new RTCPeerConnection(configuration);

  // Add local tracks to connection
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  pc.onicecandidate = event => {
    if (event.candidate && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ candidate: event.candidate }));
    }
  };

  pc.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  };

  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState === 'disconnected') {
      hangupCallBtn.click();
    }
  };
}
