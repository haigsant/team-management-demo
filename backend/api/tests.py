from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from api.models import TeamMember

class TeamMemberAPITestCase(APITestCase):
    def test_can_create_team_member(self):
        """Test that we can create a team member"""
        url = reverse('teammember-list')
        data = {
            'first_name': 'Jane',
            'last_name': 'Smith',
            'phone': '555-123-4567',
            'email': 'jane@example.com',
            'role': 'admin'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(TeamMember.objects.count(), 1)
        self.assertEqual(TeamMember.objects.get().first_name, 'Jane')
