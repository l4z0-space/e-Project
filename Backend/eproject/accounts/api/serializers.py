from rest_framework import serializers

from accounts.models import Account

class RegistrationSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(style={'input_type': 'password'},
                                            write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):

        email = self.validated_data['email']
        username = self.validates_data['username']

        account = Account(email=email, username=username)

        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError({'password': 'Passwords must \
                                               match'})
        account.set_password(password)
        account.save()
        return account


class AccountPropertiesSerializer(serializers.Serializer):
    class Meta:
        model = Account
        fields = ['pk', 'email', 'username']


class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)
