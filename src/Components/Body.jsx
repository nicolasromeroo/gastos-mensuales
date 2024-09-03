import React, { useEffect } from 'react';

const Body = () => {
    useEffect(() => {
        fetch('http://localhost:5000/api/gastos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Asegúrate de que el Content-Type sea JSON
            },
            body: JSON.stringify({
                gasto: 100,
                descripcion: 'Compra de materiales',
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return <div>Body Component</div>;
};

export default Body;

