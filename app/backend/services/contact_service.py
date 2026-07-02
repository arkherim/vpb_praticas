import os

import httpx
from fastapi import HTTPException

BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email"
CONTACT_SUBJECT = "Mensagem da pagina de contato"
CONTACT_RECIPIENTS = [
    {"email": "biancaaparecidapaz26@gmail.com"},
    {"email": "victor.lermen@unoesc.edu.br"},
]


def send_contact_email_service(name: str, email: str, message: str) -> None:
    api_key = os.getenv("BREVO_API_KEY")
    sender_email = os.getenv("BREVO_SENDER_EMAIL")
    sender_name = os.getenv("BREVO_SENDER_NAME")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Configuracao ausente: BREVO_API_KEY nao definida",
        )

    if not sender_email:
        raise HTTPException(
            status_code=500,
            detail="Configuracao ausente: BREVO_SENDER_EMAIL nao definida",
        )

    if not sender_name:
        raise HTTPException(
            status_code=500,
            detail="Configuracao ausente: BREVO_SENDER_NAME nao definida",
        )

    payload = {
        "sender": {
            "email": sender_email,
            "name": sender_name,
        },
        "to": CONTACT_RECIPIENTS,
        "replyTo": {
            "email": email,
            "name": name,
        },
        "subject": CONTACT_SUBJECT,
        "textContent": f"Nome: {name}\nEmail: {email}\n\nMensagem:\n{message}",
    }

    headers = {
        "api-key": api_key,
        "accept": "application/json",
        "Content-Type": "application/json",
    }

    try:
        response = httpx.post(
            BREVO_EMAIL_ENDPOINT,
            json=payload,
            headers=headers,
            timeout=20,
        )

        if response.status_code >= 400:
            response_detail = "Erro ao enviar e-mail"
            try:
                error_payload = response.json()
                response_detail = (
                    error_payload.get("message")
                    or error_payload.get("code")
                    or error_payload.get("detail")
                    or response.text
                )
            except ValueError:
                if response.text:
                    response_detail = response.text

            raise HTTPException(status_code=502, detail=f"Falha na Brevo: {response_detail}")
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Erro de conexao com Brevo: {str(exc)}",
        ) from exc
