from rest_framework import serializers

from apps.accounts.models import CustomUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser

        exclude = [
            'password',
            'groups',
            'user_permissions'
        ]


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = CustomUser

        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'gender',
            'password',
        ]

    def create(self, validated_data):

        password = validated_data.pop('password')

        user = CustomUser.objects.create_user(
            password=password,
            **validated_data
        )

        return user