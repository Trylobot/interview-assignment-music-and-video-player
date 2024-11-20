import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from './features/videos/videoSlice';

function App() {
  const videos = useSelector(state => state.video.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Simple Counter with Redux Toolkit</h1>
      <h2>{videos}</h2>
      <button onClick={() => dispatch(set())}>Increment</button>{' '}
    </div>
  );
}

export default App;
