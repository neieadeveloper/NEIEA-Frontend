import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X, Search, Newspaper, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import axiosInstance from "@/lib/axiosInstance";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    isActive: true,
  });
  
  // Image upload states
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
  const [newsImagePreview, setNewsImagePreview] = useState("");
  const [isUploadingNewsImage, setIsUploadingNewsImage] = useState(false);


  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/news`);
      if (response.data.success) {
        setNews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news items");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (newsItem = null) => {
    if (newsItem) {
      setCurrentNews(newsItem);
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        image: newsItem.image || "",
        isActive: newsItem.isActive,
      });
      setNewsImagePreview(newsItem.image || "");
    } else {
      setCurrentNews(null);
      setFormData({
        title: "",
        content: "",
        image: "",
        isActive: true,
      });
      setNewsImagePreview("");
    }
    setNewsImageFile(null);
    setIsModalOpen(true);
  };

  const handleNewsImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewsImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsImageUpload = async () => {
    if (!newsImageFile) {
      toast.error("Please select an image");
      return;
    }

    setIsUploadingNewsImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", newsImageFile);

      const response = await axiosInstance.post(
        `/news/upload-image`,
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        setFormData({ ...formData, image: imageUrl });
        setNewsImagePreview(imageUrl);
        toast.success("News image uploaded successfully!");
        setNewsImageFile(null);
      }
    } catch (error: any) {
      console.error("Error uploading news image:", error);
      toast.error(error?.response?.data?.message || "Failed to upload news image");
    } finally {
      setIsUploadingNewsImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentNews) {
        // Update
        const response = await axiosInstance.put(`/news/${currentNews._id}`, formData);
        if (response.data.success) {
          toast.success("News item updated successfully");
          setNews(news.map((item) => (item._id === currentNews._id ? response.data.data : item)));
        }
      } else {
        // Create
        const response = await axiosInstance.post(`/news`, formData);
        if (response.data.success) {
          toast.success("News item created successfully");
          setNews([response.data.data, ...news]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving news:", error);
      toast.error(error.response?.data?.message || "Failed to save news item");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        const response = await axiosInstance.delete(`/news/${id}`);
        if (response.data.success) {
          toast.success("News item deleted successfully");
          setNews(news.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        toast.error("Failed to delete news item");
      }
    }
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-ngo-color1" />
            Manage News & Updates
          </h1>
          <p className="text-gray-500 mt-1">Create and manage news announcements</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-ngo-color1 hover:bg-ngo-color1/90">
          <Plus className="w-4 h-4 mr-2" />
          Add News
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="relative mb-6">
          <Input
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ngo-color1"></div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No news items found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredNews.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-6 p-4 border rounded-lg hover:border-ngo-color1/30 transition-colors bg-white group"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-32 h-32 md:h-24 object-cover rounded-md"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                    {!item.isActive && (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-1">{item.content}</p>
                  <span className="text-xs text-gray-400 mt-2 block">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenModal(item)}
                    className="text-gray-500 hover:text-ngo-color1"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item._id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentNews ? "Edit News" : "Add News"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="News headline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">News Image</Label>
              <div className="space-y-3">
                {newsImagePreview && (
                  <div className="relative w-full h-48 border rounded-md overflow-hidden">
                    <img
                      src={newsImagePreview}
                      alt="News preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleNewsImageFileChange}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleNewsImageUpload}
                    disabled={!newsImageFile || isUploadingNewsImage}
                    className="bg-ngo-color1 hover:bg-ngo-color1/90"
                  >
                    {isUploadingNewsImage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Select an image and click Upload. Accepted formats: JPG, PNG, WEBP (max 2MB)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="News details..."
                className="h-32"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active (Visible to public)</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-ngo-color1 hover:bg-ngo-color1/90">
                {currentNews ? "Update News" : "Create News"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsSection;
