import React from "react";
import axios from "../api/axios.config.js";

// Renders a single URL row
function RecentUrlRow({ url, copiedId, handleCopy }) {
  return (
    <div
      key={url.id}
      className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-blue-50 rounded-lg px-4 py-3 border border-blue-100 shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <div className="truncate font-medium text-base text-blue-700 flex items-center gap-1">
          <i className="ri-link" />
          <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{url.shortUrl}</a>
        </div>
        <div className="truncate text-xs text-gray-500">{url.longUrl}</div>
      </div>
      <div className="flex items-center gap-3 mt-1 md:mt-0">
        {typeof url.clicks !== 'undefined' && (
          <span className="flex items-center gap-1 text-sm text-blue-600">
            <i className="ri-bar-chart-2-line" /> {url.clicks}
          </span>
        )}
        <button
          onClick={() => handleCopy(url.shortUrl, url.id)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-150 border border-blue-400
            ${copiedId === url.id ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
        >
          <i className={copiedId === url.id ? 'ri-check-line' : 'ri-file-copy-line'} />
          {copiedId === url.id ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

const RecentURI = ({ urls, copiedId, handleCopy }) => {
  if (!urls || urls.length === 0) {
    return <div className="text-center text-gray-400">No URLs created yet.</div>;
  }

  return (
    <>
      {urls.map((url) => (
        <RecentUrlRow key={url.id} url={url} copiedId={copiedId} handleCopy={handleCopy} />
      ))}
    </>
  );
};

export default RecentURI;