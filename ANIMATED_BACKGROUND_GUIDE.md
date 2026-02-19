# AnimatedBackground Component

A reusable React background component with soft floating geometric shapes using Framer Motion.

## Features

- ✅ Soft floating circles and rounded squares
- ✅ Smooth, subtle animations (y: [0, -20, 0])
- ✅ Infinite loop with easeInOut easing
- ✅ Fixed positioning (doesn't affect page layout)
- ✅ Pointer-events: none (doesn't block user interactions)
- ✅ Negative z-index (stays behind all content)
- ✅ Responsive design (scales on mobile)
- ✅ Production-ready and reusable

---

## Installation

The component uses:
- **Framer Motion** (already in your project)
- **Tailwind CSS** (already in your project)

No additional dependencies needed!

---

## Usage

### Basic Example

```jsx
import AnimatedBackground from './components/AnimatedBackground';

function MyPage() {
  return (
    <div>
      <AnimatedBackground />
      {/* Your page content */}
      <h1>Welcome to My Page</h1>
    </div>
  );
}
```

---

## Example: Include on Specific Pages Only

### ✅ Include on About Page

```jsx
// About.jsx
import AnimatedBackground from '../AnimatedBackground';

export default function About() {
  return (
    <section className="relative bg-white">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}
```

### ✅ Include on Contact Page

```jsx
// Contact.jsx
import AnimatedBackground from '../AnimatedBackground';

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </div>
  );
}
```

### ❌ Exclude from Hero/Home Page

```jsx
// Hero.jsx
// Simply don't import AnimatedBackground

export default function Hero() {
  return (
    <section className="relative h-screen">
      {/* NO AnimatedBackground here */}
      <div>
        {/* Your hero content */}
      </div>
    </section>
  );
}
```

---

## How It Works

### 1. **Fixed Positioning**
```jsx
className="fixed inset-0"
```
- Uses `position: fixed` to stay in place while scrolling
- Doesn't affect page layout or content flow

### 2. **Pointer Events Disabled**
```jsx
className="pointer-events-none"
```
- Allows clicks to pass through to content below
- Background never blocks user interactions

### 3. **Behind Content (Z-Index)**
```jsx
style={{ zIndex: -1 }}
```
- Negative z-index ensures it's behind all content
- Content naturally renders above the background

### 4. **Floating Animation**
```jsx
y: [0, -20, 0]
duration: 6
ease: 'easeInOut'
repeat: Infinity
```
- Smooth up and down motion
- Different durations for variety (6s, 8s, 20s)
- Infinite seamless loop

---

## Animation Breakdown

### Floating Variants
```jsx
const floatingVariants = {
  animate: {
    y: [0, -20, 0],  // Move up 20px, then back down
    transition: {
      duration: 6,     // Complete cycle in 6 seconds
      repeat: Infinity, // Loop forever
      ease: 'easeInOut', // Smooth acceleration
    },
  },
};
```

### Rotating Variants
```jsx
const rotatingVariants = {
  animate: {
    rotate: [0, 360],  // Full rotation
    transition: {
      duration: 20,      // Slow 20-second rotation
      repeat: Infinity,  // Loop forever
      ease: 'linear',    // Constant speed
    },
  },
};
```

---

## Customization

### Change Colors
```jsx
// Current: cyan with low opacity
border-cyan-400/10  // 10% opacity
border-cyan-400/8   // 8% opacity

// Change to blue
border-blue-400/10

// Change to purple
border-purple-400/10
```

### Adjust Animation Speed
```jsx
// Slower (more relaxed)
duration: 10

// Faster (more energetic)
duration: 4
```

### Modify Shape Sizes
```jsx
// Larger shapes
w-96 h-96

// Smaller shapes
w-32 h-32
```

---

## Pages Where to Use

### ✅ Recommended Pages:
- About
- FAQs
- Faculty Advisor
- Horizontal Scroll (Activities)
- GB (Governing Body) - below marquee
- Team
- Events

### ❌ NOT Recommended:
- Hero/Landing (too busy)
- Pages with complex image backgrounds
- Pages with heavy visual content

---

## Performance Notes

- Uses GPU-accelerated animations (transform properties)
- Fixed positioning prevents reflow/repaint
- Minimal DOM elements (8 shapes total)
- Framer Motion automatically optimizes animations
- Responsive design with Tailwind breakpoints

---

## Accessibility

```jsx
aria-hidden="true"
```
- Marked as decorative (screen readers ignore it)
- Doesn't interfere with keyboard navigation
- Doesn't affect focus management

---

## Z-Index Hierarchy

```
AnimatedBackground: z-index: -1  (bottom layer)
Page Content: z-index: 0 or positive (above background)
Navbar/Footer: z-index: 50 (always on top)
```

---

## Troubleshooting

### Background not visible?
- Ensure parent container doesn't have `overflow: hidden`
- Check that content has proper z-index (0 or positive)

### Background blocking clicks?
- Verify `pointer-events-none` is applied
- Check that shapes don't have their own click handlers

### Animations too fast/slow?
- Adjust `duration` values in variants
- Different shapes can have different speeds

---

## Summary

This component provides:
- Clean, reusable code structure
- Proper separation of concerns
- No global pollution
- Easy to include/exclude per page
- Production-ready performance
- Accessible and user-friendly

Simply import and add `<AnimatedBackground />` to any page where you want the subtle floating shapes effect!
