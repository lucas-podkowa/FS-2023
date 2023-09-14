import { useEffect, useState } from "react"

export function ComponenteHook() {
    const [datos, actualizar] = useState(
        {
            nombre: 'lucas',
            apellido: 'Podkowa'
        }
    );

    const concatenar = () => {
        actualizar({
            nombre: datos.nombre,
            apellido: datos.apellido,
            concatenado: datos.nombre + ' ' + datos.apellido
        })
    }

    return (
        <div>
            <h2>nombre contiene: {datos.nombre}</h2>
            <h2>apellido contiene: {datos.apellido}</h2>

            <hr />
            <button onClick={concatenar} >Concatenar</button>
            <h3>Concatedado con setState: {datos.concatenado}</h3>
        </div>
    )

}