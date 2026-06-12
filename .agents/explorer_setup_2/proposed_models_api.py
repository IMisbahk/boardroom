from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AgentOpinion(BaseModel):
    agent_name: str = Field(..., description="Name of the executive agent (e.g. CTO, CFO)")
    stance: str = Field(..., description="Agent's stance on the topic (e.g. support, object, neutral)")
    confidence: float = Field(..., description="Agent's confidence score (0.0 to 1.0)")
    rationale: str = Field(..., description="The rationale explaining the agent's stance")
    key_metrics: Dict[str, Any] = Field(default_factory=dict, description="Key metrics cited by the agent")

class ChallengeResult(BaseModel):
    agent_name: str = Field(..., description="Name of the agent offering the challenge")
    target_agent: str = Field(..., description="Name of the agent being challenged")
    critique: str = Field(..., description="The critique of the target agent's opinion")
    severity: float = Field(..., description="Severity score of the challenge (0.0 to 1.0)")

class ResponseResult(BaseModel):
    agent_name: str = Field(..., description="Name of the agent responding to the challenge")
    counter_argument: str = Field(..., description="The response and counter-argument to the critique")
    confidence_adjustment: float = Field(..., description="How much the agent's confidence score shifted (e.g. -0.1, 0.0, 0.05)")

class DebateTurn(BaseModel):
    turn_id: int = Field(..., description="Monotonically increasing turn ID")
    agent_name: str = Field(..., description="Name of the agent participating in this turn")
    action: str = Field(..., description="Action type: opinion, challenge, or response")
    content: str = Field(..., description="The textual content of this debate turn")
    timestamp: str = Field(..., description="Monospaced ISO timestamp of the turn")

class MeetingResult(BaseModel):
    meeting_id: str = Field(..., description="Unique meeting ID")
    startup_id: str = Field(..., description="ID of the startup")
    topic: str = Field(..., description="Topic under discussion")
    consensus_score: float = Field(..., description="Overall consensus score achieved (0.0 to 1.0)")
    summary: str = Field(..., description="Synthesis/summary of the debate and final recommendation")
    turns: List[DebateTurn] = Field(default_factory=list, description="Sequence of all turns in the debate")
    decisions: List[str] = Field(default_factory=list, description="Decisions agreed upon during the meeting")
    risks: List[str] = Field(default_factory=list, description="Key risks identified by the board")
