from flask import Flask
from flask_cors import CORS
from routes.motor_routes import motor_routes
from routes.calls import calls_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(motor_routes)
app.register_blueprint(calls_bp)

if __name__ == '__main__':
    app.run(debug=True)
