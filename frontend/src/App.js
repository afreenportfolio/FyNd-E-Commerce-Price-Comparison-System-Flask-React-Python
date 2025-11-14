import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import "./App.css"; 
import ProductComparison from "./ProductComparison";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import RecentSearches from "./RecentSearches";
import About from "./About"; 
import HowItWorks from "./HowItWorks"; 
import Contact from "./Contact"; 
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "http://localhost:5000";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    return storedSearches ? JSON.parse(storedSearches) : [];
  });

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
  
    try {
      // Update recent searches (optimized version)
      setRecentSearches((prev) => 
        [query, ...prev.filter((item) => item !== query)].slice(0, 5)
      );
  
      const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
      
      // Handle HTTP errors (improved parsing)
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: await response.text() || `HTTP error ${response.status}` };
        }
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      // Handle API-level errors
      if (data.error) {
        throw new Error(data.error);
      }
  
      // Validate response structure
      if (!data.platforms || !Array.isArray(data.platforms)) {
        throw new Error("Server returned invalid data format");
      }
  
      // Transform data with fallbacks (safer than direct assignment)
      const transformedData = {
        productName: data.productName || query,
        productImage: data.productImage || "https://via.placeholder.com/250x250?text=No+Image",
        platforms: data.platforms.map((platform) => ({
          name: platform.name || "Unknown Platform",
          logo: platform.logo || "https://via.placeholder.com/100x40?text=Logo",
          price: platform.price ?? "N/A", // Using nullish coalescing
          delivery: platform.delivery || "N/A",
          rating: Number(platform.rating) || 0,
          reviews: {
            positive: platform.reviews?.positive || 0,
            neutral: platform.reviews?.neutral || 0,
            negative: platform.reviews?.negative || 0,
            summary: platform.reviews?.summary || "No reviews available",
          },
          overallScore: Number(platform.overallScore) || 0,
          url: platform.url || "#",
        })),
      };
  
      setProductData(transformedData);
    } catch (err) {
      // Unified error handling with user-friendly messages
      const errorMessage = 
        err.message.includes("Failed to fetch") ? "Network error - please check your connection" :
        err.message.includes("invalid") ? "Invalid data received from server" :
        err.message || "Failed to fetch product data";
      
      setError(errorMessage);
      setProductData(null);
      
      // Log technical details for debugging
      console.error("Search error:", err.message, err.stack);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setProductData(null);
  };

  const clearRecentSearch = (index) => {
    if (index === "all") {
      setRecentSearches([]);
    } else {
      setRecentSearches(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSelectRecentSearch = (query) => {
    handleSearch(query);
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">FyNd</h1>
        <div className="space-x-4">
          <button className={`nav-button ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>Home</button>
          <button className={`nav-button ${location.pathname === "/how-it-works" ? "active" : ""}`} onClick={() => navigate("/how-it-works")}>How It Works</button>
          <button className={`nav-button ${location.pathname === "/about" ? "active" : ""}`} onClick={() => navigate("/about")}>About</button>
          <button className={`nav-button ${location.pathname === "/contact" ? "active" : ""}`} onClick={() => navigate("/contact")}>Contact</button>
        </div>
      </nav>

      <main className="flex-grow container mx-auto mt-5 px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <ShoppingBag className="inline mr-5" />
            Fynd Your Product
          </h1>
          <p className="text-gray-600">Find the best deals across major e-commerce platforms</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={handleSearch} clearSearch={clearSearch} searchQuery={searchQuery} />
          <RecentSearches
            searches={recentSearches}
            onSelectSearch={handleSelectRecentSearch}
            onClearSearch={clearRecentSearch}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          {isLoading && <Loading />}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          {productData && !isLoading && <ProductComparison productData={productData} />}
          {!searchQuery && !productData && !isLoading && <EmptyState />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function AppWithRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

export default App;
