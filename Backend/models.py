from sqlalchemy import Column, Integer, String, Date, Boolean
from database import Base

class CallRecord(Base):
    __tablename__ = 'Health_Customers'

    id = Column(Integer, primary_key=True)
    created_by = Column(String)
    issued_date = Column(Date)
    customer_name = Column(String)
    policy_number = Column(String)
    regn_no = Column(String)
    mobile_number = Column(String)
    make = Column(String)
    model = Column(String)
    company = Column(String)
    Health_Call_Status = Column(String)
    Call_Back_Asked = Column(Boolean)
    Quote_Sent = Column(Boolean)
    Did_Not_Pick = Column(Boolean)
    Health_Policy_Issued = Column(Boolean)
