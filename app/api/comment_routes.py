from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('')
def comments():
    print("Comments hitting hard")
    comments = Comment.query.all()
    return {comment.id:comment.to_dict() for comment in comments}