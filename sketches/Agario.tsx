import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const canvasSize = 400;

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
    this.direction = { x: 0, y: 0 };
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
    main.position = {
      x: main.position.x + (main.direction.x * main.speed) / 60,
      y: main.position.y - (main.direction.y * main.speed) / 60,
    }; // subtract in y direction bc up is "negative y"

    p5.background(0);
    p5.stroke('#00');
    p5.strokeWeight(4);
    p5.fill(main.color);
    p5.ellipse(main.position.x, main.position.y, main.radius, main.radius);
    p5.strokeWeight(0.5);
    smalls = smalls.filter((b) => b.active);
    for (let b of smalls) {
      p5.fill(b.color);
      p5.ellipse(b.position.x, b.position.y, b.radius, b.radius);
    }
  };

  const keyReleased = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        main.direction = { x: 0, y: 10 };
        break;
      case 'ArrowDown':
        main.direction = { x: 0, y: -10 };
        break;
      case 'ArrowRight':
        main.direction = { x: 10, y: 0 };
        break;
      case 'ArrowLeft':
        main.direction = { x: -10, y: 0 };
        break;
      default:
        console.log('extra key pressed');
        break;
    }
  };

  return <Sketch setup={setup} draw={draw} keyReleased={keyReleased} />;
};

export default TestSketch;
