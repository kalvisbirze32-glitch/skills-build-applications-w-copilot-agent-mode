from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', team=marvel),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', team=marvel),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', team=marvel),
            User.objects.create_user(username='batman', email='batman@dc.com', team=dc),
            User.objects.create_user(username='superman', email='superman@dc.com', team=dc),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', team=dc),
        ]

        # Workouts
        workout1 = Workout.objects.create(name='Pushups', description='Pushups workout')
        workout2 = Workout.objects.create(name='Running', description='Running workout')

        # Activities
        Activity.objects.create(user=users[0], workout=workout1, duration=30)
        Activity.objects.create(user=users[1], workout=workout2, duration=45)
        Activity.objects.create(user=users[3], workout=workout1, duration=25)
        Activity.objects.create(user=users[4], workout=workout2, duration=60)

        # Leaderboard
        Leaderboard.objects.create(user=users[0], points=100)
        Leaderboard.objects.create(user=users[1], points=90)
        Leaderboard.objects.create(user=users[3], points=110)
        Leaderboard.objects.create(user=users[4], points=95)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
