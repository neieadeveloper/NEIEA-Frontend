import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Save, Eye } from 'lucide-react';
import { contactSchema, ContactInfo } from '@/lib/contactSchema';
import { useContactAdmin } from '@/hooks/useContact';
import ContactPreview from '../components/ContactPreview';

const Contact = () => {
  const { contactInfo, loading, error, updateContactInfo } = useContactAdmin();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInfo>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      location: '',
      email: '',
      phone: '',
      workingHours: '',
      organizationName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    if (contactInfo) {
      reset({
        location: contactInfo.location || '',
        email: contactInfo.email || '',
        phone: contactInfo.phone || '',
        workingHours: contactInfo.workingHours || '',
        organizationName: contactInfo.organizationName || '',
        addressLine1: contactInfo.addressLine1 || '',
        addressLine2: contactInfo.addressLine2 || '',
        city: contactInfo.city || '',
        state: contactInfo.state || '',
        postalCode: contactInfo.postalCode || '',
        country: contactInfo.country || '',
      });
    }
  }, [contactInfo, reset]);

  const onSubmit = async (data: ContactInfo) => {
    try {
      await updateContactInfo(data);
      toast.success('Contact information updated successfully');
    } catch (error) {
      toast.error('Failed to update contact information');
      console.error('Error updating contact information:', error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ color: "#06038F" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: "#06038F" }}>Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Contact Information</h4>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show info message when contact information is not found, but still show the form
  const showNoContactInfoMessage = !loading && !error && !contactInfo;

  return (
    <div className="space-y-6">
      {/* Show info message when no contact information is found */}
      {showNoContactInfoMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                No Contact Information Found
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Contact information has not been set up yet. Please fill out the form below to create the initial contact information.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Contact Information Management</CardTitle>
              <p className="text-muted-foreground">
                {showNoContactInfoMessage 
                  ? "Create initial contact information and mailing address details"
                  : "Manage contact information and mailing address details"
                }
              </p>
            </div>
            {/* <Button
              variant="outline"
              onClick={() => setIsPreviewOpen(true)}
              disabled={!contactInfo}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="e.g., Hyderabad, Telangana, India"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="e.g., feedback@neiea.org"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="e.g., +91 70907 70784"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* <div>
                  <Label htmlFor="workingHours">Working Hours *</Label>
                  <Input
                    id="workingHours"
                    {...register('workingHours')}
                    placeholder="e.g., Monday – Friday: 10 AM – 6 PM"
                    className={errors.workingHours ? 'border-red-500' : ''}
                  />
                  {errors.workingHours && (
                    <p className="text-red-500 text-sm mt-1">{errors.workingHours.message}</p>
                  )}
                </div> */}
              </div>
            </div>

            {/* Mailing Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Mailing Address</h3>
              
              <div>
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  {...register('organizationName')}
                  placeholder="e.g., NEIEA (New Equitable and Innovative Educational Association)"
                  className={errors.organizationName ? 'border-red-500' : ''}
                />
                {errors.organizationName && (
                  <p className="text-red-500 text-sm mt-1">{errors.organizationName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  {...register('addressLine1')}
                  placeholder="e.g., 22-2-472/3, Panjathan Colony"
                  className={errors.addressLine1 ? 'border-red-500' : ''}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  {...register('addressLine2')}
                  placeholder="Additional address information"
                  className={errors.addressLine2 ? 'border-red-500' : ''}
                />
                {errors.addressLine2 && (
                  <p className="text-red-500 text-sm mt-1">{errors.addressLine2.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="e.g., Hyderabad"
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    {...register('state')}
                    placeholder="e.g., Telangana"
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    {...register('postalCode')}
                    placeholder="e.g., 500024"
                    className={errors.postalCode ? 'border-red-500' : ''}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  {...register('country')}
                  placeholder="e.g., India"
                  className={errors.country ? 'border-red-500' : ''}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      {isPreviewOpen && contactInfo && (
        <ContactPreview
          contactInfo={contactInfo}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
};

export default Contact;
