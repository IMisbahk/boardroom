from sqlalchemy import Column, Integer, String, Float, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from src.database.session import Base

class ExecutiveProfile(Base):
    __tablename__ = "executive_profiles"

    name = Column(String, primary_key=True, index=True) # CEO, CFO, CTO, etc.
    title = Column(String, nullable=False)
    role_description = Column(Text, nullable=True)
    system_prompt = Column(Text, nullable=True)

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    startup_id = Column(String, index=True, nullable=False)
    file_name = Column(String, nullable=False)
    storage_path = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(String, primary_key=True, index=True)
    startup_id = Column(String, index=True, nullable=False)
    topic = Column(String, nullable=False)
    context = Column(JSON, nullable=True) # Stores dictionary of context
    status = Column(String, default="created") # created, debating, synthesized, completed
    consensus_score = Column(Float, default=0.0)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    turns = relationship("DebateTurn", back_populates="meeting", cascade="all, delete-orphan")

class DebateTurn(Base):
    __tablename__ = "debate_turns"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    meeting_id = Column(String, ForeignKey("meetings.id"), nullable=False)
    turn_number = Column(Integer, nullable=False)
    agent_name = Column(String, nullable=False)
    action = Column(String, nullable=False) # opinion, challenge, response
    content = Column(Text, nullable=False)
    confidence_score = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationship
    meeting = relationship("Meeting", back_populates="turns")
