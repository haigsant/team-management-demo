import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export interface TeamMember {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: 'regular' | 'admin';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getTeamMembers = (): Promise<{ data: TeamMember[] }> => {
  return api.get('/team-members/');
};

export const getTeamMember = (id: number): Promise<{ data: TeamMember }> => {
  return api.get(`/team-members/${id}/`);
};

export const createTeamMember = (teamMember: TeamMember): Promise<{ data: TeamMember }> => {
  return api.post('/team-members/', teamMember);
};

export const updateTeamMember = (id: number, teamMember: TeamMember): Promise<{ data: TeamMember }> => {
  return api.put(`/team-members/${id}/`, teamMember);
};

export const deleteTeamMember = (id: number): Promise<void> => {
  return api.delete(`/team-members/${id}/`);
};
