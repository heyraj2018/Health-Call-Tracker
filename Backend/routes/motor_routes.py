from flask import Blueprint, request, jsonify
from services.motor_upload import process_motor_excel
import os
from config import UPLOAD_FOLDER_MOTOR
from werkzeug.utils import secure_filename

motor_routes = Blueprint('motor_routes', __name__)

@motor_routes.route('/upload-motor-pa', methods=['POST'])
def upload_motor_pa():
    file = request.files.get('excel')
    if not file:
        return jsonify({'message': 'No file uploaded'}), 400

    filename = secure_filename(file.filename)
    os.makedirs(UPLOAD_FOLDER_MOTOR, exist_ok=True)
    file_path = os.path.join(UPLOAD_FOLDER_MOTOR, filename)
    file.save(file_path)

    inserted, skipped = process_motor_excel(file_path)
    return jsonify({
        'message': 'Upload complete',
        'inserted': inserted,
        'skipped': skipped
    }), 200
