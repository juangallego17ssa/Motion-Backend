from rest_framework.generics import ListCreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from posts.models import Post
from .models import Comment
from .serializers import CommentSerializer


class CommentListCreateView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['id']
        return Comment.objects.filter(posts=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['id']
        post = Post.objects.get(id=post_id)
        comment = serializer.save(posts=post)
        comment.created_by = self.request.user
        comment.save()

