from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Run

run_routes = Blueprint('runs', __name__)


@run_routes.route('')
# @login_required
def runs():
    print("INSIDE ROUTE HITTING IT")
    runs = Run.query.all()
    return {run.id:run.to_dict() for run in runs}
    # {
    #     'runs': {run.id:run.to_dict() for run in runs}
    # }



# @run_routes.route('/fast')
# # @login_required
# def fast():
#     print("INSIDE ROUTE HITTING IT")
#     # runs = Run.query.all()
#     # return {
#     #     'runs': {run.id:run.to_dict() for run in runs}
#     # }
#     return "Hiiiiii"
