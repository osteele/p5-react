# React + p5.js

This application defines a React component, Sketch, that renders a p5.js sketch.

## Usage

1. Copy `Sketch.js` into your project.

2. Add the npm p5 module to `package.json`:

   ```sh
   npm install --save p5
   ```

3. Create the sketch. The sketch can be written as a normal p5.js sketch, except that:

   1. It must begin wth `import { p } from './Sketch.js'`
   2. Functions that mean something special to p5.js, such as `setup` and
      `draw`, must be `export`-ed.
   3. It is running in [React instance
      mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).
      React methods must be accessed via the `p.` prefix; for example,
      `p.rect(…)`. A function that is called after the `export`-ed function has
      returned, must use a captured value of `p`.

   See `src/sketch1.js` and `src/sketch2.js` as examples.

4. Import the sketch and use it as a component:

   ```jsx
   import * as sketch1 from './sketch1';

     <Sketch sketch={sketch1} width={200} height={100} />
   ```

   See `src/App.js` for examples.

## Limitations

* The `setup` function mustn't create the canvas. (This limitation is easy to
  remove, I just haven't done it yet.)

* Resizing the component, by changing the value of its `width` or `height`
  properties, creates a new sketch without discarding the old one. I haven't
  tested to see what happens in this case.

* If a sketch uses global (module-level) variables, it probably doesn't make
  sense to use in several instances of Sketch. This could be fixed by
  recognizing if the module is a function, and using this to create the
  instance-mode sketch.

## License

MIT
