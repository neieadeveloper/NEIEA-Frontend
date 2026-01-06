import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  Users, 
  Search, 
  Trash2, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface Volunteer {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  emergencyPhone?: string;
  email: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
  languageProficiency: {
    english: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    hindi: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    urdu: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    bengali: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    telugu: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    kannada: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    marathi: { speaking: boolean; writing: boolean; reading: boolean; none: boolean };
    otherLanguage?: string;
  };
  dailyCommitment: string;
  availability: string[];
  volunteerField: string;
  socialMedia?: {
    facebook: string;
    linkedIn: string;
    instagram: string;
    twitter: string;
    youTube: string;
  };
  contentCreation?: {
    hasExperience: boolean;
    createdBefore: string[];
    toolsUsed: string[];
  };
  outreach?: {
    hasOutreachExperience: boolean;
    outreachActivities: string[];
  };
  fundraising?: {
    hasFundraisingExperience: boolean;
    fundraisingTypes: string[];
  };
  teachingExperience?: string;
  onlineTeachingYears?: string;
  ageGroups?: string[];
  confidentSubjects?: string[];
  relevantExperience: string;
  motivation: string;
  commitmentDuration: string;
  dateOfJoining: string;
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
  byVolunteerField: Array<{
    _id: string;
    count: number;
  }>;
  byDailyCommitment: Array<{
    _id: string;
    count: number;
  }>;
}

const VolunteersSection = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    byVolunteerField: [],
    byDailyCommitment: []
  });
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchVolunteers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      console.log('Fetching volunteers from:', `/admin/volunteers?${params.toString()}`);
      const response = await axiosInstance.get(
        `/admin/volunteers?${params.toString()}`
      );

      console.log('Volunteers API response:', response.data);
      
      if (response.data.success) {
        setVolunteers(response.data.data || []);
        setFilteredVolunteers(response.data.data || []);
        setPagination(response.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: limit
        });
      } else {
        throw new Error(response.data.message || 'Failed to fetch volunteers');
      }
      
      await fetchStats();
    } catch (error: any) {
      console.error('Error fetching volunteers:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch volunteers';
      console.error('Error details:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data
      });
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      console.log('Fetching volunteer stats from:', '/admin/volunteers/stats');
      const response = await axiosInstance.get('/admin/volunteers/stats');
      console.log('Stats API response:', response.data);
      
      if (response.data.success) {
        setStats(response.data.data || {
          total: 0,
          byVolunteerField: [],
          byDailyCommitment: []
        });
      }
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch stats';
      console.error('Stats error details:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data
      });
      // Don't show toast for stats errors, just log them
    }
  };

  useEffect(() => {
    fetchVolunteers();
    fetchStats();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVolunteers(volunteers);
    } else {
      const filtered = volunteers.filter(volunteer =>
        volunteer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.volunteerField.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVolunteers(filtered);
    }
  }, [searchTerm, volunteers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVolunteers(filteredVolunteers.map(volunteer => volunteer._id));
    } else {
      setSelectedVolunteers([]);
    }
  };

  const handleSelectVolunteer = (volunteerId: string, checked: boolean) => {
    if (checked) {
      setSelectedVolunteers([...selectedVolunteers, volunteerId]);
    } else {
      setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteerId));
    }
  };

  const handleViewVolunteer = (volunteer: Volunteer) => {
    console.log('Viewing volunteer:', volunteer);
    setSelectedVolunteer(volunteer);
    setIsViewDialogOpen(true);
  };

  const handleDeleteVolunteer = async (volunteerId: string) => {
    try {
      await axiosInstance.delete(`/admin/volunteers/${volunteerId}`);
      
      toast({
        title: "Success",
        description: "Volunteer deleted successfully",
      });

      fetchVolunteers(pagination.currentPage, pagination.itemsPerPage);
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      toast({
        title: "Error",
        description: "Failed to delete volunteer",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVolunteers.length === 0) return;

    try {
      await axiosInstance.delete('/admin/volunteers/bulk', {
        data: { ids: selectedVolunteers }
      });

      toast({
        title: "Success",
        description: `${selectedVolunteers.length} volunteers deleted successfully`,
      });

      setSelectedVolunteers([]);
      fetchVolunteers(pagination.currentPage, pagination.itemsPerPage);
    } catch (error) {
      console.error('Error deleting volunteers:', error);
      toast({
        title: "Error",
        description: "Failed to delete volunteers",
        variant: "destructive",
      });
    }
  };

  const formatLanguageProficiency = (lang: any) => {
    if (!lang) return 'N/A';
    const skills = [];
    if (lang.speaking) skills.push('Speaking');
    if (lang.writing) skills.push('Writing');
    if (lang.reading) skills.push('Reading');
    if (lang.none) skills.push('None');
    return skills.length > 0 ? skills.join(', ') : 'None';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Volunteers Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Volunteers</div>
              </CardContent>
            </Card>
            {stats.byVolunteerField.slice(0, 3).map((field, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">{field.count}</div>
                  <div className="text-sm text-gray-600 truncate">{field._id}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or volunteer field..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => fetchVolunteers(pagination.currentPage, pagination.itemsPerPage)}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {selectedVolunteers.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected ({selectedVolunteers.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Volunteers</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {selectedVolunteers.length} selected volunteers? This action cannot be undone.
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
                  <TableHead className="w-10 px-2">
                    <Checkbox
                      checked={selectedVolunteers.length === filteredVolunteers.length && filteredVolunteers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="px-3">Name</TableHead>
                  <TableHead className="px-3">Email</TableHead>
                  <TableHead className="px-3">Phone</TableHead>
                  <TableHead className="px-3">Volunteer Field</TableHead>
                  <TableHead className="px-3">Daily Commitment</TableHead>
                  <TableHead className="w-24 px-2">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading volunteers...
                    </TableCell>
                  </TableRow>
                ) : filteredVolunteers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No volunteers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVolunteers.map((volunteer) => (
                    <TableRow key={volunteer._id}>
                      <TableCell className="px-2 py-2">
                        <Checkbox
                          checked={selectedVolunteers.includes(volunteer._id)}
                          onCheckedChange={(checked) => handleSelectVolunteer(volunteer._id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium px-3 py-2">
                        {volunteer.firstName} {volunteer.lastName}
                      </TableCell>
                      <TableCell className="px-3 py-2 text-sm">{volunteer.email}</TableCell>
                      <TableCell className="px-3 py-2 text-sm">{volunteer.phone}</TableCell>
                      <TableCell className="px-3 py-2">
                        <Badge variant="outline" className="text-xs">{volunteer.volunteerField}</Badge>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-sm">{volunteer.dailyCommitment}</TableCell>
                      <TableCell className="px-2 py-2">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleViewVolunteer(volunteer)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Volunteer</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this volunteer? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteVolunteer(volunteer._id)}>
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
                  onClick={() => fetchVolunteers(pagination.currentPage - 1, pagination.itemsPerPage)}
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
                  onClick={() => fetchVolunteers(pagination.currentPage + 1, pagination.itemsPerPage)}
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

      {/* View Volunteer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Volunteer Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedVolunteer?.firstName} {selectedVolunteer?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedVolunteer && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">First Name</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.firstName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
                    <p className="text-sm text-gray-900 mt-1">{formatDate(selectedVolunteer.dob)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Gender</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.gender}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <p className="text-sm text-gray-900 mt-1 break-all">{selectedVolunteer.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Emergency Phone</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.emergencyPhone || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">City</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.address?.city || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">State</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.address?.state || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Country</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.address?.country || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Language Proficiency */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Language Proficiency</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">English</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.english)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Hindi</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.hindi)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Urdu</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.urdu)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Bengali</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.bengali)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Telugu</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.telugu)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Kannada</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.kannada)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Marathi</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatLanguageProficiency(selectedVolunteer.languageProficiency?.marathi)}
                    </p>
                  </div>
                  {selectedVolunteer.languageProficiency?.otherLanguage && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Other Language</Label>
                      <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.languageProficiency.otherLanguage}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Volunteer Information */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Volunteer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Volunteer Field</Label>
                    <Badge variant="outline" className="mt-1">{selectedVolunteer.volunteerField}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Daily Commitment</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.dailyCommitment}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">Availability</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVolunteer.availability && selectedVolunteer.availability.length > 0 ? (
                        selectedVolunteer.availability.map((day, index) => (
                          <Badge key={index} variant="secondary">{day}</Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">N/A</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Commitment Duration</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.commitmentDuration}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Date of Joining</Label>
                    <p className="text-sm text-gray-900 mt-1">{formatDate(selectedVolunteer.dateOfJoining)}</p>
                  </div>
                </div>
              </div>

              {/* Social Media (if applicable) */}
              {selectedVolunteer.volunteerField === 'Social Media Management' && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Social Media Skills</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Facebook</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.socialMedia?.facebook || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">LinkedIn</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.socialMedia?.linkedIn || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Instagram</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.socialMedia?.instagram || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Twitter</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.socialMedia?.twitter || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">YouTube</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.socialMedia?.youTube || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Creation (if applicable) */}
              {selectedVolunteer.volunteerField === 'Content Creation' && selectedVolunteer.contentCreation && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Content Creation Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Has Experience</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.contentCreation.hasExperience ? 'Yes' : 'No'}
                      </p>
                    </div>
                    {selectedVolunteer.contentCreation.createdBefore && selectedVolunteer.contentCreation.createdBefore.length > 0 && (
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Created Before</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVolunteer.contentCreation.createdBefore.map((item, index) => (
                            <Badge key={index} variant="secondary">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedVolunteer.contentCreation.toolsUsed && selectedVolunteer.contentCreation.toolsUsed.length > 0 && (
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Tools Used</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVolunteer.contentCreation.toolsUsed.map((tool, index) => (
                            <Badge key={index} variant="secondary">{tool}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Outreach (if applicable) */}
              {selectedVolunteer.volunteerField === 'Outreach' && selectedVolunteer.outreach && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Outreach Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Has Outreach Experience</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.outreach.hasOutreachExperience ? 'Yes' : 'No'}
                      </p>
                    </div>
                    {selectedVolunteer.outreach.outreachActivities && selectedVolunteer.outreach.outreachActivities.length > 0 && (
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Outreach Activities</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVolunteer.outreach.outreachActivities.map((activity, index) => (
                            <Badge key={index} variant="secondary">{activity}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fundraising (if applicable) */}
              {selectedVolunteer.volunteerField === 'Fundraising' && selectedVolunteer.fundraising && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Fundraising Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Has Fundraising Experience</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedVolunteer.fundraising.hasFundraisingExperience ? 'Yes' : 'No'}
                      </p>
                    </div>
                    {selectedVolunteer.fundraising.fundraisingTypes && selectedVolunteer.fundraising.fundraisingTypes.length > 0 && (
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Fundraising Types</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVolunteer.fundraising.fundraisingTypes.map((type, index) => (
                            <Badge key={index} variant="secondary">{type}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Teaching (if applicable) */}
              {selectedVolunteer.volunteerField === 'Teaching' && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Teaching Experience</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Teaching Experience</Label>
                      <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.teachingExperience || 'N/A'}</p>
                    </div>
                    {selectedVolunteer.onlineTeachingYears && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Online Teaching Years</Label>
                        <p className="text-sm text-gray-900 mt-1">{selectedVolunteer.onlineTeachingYears}</p>
                      </div>
                    )}
                    {selectedVolunteer.ageGroups && selectedVolunteer.ageGroups.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Age Groups</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVolunteer.ageGroups.map((age, index) => (
                            <Badge key={index} variant="secondary">{age}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedVolunteer.confidentSubjects && selectedVolunteer.confidentSubjects.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Confident Subjects</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVolunteer.confidentSubjects.map((subject, index) => (
                            <Badge key={index} variant="secondary">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Experience and Motivation */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Experience and Motivation</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Relevant Experience</Label>
                    <p className="text-sm text-gray-900 mt-2 p-3 bg-gray-50 rounded-md whitespace-pre-wrap border">
                      {selectedVolunteer.relevantExperience || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Motivation</Label>
                    <p className="text-sm text-gray-900 mt-2 p-3 bg-gray-50 rounded-md whitespace-pre-wrap border">
                      {selectedVolunteer.motivation || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Submission Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Submitted On</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedVolunteer.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {selectedVolunteer.updatedAt && selectedVolunteer.updatedAt !== selectedVolunteer.createdAt && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {new Date(selectedVolunteer.updatedAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VolunteersSection;

