import React from 'react';

const ExpensesList = ({ persona, handleDelete, handleEdit }) => {
    const [expenses, setExpenses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/gastos?persona=${persona}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExpenses(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [persona]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul className="list-group">
            {expenses.map((expense) => (
                <li key={expense.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {expense.nombre}: ${expense.monto}
                    <div>
                        {/* <button 
                            className="btn btn-warning btn-sm me-2" 
                            onClick={() => handleEdit(expense)}
                        >
                            Editar
                        </button> */}
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(expense.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ExpensesList;
