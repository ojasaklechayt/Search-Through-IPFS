// pages/index.js
'use client';
// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ResultCard from '@/components/ResultCard';
import AddDataModal from '@/components/AddDataModel';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddData = async (jsonData) => {
    try {
      // Implement logic to send jsonData to the backend (e.g., using a POST request)
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: jsonData }),
      });

      if (response.ok) {
        // Data added successfully, you can handle this as needed (e.g., show a message)
        console.log('Data added successfully');
      } else {
        // Handle errors (e.g., show an error message)
        console.error('Error adding data:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Decentralized Search Engine</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-blue-900">
        <main className="my-20 mx-auto max-w-4xl p-6 bg-black bg-opacity-70 rounded-lg shadow-md text-white">
          <h1 className="text-3xl font-bold mb-8">Decentralized Search Engine</h1>
          <SearchBar onSubmit={handleSearch} />
          {searchResults.length > 0 && (
            <ul className="mt-8 grid gap-x-4 gap-y-8">
              {searchResults.map((result) => (
                <ResultCard key={result.cid} content={result.content} />
              ))}
            </ul>
          )}
          {searchResults.length === 0 && (
            <p className="mt-8 text-gray-600">No results found. Try a different search query.</p>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
            onClick={() => setIsAddDataModalOpen(true)}
          >
            Add Data
          </button>
        </main>
      </div>
      {isAddDataModalOpen && (
        <AddDataModal
          onClose={() => setIsAddDataModalOpen(false)}
          onAddData={handleAddData}
        />
      )}
    </>
  );
}
