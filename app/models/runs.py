from .db import db
from werkzeug.security import generate_password_hash, check_password_hash

runners_runs = db.Table(
    "runners_runs",
    db.Column("runner_id", db.Integer, db.ForeignKey("users.id"), primary_key=True, nullable = False),
    db.Column("run_id", db.Integer, db.ForeignKey("runs.id"), primary_key=True, nullable = False)
    )

class Run(db.Model):
    __tablename__ = 'runs'

    id = db.Column(db.Integer, primary_key=True)
    start_point = db.Column(db.String(256), nullable = False)
    end_point = db.Column(db.String(256), nullable = False)
    distance = db.Column(db.Float, nullable = False)
    time = db.Column(db.Float, nullable = False)
    completed = db.Column(db.Boolean, nullable = False)
    runner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    runnings = db.relationship("User",back_populates = "user_runs")
