"""add job translations table

Revision ID: be8abb93c6f8
Revises: b6be0cd2fa57
Create Date: 2025-07-10 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'be8abb93c6f8'
down_revision: Union[str, None] = 'b6be0cd2fa57'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'job_translations',
        sa.Column('job_id', sa.Integer(), nullable=False),
        sa.Column('language', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('requirements', sa.String(), nullable=False),
        sa.ForeignKeyConstraint(['job_id'], ['jobs.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('job_id', 'language')
    )
    op.create_index(op.f('ix_job_translations_job_id'), 'job_translations', ['job_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_job_translations_job_id'), table_name='job_translations')
    op.drop_table('job_translations')
