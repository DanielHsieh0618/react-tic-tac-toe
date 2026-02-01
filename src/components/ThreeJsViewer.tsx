
import { useEffect, useRef } from 'react';
// @ts-expect-error Three.js does not have TypeScript type definitions
import * as THREE from 'three';

export default function ThreeJsViewer() {
    const divRef = useRef<HTMLDivElement>(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 200, 200 );


     useEffect(() => {
        if (divRef.current) {
        divRef.current.appendChild( renderer.domElement );
        }
    }, [renderer.domElement]); // Empty dependency array ensures this runs once after mounting

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: "#ff0000" } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
    renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  return (
    <div ref={divRef}></div>
  );
}