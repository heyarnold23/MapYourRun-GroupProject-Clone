from .db import db
from werkzeug.security import generate_password_hash, check_password_hash



class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable = False)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    run_id = db.Column(db.Integer, db.ForeignKey("runs.id"), nullable = False)
