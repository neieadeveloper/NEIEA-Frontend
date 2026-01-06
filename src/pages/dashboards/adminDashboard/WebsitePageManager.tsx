import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

// Navigation structure for website pages
const websitePages = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    description: 'Main landing page with hero, vision, mission, leadership, etc.'
  },
  {
    id: 'about',
    name: 'About Us',
    path: '/about',
    description: 'About NEIEA page with organization information'
  },
  {
    id: 'adult-education',
    name: 'Adult Education',
    path: '/adult-education',
    description: 'Adult education programs and information'
  },
  {
    id: 'partners-join',
    name: 'Partners Join',
    path: '/partners-join',
    description: 'Partnership opportunities and collaboration information'
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    path: '/testimonials',
    description: 'Customer testimonials and reviews'
  },
  {
    id: 'contact',
    name: 'Contact',
    path: '/contact',
    description: 'Contact information and form'
  },
  {
    id: 'privacy',
    name: 'Privacy Policy',
    path: '/privacy',
    description: 'Privacy policy and terms'
  },
  {
    id: 'terms',
    name: 'Terms of Service',
    path: '/terms',
    description: 'Terms of service and conditions'
  }
];

// Interface for page content
interface PageContent {
  _id?: string;
  pageId: string;
  title: string;
  subtitle?: string;
  description?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  lastUpdated?: Date;
}

// Interface for navigation items
interface NavigationItem {
  _id?: string;
  label: string;
  path: string;
  order: number;
  isActive: boolean;
  parentId?: string;
  children?: NavigationItem[];
}

const WebsitePageManager = () => {
  const [activeTab, setActiveTab] = useState("navigation");
  const [loading, setLoading] = useState(false);
  
  // Navigation state
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [newNavItem, setNewNavItem] = useState<Omit<NavigationItem, '_id'>>({
    label: '',
    path: '',
    order: 0,
    isActive: true
  });

  // Page content state
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [newPageContent, setNewPageContent] = useState<Omit<PageContent, '_id'>>({
    pageId: '',
    title: '',
    subtitle: '',
    description: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    isActive: true
  });

  // Load all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadNavigationItems(),
        loadPageContents()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Navigation Management Functions
  const loadNavigationItems = async () => {
    try {
      const response = await axiosInstance.get('/admin/website/navigation');
      if (response.data.success) {
        setNavigationItems(response.data.data);
      }
    } catch (error) {
      console.error('Error loading navigation:', error);
    }
  };

  const addNavigationItem = async () => {
    if (!newNavItem.label || !newNavItem.path) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/website/navigation', newNavItem);
      if (response.data.success) {
        toast.success("Navigation item added successfully!");
        setNewNavItem({ label: '', path: '', order: 0, isActive: true });
        loadNavigationItems();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add navigation item.");
    } finally {
      setLoading(false);
    }
  };

  const updateNavigationItem = async (id: string, updates: Partial<NavigationItem>) => {
    try {
      const response = await axiosInstance.put(`/admin/website/navigation/${id}`, updates);
      if (response.data.success) {
        toast.success("Navigation item updated successfully!");
        loadNavigationItems();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update navigation item.");
    }
  };

  const deleteNavigationItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this navigation item?")) return;
    
    try {
      const response = await axiosInstance.delete(`/admin/website/navigation/${id}`);
      if (response.data.success) {
        toast.success("Navigation item deleted successfully!");
        loadNavigationItems();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete navigation item.");
    }
  };

  // Page Content Management Functions
  const loadPageContents = async () => {
    try {
      const response = await axiosInstance.get('/admin/website/pages');
      if (response.data.success) {
        setPageContents(response.data.data);
      }
    } catch (error) {
      console.error('Error loading page contents:', error);
    }
  };

  const savePageContent = async () => {
    if (!newPageContent.pageId || !newPageContent.title || !newPageContent.content) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosInstance.post('/admin/website/pages', newPageContent);
      if (response.data.success) {
        toast.success("Page content saved successfully!");
        setNewPageContent({
          pageId: '',
          title: '',
          subtitle: '',
          description: '',
          content: '',
          metaTitle: '',
          metaDescription: '',
          isActive: true
        });
        loadPageContents();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save page content.");
    } finally {
      setLoading(false);
    }
  };

  const updatePageContent = async () => {
    if (!editingPage || !editingPage.pageId || !editingPage.title || !editingPage.content) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/admin/website/pages/${editingPage._id}`, editingPage);
      if (response.data.success) {
        toast.success("Page content updated successfully!");
        setEditingPage(null);
        loadPageContents();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update page content.");
    } finally {
      setLoading(false);
    }
  };

  const deletePageContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page content?")) return;
    
    try {
      const response = await axiosInstance.delete(`/admin/website/pages/${id}`);
      if (response.data.success) {
        toast.success("Page content deleted successfully!");
        loadPageContents();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete page content.");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Website Page Manager</h1>
        <p className="text-gray-600 mt-2">Manage navigation and content for all website pages</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="navigation">Navigation Management</TabsTrigger>
          <TabsTrigger value="pages">Page Content Management</TabsTrigger>
        </TabsList>

        {/* Navigation Management Tab */}
        <TabsContent value="navigation">
          <Card>
            <CardHeader>
              <CardTitle>Website Navigation Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Navigation Item */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add Navigation Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Label *</label>
                    <input
                      type="text"
                      value={newNavItem.label}
                      onChange={(e) => setNewNavItem(prev => ({ ...prev, label: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter navigation label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Path *</label>
                    <input
                      type="text"
                      value={newNavItem.path}
                      onChange={(e) => setNewNavItem(prev => ({ ...prev, path: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter path (e.g., /about)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={newNavItem.order}
                      onChange={(e) => setNewNavItem(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Display order"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={addNavigationItem}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Adding..." : "Add Navigation Item"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Current Navigation Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Navigation Items ({navigationItems.length})</h3>
                {navigationItems.length > 0 ? (
                  <div className="space-y-2">
                    {navigationItems
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                      <div key={item._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.path}</div>
                            <div className="text-xs text-gray-500">Order: {item.order}</div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateNavigationItem(item._id!, { isActive: !item.isActive })}
                              className={`px-3 py-1 text-xs rounded ${
                                item.isActive 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {item.isActive ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              onClick={() => deleteNavigationItem(item._id!)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No navigation items added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page Content Management Tab */}
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page Content Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add/Edit Page Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {editingPage ? 'Edit Page Content' : 'Add New Page Content'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Page *</label>
                    <select
                      value={editingPage?.pageId || newPageContent.pageId}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, pageId: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, pageId: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a page</option>
                      {websitePages.map((page) => (
                        <option key={page.id} value={page.id}>{page.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={editingPage?.title || newPageContent.title}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, title: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, title: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter page title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingPage?.subtitle || newPageContent.subtitle}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, subtitle: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, subtitle: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter page subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={editingPage?.metaTitle || newPageContent.metaTitle}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, metaTitle: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, metaTitle: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter meta title for SEO"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={editingPage?.description || newPageContent.description}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, description: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, description: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                      placeholder="Enter page description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Meta Description</label>
                    <textarea
                      value={editingPage?.metaDescription || newPageContent.metaDescription}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, metaDescription: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, metaDescription: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                      placeholder="Enter meta description for SEO"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <textarea
                      value={editingPage?.content || newPageContent.content}
                      onChange={(e) => {
                        if (editingPage) {
                          setEditingPage(prev => prev ? { ...prev, content: e.target.value } : null);
                        } else {
                          setNewPageContent(prev => ({ ...prev, content: e.target.value }));
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="Enter page content (HTML supported)"
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    {editingPage ? (
                      <>
                        <Button
                          onClick={updatePageContent}
                          disabled={loading}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          {loading ? "Updating..." : "Update Page Content"}
                        </Button>
                        <Button
                          onClick={() => setEditingPage(null)}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={savePageContent}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {loading ? "Saving..." : "Save Page Content"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Current Page Contents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Page Contents ({pageContents.length})</h3>
                {pageContents.length > 0 ? (
                  <div className="space-y-4">
                    {pageContents.map((page) => (
                      <div key={page._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{page.title}</div>
                            <div className="text-sm text-gray-600">
                              Page: {websitePages.find(p => p.id === page.pageId)?.name || page.pageId}
                            </div>
                            {page.subtitle && (
                              <div className="text-sm text-gray-500">{page.subtitle}</div>
                            )}
                            <div className="text-xs text-gray-500 mt-2">
                              Status: {page.isActive ? 'Active' : 'Inactive'} | 
                              Last Updated: {page.lastUpdated ? new Date(page.lastUpdated).toLocaleDateString() : 'Never'}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingPage(page)}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePageContent(page._id!)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">
                          {page.content.length > 200 
                            ? `${page.content.substring(0, 200)}...` 
                            : page.content
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No page contents added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsitePageManager;
