import React from 'react';
import './App.css';
import Sketch from './Sketch'
import * as sketch1 from './sketch1';
import * as sketch2 from './sketch2';

function App() {
  return <div className="App" >
    <h1>First Sketch</h1>
    <p>
      This component renders a p5.js sketch that is imported from <code>src/sketch1.js</code>.
      Mouse over it to interact with the particles.
    </p>
    <Sketch sketch={sketch1} width={200} height={100} />

    <h1>Second Sketch</h1>
    <p>
      This component renders a p5.js sketch that is imported from <code>src/sketch2.js</code>.
      Click to add a particle.
    </p>
    <Sketch sketch={sketch2} />
  </div>
}

export default App;
