import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContactInfo } from '@/lib/contactSchema';

interface ContactPreviewProps {
  contactInfo: ContactInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContactPreview: React.FC<ContactPreviewProps> = ({ contactInfo, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Information Preview</DialogTitle>
        </DialogHeader>
        
        {!contactInfo ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-32">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Contact Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Contact information has not been set up yet. Please fill out the form to create the initial contact information.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="text-primary text-lg">📍</div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{contactInfo.location}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-primary text-lg">📧</div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-primary text-lg">📞</div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{contactInfo.phone}</p>
                </div>
              </div>
              
              {/* <div className="flex items-start space-x-3">
                <div className="text-primary text-lg">🕒</div>
                <div>
                  <p className="text-sm text-muted-foreground">Working Hours</p>
                  <p className="font-medium">{contactInfo.workingHours}</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Mailing Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Mailing Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <p className="font-semibold text-lg">{contactInfo.organizationName}</p>
                <p>{contactInfo.addressLine1}</p>
                {contactInfo.addressLine2 && <p>{contactInfo.addressLine2}</p>}
                <p>{contactInfo.city}, {contactInfo.state} – {contactInfo.postalCode}</p>
                <p>{contactInfo.country}</p>
              </div>
            </div>
          </div>

          {/* Preview Note */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This is a preview of how the contact information will appear on the public website. 
              The contact form will remain functional and unchanged.
            </p>
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactPreview;
