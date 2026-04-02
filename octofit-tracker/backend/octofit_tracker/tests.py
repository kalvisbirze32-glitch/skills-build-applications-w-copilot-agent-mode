from django.test import TestCase
from .models import Team, User, Workout, Activity, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.activity = Activity.objects.create(user=self.user, workout=self.workout, duration=10)
        self.leaderboard = Leaderboard.objects.create(user=self.user, points=50)

    def test_team(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_user(self):
        self.assertEqual(self.user.team, self.team)

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_activity(self):
        self.assertEqual(self.activity.duration, 10)

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 50)
