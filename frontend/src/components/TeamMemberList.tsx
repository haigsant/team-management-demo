import React from 'react';
import { Link } from 'react-router-dom';
import { useTeamMembers } from '../hooks/useTeamMembers';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';
import { FiPlus, FiPhone, FiMail, FiUsers, FiUser } from 'react-icons/fi';

const TeamMemberList: React.FC = () => {
  const { teamMembers, loading, error } = useTeamMembers();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={`Error loading team members: ${error.message}`} />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base text-gray-600">
          You have {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
        </h2>
        <Link 
          to="/add" 
          className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-medium rounded-full"
          aria-label="Add team member"
        >
          <FiPlus className="h-6 w-6" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {teamMembers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FiUser className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new team member.</p>
            <div className="mt-6">
              <Link to="/add" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add team member
              </Link>
            </div>
          </div>
        ) : (
          teamMembers.map(member => (
            <Link 
              key={member.id} 
              to={`/edit/${member.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4 hover:border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-gray-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">
                      {member.first_name} {member.last_name} 
                      {member.role === 'admin' && 
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                          admin
                        </span>
                      }
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600 flex items-center">
                        <FiPhone className="h-4 w-4 mr-2 text-gray-400" />
                        {member.phone}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <FiMail className="h-4 w-4 mr-2 text-gray-400" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default TeamMemberList;
