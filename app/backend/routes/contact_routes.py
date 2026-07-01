from fastapi import APIRouter

from app.backend.schemas.contact_schema import ContactRequest, ContactResponse
from app.backend.services.contact_service import send_contact_email_service

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
def send_contact_message(payload: ContactRequest):
    send_contact_email_service(payload.name, payload.email, payload.message)
    return ContactResponse(message="Mensagem enviada com sucesso")
