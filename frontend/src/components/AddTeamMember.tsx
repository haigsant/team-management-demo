import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamMemberForm from './TeamMemberForm';
import { TeamMember } from '../services/api';
import { useCreateTeamMember } from '../hooks/useCreateTeamMember';
import ErrorMessage from './common/ErrorMessage';
import LoadingSpinner from './common/LoadingSpinner';

const AddTeamMember: React.FC = () => {
  const navigate = useNavigate();
  const { create, loading, error, validationErrors } = useCreateTeamMember();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (teamMember: TeamMember) => {
    setIsSubmitting(true);
    const success = await create(teamMember);
    if (success) {
      navigate('/');
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return <LoadingSpinner size="small" />;
  }

  return (
    <>    
      <h2 className="text-base text-gray-600 mb-6">Set email, location and role</h2>
      
      {error && <ErrorMessage message={error.message} />}
      
      <TeamMemberForm 
        onSubmit={handleSubmit} 
        validationErrors={validationErrors}
        isSubmitting={isSubmitting || loading}
      />
    </>
  );
};

export default AddTeamMember;
