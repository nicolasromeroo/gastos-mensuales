from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Permite todas las solicitudes CORS

gastos_db = {
    "persona1": [
        {"id": 1, "nombre": "Renta", "monto": 500},
        {"id": 2, "nombre": "Comida", "monto": 150},
        {"id": 3, "nombre": "Servicios", "monto": 100}
    ],
    "persona2": [
        {"id": 4, "nombre": "Renta", "monto": 600},
        {"id": 5, "nombre": "Comida", "monto": 200}
    ]
}

@app.route('/api/gastos', methods=['GET'])
def obtener_gastos():
    persona = request.args.get('persona', 'persona1')
    gastos = gastos_db.get(persona, [])
    return jsonify(gastos)

@app.route('/api/gastos', methods=['POST'])
def agregar_gasto():
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 415

    datos = request.get_json()
    persona = datos.get('persona')
    if persona not in gastos_db:
        gastos_db[persona] = []
    
    nuevo_id = max(gasto['id'] for gasto in gastos_db[persona]) + 1 if gastos_db[persona] else 1
    datos['id'] = nuevo_id
    gastos_db[persona].append(datos)
    return jsonify({"mensaje": "Gasto agregado", "datos": datos}), 201

@app.route('/api/gastos/<int:id>', methods=['DELETE'])
def eliminar_gasto(id):
    for persona, gastos in gastos_db.items():
        for gasto in gastos:
            if gasto['id'] == id:
                gastos.remove(gasto)
                return jsonify({"mensaje": "Gasto eliminado"}), 200
    return jsonify({"error": "Gasto no encontrado"}), 404

@app.route('/api/gastos/<int:id>', methods=['PUT'])
def editar_gasto(id):
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 415

    datos = request.get_json()
    for persona, gastos in gastos_db.items():
        for gasto in gastos:
            if gasto['id'] == id:
                gasto.update(datos)
                return jsonify({"mensaje": "Gasto actualizado", "datos": gasto}), 200
    return jsonify({"error": "Gasto no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
