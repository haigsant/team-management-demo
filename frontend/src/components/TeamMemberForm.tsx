import React, { useState } from 'react';
import { TeamMember } from '../services/api';
import { FiPhone, FiMail, FiLoader } from 'react-icons/fi';
import { ValidationErrors } from '../hooks/useCreateTeamMember';

interface TeamMemberFormProps {
  teamMember?: TeamMember;
  onSubmit: (teamMember: TeamMember) => void;
  onDelete?: () => void;
  validationErrors?: ValidationErrors | null;
  isSubmitting?: boolean;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ 
  teamMember, 
  onSubmit, 
  onDelete,
  validationErrors, 
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState<TeamMember>({
    first_name: teamMember?.first_name || '',
    last_name: teamMember?.last_name || '',
    phone: teamMember?.phone || '',
    email: teamMember?.email || '',
    role: teamMember?.role || 'regular'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getFieldError = (fieldName: string): string | null => {
    if (!validationErrors) return null;
    return validationErrors[fieldName]?.[0] || null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg mt-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Info</h3>
        <div>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={`block w-full px-3 py-2 rounded-md border ${getFieldError('first_name') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-1 sm:text-sm`}
            placeholder="First Name"
            disabled={isSubmitting}
          />
          {getFieldError('first_name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('first_name')}</p>
          )}
        </div>
        
        <div>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className={`block w-full px-3 py-2 rounded-md border ${getFieldError('last_name') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-1 sm:text-sm`}
            placeholder="Last Name"
            disabled={isSubmitting}
          />
          {getFieldError('last_name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('last_name')}</p>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiPhone className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`block w-full pl-10 px-3 py-2 rounded-md border ${getFieldError('phone') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-1 sm:text-sm`}
            placeholder="Phone Number"
            disabled={isSubmitting}
          />
          {getFieldError('phone') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiMail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`block w-full pl-10 px-3 py-2 rounded-md border ${getFieldError('email') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-1 sm:text-sm`}
            placeholder="Email Address"
            disabled={isSubmitting}
          />
          {getFieldError('email') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Role</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="role-regular"
              name="role"
              type="radio"
              value="regular"
              checked={formData.role === 'regular'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <label htmlFor="role-regular" className="ml-3 block text-sm text-gray-700">
              Regular - Can't delete members
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="role-admin"
              name="role"
              type="radio"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <label htmlFor="role-admin" className="ml-3 block text-sm text-gray-700">
              Admin - Can delete members
            </label>
          </div>
          {getFieldError('role') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('role')}</p>
          )}
        </div>
      </div>
      
      {onDelete ? (
        <div className="flex justify-between space-x-12 pt-4">
          <button 
            type="button" 
            onClick={onDelete}
            disabled={isSubmitting}
            className="w-1/2 py-3 px-3 border border-gray-300 rounded-md text-sm font-medium text-red-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-1/2 py-3 px-3 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      ) : (
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default TeamMemberForm;
