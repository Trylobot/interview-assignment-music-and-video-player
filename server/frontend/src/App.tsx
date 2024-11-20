import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { set } from './features/videos/videoSlice';
import VideoList from './components/VideoList';

function App() {
  // const videos = useSelector(state => state.video.value);
  // const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <VideoList/>
    </div>
  );
}

export default App;
