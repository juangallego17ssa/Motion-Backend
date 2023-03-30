# emails/send_emails.py

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_follow_email(follower, followed):
    subject = 'New Follower'
    html_message = render_to_string('emails/follow_email.html', {'follower': follower, 'followed': followed})
    plain_message = strip_tags(html_message)
    from_email = 'no-reply@socialmedia.com'
    recipient_list = [followed.email, ]
    send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)


def send_friend_request_email(sender, recipient):
    subject = 'New Friend Request'
    html_message = render_to_string('emails/friend_request_email.html', {'sender': sender, 'recipient': recipient})
    plain_message = strip_tags(html_message)
    from_email = 'no-reply@socialmedia.com'
    recipient_list = [recipient.email, ]
    send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)


def send_friend_accept_email(sender, recipient):
    subject = 'Friend Request Accepted'
    html_message = render_to_string('emails/friend_accept_email.html', {'sender': sender, 'recipient': recipient})
    plain_message = strip_tags(html_message)
    from_email = 'no-reply@socialmedia.com'
    recipient_list = [recipient.email, ]
    send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)


def send_new_post_email(sender, post):
    friends = sender.friend.all()
    for friend in friends:
        subject = 'New Post from Your Friend'
        html_message = render_to_string('emails/new_post_email.html', {'sender': sender, 'post': post})
        plain_message = strip_tags(html_message)
        from_email = 'no-reply@socialmedia.com'
        recipient_list = [friend.email, ]
        send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)
