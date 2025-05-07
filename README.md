# Coca-Cola 3D Showcase

A modern web-based 3D visualization application that brings Coca-Cola products to life through interactive 3D models.

## Features

- Interactive 3D model viewing with orbit controls
- Multiple product models (Coca-Cola Can, Fanta Can, Sprite Bottle, Coca-Cola Bottle)
- Real-time model transformations and animations
- Wireframe mode for technical visualization
- Dynamic lighting controls
- Squash animation effects
- Responsive design for various screen sizes

## Technical Stack

- **Three.js**: WebGL-based 3D graphics library
- **GLTF Loader**: For efficient 3D model loading
- **HTML5/CSS3**: Modern web standards
- **JavaScript**: Core functionality and animations
- **Font Awesome**: Icon library

## Project Structure

```
├── index.html          # Main application page
├── about.html          # About page with project details
├── styles.css          # Application styles
├── app.js             # Core application logic
└── models/            # 3D model assets
    ├── coke_can.glb
    ├── fanta_can.glb
    ├── sprite_bottle.glb
    └── coke_bottle.glb
```

## Design Choices

### 3D Models
- Optimized for web delivery
- High detail while maintaining performance
- Standardized scale and orientation
- Efficient polygon count

### Interactive Features
- Orbit controls for intuitive navigation
- Wireframe mode for technical analysis
- Dynamic lighting for better visualization
- Squash animation for engaging interaction

### User Interface
- Clean, modern design
- Coca-Cola brand integration
- Intuitive controls
- Responsive layout

## Performance Optimization

- Model optimization for web delivery
- Efficient animation handling
- Progressive loading of assets
- Responsive design implementation

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Use the model selection panel to load different products
4. Interact with the 3D models using the provided controls

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Requirements

- Modern web browser with WebGL support
- JavaScript enabled
- Internet connection for CDN resources

## License

This project is for demonstration purposes only. All Coca-Cola related assets and branding are property of The Coca-Cola Company.

## Credits

- Three.js for 3D rendering
- Font Awesome for icons
- The Coca-Cola Company for brand assets 