from django.contrib import admin
from comments.models import Comment
from posts.models import Post


class PostAdmin(admin.ModelAdmin):
    fields = ['title', 'body', 'comments']


admin.site.register(Post)
admin.site.register(Comment)
