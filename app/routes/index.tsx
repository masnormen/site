import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const [hello, setHello] = useState('');
  return (
    <button type="button" onClick={() => setHello(new Date().toISOString())}>
      Update from: {hello}
    </button>
  );
}
