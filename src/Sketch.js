import React, { useEffect, useState } from 'react';
import * as P5 from 'p5';

export var p5 = null;

export default function Sketch(props) {
    const [canvas, setCanvas] = useState();
    const { sketch } = props;
    useEffect(() => {
        const makeSketch = sk => {
            Object.keys(sketch).forEach(name => {
                const value = sketch[name];
                if (typeof value === 'function') {
                    sk[name] = (...args) => {
                        p5 = sk;
                        return value(...args);
                    }
                }
            });
            const setup = sk.setup || (() => { });
            sk.setup = () => {
                const canvas = sk.createCanvas(props.width || 500, props.height || 500);
                setCanvas(canvas);
                setup();
            };
        };
        new P5(makeSketch);
    }, [props.width, props.height, sketch]);
    if (!canvas) {
        return <div>Creating canvas…</div>
    }
    return <div ref={ref => canvas.parent(ref)}></div>
}
