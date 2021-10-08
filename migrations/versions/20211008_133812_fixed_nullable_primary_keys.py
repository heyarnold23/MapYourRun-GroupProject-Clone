"""fixed nullable primary keys

Revision ID: 8fac3f120a30
Revises: d36dde3dfce3
Create Date: 2021-10-08 13:38:12.715360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fac3f120a30'
down_revision = 'd36dde3dfce3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('runs', 'runner_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('runs', 'runner_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###