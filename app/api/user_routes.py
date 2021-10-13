from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/<int:id>/friends")
@login_required
def friends(id):
    user = User.query.get(id)
    return {'friends': [user for user in user.friends]}


@user_routes.route("/<int:id>/pending_friends")
@login_required
def pending_friends(id):
    user = User.query.get(id)
    return {'pending_friends': [user for user in user.pending_friends]}


@user_routes.route("/<int:id>/friends/accept",methods=["POST"])
@login_required
def accept_friend(id):
    user = User.query.get(id)
    requester_id = request.data.requester_id
    #delete from pending friends and add to friends



@user_routes.route("/<int:id>/friends/deny",methods=["POST"])
@login_required
def delete_pending_friend(id):
    user = User.query.get(id)
    #delete from pending friends

@user_routes.route("/<int:id>/friends",methods=["DELETE"])
@login_required
def remove_friend(id):
    user = User.query.get(id)
    # thing = pending_friends.delete().where(pending_friends.c.requester_id == user.id)
    # d.execute()
    #delete from friends

@user_routes.route("/<int:id>/pending_friends",methods=["POST"])
@login_required
def add_pending_friend(id):
    user = User.query.get(id)
    #add to pending friends
