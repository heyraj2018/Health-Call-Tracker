from sqlalchemy import Column, Integer, String,DateTime,JSON, Date, Boolean
from database import Base

class CallRecord(Base):
    __tablename__ = 'call_records'

    id = Column(Integer, primary_key=True, index=True)
    created_by = Column(String(100))
    issued_date = Column(Date)
    customer_name = Column(String(255))
    policy_number = Column(String(100))
    regn_no = Column(String(100))
    mobile_number = Column(String(20))
    make = Column(String(100))
    model = Column(String(100))
    company = Column(String(100))
    Health_Call_Status = Column(String(100), default='New')
    callback_datetime = Column(DateTime, nullable=True)
    Last_Updated_By_User = Column(String(100), nullable=True)
    Update_History = Column(JSON, default=[])

