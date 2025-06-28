# Backend/routes/calls.py

from flask import Blueprint, jsonify
from database import get_db_connection

calls_bp = Blueprint('calls', __name__)

@calls_bp.route('/api/calls', methods=['GET'])
def get_calls():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            id,
            created_by,
            issued_date,
            customer_name,
            policy_number,
            regn_no,
            mobile_number,
            make,
            model,
            company,
            Health_Call_Status,
            `Last Updated by User`,
            Update_History
        FROM health_customers
    """)
    records = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(records)
