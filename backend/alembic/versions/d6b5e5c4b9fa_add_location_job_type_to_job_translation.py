"""add location and job_type to job translations

Revision ID: d6b5e5c4b9fa
Revises: be8abb93c6f8
Create Date: 2025-08-01 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'd6b5e5c4b9fa'
down_revision: Union[str, None] = 'be8abb93c6f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('job_translations', sa.Column('location', sa.String(), nullable=False, server_default=''))
    op.add_column('job_translations', sa.Column('job_type', sa.String(), nullable=False, server_default=''))
    op.alter_column('job_translations', 'location', server_default=None)
    op.alter_column('job_translations', 'job_type', server_default=None)


def downgrade() -> None:
    op.drop_column('job_translations', 'job_type')
    op.drop_column('job_translations', 'location')
