'use client'
// app/[query]/page.js

import Head from 'next/head';
import { useState, useEffect } from 'react';
import ResultCard from '@/components/ResultCard';

const SearchResultsPage = ({ params }) => {
    const [searchResults, setSearchResults] = useState([]);
    const decodedQuery = decodeURIComponent(params.query);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch(`http://localhost:5000/api/search?q=${params.query}`);
                const data = await results.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        };

        fetchData();
    }, [params.query]);

    return (
        <>
            <Head>
                <title>Search results for "{decodedQuery}"</title>
                <meta name="description" content={`Search results for "${decodedQuery}" on the decentralized web`} />
            </Head>
            <main className="my-20 mx-auto max-w-4xl p-6 bg-gradient-to-b from-purple-900 to-blue-900 text-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-8">Search results for "{decodedQuery}"</h1>

                {searchResults && searchResults.length > 0 ? (
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {searchResults.map((result) => (
                            <ResultCard key={result.cid} content={result.content} />
                        ))}
                    </ul>
                ) : (
                    <p className="mt-8 text-gray-300">No results found. Try a different search query.</p>
                )}
            </main>
        </>
    );
};

export default SearchResultsPage;
