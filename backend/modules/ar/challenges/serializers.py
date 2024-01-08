from .models import Challenges
from rest_framework import serializers


class ChallengesSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return obj.image.url

    class Meta:
        model = Challenges
        fields = (
            "id",
            "image",
        )


class ChallengesUploadSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = Challenges
        fields = ("image",)
