from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class MeetingCreate(BaseModel):
    startup_id: str
    topic: str
    context: Dict[str, Any] = Field(default_factory=dict)
    doc_ids: List[str] = Field(default_factory=list)

class AskBoardRequest(BaseModel):
    question: str

class DebateTurnSchema(BaseModel):
    turn_number: int
    agent_name: str
    action: str # opinion, challenge, response
    content: str
    confidence_score: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class MeetingResult(BaseModel):
    meeting_id: str
    startup_id: str
    topic: str
    status: str
    consensus_score: float
    summary: str
    turns: List[DebateTurnSchema] = Field(default_factory=list)
    created_at: datetime

class AgentOpinion(BaseModel):
    agent_name: str
    topic: str
    opinion: str
    confidence_score: float = Field(..., ge=0.0, le=1.0)

class ChallengeResult(BaseModel):
    challenger_name: str
    target_opinion: AgentOpinion
    challenge: str
    confidence_score: float = Field(..., ge=0.0, le=1.0)

class ResponseResult(BaseModel):
    responder_name: str
    challenge: ChallengeResult
    response: str
    final_confidence: float = Field(..., ge=0.0, le=1.0)
