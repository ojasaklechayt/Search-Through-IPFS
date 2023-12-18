'use client'
// components/SearchBar.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(query);

        // Redirect to the search query page
        router.push(`/${encodeURIComponent(query)}`);
        setQuery('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center bg-black rounded-lg overflow-hidden shadow-md border border-blue-500 border-opacity-50 hover:border-opacity-100"
        >
            <input
                type="text"
                placeholder="Search the decentralized web..."
                className="flex-1 px-4 py-2 text-black border-none focus:outline-none rounded-l-md text-white bg-opacity-50 focus:bg-opacity-70 transition duration-300"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none transition duration-300"
            >
                Search
            </button>
        </form>
    );
}
