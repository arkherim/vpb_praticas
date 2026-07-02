import os
import httpx

from fastapi import HTTPException

MAILERSEND_EMAIL_ENDPOINT = "https://api.mailersend.com/v1/email"
CONTACT_SUBJECT = "Mensagem da pagina de contato"
CONTACT_RECIPIENTS = [
    {"email": "victor.lermen@unoesc.edu.br"},
]
MAILERSEND_FROM_EMAIL = "no-reply@test-pzkmgq7m2kvl059v.mlsender.net"
MAILERSEND_FROM_NAME = "VPB Praticas"


def send_contact_email_service(name: str, email: str, message: str) -> None:
    api_key = os.getenv("MAILERSEND_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Configuracao ausente: MAILERSEND_API_KEY nao definida",
        )

    payload = {
        "from": {
            "email": MAILERSEND_FROM_EMAIL,
            "name": MAILERSEND_FROM_NAME,
        },
        "to": CONTACT_RECIPIENTS,
        "reply_to": {
            "email": email,
            "name": name,
        },
        "subject": CONTACT_SUBJECT,
        "text": f"Nome: {name}\nEmail: {email}\n\nMensagem:\n{message}",
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        response = httpx.post(
            MAILERSEND_EMAIL_ENDPOINT,
            json=payload,
            headers=headers,
            timeout=20,
        )

        if response.status_code >= 400:
            response_detail = "Erro ao enviar e-mail"
            try:
                error_payload = response.json()
                response_detail = error_payload.get("message") or error_payload.get("detail") or response.text
            except ValueError:
                if response.text:
                    response_detail = response.text

            raise HTTPException(status_code=502, detail=f"Falha no MailerSend: {response_detail}")
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Erro de conexao com MailerSend: {str(exc)}",
        ) from exc
