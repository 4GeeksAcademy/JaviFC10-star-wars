"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, CharacterFavorites, PlanetFavorites, Characters
import requests

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body= {}
    response_body ["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200

# Create a route to authenticate your users and return JWTs.
# create_access_token() function is used to actually generate the JWT.
@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
        response_body['message'] = 'Listado de Planetas'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/planets/<int:planet_id>', methods=['GET'])
def planet(planet_id):
    response_body = {}
    url = f'https://swapi.tech/api/planets/{planet_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        result = data['result']['properties']
        print('data', result)
        response_body['message'] = f"Características del planeta {result['name']}"
        response_body['results'] = result
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
        response_body['message'] = 'Listado de Personajes'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/characters/<int:character_id>', methods=['GET'])
def character(character_id):
    response_body = {}
    url = f'https://swapi.tech/api/people/{character_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['result'])
        response_body['message'] = 'Detalle del personaje'
        response_body['results'] = data['result']['properties']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/users', methods=['GET'])
@jwt_required()
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'Lista de usuarios'
    response_body['results'] = result
    return response_body, 200
    

@api.route('/users/<int:user_id>/favorites-planets', methods=['GET', 'POST'])
def favorite_planets(user_id):
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = f"Planetas favoritos del usuario {user_id}"
        response_body['results'] = result
        return response_body, 200
    
    if request.method == 'POST':
        request_data = request.json
        row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id, PlanetFavorites.planet_id == request_data['planet_id'])).scalar()
        if row:
            response_body['message'] = "Este usuario ya tiene asignado este planeta"
            return response_body, 200
        row = PlanetFavorites(planet_id=request_data['planet_id'], user_id=user_id)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f"Post de planetas favoritos del usuario {user_id}"
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/users/<int:user_id>/favorites-characters', methods=['GET', 'POST'])
def favorite_characters(user_id):
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = f"Personajes favoritos del usuario {user_id}"
        response_body['results'] = result
        return response_body, 200   
    
    if request.method == 'POST':
        request_data = request.json
        row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id, CharacterFavorites.character_id == request_data['character_id'])).scalar()
        if row:
            response_body['message'] = "Este usuario ya tiene asignado este personaje"
            return response_body, 200
        row = CharacterFavorites(character_id=request_data['character_id'], user_id=user_id)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f"Post de personajes favoritos del usuario {user_id}"
        response_body['results'] = row.serialize()
        return response_body, 200
    

@api.route('/users/<int:user_id>/favorite-characters/<int:character_id>', methods=['DELETE']) 
def delete_favourite_character(user_id, character_id): 
        response_body = {}
        row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id, CharacterFavorites.character_id == character_id)).scalar()
        if row:
            db.session.delete(row)
            db.session.commit()
            response_body['message'] = "Registro eliminado correctamente"
            return response_body, 200  
        
        response_body['message'] = "No existe este registro"
        return response_body, 200  


@api.route('/users/<int:user_id>/favorite-planets/<int:planet_id>', methods=['DELETE']) 
def delete_favourite_planet(user_id, planet_id): 
        response_body = {}
        row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id, PlanetFavorites.planet_id == planet_id)).scalar()
        if row:
            db.session.delete(row)
            db.session.commit()
            response_body['message'] = "Registro eliminado correctamente"
            return response_body, 200  
        
        response_body['message'] = "No existe este registro"
        return response_body, 200  


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not row:
        response_body['message'] = "Bad username or password"
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    
    access_token = create_access_token(identity=email, additional_claims=claims )
    response_body['message'] = f'User {user["first_name"]} logged'
    response_body['access_token'] = access_token
    response_body['results'] = user
    return response_body, 200


@api.route("/favourite-planets", methods=['GET'])
@jwt_required()
def fav_planets():
    response_body = {}
    current_user = get_jwt()
    print("current_user", current_user)
    user_id = current_user['user_id']
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = f"Planetas favoritos del usuario {user_id}"
        response_body['results'] = result
        return response_body, 200
