from flask import Flask, render_template, request

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return render_template('index.html')
    else:
        test = request.form.get('test')
        return render_template("index.html", test=test)



@app.route("/about")
def about():
    return render_template("about.html")




if __name__ == '__main__':
    app.run(debug=True)



