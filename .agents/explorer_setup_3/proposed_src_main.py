from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import uuid

from src.config import settings
from src.database.session import engine, Base, get_db
from src.models import api, data

# Create database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend services for the Boardroom AI Executive Team decision engine",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to Boardroom AI Executive Team API",
        "version": "1.0.0",
        "environment": settings.ENV
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/meetings", response_model=api.MeetingResult, status_code=status.HTTP_201_CREATED)
def create_meeting(payload: api.MeetingCreate, db: Session = Depends(get_db)):
    """
    Initializes a new board meeting and starts the debate/synthesis pipeline.
    """
    meeting_id = str(uuid.uuid4())
    
    # Store meeting metadata in SQLite
    db_meeting = data.Meeting(
        id=meeting_id,
        startup_id=payload.startup_id,
        topic=payload.topic,
        context=payload.context,
        status="created",
        consensus_score=0.5, # initial dummy/placeholder consensus
        summary=f"Initiating board meeting for {payload.topic}..."
    )
    
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    
    # Construct response matching MeetingResult model
    return api.MeetingResult(
        meeting_id=db_meeting.id,
        startup_id=db_meeting.startup_id,
        topic=db_meeting.topic,
        status=db_meeting.status,
        consensus_score=db_meeting.consensus_score,
        summary=db_meeting.summary,
        turns=[],
        created_at=db_meeting.created_at
    )

@app.post("/meetings/{meeting_id}/ask", response_model=api.MeetingResult)
def ask_board(meeting_id: str, payload: api.AskBoardRequest, db: Session = Depends(get_db)):
    """
    Asks the board a follow-up question, triggering a new turn in the debate.
    """
    db_meeting = db.query(data.Meeting).filter(data.Meeting.id == meeting_id).first()
    if not db_meeting:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Meeting with ID {meeting_id} not found."
        )
    
    # In a real pipeline, we'd trigger a debate engine step here.
    # For now, we simulate a debate turn.
    turn_num = len(db_meeting.turns) + 1
    new_turn = data.DebateTurn(
        meeting_id=meeting_id,
        turn_number=turn_num,
        agent_name="CEO",
        action="opinion",
        content=f"CEO responds to: '{payload.question}' with strategic alignment.",
        confidence_score=0.85
    )
    db.add(new_turn)
    
    # Update meeting status
    db_meeting.status = "debating"
    db_meeting.summary = f"Currently debating: {payload.question}"
    db.commit()
    db.refresh(db_meeting)
    
    # Retrieve turns
    turns_schemas = [
        api.DebateTurnSchema(
            turn_number=t.turn_number,
            agent_name=t.agent_name,
            action=t.action,
            content=t.content,
            confidence_score=t.confidence_score,
            timestamp=t.created_at
        ) for t in db_meeting.turns
    ]
    
    return api.MeetingResult(
        meeting_id=db_meeting.id,
        startup_id=db_meeting.startup_id,
        topic=db_meeting.topic,
        status=db_meeting.status,
        consensus_score=db_meeting.consensus_score,
        summary=db_meeting.summary,
        turns=turns_schemas,
        created_at=db_meeting.created_at
    )

@app.post("/documents/upload", status_code=status.HTTP_201_CREATED)
async def upload_document(
    startup_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Uploads a document file, saves metadata to database, and returns storage path.
    """
    doc_id = str(uuid.uuid4())
    content = await file.read()
    
    # Placeholder for Supabase upload:
    # supabase.storage.from_('documents').upload(path=f"{startup_id}/{file.filename}", file=content)
    storage_path = f"supabase://documents/{startup_id}/{doc_id}_{file.filename}"
    
    db_doc = data.Document(
        id=doc_id,
        startup_id=startup_id,
        file_name=file.filename,
        storage_path=storage_path
    )
    db.add(db_doc)
    db.commit()
    
    return {
        "document_id": doc_id,
        "startup_id": startup_id,
        "file_name": file.filename,
        "storage_path": storage_path,
        "size_bytes": len(content)
    }
