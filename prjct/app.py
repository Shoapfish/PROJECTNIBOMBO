from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'your_secret_key'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    passing_rate = db.Column(db.String(10))
    active_students = db.Column(db.Integer)

class Faculty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='instructor')  # dean/instructor
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'))

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    strand = db.Column(db.String(50))
    year = db.Column(db.Integer)

with app.app_context():
    db.create_all()
    # Seed sample data if empty
    if Program.query.count() == 0:
        programs = [
            Program(name="B.S. NURSING", category="Health Sciences", passing_rate="92%", active_students=2000),
            Program(name="B.S. MARINE ENGINEERING", category="Engineering", passing_rate="88%", active_students=1200),
            Program(name="B.S. MARINE TRANSPORTATION", category="Engineering", passing_rate="85%", active_students=1500),
            Program(name="B.S. CRIMINOLOGY", category="Social Sciences", passing_rate="79%", active_students=800),
            Program(name="B.S. TOURISM MANAGEMENT", category="Business", passing_rate="95%", active_students=600),
            Program(name="B.S. INFORMATION SYSTEM", category="Technology", passing_rate="90%", active_students=450),
            Program(name="B.S. ENTREPRENEURSHIP", category="Business", passing_rate="94%", active_students=300),
            Program(name="B.S. MANAGEMENT ACCOUNTING", category="Business", passing_rate="82%", active_students=400),
            Program(name="B. EARLY CHILDHOOD EDUCATION", category="Education", passing_rate="98%", active_students=200),
            Program(name="B. TECH-VOC TEACHER EDUCATION", category="Education", passing_rate="91%", active_students=180),
        ]
        for p in programs:
            db.session.add(p)
        
        faculty = [
            Faculty(name="Dr. Maria Santos", role="dean", program_id=1),
            Faculty(name="Prof. John Reyes", role="instructor", program_id=1),
            Faculty(name="Dean Miguel Cruz", role="dean", program_id=2),
            Faculty(name="Prof. Ana Lim", role="instructor", program_id=3),
        ]
        for f in faculty:
            db.session.add(f)
        
        students = [
            Student(name="Juan Dela Cruz", strand="STEM", year=12),
            Student(name="Maria Garcia", strand="ABM", year=11),
            Student(name="Pedro Santos", strand="HUMSS", year=12),
            Student(name="Ana Lim", strand="GAS", year=11),
            Student(name="John Reyes", strand="STEM", year=12),
        ]
        for s in students:
            db.session.add(s)
        
        db.session.commit()

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            new_user = User(username=request.form['username'], password=request.form['password'])
            db.session.add(new_user)
            db.session.commit()
            return render_template('register.html', success="Registration successful!")
        except:
            db.session.rollback()
            return render_template('register.html', error="That username is already taken!")
    return render_template('register.html')

@app.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(username=request.form['username'], password=request.form['password']).first()
    if user:
        session['user_name'] = user.username 
        return redirect(url_for('home_dashboard'))
    return render_template('login.html', error="Invalid credentials! Please try again.")

@app.route('/home')
def home_dashboard():
    if 'user_name' not in session:
        return redirect(url_for('home'))
    name = session['user_name']
    return render_template('home.html', name=name)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/search')
def search():
    if 'user_name' not in session:
        return redirect(url_for('home'))
    query = request.args.get('query', '')
    return render_template('search.html', query=query)

@app.route('/api/search', methods=['GET'])
def api_search():
    if 'user_name' not in session:
        return jsonify({'error': 'Login required'}), 401
    query = request.args.get('query', '').lower().strip()
    filter_type = request.args.get('filter', 'all')
    if len(query) < 1:
        return jsonify({'results': []})

    results = []
    if filter_type in ['all', 'courses', 'programs']:
        programs = Program.query.filter(Program.name.ilike(f'%{query}%')).limit(10).all()
        results.extend([{'type': 'program', 'name': p.name, 'category': p.category, 'passing_rate': p.passing_rate} for p in programs])
    if filter_type in ['all', 'deans', 'faculty']:
        faculty = Faculty.query.filter(Faculty.name.ilike(f'%{query}%')).limit(10).all()
        results.extend([{'type': 'faculty', 'name': f.name, 'role': f.role} for f in faculty])
    if filter_type in ['all', 'students']:
        students = Student.query.filter((Student.name.ilike(f'%{query}%')) | (Student.strand.ilike(f'%{query}%'))).limit(10).all()
        results.extend([{'type': 'student', 'name': s.name, 'strand': s.strand, 'year': s.year} for s in students])

    return jsonify({'results': results[:20]})

@app.route('/rates')
def rates():
    return render_template('rates.html')

@app.route('/deans')
def deans():
    return render_template('deans.html')


# Calendar routes


@app.route('/calendar/<name>')
def calendar(name):
    return render_template('calendar.html', name=name)

@app.route('/calendar/december')
def december():
    return render_template('calendar/december.html')

@app.route('/calendar/february')
def february():
    return render_template('calendar/february.html')

@app.route('/calendar/march')
def march():
    return render_template('calendar/march.html')

@app.route('/calendar/april')
def april():
    return render_template('calendar/april.html')

@app.route('/calendar/may')
def may():
    return render_template('calendar/may.html')

@app.route('/calendar/june')
def june():
    return render_template('calendar/june.html')

@app.route('/calendar/july')
def july():
    return render_template('calendar/july.html')

@app.route('/calendar/august')
def august():
    return render_template('calendar/august.html')

@app.route('/calendar/september')
def september():
    return render_template('calendar/september.html')

@app.route('/calendar/october')
def october():
    return render_template('calendar/october.html')

@app.route('/calendar/november')
def november():
    return render_template('calendar/november.html')
    

    # routes para sa department

    
# routes para sa department

@app.route('/dept/exact')
def dept_exact():
    return render_template('programs/exact.html')   

@app.route('/dept/education')
def dept_education():
    return render_template('programs/education.html')   

@app.route('/dept/criminology')
def dept_criminology():
    return render_template('programs/crim.html') 

@app.route('/dept/nstp')
def dept_nstp():
    return render_template('programs/nstp.html')   

@app.route('/dept/information-system')
def dept_is():
    return render_template('programs/is.html')   

@app.route('/dept/business')
def dept_business():
    return render_template('programs/buisnessad.html')   

@app.route('/dept/nursing')
def dept_nursing():
    return render_template('programs/nursing.html')   

@app.route('/dept/tourism')
def dept_tourism():
    return render_template('programs/tourism.html')   

@app.route('/dept/maritime')
def dept_maritime():
    return render_template('programs/maritime.html')   

@app.route('/dept/gas')
def dept_gas():
    return render_template('programs/gas.html')   

@app.route('/dept/humss')
def dept_humss():
    return render_template('programs/humss.html')   

@app.route('/dept/stem')
def dept_stem():
    return render_template('programs/stem.html')  

@app.route('/dept/abm')
def dept_abm():
    return render_template('programs/abm.html')   

if __name__ == '__main__':
    app.run(debug=True, port=5000)
