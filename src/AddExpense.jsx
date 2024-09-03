import React, { useState } from 'react';

const AddExpense = () => {
    const [expense, setExpense] = useState({ nombre: '', monto: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/gastos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResponseMessage(`Success: ${data.mensaje}`);
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Añadir gasto</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    value={expense.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del gasto"
                />
                <input
                    type="number"
                    name="monto"
                    value={expense.monto}
                    onChange={handleChange}
                    placeholder="Monto del gasto"
                />
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddExpense;
