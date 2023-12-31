const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

function Title() {
    return (
        <>
            <h1 style={{ color: 'orange', fontSize: '32px', textAlign: 'center' }}>Codecamp Academy 01</h1>
        </>
    )
}

function Counter(props) {
    return (
        <div className="counter">
            <button onClick={() => props.hdlUpdate(props.item.id, 1)}>+</button>
            <h2>{props.item.number}</h2>
            <button onClick={() => props.hdlUpdate(props.item.id, -1)}>-</button>
            <button onClick={() => props.hdlUpdate(props.item.id, -props.item.number)}>C</button>
            <button style={{ backgroundColor: '#ff9999', fontSize: '32px' }} onClick={() => props.hdlDelete(props.item.id)}>X</button>
        </div>
    );
}

function Suminfo(props) {
    const stTitle = {
        color: props.color,
        fontSize: props.size === 'Nack' ? '50px' : '32px'
    }

    return (
        <div className="suminfo">
            {/* ผลรวม Sum ทั้งหมด */}
            <h1 style={stTitle}>Sum : {props.sum}</h1>
        </div>
    )
}

function App() {
    const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

    const hdlUpdate = (id, num) => {
        const cloneCounters = [...counters];
        let idx = cloneCounters.findIndex(el => el.id === id);

        cloneCounters[idx].number = Math.max(0, cloneCounters[idx].number + num);

        setCounters(cloneCounters);
    }

    const hdlAddcounter = () => {
        let newid = counters.length === 0 ? 1 : counters.at(-1).id + 1;
        setCounters([...counters, { id: newid, number: 0 }]);
    }
    const sum = counters.reduce((acc, counter) => acc + counter.number, 0);

    const hdlDelCounter = (id) => {
        const updatedCounters = counters.filter((counter) => counter.id !== id);
        setCounters(updatedCounters);
    };

    return (
        <>
            <Title />
            <button className="AddCounter" onClick={hdlAddcounter}>Add Counter</button>
            <Suminfo color="red" size="Nack" sum={sum} />
            {counters.map(el => {
                return <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlDelete={hdlDelCounter} />;
            })}
        </>
    )
}

