import './App.css';
import VideoPlayer from './components/videoPlayer';
import Options from './components/options';
import Notifications from './components/notifications';
import AppBar from './components/appBar';

function App() {
  return (
    <div className="App">
      <AppBar />
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
