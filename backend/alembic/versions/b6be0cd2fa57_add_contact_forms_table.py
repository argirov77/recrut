"""add contact forms table

Revision ID: b6be0cd2fa57
Revises: aefc29453418
Create Date: 2025-06-06 12:00:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "b6be0cd2fa57"
down_revision: Union[str, None] = "aefc29453418"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "contact_forms",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("full_name", sa.String(), nullable=False),
        sa.Column("country", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=False),
        sa.Column("position", sa.String(), nullable=True),
        sa.Column("message", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_contact_forms_id"), "contact_forms", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_contact_forms_id"), table_name="contact_forms")
    op.drop_table("contact_forms")
