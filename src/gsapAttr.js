import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Function to parse attributes for GSAP animations
const parseAttributes = (element) => {
    const animations = {};
    
    Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('gsap-')) {
            const key = attr.name.replace('gsap-', '');
            try {
                // Parse the JSON value
                const parsedValue = JSON.parse(attr.value.replace(/(\w+):/g, '"$1":'));
                
                // Handle min/max constraints
                if (parsedValue.min !== undefined || parsedValue.max !== undefined) {
                    // Set min/max constraints
                    const constrainedValue = {};
                    for (const prop in parsedValue) {
                        if (prop !== 'min' && prop !== 'max') {
                            let value = parsedValue[prop];
                            if (parsedValue.min !== undefined) {
                                value = Math.max(value, parsedValue.min);
                            }
                            if (parsedValue.max !== undefined) {
                                value = Math.min(value, parsedValue.max);
                            }
                            constrainedValue[prop] = value;
                        }
                    }
                    animations[key] = constrainedValue;
                } else {
                    animations[key] = parsedValue;
                }
            } catch (e) {
                console.error(`Invalid value for ${attr.name}:`, attr.value);
            }
        }
    });

    return animations;
};

// Function to apply GSAP animations based on custom attributes
const applyGSAPAnimations = () => {
    const elements = document.querySelectorAll('[gsap-to], [gsap-from], [gsap-tl], [gsap-scroll]');

    elements.forEach(element => {
        const animations = parseAttributes(element);

        // Handle 'to' animations
        if (animations.to) {
            gsap.to(element, animations.to);
        }

        // Handle 'from' animations
        if (animations.from) {
            gsap.from(element, animations.from);
        }

        // Handle timelines
        if (animations.tl) {
            const timeline = gsap.timeline();
            const timelineProps = animations.tl;
            timeline.to(element, timelineProps);
        }

        // Handle ScrollTrigger animations
        if (animations.scroll) {
            const { start, end } = animations.scroll;
            ScrollTrigger.create({
                trigger: element,
                start: start || "top bottom",
                end: end || "bottom top",
                onEnter: () => gsap.to(element, animations.to),
                onLeave: () => gsap.to(element, animations.from),
            });
        }
    });
};

export { applyGSAPAnimations };