import React, { useState } from "react";
import * as P5 from "p5";

const P5_SENTINEL = {
    error: "p5 used outside the dynamic scope of an exported function."
};

/** A global variable that holds the current sketch during the dynamic scope of
 * each sketch function invocatioh. This works because JavaScript is
 * single-threaded. */
export var p = P5_SENTINEL;

export default function Sketch(props) {
    const { sketch } = props;
    const [instance, setInstance] = useState();

    function makeInstance(ref) {
        const makeSketch = sk => {
            Object.keys(sketch).forEach(name => {
                const value = sketch[name];
                if (typeof value === "function") {
                    sk[name] = (...args) => {
                        try {
                            p = sk;
                            return value(...args);
                        } finally {
                            p = P5_SENTINEL;
                        }
                    };
                }
            });
            const setup = sk.setup || (() => {});
            sk.setup = () => {
                sk.createCanvas(props.width || 500, props.height || 500);
                setup();
            };
        };
        const p5 = new P5(makeSketch, ref);
        setInstance(p5);
    }
    function removeInstance() {
        instance.remove();
        setInstance(null);
    }
    return (
        <div
            ref={ref =>
                ref ? instance || makeInstance(ref) : instance && removeInstance()
            }
        />
    );
}
