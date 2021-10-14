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
@login_required
def post():
    form = RunForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        run = Run(
            start_point=form.data['start_point'],
            end_point=form.data['end_point'],
            distance=form.data['distance'],
            time=form.data['time'],
            runner_id=form.data['runner_id'],
            image_url=form.data['image_url']
        )
        db.session.add(run)
        db.session.commit()
        return run.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@run_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_run(id):
    run  = Run.query.get(id)
    print(id)
    run.start_point = request.json.get('start_point', run.start_point)
    run.end_point = request.json.get('end_point', run.end_point)
    run.distance = request.json.get('distance', run.distance)
    run.time = request.json.get("time", run.time)
    run.runner_id = request.json.get("runner_id", run.runner_id)
    run.image_url = request.json.get("image_url", run.image_url)
    db.session.commit()
    return run.to_dict()

@run_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_run(id):
    run = Run.query.get(id)
    db.session.delete(run)
    db.session.commit()
    return {
        'deleted_run': run.to_dict()
    }

