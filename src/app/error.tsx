'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Something went wrong!</h2>
            <p style={{ color: 'red', fontFamily: 'monospace' }}>
                {error.message}
            </p>
            {error.stack && (
                <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap', background: '#eee', padding: '1rem', marginTop: '1rem', overflowX: 'auto' }}>
                    {error.stack}
                </pre>
            )}
            <button
                onClick={() => reset()}
                style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
                Try again
            </button>
        </div>
    );
}
