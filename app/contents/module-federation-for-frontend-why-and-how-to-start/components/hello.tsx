import { useState } from 'react';

export function Hello() {
  const [state, setState] = useState(true);
  return (
    <div className="p-4 bg-red-600 border-2 border-blue-400">
      <button onClick={() => setState(!state)}>CLICK</button>
      {JSON.stringify(state)}
    </div>
  );
}
