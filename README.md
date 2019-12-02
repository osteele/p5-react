# React + p5.js

This application defines a Sketch component, that renders a p5.js sketch inside
a React component.

## Usage

1. Copy `Sketch.js` into your project.

2. Add the npm p5 module to `package.json`:

   ```sh
   npm install --save p5
   ```

3. Create the sketch. The sketch can be written as a normal p5.js sketch, except that:

   1. It must begin wth `import { p5 } from './Sketch.js'`
   2. It is running in [React instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).
      React methods must be accessed via the `p5.` prefix; for example, `p5.rect(…)`.

   See `src/sketch1.js` and `src/sketch2.js` as examples.

4. Import the sketch and use it as a component:

   ```jsx
   import * as sketch1 from './sketch1';

     <Sketch sketch={sketch1} width={200} height={100} />
   ```

   See `src/App.js` for examples.

## License

MIT
