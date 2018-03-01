from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flaskext.mysql import MySQL



mysql = MySQL()
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'codykessler'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'workout'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'


mysql.init_app(app)

api = Api(app)
#this needs to be a get
class AuthenticateUser(Resource):
    def post(self):
        try:
            # Parse the arguments

            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address for Authentication')
            parser.add_argument('password', type=str, help='Password for Authentication')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_AuthenticateUser',(_userEmail,))
            data = cursor.fetchall()
            if(len(data)>0):
                if(str(data[0][2])==_userPassword):
                    return {'status':200,'UserID':str(data[0][0])}
                else:
                    return {'status':100,'message':'Authentication failure'}
            if(len(data)==0):
                return {'status':100,'message':'Authentication Failure'}
        except Exception as e:
            return {'error': str(e)}


class GetAllItems(Resource):
    def get(self):
        try: 
            parser = reqparse.RequestParser()
            parser.add_argument('userID', type=str)
            args = parser.parse_args()
            _userID = args['userID']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_GetAllItems',(_userID,))
            data = cursor.fetchall()

            exercise_list=[];
            for item in data:

                i = {
                    'routineName':item[0],
                    'exerciseName':item[1],
                    'exerciseID':item[2]
                }
                exercise_list.append(i)

            return {'StatusCode':'200','Exercises':exercise_list}

        except Exception as e:
            return {'error': str(e)}

class AddItem(Resource):
    def post(self):
        try: 
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('userID', type=str)
            parser.add_argument('exerciseName', type=str)
            args = parser.parse_args()

            _userID = args['userID']
            _exercise = args['exerciseName']


            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_AddItems',(_userID,_exercise))
            data = cursor.fetchall()

            conn.commit()
            return {'StatusCode':'200','Message': 'Success'}

        except Exception as e:
            return {'error': str(e)}
        
class RemoveItem(Resource):
    def post(self):
        try: 
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('exerciseID', type=str)
            args = parser.parse_args()

            _exerciseID = args['exerciseID']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_RemoveItems',(_exerciseID,))
            data = cursor.fetchall()

            conn.commit()
            return {'StatusCode':'200','Message': 'Success'}

        except Exception as e:
            return {'error': str(e)}
        
                


class CreateUser(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('spCreateUser',(_userEmail,_userPassword))
            data = cursor.fetchall()

            if len(data) is 0:
                conn.commit()
                return {'status':200,'message':'User Creation Success'}
            else:
                return {'status':1000,'message': str(data[0])}

        except Exception as e:
            return {'error': str(e)}



api.add_resource(CreateUser, '/CreateUser')
api.add_resource(AuthenticateUser, '/AuthenticateUser')
api.add_resource(AddItem, '/AddItem')
api.add_resource(GetAllItems, '/GetAllItems')
api.add_resource(RemoveItem, '/RemoveItem')

if __name__ == '__main__':
    app.run(debug=True)
