'''
Business: API для управления треками и релизами музыканта
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с attributes: request_id, function_name
Returns: HTTP response dict с данными треков и релизов
'''
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    query_params = event.get('queryStringParameters', {}) or {}
    resource = query_params.get('resource', '')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if resource == 'tracks':
            if method == 'GET':
                cursor.execute('SELECT * FROM tracks ORDER BY id')
                tracks = cursor.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'tracks': tracks}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'POST':
                body = json.loads(event.get('body', '{}'))
                cursor.execute(
                    "INSERT INTO tracks (title, duration, plays) VALUES (%s, %s, %s) RETURNING *",
                    (body['title'], body['duration'], body.get('plays', '0'))
                )
                track = cursor.fetchone()
                conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'track': track}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'PUT':
                body = json.loads(event.get('body', '{}'))
                cursor.execute(
                    "UPDATE tracks SET title = %s, duration = %s, plays = %s WHERE id = %s RETURNING *",
                    (body['title'], body['duration'], body['plays'], body['id'])
                )
                track = cursor.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'track': track}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'DELETE':
                body = json.loads(event.get('body', '{}'))
                cursor.execute("DELETE FROM tracks WHERE id = %s", (body['id'],))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Track deleted'}),
                    'isBase64Encoded': False
                }
        
        elif resource == 'releases':
            if method == 'GET':
                cursor.execute('SELECT * FROM releases ORDER BY year DESC, id DESC')
                releases = cursor.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'releases': releases}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'POST':
                body = json.loads(event.get('body', '{}'))
                cursor.execute(
                    "INSERT INTO releases (title, year, cover_url, tracks_count, type) VALUES (%s, %s, %s, %s, %s) RETURNING *",
                    (body['title'], body['year'], body['cover_url'], body['tracks_count'], body['type'])
                )
                release = cursor.fetchone()
                conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'release': release}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'PUT':
                body = json.loads(event.get('body', '{}'))
                cursor.execute(
                    "UPDATE releases SET title = %s, year = %s, cover_url = %s, tracks_count = %s, type = %s WHERE id = %s RETURNING *",
                    (body['title'], body['year'], body['cover_url'], body['tracks_count'], body['type'], body['id'])
                )
                release = cursor.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'release': release}, default=str),
                    'isBase64Encoded': False
                }
            
            elif method == 'DELETE':
                body = json.loads(event.get('body', '{}'))
                cursor.execute("DELETE FROM releases WHERE id = %s", (body['id'],))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Release deleted'}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Not found'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()