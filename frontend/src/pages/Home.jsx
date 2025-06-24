import { useState } from 'react';
import { useForm } from 'react-hook-form';
import RecentURI from "../components/RecentURI.jsx";
import axios from '../api/axios.config.js';

const Home = () => {
  const [urls, setUrls] = useState([]);
  const [latestShortUrl, setLatestShortUrl] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const { register, handleSubmit, watch, reset } = useForm();
  const longUrl = watch('longUrl', '');

  const createNewURI = async (long_url) => {
    const {id} = await axios.post('/api/create', long_url);
    console.log(id)
  }

  const SubmitHandler = (data) => {
    // console.log(data.longUrl)
    const newShortUri = createNewURI(data.longUrl); 
    const newShortUrl = {
      id: Date.now().toString(),
      longUrl: data.longUrl,
      shortUrl: `https://sho.rt/${Math.random().toString(36).substring(2, 8)}`,
      clicks: 0,
    };
    setLatestShortUrl(newShortUrl);
    setUrls((prev) => [newShortUrl, ...prev].slice(0, 10)); 
    reset();
  };

  // Handler for copying short URL
  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900">
      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight flex items-center justify-center gap-2 text-blue-700">
          <i className="ri-link-m" /> URL Shortener
        </h1>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit(SubmitHandler)} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400 border border-blue-100">
            <i className="ri-external-link-line text-xl text-blue-400" />
            <input
              {...register('longUrl', { required: true })}
              type="url"
              placeholder="Paste your long URL here..."
              className="flex-1 bg-transparent outline-none text-lg placeholder-gray-400"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!longUrl}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200 shadow-md
              ${longUrl ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-200 text-blue-400 cursor-not-allowed'}`}
          >
            <i className="ri-scissors-2-line text-xl" /> Get Short URL
          </button>
        </form>

        {/* Show Short URL only if one has been generated */}
        {latestShortUrl && (
          <div>
            <div className="flex gap-1.5 items-center">
              <i className="ri-links-line text-xl font-medium"></i>
              <h1 className="text-xl font-semibold tracking-tight">Here's your ShortURL</h1>
            </div>
            {/* Short URL */}
            <div className="flex justify-between items-center gap-2 bg-blue-50 rounded-lg px-4 py-3 mt-3 border border-blue-100">
              <a
                href={latestShortUrl.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-800 hover:text-blue-600 transition-colors">
                <i className="ri-external-link-fill"></i>
                <p className='hover:underline'>{latestShortUrl.shortUrl}</p>
              </a>
              <button
                onClick={() => handleCopy(latestShortUrl.shortUrl, latestShortUrl.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-150 border border-blue-400
                  ${copiedId === latestShortUrl.id ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
              >
                <i className={copiedId === latestShortUrl.id ? 'ri-check-line' : 'ri-file-copy-line'} />
                {copiedId === latestShortUrl.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {/* Last Created URLs */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-700">
            <i className="ri-history-line" /> Last Created URLs
          </h2>
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
            <RecentURI urls={urls.slice(0, 2)} copiedId={copiedId} handleCopy={handleCopy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;