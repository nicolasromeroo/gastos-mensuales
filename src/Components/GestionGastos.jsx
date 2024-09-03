import React, { useState, useEffect } from 'react';
import ExpensesList from './ExpensesList';
import '../index.css'

const GestionarGastos = () => {
    const [nuevoGasto, setNuevoGasto] = useState({ nombre: '', monto: '' });
    const [personaSeleccionada, setPersonaSeleccionada] = useState('persona1');
    const [mensaje, setMensaje] = useState('');
    const [sueldo, setSueldo] = useState({
        persona1: 550000,
        persona2: 500000
    });
    const [gastos, setGastos] = useState([]);

    const fetchGastos = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/gastos?persona=${personaSeleccionada}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGastos(data);
        } catch (error) {
            setMensaje(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchGastos();
    }, [personaSeleccionada]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoGasto({ ...nuevoGasto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/gastos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...nuevoGasto,
                    monto: Number(nuevoGasto.monto),
                    persona: personaSeleccionada
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMensaje(`Success: ${data.mensaje}`);
            setNuevoGasto({ nombre: '', monto: '' });

            fetchGastos(); // Re-fetch gastos after adding new expense
        } catch (error) {
            setMensaje(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/gastos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchGastos(); // Re-fetch gastos after deletion
        } catch (error) {
            console.error('Error deleting gasto:', error);
        }
    };

    const handleEdit = (gasto) => {
        setNuevoGasto(gasto);
    };

    const calcularTotalGastos = () => {
        return gastos.reduce((total, gasto) => total + Number(gasto.monto), 0);
    };

    const saldoRestante = sueldo[personaSeleccionada] - calcularTotalGastos();

    return (
        <div className="container contenedor-origen mt-5">
            <h1 className="mb-4 text-white">Gastos del mes</h1>
            <div className="form-group">
                <label className='text-white' htmlFor="personaSelect">Selecciona una persona:</label>
                <select 
                    id="personaSelect" 
                    className="form-control mb-3" 
                    value={personaSeleccionada} 
                    onChange={(e) => setPersonaSeleccionada(e.target.value)}
                >
                    <option value="persona1">Nico</option>
                    <option value="persona2">Jaz</option>
                </select>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <label className='text-white' htmlFor="nombre">Nombre del gasto:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control"
                        value={nuevoGasto.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del gasto"
                    />
                </div>
                <div className="form-group mt-2">
                    <label className='text-white' htmlFor="monto">Monto del gasto:</label>
                    <input
                        type="number"
                        id="monto"
                        name="monto"
                        className="form-control"
                        value={nuevoGasto.monto}
                        onChange={handleChange}
                        placeholder="Monto del gasto"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Agregar Gasto</button>
            </form>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
            <h2 className="text-white mt-4">Sueldo Mensual</h2>
            <div className="form-group">
                <input
                    type="number"
                    className="form-control"
                    value={sueldo[personaSeleccionada]}
                    onChange={(e) => setSueldo({
                        ...sueldo,
                        [personaSeleccionada]: Number(e.target.value)
                    })}
                    placeholder="Ingrese sueldo"
                />
            </div>
            <h3 className="text-white mt-3">Saldo Restante: ${saldoRestante}</h3>
            <h2 className="text-white mt-4">Lista de Gastos</h2>
            <ExpensesList 
                persona={personaSeleccionada} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
            />
        </div>
    );
};

export default GestionarGastos;
