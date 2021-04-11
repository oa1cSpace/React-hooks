import React, {useState} from "react";

function initialCounter() {
    console.log('Calculating the initial state of counter...');
    return Math.trunc(Math.random() * 20);
}

function State() {
    // const [count, setCount] = useState(0);
    // используем ф-цию для генерации initialState:
// const [count, setCount] = useState(initialCounter());
// при изменении стейта например при handleIncrease или handleDecrease наш компонент рендерится заново
// и function initialCounter() вызывается сново. для того, что бы предотвратить это
// и улучшить производительность (наприр в initialCounter() были бы какието сложные и долгие вычисления) используем колбэк
// в таком случае initialCounter() будет вызванна единоразово!
    const [count, setCount] = useState(() => initialCounter());
    function handleIncrease () {
        setCount(count + 1);
        // что если изменить стейт на +2 вызвав подряд два раза setCount?

        // setCount(count +1);
        // setCount(count +1);

        // в результате count изменится только на +1 т.к. после первого setCount должен произойти цикл рендеринга
        // чтобы сам counter  изменился, но по скольку мы вызываем его параллельно этого не происходит.
    }
// решение проблемы:
// call back in hook
// изменение состояния основываясь на предыдущем состоянии!
    // function handleIncrease () {
    //   setCount((prevState) => {
    //     return (prevState + 1);
    //   })
    //   // тоже самое, только в сокращенном виде
    //   setCount(prev => prev + 1);
    //   // теперь counter будет увеличиваться на +2
    // }
    function handleDecrease () {
        setCount(count - 1);
    }
    const [state, setState] = useState({
        title: 'useState hook!',
        date: new Date(),
    });
// при таком подходе наш объект будет полностью изменен и будет содержать только новый title
// function handleChangeTitle() {
//   setState({
//     title: 'some new title'
//   });
// }
// решение проблемы
    function handleChangeTitle() {
        setState((prev) => {
            // console.log('--- prev: ', prev);
            return {
                ...prev,
                title: 'some new title'
            }
        });
    }

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={handleIncrease} className="btn, btn-success">Increase</button>
            <button onClick={handleDecrease} className="btn, btn-warning">Decrease</button>
            <button onClick={handleChangeTitle} className="btn">Change title</button>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}

export default State;
