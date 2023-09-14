import { useEffect, useState } from "react"

export function Contador_Hook() {

    const [count, setCount] = useState(90);


    useEffect(() => {
        document.title = `Contador en  ${count}`;

        return () => { document.title = `Hola mundo`; }
    }, []);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Sumar</button>
            <button onClick={() => setCount(count - 1)}>Restar</button>
            <h1>{count}</h1>
        </>

    )
}

