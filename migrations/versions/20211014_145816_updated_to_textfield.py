"""updated to textfield

Revision ID: 6baffae81b8f
Revises: 23256b53b38c
Create Date: 2021-10-14 14:58:16.799553

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6baffae81b8f'
down_revision = '23256b53b38c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('runs', sa.Column('image_url', sa.Text(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('runs', 'image_url')
    # ### end Alembic commands ###
