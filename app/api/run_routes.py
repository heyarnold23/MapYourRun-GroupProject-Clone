from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.run_form import RunForm
from app.models import Run, db

run_routes = Blueprint('runs', __name__)


@run_routes.route('')
# @login_required
def runs():
    print("INSIDE ROUTE HITTING IT")
    runs = Run.query.all()
    return {run.id:run.to_dict() for run in runs}



@run_routes.route('', methods=["POST"])
# @login_required
def post():
    print("INSIDE POSTTTTTINGGGGGGG")
    form = RunForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        run = Run(
            start_point=form.data['startPoint'],
            end_point=form.data['endPoint'],
            distance=form.data['distance'],
            time=form.data['time'],
            runner_id=form.data['runnerId']
        )
        db.session.add(run)
        db.session.commit()
        return run.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
