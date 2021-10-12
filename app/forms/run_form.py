from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class RunForm(FlaskForm):
    start_point = StringField(
        'startPoint', validators=[DataRequired()])
    end_point = StringField('endPoint', validators=[DataRequired()])
    distance = FloatField('distance', validators=[DataRequired()])
    time = FloatField('time', validators=[DataRequired()])
    runner_id = IntegerField('runner_id', validators=[DataRequired()])
