import os
import smtplib
from email.message import EmailMessage

from fastapi import HTTPException

CONTACT_SUBJECT = "Mensagem da pagina de contato"
CONTACT_RECIPIENTS = [
    "biancaapareceidapaz26@gmail.com",
    "victor.lermen@unoesc.edu.br",
]


def send_contact_email_service(name: str, email: str, message: str) -> None:
    gmail_user = os.getenv("GMAIL_USER")
    gmail_app_password = os.getenv("GMAIL_APP_PASSWORD")

    if not gmail_user:
        raise HTTPException(
            status_code=500,
            detail="Configuracao ausente: GMAIL_USER nao definida",
        )

    if not gmail_app_password:
        raise HTTPException(
            status_code=500,
            detail="Configuracao ausente: GMAIL_APP_PASSWORD nao definida",
        )

    email_message = EmailMessage()
    email_message["Subject"] = CONTACT_SUBJECT
    email_message["From"] = gmail_user
    email_message["To"] = ", ".join(CONTACT_RECIPIENTS)
    email_message["Reply-To"] = email
    email_message.set_content(f"Nome: {name}\nEmail: {email}\n\nMensagem:\n{message}")

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(gmail_user, gmail_app_password)
            smtp.send_message(email_message)
    except smtplib.SMTPException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Erro SMTP ao enviar e-mail: {str(exc)}",
        ) from exc
