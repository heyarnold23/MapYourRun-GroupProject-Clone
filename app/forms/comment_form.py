from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class CommentForm(FlaskForm):
    body = TextAreaField(
        'body', validators=[DataRequired()])
    author_id = IntegerField('author_id', validators=[DataRequired()])
    run_id = IntegerField('run_id', validators=[DataRequired()])
