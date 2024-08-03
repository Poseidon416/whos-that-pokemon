import os
from flask import render_template, request, redirect, url_for, abort
from werkzeug.utils import secure_filename
from main import *

from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    filename = secure_filename(uploaded_file.filename)
    if filename != '':
        file_ext = os.path.splitext(filename)[1]
        if filename not in app.config['UPLOAD_EXTENSIONS']:
            abort(400)
        uploaded_file.save(uploaded_file.filename)
    return ('', 204) #Status 204: No Content

