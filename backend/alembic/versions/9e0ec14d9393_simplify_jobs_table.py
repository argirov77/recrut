"""simplify jobs table

Revision ID: 9e0ec14d9393
Revises: aefc29453418
Create Date: 2025-07-09 00:00:00.000000
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '9e0ec14d9393'
down_revision: Union[str, None] = 'aefc29453418'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table('jobs')
    op.create_table(
        'jobs',
        sa.Column('id', sa.String(length=36), primary_key=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('jobs')
    op.create_table(
        'jobs',
        sa.Column('id', sa.String(length=36), primary_key=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('location', sa.String(), nullable=False),
        sa.Column('salary_min', sa.Integer(), nullable=False),
        sa.Column('salary_max', sa.Integer(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=True, server_default='1'),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )
