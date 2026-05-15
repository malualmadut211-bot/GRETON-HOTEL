import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// ScrollSmoother is imported from gsap-trial for this environment
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, ScrollSmoother);

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin, ScrollSmoother };
