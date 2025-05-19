import { useState, useEffect } from 'react';
import { Search, Calendar, RefreshCw, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const mockData = {
  status: "ok",
  totalResults: 2,
  articles: [
    {
      source: { id: null, name: "TechCrunch" },
      author: "John Doe",
      title: "Apple releases new iPhone model",
      description: "Apple has announced the release of its latest iPhone model with exciting new features.",
      url: "https://techcrunch.com/apple-new-iphone",
      urlToImage: "https://techcrunch.com/images/apple-iphone.jpg",
      publishedAt: "2025-05-17T10:00:00Z",
      content: "Apple has officially released its new iPhone model, featuring improved cameras and battery life..."
    },
    {
      source: { id: null, name: "The Verge" },
      author: "Jane Smith",
      title: "Apple stock hits all-time high",
      description: "Apple's stock price reached an all-time high today amid strong sales reports.",
      url: "https://theverge.com/apple-stock-high",
      urlToImage: "https://theverge.com/images/apple-stock.jpg",
      publishedAt: "2025-05-17T12:30:00Z",
      content: "Apple's stock price surged to a new record high following the announcement of quarterly earnings..."
    }
  ]
};

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('apple');
  const [fromDate, setFromDate] = useState(formatDate(new Date()));
  const [toDate, setToDate] = useState(formatDate(new Date()));
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error('Please login to access this page');
    } else {

      fetchNews();
    }
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://newsdata.io/api/1/archive', {
        params: {
          apikey: 'pub_8783824344394e30b4a4fa6e5ae9afea31fe0',
          q: searchTerm || 'Indore',
          language: 'en',
          from_date: fromDate,  // format: YYYY-MM-DD
          to_date: toDate       // format: YYYY-MM-DD
        }
      });

      if (response.data.code === 'AccessDenied' && response.data.message) {
        setError(`Access Denied: ${response.data.message} Please upgrade your plan.`);
        setArticles([]);
      } else {
        setArticles(response.data.results || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error.message);
      setError('Failed to fetch news.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  function formatPublishedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // Function to truncate text to a specific length
  function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Apple News Dashboard</h1>
        <p className="text-gray-600">Latest news and updates about Apple Inc.</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Search topics (default: apple)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">From:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border rounded-lg"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">To:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border rounded-lg"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Update</span>
          </button>
        </form>
      </div>

      {/* News Content */}
      <div className="mb-8">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Found {articles.length} articles for "{searchTerm}"
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="h-48 bg-gray-200">
                    {article.urlToImage ? (
                      <img
                        src="/api/placeholder/400/320"
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {article.source.name}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {formatPublishedDate(article.publishedAt)}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.description || truncateText(article.content, 120)}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {article.author ? `By ${article.author}` : 'Unknown author'}
                      </span>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Read more
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Data powered by NewsAPI • Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
