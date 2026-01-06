import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  MessageSquare, 
  Search, 
  Edit, 
  Trash2, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Mail
} from 'lucide-react';

interface ContactInquiry {
  _id: string;
  name: string;
  email: string;
  affiliation: string;
  inquiryType: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface Stats {
  total: number;
  byStatus: {
    new: number;
    read: number;
    replied: number;
    closed: number;
  };
  byInquiryType: Array<{
    _id: string;
    count: number;
  }>;
}

const ContactInquiriesSection = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState('');
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    byStatus: { new: 0, read: 0, replied: 0, closed: 0 },
    byInquiryType: []
  });
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const { toast } = useToast();

  const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
    { value: 'read', label: 'Read', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'replied', label: 'Replied', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
  ];

  const inquiryTypes = ['Press', 'Donation', 'Partnership', 'Membership', 'Feedback', 'Other'];

  const fetchInquiries = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      if (statusFilter) params.append('status', statusFilter);
      if (inquiryTypeFilter) params.append('inquiryType', inquiryTypeFilter);

      const response = await axiosInstance.get(
        `/admin/contact-inquiries?${params.toString()}`
      );

      console.log('Inquiries API response:', response.data);
      console.log('First inquiry sample:', response.data.data[0]);
      setInquiries(response.data.data);
      setFilteredInquiries(response.data.data);
      setPagination(response.data.pagination);
      
      // Refresh stats after fetching inquiries to ensure they're in sync
      await fetchStats();
    } catch (error) {
      console.error('Error fetching contact inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/admin/contact-inquiries/stats');
      console.log('Stats API response:', response.data.data);
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredInquiries(inquiries);
    } else {
      const filtered = inquiries.filter(inquiry =>
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.inquiryType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(filtered);
    }
  }, [searchTerm, inquiries]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    fetchInquiries(1, pagination.itemsPerPage);
  };

  const handleInquiryTypeFilter = (value: string) => {
    setInquiryTypeFilter(value);
    fetchInquiries(1, pagination.itemsPerPage);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInquiries(filteredInquiries.map(inquiry => inquiry._id));
    } else {
      setSelectedInquiries([]);
    }
  };

  const handleSelectInquiry = (inquiryId: string, checked: boolean) => {
    if (checked) {
      setSelectedInquiries([...selectedInquiries, inquiryId]);
    } else {
      setSelectedInquiries(selectedInquiries.filter(id => id !== inquiryId));
    }
  };

  const handleViewInquiry = (inquiry: ContactInquiry) => {
    console.log('Viewing inquiry:', inquiry);
    console.log('Inquiry notes:', inquiry.notes);
    setSelectedInquiry(inquiry);
    setIsViewDialogOpen(true);
  };

  const handleEditInquiry = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setEditStatus(inquiry.status);
    setEditNotes(inquiry.notes || '');
    setIsEditDialogOpen(true);
  };

  const handleUpdateInquiry = async () => {
    if (!selectedInquiry) return;

    try {
      await axiosInstance.put(`/admin/contact-inquiries/${selectedInquiry._id}`, {
        status: editStatus,
        notes: editNotes
      });

      toast({
        title: "Success",
        description: "Inquiry updated successfully",
      });

      setIsEditDialogOpen(false);
      fetchInquiries(pagination.currentPage, pagination.itemsPerPage);
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to update inquiry",
        variant: "destructive",
      });
    }
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    try {
      await axiosInstance.delete(`/admin/contact-inquiries/${inquiryId}`);
      
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      });

      fetchInquiries(pagination.currentPage, pagination.itemsPerPage);
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedInquiries.length === 0) return;

    try {
      await axiosInstance.delete('/admin/contact-inquiries/bulk', {
        data: { ids: selectedInquiries }
      });

      toast({
        title: "Success",
        description: `${selectedInquiries.length} inquiries deleted successfully`,
      });

      setSelectedInquiries([]);
      fetchInquiries(pagination.currentPage, pagination.itemsPerPage);
    } catch (error) {
      console.error('Error deleting inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to delete inquiries",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return (
      <Badge className={statusOption?.color || 'bg-gray-100 text-gray-800'}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contact Inquiries Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Inquiries</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">{stats.byStatus.new}</div>
                <div className="text-sm text-gray-600">New</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{stats.byStatus.replied}</div>
                <div className="text-sm text-gray-600">Replied</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-600">{stats.byStatus.closed}</div>
                <div className="text-sm text-gray-600">Closed</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or inquiry type..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
            </div>
            {/* <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={inquiryTypeFilter} onValueChange={handleInquiryTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {inquiryTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => fetchInquiries(pagination.currentPage, pagination.itemsPerPage)}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {selectedInquiries.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected ({selectedInquiries.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Inquiries</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedInquiries.length} selected inquiries? This action cannot be undone.
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

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedInquiries.length === filteredInquiries.length && filteredInquiries.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead>Inquiry Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading inquiries...
                    </TableCell>
                  </TableRow>
                ) : filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No inquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedInquiries.includes(inquiry._id)}
                          onCheckedChange={(checked) => handleSelectInquiry(inquiry._id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell>{inquiry.affiliation || '-'}</TableCell>
                      <TableCell>{inquiry.inquiryType}</TableCell>
                      <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                      <TableCell>
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditInquiry(inquiry)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this inquiry? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteInquiry(inquiry._id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                {pagination.totalItems} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchInquiries(pagination.currentPage - 1, pagination.itemsPerPage)}
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
                  onClick={() => fetchInquiries(pagination.currentPage + 1, pagination.itemsPerPage)}
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

      {/* View Inquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-gray-600">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-gray-600">{selectedInquiry.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Affiliation</Label>
                  <p className="text-sm text-gray-600">{selectedInquiry.affiliation || 'Not provided'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Inquiry Type</Label>
                  <p className="text-sm text-gray-600">{selectedInquiry.inquiryType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedInquiry.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Message</Label>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Admin Notes</Label>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                  {selectedInquiry.notes || 'No admin notes added yet.'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Debug: notes value = "{selectedInquiry.notes}" (type: {typeof selectedInquiry.notes})
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              handleEditInquiry(selectedInquiry!);
            }}>
              Edit Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Inquiry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Inquiry Status</DialogTitle>
            <DialogDescription>
              Update the status and add notes for this inquiry.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Admin Notes</Label>
              <textarea
                id="notes"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Add internal notes about this inquiry..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateInquiry}>
              Update Inquiry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactInquiriesSection;
