import React, {
  createContext,
  useState,
  useRef,
  useEffect
} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

export const SocketContext = createContext();

const socket = io('http://localhost:8000');

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState();
  const [userId, setUserId] = useState('');
  const [call, setCall] = useState({});
  const [name, setName] = useState('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const video = useRef();
  const peerVideo = useRef();
  const connection = useRef();

  useEffect(() => {
    navigator
      .mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      }).then((currentStream) => {
        setStream(currentStream);
        video?.current && (video.current.srcObject = currentStream);
      });

    socket.on('user_id', (id) => setUserId(id));
    socket.on('call_user', ({ from, name, signal }) => {
      setCall({ isReceiving: true, from, name, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on('signal', (data) => {
      socket.emit('answer_call', {
        signal: data,
        to: call.from
      });
    });

    peer.on('stream', (currentStream) => peerVideo.current.srcObject = currentStream);
    peer.signal(call.signal);
    connection.current = peer;
  };

  const callUser = (peerId) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', (data) => {
      socket.emit('call_user', { user: peerId, signalData: data, from: userId, name });
    });

    peer.on('stream', (currentStream) => peerVideo.current.srcObject = currentStream);

    socket.on('call_accepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    })

    connection.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connection.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      video,
      peerVideo,
      name,
      setName,
      callEnded,
      userId,
      callUser,
      answerCall,
      leaveCall
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default ContextProvider;