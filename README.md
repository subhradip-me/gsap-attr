Overview
The gsapAttr.js library allows you to define animations directly in your HTML using custom attributes that start with gsap-. This makes it easy to apply animations without writing JavaScript code for each animation.

Supported Animation Properties
1. Basic Properties
These properties can be used to animate elements' CSS properties.

x: Moves the element along the x-axis.

Values: Number (pixels), negative values, or "infinity"
y: Moves the element along the y-axis.

Values: Number (pixels), negative values, or "infinity"
scale: Uniformly scales the element.

Values: Number (e.g., 1 for 100%, 2 for 200%)
scaleX: Scales the element along the x-axis.

Values: Number
scaleY: Scales the element along the y-axis.

Values: Number
rotation: Rotates the element by a specified degree.

Values: Number (degrees)
opacity: Changes the opacity of the element.

Values: Number (0 to 1)
skewX: Skews the element along the x-axis.

Values: Number (degrees)
skewY: Skews the element along the y-axis.

Values: Number (degrees)
2. Positioning Properties
These properties control the position of the element.

top: Sets the top position of the element.

Values: Number (pixels), negative values, or "infinity"
left: Sets the left position of the element.

Values: Number (pixels), negative values, or "infinity"
right: Sets the right position of the element.

Values: Number (pixels), negative values, or "infinity"
bottom: Sets the bottom position of the element.

Values: Number (pixels), negative values, or "infinity"
3. Size Properties
These properties control the size of the element.

width: Changes the width of the element.

Values: Number (pixels), percentage, or "infinity"
height: Changes the height of the element.

Values: Number (pixels), percentage, or "infinity"
margin: Changes the margin of the element.

Values: Number (pixels), negative values
padding: Changes the padding of the element.

Values: Number (pixels), negative values
borderRadius: Changes the border radius of the element.

Values: Number (pixels)
4. Color Properties
These properties control the color of the element.

backgroundColor: Changes the background color.

Values: Color string (e.g., "#ff0000")
color: Changes the text color.

Values: Color string (e.g., "#000000")
borderColor: Changes the border color.

Values: Color string (e.g., "#cccccc")
5. SVG Properties
These properties are specific to SVG elements.

fill: Changes the fill color of an SVG shape.

Values: Color string
stroke: Changes the stroke color of an SVG shape.

Values: Color string
strokeWidth: Changes the width of the stroke.

Values: Number (pixels)
6. Shadow Properties
These properties control shadows.

boxShadow: Applies a box shadow to the element.

Values: String (e.g., "2px 2px 5px rgba(0,0,0,0.5)")
textShadow: Applies a text shadow to the element.

Values: String (e.g., "1px 1px 2px rgba(0,0,0,0.5)")