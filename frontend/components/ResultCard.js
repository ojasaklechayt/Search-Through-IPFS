// components/ResultCard.js
export default function ResultCard({ content, cid }) {
    // Extract title and snippet from content
    const title = content.title || 'Untitled';
    const snippet = content.snippet || 'No preview available.';

    return (
        <li className="rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
            <a
                href={`ipfs://${cid}`}
                target="_blank"
                rel="noreferrer"
                className="block hover:bg-gray-50 transition duration-300"
            >
                <div className="px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <p className="mt-2 text-gray-600">{snippet}</p>
                </div>
            </a>
        </li>
    );
}
