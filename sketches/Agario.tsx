import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

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

  constructor(p5: p5Types, position, radius, main) {
    this.active = true;
    this.main = main;
    this.position = position;
    this.direction = null;
    this.speed = 10;
    this.radius = radius;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
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
    let cnv = p5.createCanvas(500, 500).parent(canvasParentRef);
    main = new Blob(p5, { x: 50, y: 50 }, 30, true);
    for (let i = 0; i < 10; i++) {
      smalls.push(
        new Blob(
          p5,
          { x: Math.random() * 50, y: Math.random() * 500 },
          10,
          false
        )
      );
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.fill(main.color);
    p5.ellipse(main.position.x, main.position.y, main.radius, main.radius);
    for (let b of smalls) {
      p5.fill(b.color);
      p5.ellipse(b.position.x, b.position.y, b.radius, b.radius);
    }
  };

  const mousePressed = (e: MouseEvent) => {
    console.log(e);
    props.setPageID(1);
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default TestSketch;
