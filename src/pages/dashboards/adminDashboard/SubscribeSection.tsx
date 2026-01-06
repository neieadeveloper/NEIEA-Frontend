import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Search, 
  Edit, 
  Trash2, 
  Download, 
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Subscribe {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const SubscribeSection = () => {
  const [subscribes, setSubscribes] = useState<Subscribe[]>([]);
  const [filteredSubscribes, setFilteredSubscribes] = useState<Subscribe[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editingSubscribe, setEditingSubscribe] = useState<Subscribe | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const { toast } = useToast();

  const resetEditForm = () => {
    setEditingSubscribe(null);
    setEditFirstName('');
    setEditLastName('');
    setEditEmail('');
  };

  const handleEditDialogChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      resetEditForm();
    }
  };

  const fetchSubscribes = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      console.log('Fetching subscribes with page:', page, 'limit:', limit);
      
      // Check if token exists
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      const response = await axiosInstance.get(
        `/admin/subscribe?page=${page}&limit=${limit}`
      );
      console.log('Response received:', response.data);

      setSubscribes(response.data.data);
      setFilteredSubscribes(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching subscribes:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch subscribes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Test if the backend route is accessible
    const testRoute = async () => {
      try {
        const response = await axiosInstance.get('/admin/subscribe-test');
        console.log('Test route response:', response.data);
      } catch (error) {
        console.error('Test route error:', error);
      }
    };
    testRoute();
    
    fetchSubscribes();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSubscribes(subscribes);
    } else {
      const loweredTerm = searchTerm.toLowerCase();
      const filtered = subscribes.filter(subscribe =>
        subscribe.email.toLowerCase().includes(loweredTerm) ||
        (subscribe.firstName || '').toLowerCase().includes(loweredTerm) ||
        (subscribe.lastName || '').toLowerCase().includes(loweredTerm)
      );
      setFilteredSubscribes(filtered);
    }
  }, [searchTerm, subscribes]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleEdit = (subscribe: Subscribe) => {
    setEditingSubscribe(subscribe);
    setEditFirstName(subscribe.firstName ?? '');
    setEditLastName(subscribe.lastName ?? '');
    setEditEmail(subscribe.email);
    setIsEditDialogOpen(true);
  };

  const handleUpdateSubscribe = async () => {
    if (!editingSubscribe) return;

    if (!editFirstName.trim() || !editLastName.trim() || !editEmail.trim()) {
      toast({
        title: "Validation error",
        description: "First name, last name, and email are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axiosInstance.put(
        `/admin/subscribe/${editingSubscribe._id}`,
        {
          firstName: editFirstName.trim(),
          lastName: editLastName.trim(),
          email: editEmail.trim(),
        }
      );

      toast({
        title: "Success",
        description: "Subscribe email updated successfully",
      });

      handleEditDialogChange(false);
      fetchSubscribes(pagination.currentPage);
    } catch (error: any) {
      console.error('Error updating subscribe:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update subscribe",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await axiosInstance.delete(`/admin/subscribe/${deleteTarget}`);

      toast({
        title: "Success",
        description: "Subscribe email deleted successfully",
      });

      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
      fetchSubscribes(pagination.currentPage);
    } catch (error) {
      console.error('Error deleting subscribe:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscribe",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    try {
      const response = await axiosInstance.delete('/admin/subscribe/bulk', {
        data: { ids: selectedItems }
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      setSelectedItems([]);
      fetchSubscribes(pagination.currentPage);
    } catch (error) {
      console.error('Error deleting subscribes:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscribes",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedItems(filteredSubscribes.map(subscribe => subscribe._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handlePageChange = (page: number) => {
    fetchSubscribes(page, pagination.itemsPerPage);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['First Name', 'Last Name', 'Email', 'Subscribed Date'],
      ...filteredSubscribes.map(subscribe => [
        subscribe.firstName || '',
        subscribe.lastName || '',
        subscribe.email,
        new Date(subscribe.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribes-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Subscribe Email Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => fetchSubscribes(pagination.currentPage)}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={exportToCSV}
                disabled={filteredSubscribes.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              {selectedItems.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected ({selectedItems.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Selected Subscribes</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedItems.length} selected subscribe(s)? 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-ngo-color1">{pagination.totalItems}</div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredSubscribes.length && filteredSubscribes.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading subscribes...
                    </TableCell>
                  </TableRow>
                ) : filteredSubscribes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No subscribes found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribes.map((subscribe) => (
                    <TableRow key={subscribe._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(subscribe._id)}
                          onCheckedChange={(checked) => 
                            handleSelectItem(subscribe._id, checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subscribe.firstName || '-'}</TableCell>
                      <TableCell className="font-medium">{subscribe.lastName || '-'}</TableCell>
                      <TableCell className="font-medium">{subscribe.email}</TableCell>
                      <TableCell>
                        {new Date(subscribe.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(subscribe.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(subscribe)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(subscribe._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                {pagination.totalItems} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscriber Details</DialogTitle>
            <DialogDescription>
              Update the subscriber&apos;s personal details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleEditDialogChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSubscribe} disabled={!editFirstName.trim() || !editLastName.trim() || !editEmail.trim()}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscribe</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this subscribe email? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscribeSection;
