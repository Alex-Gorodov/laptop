import { Text, ContactShadows, PresentationControls, useGLTF, Environment, Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Experience()

{
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')

    const screenOpenedX = 1.3105023838474816;

    const [ isLoaded, setLoaded ] = useState(false)
    
    useEffect(() => {
        computer.nodes.AppleLogo000.rotation.y = Math.PI
        computer.nodes.AppleLogo000.position.z = -1.95
        computer.nodes.AppleLogo000.position.y = -0.12
        computer.nodes.Top.rotation.x = Math.PI

    }, [computer])

    console.log(computer);

    console.log(computer.nodes.Top.rotation.x);

    useFrame((state, delta) => {
        const target = isLoaded
            ? screenOpenedX
            : Math.PI
    
        computer.nodes.Top.rotation.x = THREE.MathUtils.lerp(
            computer.nodes.Top.rotation.x,
            target,
            5 * delta
        )
    })
    
    return <>

        <Environment preset='city'/>

        <color args={["#241a1a"]} attach={"background"}/>

        <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ -0.4, 0.2 ] }
            azimuth={ [ -1, 0.75 ] }
            damping={ 0.1 }
            snap
        >
                <Float rotationIntensity={0.4}>

                    {/* Light */}
                    <rectAreaLight
                        width={ 2.5 }
                        height={ 1.65 }
                        intensity={ 65 }
                        color={ '#d3c0dd' }
                        rotation={ [ -0.1, Math.PI, 0 ] }
                        position={ [ 0, 0.55, -1.15 ] }
                    />

                    {/* Laptop */}
                    <primitive object={computer.scene} position-y={-0.92} position-x={-0.8}>
                        <Html
                            transform
                            wrapperClass={`html-screen ${isLoaded ? 'loaded' : ''}`}
                            distanceFactor={1.17}
                            position={ [ 0, 1.56, -1.4 ] }
                            rotation={[-0.256, 0, 0]}
                            zIndexRange={ [0, 1] }
                            >
                            <iframe
                                src="https://alex-gorodov.github.io/portfolio-2026/"
                                onLoad={() => setLoaded(true)}
                            />
                        </Html>
                    </primitive>
                    <Text
                        font={'./bangers-v20-latin-regular.woff'}
                        fontSize={ 1 }
                        position={ [ 2, 0.75, 0.75 ] }
                        rotation-y={ -1.25 }
                        maxWidth={ 1.5 }
                        textAlign={ 'center' }
                    >Alex Gorodov</Text>
                </Float>
        </PresentationControls>
        <ContactShadows position-y={ -1.4 } opacity={0.4} scale={ 5 } blur={ 2.4 } />

    </>
}