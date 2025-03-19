import { useState } from 'react';
import { createTeamMember, TeamMember } from '../services/api';
import { showSuccess, showError, handleApiError } from '../utils/toast';

export interface ValidationErrors {
  [key: string]: string[];
}

export const useCreateTeamMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

  const create = async (teamMember: TeamMember) => {
    setLoading(true);
    setError(null);
    setValidationErrors(null);
    
    try {
      await createTeamMember(teamMember);
      showSuccess('Team member created successfully!');
      return true;
    } catch (err: any) {
      console.error('Error creating team member:', err);
      
      if (err.response?.status === 400 && err.response?.data) {
        setValidationErrors(err.response.data);
      }
      
      const errorMessage = handleApiError(err, 'Failed to create team member');
      setError(new Error(errorMessage));
      showError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, validationErrors };
};
