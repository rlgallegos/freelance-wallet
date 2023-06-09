"""Added income column

Revision ID: 6be79d5bdb0c
Revises: 6936f3082f80
Create Date: 2023-05-21 03:25:55.963995

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6be79d5bdb0c'
down_revision = '6936f3082f80'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('average_weekly_income', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('average_weekly_income')

    # ### end Alembic commands ###
