import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import PageTemplate from '../components/PageTemplate';
import goHome from "@/lib/goHome";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    image?: string;
    date: string;
    isActive: boolean;
}

const NewsDetailsDynamic = () => {
    const { id } = useParams<{ id: string }>();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (!id) return;

            try {
                setLoading(true);
                // First try getting specific news item
                // If that fails or if the API structure is different, fallback to fetching all news
                try {
                    const response = await axiosInstance.get(`/news/${id}`);
                    if (response.data.success) {
                        setNewsItem(response.data.data);
                        return; // Successfully found
                    }
                } catch (specificError) {
                    // If fetching specific ID fails, try fetching all and filtering
                    console.log("Fetching specific news failed, trying to fetch all and filter...");
                    const response = await axiosInstance.get(`/news?active=true`);
                    if (response.data.success && Array.isArray(response.data.data)) {
                        const found = response.data.data.find((n: NewsItem) => n._id === id);
                        if (found) {
                            setNewsItem(found);
                        } else {
                            setError("News item not found");
                        }
                    } else {
                        setError("News item not found");
                    }
                }
            } catch (err) {
                console.error("Error fetching news item:", err);
                setError("Failed to load news details");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (loading) {
        return (
            <PageTemplate
                breadcrumbPath={[{ name: 'About' }, { name: 'News' }, { name: 'Details' }]}
                title="News Details"
                subtitle="Loading..."
                showHeroSection={false}
            >
                <div className="container py-12 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </PageTemplate>
        );
    }

    if (error || !newsItem) {
        return (
            <PageTemplate
                breadcrumbPath={[{ name: 'About' }, { name: 'News' }, { name: 'Error' }]}
                title="Error"
                subtitle="News item not found"
                showHeroSection={false}
            >
                <div className="container py-12 text-center">
                    <div className="alert alert-danger max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
                        <p className="mb-4">{error || "The requested news item could not be found."}</p>
                        <Link to="/news" className="btn btn-primary">
                            Back to News
                        </Link>
                    </div>
                </div>
            </PageTemplate>
        );
    }

    return (
        <div className="news-details-page">
            {/* Custom styles for this page - matching Bio page */}
            <style>
                {`
          .news-details::-webkit-scrollbar {
            width: 8px !important;
          }
          .news-details::-webkit-scrollbar-track {
            background: #f1f1f1 !important;
            border-radius: 10px !important;
          }
          .news-details::-webkit-scrollbar-thumb {
            background: #888 !important;
            border-radius: 10px !important;
          }
          .news-details {
            scrollbar-width: thin !important;
            scrollbar-color: #888 #f1f1f1 !important;
          }
          
          /* Responsive adjustments */
          .news-section {
             min-height: 500px;
          }
          .news-image-container {
             height: 400px;
             width: 100%;
          }
          .news-content-container {
             height: 400px;
             overflow-y: auto;
             padding-left: 30px;
             padding-right: 15px;
          }
          
          @media (max-width: 991px) {
            .news-section {
               min-height: auto;
               padding-bottom: 20px;
            }
            .news-image-container {
               height: auto;
               aspect-ratio: 1/1;
               margin-bottom: 20px;
               max-width: 300px;
               margin-left: auto;
               margin-right: auto;
            }
            .news-content-container {
               height: auto;
               overflow-y: visible;
               padding-left: 0 !important;
               padding-right: 0 !important;
            }
            .news-title {
               font-size: 28px !important;
               text-align: center;
            }
            .news-date {
               font-size: 16px !important;
               text-align: center;
               margin-bottom: 20px !important;
               justify-content: center;
            }
            .news-text p {
               text-align: left !important;
            }
          }
        `}
            </style>

            {/* Breadcrumb Section matching Bio page style */}
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
                                <Link to="/news" style={{ color: "#6c757d", textDecoration: "none" }}>
                                    News
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#495057" }}>
                                {newsItem.title.substring(0, 30)}{newsItem.title.length > 30 ? '...' : ''}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section style={{ backgroundColor: "#ffffff", padding: "40px 0" }}>
                <div className="container">
                    <div className="row align-items-start news-section">
                        {/* Left Side: Image */}
                        <div className="col-lg-4 mb-4">
                            <div
                                className="news-image news-image-container"
                                style={{
                                    background: "#f8f9fa",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                    border: "1px solid #dee2e6"
                                }}
                            >
                                {newsItem.image ? (
                                    <img
                                        src={newsItem.image}
                                        alt={newsItem.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain", // Show full flyer
                                            backgroundColor: "#f0f0f0"
                                        }}
                                    />
                                ) : (
                                    <div className="text-gray-400">No Image</div>
                                )}
                            </div>
                        </div>

                        {/* Right Side: Content */}
                        <div className="col-lg-8">
                            <div className="news-details news-content-container">
                                <div>
                                    <h1
                                        className="news-title"
                                        style={{
                                            fontSize: "32px",
                                            fontWeight: "700",
                                            color: "#212529",
                                            marginBottom: "12px",
                                            lineHeight: "1.2",
                                            fontFamily: "Roboto, sans-serif"
                                        }}
                                    >
                                        {newsItem.title}
                                    </h1>

                                    <div
                                        className="news-date"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            fontSize: "16px",
                                            color: "#6c757d",
                                            marginBottom: "25px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {format(new Date(newsItem.date), "MMMM d, yyyy")}
                                    </div>

                                    <div className="news-text">
                                        <div
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                letterSpacing: "-0.01em",
                                                color: "#333333",
                                                textAlign: "justify",
                                                whiteSpace: "pre-line",
                                                fontFamily: "Roboto, sans-serif"
                                            }}
                                        >
                                            {newsItem.content.split('\n').map((paragraph, idx) => (
                                                paragraph.trim() && (
                                                    <p key={idx} style={{ marginBottom: "18px" }}>
                                                        {paragraph}
                                                    </p>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsDetailsDynamic;
