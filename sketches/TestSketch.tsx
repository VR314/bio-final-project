import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

let x = 50;
const y = 50;

const TestSketch: React.FC = (props) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    let cnv = p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  const mousePressed = (e: MouseEvent) => {
    console.log(e);
    props.setPageID(1);
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default TestSketch;
