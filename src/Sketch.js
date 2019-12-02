import React, {
    useEffect,
    useState
} from 'react';
import * as P5 from 'p5';

const P5_SENTINEL = {
    error: "p5 used outside the dynamic scope of an exported function."
}

/** A global variable that holds the current sketch during the dynamic scope of
 * each sketch function invocatioh. This works because JavaScript is
 * single-threaded. */
export var p = P5_SENTINEL;

export default function Sketch(props) {
    const [canvas, setCanvas] = useState();
    const {
        sketch
    } = props;
    useEffect(() => {
        const makeSketch = sk => {
            Object.keys(sketch).forEach(name => {
                const value = sketch[name];
                if (typeof value === 'function') {
                    sk[name] = (...args) => {
                        try {
                            p = sk;
                            return value(...args);
                        } finally {
                            p = P5_SENTINEL;
                        }
                    }
                }
            });
            const setup = sk.setup || (() => {});
            sk.setup = () => {
                const canvas = sk.createCanvas(props.width || 500, props.height || 500);
                setCanvas(canvas);
                setup();
            };
        };
        new P5(makeSketch);
    }, [props.width, props.height, sketch]);
    if (!canvas) {
        return <div > Creating canvas… < /div>
    }
    return <div ref = {
        ref => canvas.parent(ref)
    } > < /div>
}
