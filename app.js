let scene, camera, renderer, controls;
let currentModel = null;
let isWireframe = false;
let isLightingEnabled = true;
let isAnimating = false;
let directionalLight = null;
let ambientLight = null;


// Load 3D model
function loadModel(modelName) {
    // Remove current model if exists
    if (currentModel) {
        scene.remove(currentModel);
    }

    const loader = new THREE.GLTFLoader();
    // Use absolute path to ensure correct file loading
    const modelPath = './models/' + modelName + '.glb';

    loader.load(
        modelPath,
        function (gltf) {
            console.log('Model loaded successfully:', modelName);
            currentModel = gltf.scene;
            scene.add(currentModel);

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(currentModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.0 / maxDim;
            currentModel.scale.setScalar(scale);

            currentModel.position.sub(center.multiplyScalar(scale));

            // Update product information
            updateInfo(modelName);
        },
        function (xhr) {
            console.log('Loading progress:', (xhr.loaded / xhr.total * 100) + '%');
        }
    );
}

// Toggle wireframe mode
function toggleWire() {
    if (currentModel) {
        isWireframe = !isWireframe;
        currentModel.traverse((child) => {
            if (child.isMesh) {
                child.material.wireframe = isWireframe;
            }
        });
    }
}

// Toggle lighting
function toggleLighting() {
    isLightingEnabled = !isLightingEnabled;
    if (directionalLight) directionalLight.visible = isLightingEnabled;
    if (ambientLight) ambientLight.visible = isLightingEnabled;
}

// Update light color
function updateLightColor(color) {
    if (!isLightingEnabled) return;
    
    const hexColor = new THREE.Color(color);
    if (directionalLight) directionalLight.color = hexColor;
    if (ambientLight) ambientLight.color = hexColor;
}

// Reset camera position
function resetModel() {
    if (currentModel) {
        const box = new THREE.Box3().setFromObject(currentModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

        camera.position.set(0, 0, cameraZ * 1.5);
        camera.lookAt(center);
        controls.target.copy(center);
    }
}

// Update product information
function updateInfo(modelName) {
    const infoContent = document.getElementById('info-content');
    const productInfo = {
        'coke_can': 'Coca-Cola Classic - The original refreshing taste since 1886, known for its perfect balance of sweetness and carbonation. A global icon, Coca-Cola has remained a favorite beverage for over a century, offering a timeless, refreshing experience in every sip.',
        'fanta_can': 'Fanta - The fruity, sparkling soft drink with a fun personality, offering a wide range of vibrant and bold flavors. Since its inception, Fanta has been all about fun, color, and creativity, appealing to those who crave a lighthearted and fruity refreshment.',
        'sprite_bottle': 'Sprite - The crisp, clean, lemon-lime taste that quenches your thirst. With its sharp and refreshing citrus flavor, Sprite has become a go-to choice for those seeking a revitalizing beverage that\'s as clean as it is satisfying.',
        'coke_bottle': 'Coca-Cola Classic Bottle - The iconic contour bottle design since 1915, symbolizing Coca-Cola\'s rich heritage and timeless appeal. Its distinctive curved shape and glass bottle offer a unique drinking experience, combining nostalgia with refreshment in every pour.'
    };

    infoContent.textContent = productInfo[modelName] || 'Product information not available.';
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('viewer');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Squash animation function
function squashAnimation() {
    if (!currentModel || isAnimating) return;
    
    isAnimating = true;
    const duration = 5000; // 5 seconds
    const startTime = Date.now();
    const originalScale = currentModel.scale.clone();
    const originalRotation = currentModel.rotation.clone();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        // Vertical squash (80% compression)
        const verticalScale = 1 - (0.8 * easeProgress);
        
        // Horizontal expansion (50% expansion)
        const horizontalScale = 1 + (0.5 * easeProgress);
        
        // Apply scales
        currentModel.scale.set(
            originalScale.x * horizontalScale,
            originalScale.y * verticalScale,
            originalScale.z * horizontalScale
        );
        
        // Add slight rotation
        currentModel.rotation.z = originalRotation.z + (0.05 * Math.sin(easeProgress * Math.PI));
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isAnimating = false;
        }
    }
    
    animate();
}

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(document.getElementById('viewer').clientWidth, document.getElementById('viewer').clientHeight);
    document.getElementById('viewer').appendChild(renderer.domElement);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    animate();
}


// Initialize the application
init(); 