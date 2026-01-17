import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import goHome from "@/lib/goHome";
import { Link, useNavigate } from "react-router-dom";

// Define interface for News item
interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
  isActive: boolean;
}

const NewsDynamic = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Use the API URL from environment variables
  // @ts-ignore

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Only fetch active news items for public view
        const response = await axiosInstance.get(`/news?active=true`);
        if (response.data.success) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [axiosInstance.baseURL]);

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ backgroundColor: "transparent" }}>
              <li className="breadcrumb-item">
                <Link to="/" onClick={goHome} style={{ color: "#6c757d", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span style={{ color: "#6c757d" }}>About</span>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: "#495057" }}>
                News
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 pt-0 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-ngo-color1 mb-4">
              Latest News & Updates
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest activities, initiatives, and impact stories.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl overflow-hidden shadow-sm h-96 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <article
                  key={item._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gray-100 cursor-pointer"
                  onClick={() => handleNewsClick(item._id)}
                >
                  {item.image && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(item.date), "MMMM d, yyyy")}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-ngo-color1 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.content}
                    </p>

                    <div className="mt-auto pt-2">
                      <span className="text-ngo-color1 font-medium hover:underline flex items-center text-sm">
                        Read more
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No news updates available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsDynamic;
