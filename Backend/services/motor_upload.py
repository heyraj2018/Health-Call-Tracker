import openpyxl
from database import get_db_connection
from datetime import datetime

def normalize_date(value):
    if isinstance(value, datetime):
        return value.strftime('%Y-%m-%d')
    try:
        return datetime.strptime(str(value), "%d-%m-%Y").strftime('%Y-%m-%d')
    except Exception:
        return None

def process_motor_excel(file_path):
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active

    conn = get_db_connection()
    cursor = conn.cursor()

    inserted, skipped = 0, 0

    for i, row in enumerate(sheet.iter_rows(min_row=2, values_only=True)):
        try:
            created_by, issued_date, customer_name, policy_number, regn_no, mobile_number, make, model, company = row

            # Validate mobile number
            if not mobile_number or not str(mobile_number).isdigit() or len(str(mobile_number)) != 10:
                print(f"Row {i+2} skipped: Invalid mobile number")
                skipped += 1
                continue

            # Validate and format date
            issued_date_fmt = normalize_date(issued_date)
            if not issued_date_fmt:
                print(f"Row {i+2} skipped: Invalid date format")
                skipped += 1
                continue

            # Check for duplicate policy number
            cursor.execute("SELECT COUNT(*) FROM health_customers WHERE policy_number = %s", (policy_number,))
            if cursor.fetchone()[0] > 0:
                print(f"Row {i+2} skipped: Duplicate policy number")
                skipped += 1
                continue

            # Insert into DB with updated fields
            cursor.execute("""
                INSERT INTO health_customers
                (created_by, issued_date, customer_name, policy_number, regn_no, mobile_number, make, model, company,
                 Health_Call_Status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                created_by, issued_date_fmt, customer_name, policy_number, regn_no, str(mobile_number), make, model, company,
                "New"
            ))
            inserted += 1

        except Exception as e:
            print(f"Row {i+2} error: {e}")
            skipped += 1

    conn.commit()
    cursor.close()
    conn.close()

    return inserted, skipped
