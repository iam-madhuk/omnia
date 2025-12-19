import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>React Test App</h1>
      <p>If you see this, React is working!</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}
      >
        Count: {count}
      </button>
      <p style={{ marginTop: '20px' }}>
        Click the button to test React state updates.
      </p>
    </div>
  );
}

export default App;