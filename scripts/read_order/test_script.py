import json 

def sampleFunction (parametro1, parametro2, index):
    results = {
        'index': index,
        'status': 'SUCCESS',
        'data': [parametro1, parametro2]
    }

    jsonResponse = json.dumps(results)

    return jsonResponse