from pydantic import BaseModel


class BankResponse(BaseModel):
    id: int
    code: int | None = None
    ispb: str
    name: str
    full_name: str

    class Config:
        from_attributes = True
