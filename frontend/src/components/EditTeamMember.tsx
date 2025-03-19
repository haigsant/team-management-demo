import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TeamMemberForm from './TeamMemberForm';
import { TeamMember } from '../services/api';
import { useTeamMember } from '../hooks/useTeamMember';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';
import DeleteConfirmation from './common/DeleteConfirmation';

const EditTeamMember: React.FC = () => {
  const params = useParams<{id: string}>();
  const id = params.id;
  const navigate = useNavigate();
  const { teamMember, loading, error, validationErrors, update, remove } = useTeamMember(id);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (updatedMember: TeamMember) => {
    setIsSubmitting(true);
    const success = await update(updatedMember);
    if (success) {
      navigate('/');
    }
    setIsSubmitting(false);
  };

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    const success = await remove();
    if (success) {
      navigate('/');
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !teamMember) {
    return (
      <>
        <ErrorMessage message={error.message} />
        <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 mt-4">
          Return to Team List
        </Link>
      </>
    );
  }

  if (!teamMember) {
    return (
      <>
        <ErrorMessage 
          message="Team member not found" 
          type="warning" 
        />
        <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 mt-4">
          Return to Team List
        </Link>
      </>
    );
  }

  return (
    <>
      <h2 className="text-base text-gray-600 mb-6">Edit contact info, location and role</h2>
      
      {error && <ErrorMessage message={error.message} />}
      
      <TeamMemberForm 
        teamMember={teamMember} 
        onSubmit={handleSubmit} 
        onDelete={openDeleteConfirmation}
        validationErrors={validationErrors}
        isSubmitting={isSubmitting} 
      />

      <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDelete}
        memberName={`${teamMember.first_name} ${teamMember.last_name}`}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default EditTeamMember;
