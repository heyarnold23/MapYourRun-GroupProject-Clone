from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

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
    return {'friends': [user.get_friend_info() for user in user.friends_association]}


@user_routes.route("/<int:id>/pending_friends")
@login_required
def pending_friends(id):
    user = User.query.get(id)
    print("\n\n\n\n\n\n\n\n",{'pending_friends': [user.get_friend_info() for user in user.pending_friends_association]})
    return {'pending_friends': [user.get_friend_info() for user in user.pending_friends_association]}


@user_routes.route("/<int:id>/friends/accept",methods=["POST"])
@login_required
def accept_friend(id):
    requester_id = int(request.json['requester_id'])
    acceptor = User.query.get(id)
    requester = User.query.get(requester_id)
    acceptor.friends_association.append(requester)
    acceptor.pending_friends_association.remove(requester)
    db.session.commit()
    return acceptor.to_dict()
    #delete from pending friends and add to friends


@user_routes.route("/<int:id>/friends/deny",methods=["POST"])
@login_required
def delete_pending_friend(id):
    user = User.query.get(id)
    requester_id = int(request.json['requester_id'])
    requester = User.query.get(requester_id)
    user.pending_friends_association.remove(requester)
    db.session.commit()
    return user.to_dict()
    #delete from pending friends

@user_routes.route("/<int:id>/friends",methods=["DELETE"])
@login_required
def remove_friend(id):
    user = User.query.get(id)
    friend_id = int(request.json['friend_id'])
    friend = User.query.get(friend_id)
    user.friends_association.remove(friend)
    db.session.commit()
    return user.to_dict()

    #delete from friends

@user_routes.route("/<int:id>/pending_friends",methods=["POST"])
@login_required
def add_pending_friend(id):
    user = User.query.get(id)
    friend_id = int(request.json['friend_id'])
    friend = User.query.get(friend_id)
    user.pending_friends_association.append(friend) #needs to add the user to pending friends here
    db.session.commit()
    return user.to_dict()
    #add to pending friends
