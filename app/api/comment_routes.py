from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.comment_form import CommentForm
from app.models import Comment, db
from app.api.auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
def commentsById(id):
    comments = Comment.query.filter(
        Comment.run_id == id
    )
    return {comment.id:comment.to_dict() for comment in comments}

@comment_routes.route('/edit/<int:id>', methods=["PUT"])
@login_required
def updateComment(id):
    comment = Comment.query.get(id)
    comment.body = request.json.get('body', comment.body)
    db.session.commit()

@comment_routes.route('/delete/<int:id>')
@login_required
def deleteComment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {
        'deleted_comment': comment.to_dict()
    }

@comment_routes.route('')
def comments():
    print("Comments hitting hard")
    comments = Comment.query.all()
    return {comment.id:comment.to_dict() for comment in comments}

@comment_routes.route('', methods=["POST"])
@login_required
def postComment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            body=form.data['body'],
            author_id=form.data['author_id'],
            run_id=form.data['run_id']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
