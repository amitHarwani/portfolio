import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub } from 'react-icons/fi';
import data from '../../data/portfolioData.json';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';
import './Hero.css';

/* ---- Floating geometric shapes ---- */
function FloatingShape({ position, color, scale = 1, speed = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
            meshRef.current.rotation.y += 0.008 * speed;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.3;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.25}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

/* ---- Particle cloud ---- */
function ParticleCloud({ count = 200 }) {
    const points = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.02;
            points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#6c63ff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

/* ---- Glowing orb ---- */
function GlowOrb({ position, color }) {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

/* ---- 3D Scene ---- */
function HeroScene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#6c63ff" />
            <pointLight position={[-5, -3, 3]} intensity={0.5} color="#00d4aa" />

            <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={1.5} />
            <ParticleCloud />

            <FloatingShape position={[-4, 2, -3]} color="#6c63ff" scale={0.8} speed={1.2} />
            <FloatingShape position={[4, -1, -4]} color="#00d4aa" scale={0.6} speed={0.8} />
            <FloatingShape position={[-2, -2, -2]} color="#ff6b9d" scale={0.5} speed={1.5} />
            <FloatingShape position={[3, 3, -5]} color="#6c63ff" scale={0.7} speed={0.6} />
            <FloatingShape position={[0, -3, -6]} color="#00d4aa" scale={0.9} speed={1.0} />

            <GlowOrb position={[-3, 1, -2]} color="#6c63ff" />
            <GlowOrb position={[3, -2, -3]} color="#00d4aa" />
        </>
    );
}

/* ---- Hero Section ---- */
export default function Hero() {
    const { theme } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-canvas">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
                    <HeroScene />
                </Canvas>
            </div>

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p className="hero-greeting" variants={itemVariants}>
                    Hello, I'm
                </motion.p>

                <motion.h1 className="hero-name" variants={itemVariants}>
                    <span className="hero-name-3d">{data.personal.name}</span>
                </motion.h1>

                <motion.p className="hero-title" variants={itemVariants}>
                    {data.personal.title}
                </motion.p>

                <motion.p className="hero-tagline" variants={itemVariants}>
                    {data.personal.tagline}
                </motion.p>

                <motion.div className="hero-cta" variants={itemVariants}>
                    <a href="#projects" className="btn-primary">
                        View Projects <FiArrowDown />
                    </a>
                    <a
                        href={data.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                    >
                        <FiGithub /> GitHub
                    </a>
                </motion.div>
            </motion.div>

            <div className="scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
