import { useState, useEffect } from 'react';
import { getTeamMember, updateTeamMember, deleteTeamMember, TeamMember } from '../services/api';
import { showSuccess, showError, handleApiError } from '../utils/toast';
import { ValidationErrors } from './useCreateTeamMember';

export const useTeamMember = (id: string | undefined) => {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      if (!id) return;
      
      setError(null);
      setValidationErrors(null);
      
      try {
        const response = await getTeamMember(parseInt(id));
        setTeamMember(response.data);
      } catch (err: any) {
        console.error('Error fetching team member:', err);
        const errorMessage = handleApiError(err, 'Failed to fetch team member');
        setError(new Error(errorMessage));
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [id]);

  const update = async (updatedMember: TeamMember) => {
    if (!id) return false;
    
    setError(null);
    setValidationErrors(null);
    
    try {
      await updateTeamMember(parseInt(id), updatedMember);
      showSuccess('Team member updated successfully!');
      return true;
    } catch (err: any) {
      console.error('Error updating team member:', err);
      
      if (err.response?.status === 400 && err.response?.data) {
        setValidationErrors(err.response.data);
      }
      
      const errorMessage = handleApiError(err, 'Failed to update team member');
      setError(new Error(errorMessage));
      showError(errorMessage);
      return false;
    }
  };

  const remove = async () => {
    if (!id) return false;
    
    setError(null);
    
    try {
      await deleteTeamMember(parseInt(id));
      showSuccess('Team member deleted successfully!');
      return true;
    } catch (err: any) {
      console.error('Error deleting team member:', err);
      const errorMessage = handleApiError(err, 'Failed to delete team member');
      setError(new Error(errorMessage));
      showError(errorMessage);
      return false;
    }
  };

  return { teamMember, loading, error, validationErrors, update, remove };
};
