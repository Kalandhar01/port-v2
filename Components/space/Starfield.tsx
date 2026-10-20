"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const COUNT = 2800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const white = new THREE.Color("#E6E9F2");
    const cyan = new THREE.Color("#7DF9FF");
    const violet = new THREE.Color("#8B5CF6");

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 220;
      positions[i3 + 2] = (Math.random() - 0.5) * 160;

      const roll = Math.random();
      const color = roll > 0.94 ? cyan : roll > 0.88 ? violet : white;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 1.6 + 0.3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (180.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let scrollOffset = 0;
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      scrollOffset = scrollable > 0 ? window.scrollY / scrollable : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      stars.rotation.y = t * 0.015 + mouse.x * 0.06;
      stars.rotation.x = t * 0.008 + mouse.y * 0.04;
      camera.position.z = 60 - scrollOffset * 18;
      camera.position.y = scrollOffset * 8;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
