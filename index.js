import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Function to apply GSAP animations based on custom attributes
export function applyGSAPAnimations() {
    const elements = document.querySelectorAll('[gsap-tl], [gsap-to], [gsap-from], [gsap-scroll]');

    elements.forEach(element => {
        // Retrieve the attributes
        const timelineAttr = element.getAttribute('gsap-tl');
        const toAttr = element.getAttribute('gsap-to');
        const fromAttr = element.getAttribute('gsap-from');
        const scrollAttr = element.getAttribute('gsap-scroll');
        const easeAttr = element.getAttribute('gsap-ease');

        // Create a GSAP timeline if gsap-tl is present
        let tl;
        if (timelineAttr) {
            tl = gsap.timeline(parseAttributes(timelineAttr));
        }

        // Handle gsap-from attribute with max/min/negative check
        if (fromAttr) {
            const fromProps = applyMinMaxValues(parseAttributes(fromAttr), element);
            if (tl) {
                tl.from(element, fromProps);
            } else {
                gsap.from(element, fromProps);
            }
        }

        // Handle gsap-to attribute with max/min/negative check
        if (toAttr) {
            const toProps = applyMinMaxValues(parseAttributes(toAttr), element);
            if (tl) {
                tl.to(element, { ...toProps, ease: easeAttr || 'power1.out' });
            } else {
                gsap.to(element, { ...toProps, ease: easeAttr || 'power1.out' });
            }
        }

        // Handle gsap-scroll attribute for ScrollTrigger animations with min/max check
        if (scrollAttr) {
            const scrollProps = parseAttributes(scrollAttr);
            const adjustedScrollProps = applyMinMaxValues(scrollProps, element);
            
            // Apply scroll trigger animation
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: adjustedScrollProps.start || 'top bottom',
                    end: adjustedScrollProps.end || 'bottom top',
                    toggleActions: adjustedScrollProps.toggleActions || 'play none none reverse',
                    markers: adjustedScrollProps.markers === 'true', // Enable markers if set to true
                },
                ...adjustedScrollProps, // Include any additional properties like duration, opacity, etc.
                ease: easeAttr || 'power1.out', // Default ease for scroll animations
            });
        }

        // Start the timeline if it was created
        if (tl) {
            tl.play();
        }
    });
}

// Function to parse attributes like "repeat: 2; yoyo: true;"
function parseAttributes(attrString) {
    const props = {};
    attrString.split(';').forEach(item => {
        const [key, value] = item.split(':').map(part => part.trim());
        if (key && value) {
            // Convert numerical values and boolean strings
            if (value === 'true') {
                props[key] = true;
            } else if (value === 'false') {
                props[key] = false;
            } else {
                props[key] = isNaN(value) ? value : parseFloat(value);
            }
        }
    });
    return props;
}

// Apply min/max/negative values based on element attributes
function applyMinMaxValues(props, element) {
    const maxAttr = element.getAttribute('gsap-max');
    const minAttr = element.getAttribute('gsap-min');
    const negativeAttr = element.getAttribute('gsap-negative');

    const maxValues = maxAttr ? parseAttributes(maxAttr) : {};
    const minValues = minAttr ? parseAttributes(minAttr) : {};
    const negativeValues = negativeAttr ? parseAttributes(negativeAttr) : {};

    for (let key in props) {
        if (maxValues[key] !== undefined) {
            props[key] = Math.min(props[key], maxValues[key]); // Apply max value limit
        }
        if (minValues[key] !== undefined) {
            props[key] = Math.max(props[key], minValues[key]); // Apply min value limit
        }
        if (negativeValues[key] === true) {
            props[key] = -Math.abs(props[key]); // Apply negative value if specified
        }
    }
    
    return props;
}

// Error handling for invalid attributes
function validateAttributes(element) {
    const validAttributes = ['gsap-tl', 'gsap-to', 'gsap-from', 'gsap-scroll', 'gsap-ease', 'gsap-max', 'gsap-min', 'gsap-negative'];
    Array.from(element.attributes).forEach(attr => {
        if (!validAttributes.includes(attr.name)) {
            console.error(`Invalid GSAP attribute: ${attr.name} on element`, element);
        }
    });
}

// Call the validate function
const elements = document.querySelectorAll('[gsap-tl], [gsap-to], [gsap-from], [gsap-scroll], [gsap-ease], [gsap-max], [gsap-min], [gsap-negative]');
elements.forEach(validateAttributes);
