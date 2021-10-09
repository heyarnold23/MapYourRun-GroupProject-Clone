"""trying to fix friends association

Revision ID: b710bb2908dd
Revises: db448d1cfce2
Create Date: 2021-10-08 15:53:52.212121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b710bb2908dd'
down_revision = 'db448d1cfce2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('friends', 'runner1_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('friends', 'runner2_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('pending_friends', 'acceptor_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('pending_friends', 'requester_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('pending_friends', 'requester_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('pending_friends', 'acceptor_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('friends', 'runner2_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('friends', 'runner1_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###