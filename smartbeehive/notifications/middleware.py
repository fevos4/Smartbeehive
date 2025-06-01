from urllib.parse import parse_qs
from channels.middleware import BaseMiddleware
from asgiref.sync import sync_to_async

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"").decode()
        params = parse_qs(query_string)
        token = params.get("token")

        scope["user"] = None

        if token:
            try:
                from rest_framework_simplejwt.tokens import AccessToken
                access_token = AccessToken(token[0])
                user_id = access_token.get("user_id")
                if user_id is None:
                    print("Token missing user_id")
                    await send({"type": "websocket.close", "code": 403})
                    return

                user = await self.get_user(user_id)
                print(f"User found for id={user_id}: {user}")
                if user is None:
                    print(f"No user found for id={user_id}")
                    await send({"type": "websocket.close", "code": 403})
                    return

                scope["user"] = user

            except Exception as e:
                print(f"Token validation failed: {e}")
                await send({"type": "websocket.close", "code": 403})
                return

        return await super().__call__(scope, receive, send)

    @staticmethod
    @sync_to_async
    def get_user(user_id):
        from django.contrib.auth import get_user_model
        from django.db import close_old_connections

        close_old_connections()
        User = get_user_model()
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
