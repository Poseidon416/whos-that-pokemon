import os
from flask import render_template, request, redirect, url_for, abort
from werkzeug.utils import secure_filename
import imghdr
from app import app

@app.route('/')
def index():
    return render_template('index.html')

def validate_image(stream):
    header = stream.read(512)
    stream.seek(0)
    format = imghdr.what(None, header)
    if not format:
        return None
    return '.' + (format if format != 'jpeg' else 'jpg')

@app.route('/', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    filename = secure_filename(uploaded_file.filename)
    if filename != '':
        file_ext = os.path.splitext(filename)[1]
        if file_ext not in app.config['UPLOAD_EXTENSIONS'] or file_ext != validate_image(uploaded_file.stream):
            return ('Invalid image', 400)
        uploaded_file.save('input'+file_ext)
    return ('', 204) #Status 204: No Content

@app.errorhandler(413)
def too_large(e):
    return ('Image is too large', 413)
