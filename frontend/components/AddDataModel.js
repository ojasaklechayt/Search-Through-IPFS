'use client'
import { useState } from 'react';

export default function AddDataModal({ onClose, onAddData }) {
    const [inputData, setInputData] = useState('');

    const handleAddData = async () => {
        // Convert inputData to JSON if needed
        let jsonData;
        try {
            jsonData = JSON.parse(inputData);
        } catch (error) {
            console.error('Error parsing input data to JSON:', error);
            // Handle the error (e.g., show a message to the user)
            return;
        }

        try {
            // Make a POST request to add data
            const response = await fetch('http://localhost:5000/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: jsonData }),
            });

            if (!response.ok) {
                throw new Error(`Error adding data: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result); // Handle the result as needed

            // Call the onAddData prop with the parsed JSON data
            onAddData(jsonData);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error adding data:', error);
            // Handle the error (e.g., show a message to the user)
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center text-black justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add Data</h2>
                <textarea
                    className="w-full h-32 p-2 border border-gray-300 rounded"
                    placeholder="Enter data in JSON format"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                        onClick={handleAddData}
                    >
                        Add Data
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
