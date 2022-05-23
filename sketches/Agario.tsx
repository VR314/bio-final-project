import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const canvasSize = 700;

interface Vector {
  x: number;
  y: number;
}

class Blob {
  active: boolean;
  main: boolean;
  position: Vector;
  direction: Vector | null;
  speed: number;
  radius: number;
  color: string;

  constructor(p5: p5Types, position, radius, main, color) {
    this.active = true;
    this.main = main;
    this.position = position;
    this.direction = null;
    this.speed = 10;
    this.radius = radius;
    this.color = color
      ? color
      : '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  eat(b: Blob) {
    this.radius = Math.sqrt(this.radius * this.radius + b.radius * b.radius);
    b.active = false;
  }
}

const TestSketch: React.FC = (props) => {
  let main: Blob;
  let smalls: Blob[] = [];
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    let cnv = p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
    main = new Blob(p5, { x: 50, y: 50 }, 30, true, '#228C22');
    for (let i = 0; i < 10; i++) {
      smalls.push(
        new Blob(
          p5,
          { x: Math.random() * canvasSize, y: Math.random() * canvasSize },
          10,
          false,
          null
        )
      );
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.stroke('#00');
    p5.strokeWeight(4);
    p5.fill(main.color);
    p5.ellipse(main.position.x, main.position.y, main.radius, main.radius);

    p5.strokeWeight(0.5);
    for (let b of smalls) {
      p5.fill(b.color);
      p5.ellipse(b.position.x, b.position.y, b.radius, b.radius);
    }
  };

  const mousePressed = (e: MouseEvent) => {
    console.log(e);
    // props.setPageID(1);
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default TestSketch;
