
import { useEffect, useRef } from 'react';
// @ts-expect-error Three.js does not have TypeScript type definitions
import * as THREE from 'three';

export default function ThreeJsViewer() {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!divRef.current) return;

        // Clear any existing canvas from React Strict Mode double effect
        divRef.current.innerHTML = '';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, 200 / 200, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( 200, 200 );

        divRef.current.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: "#ff0000" } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        }
        renderer.setAnimationLoop( animate );

        // Cleanup on unmount
        return () => {
            renderer.setAnimationLoop( null );
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (divRef.current) {
                divRef.current.innerHTML = '';
            }
        };
    }, []);

  return (
    <div ref={divRef}></div>
  );
}