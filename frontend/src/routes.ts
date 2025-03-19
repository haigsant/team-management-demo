import TeamMemberList from './components/TeamMemberList';
import AddTeamMember from './components/AddTeamMember';
import EditTeamMember from './components/EditTeamMember';

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  title: string;
  exact?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: TeamMemberList,
    title: 'Team Members',
    exact: true
  },
  {
    path: '/add',
    component: AddTeamMember,
    title: 'Add a team member',
    exact: true
  },
  {
    path: '/edit/:id',
    component: EditTeamMember,
    title: 'Edit team member',
    exact: false
  }
];

export default routes;
