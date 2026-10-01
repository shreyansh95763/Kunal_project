export interface BlogSection {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Diamond Grading" | "Gemology & Tech" | "Gemstone Identification" | "Jewellery Care" | "Consumer Guide";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishDate: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tags: string[];
  sections: BlogSection[];
  keyTakeaways: string[];
  faq?: { question: string; answer: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-the-4cs-of-diamond-quality",
    title: "Understanding the 4Cs of Diamond Quality: Cut, Color, Clarity & Carat",
    excerpt:
      "Explore the universal standard established for evaluating diamond quality. Learn how each 'C' influences beauty, optical performance, and value.",
    category: "Diamond Grading",
    author: {
      name: "Dr. Alistair Vance",
      role: "Lead Gemologist & Head of Grading, GGDL",
    },
    publishDate: "August 12, 2026",
    readTime: "6 min read",
    image: "/img/blogs/diamond-4cs.jpg",
    imageAlt: "4Cs Diamond grading diagram showing cut, clarity, color and carat weight",
    featured: true,
    tags: ["Diamond 4Cs", "Cut Grade", "Clarity", "Carat Weight", "Diamond Certification"],
    keyTakeaways: [
      "Cut is the single most critical factor for brilliance, sparkle, and fire.",
      "Color grading evaluates the absence of color on a D-to-Z scale.",
      "Clarity measures natural microscopic inclusions and surface blemishes under 10x magnification.",
      "Carat weight measures mass, but cut proportions determine how large a diamond visually appears.",
    ],
    sections: [
      {
        heading: "The Foundation of Diamond Grading",
        paragraphs: [
          "When assessing a diamond's rarity and aesthetic perfection, gemologists worldwide adhere to the internationally standardized 4Cs framework: Cut, Color, Clarity, and Carat Weight. Developed to establish an objective, universal language, this system allows jewelers, collectors, and consumers to understand exactly what makes each stone unique.",
          "While many buyers focus initially on carat weight, experienced gemologists know that balance and harmony among all four characteristics dictate a diamond’s true brilliance and value.",
        ],
      },
      {
        heading: "1. Cut: The Engine of Sparkle and Light Performance",
        paragraphs: [
          "Cut refers not merely to the outline shape of a diamond (such as Round, Oval, or Emerald), but to the precision of its proportions, symmetry, facet alignment, and polish.",
          "When a diamond is cut to ideal proportions, light enters through the crown, bounces across internal pavilion facets, and exits straight through the top as radiant brilliance and prismatic fire. If a diamond is cut too shallow or too deep, light leaks through the sides or bottom, leaving the stone dull and lifeless.",
        ],
        bulletPoints: [
          "Brilliance: The total internal and external white light reflections.",
          "Fire: The dispersion of white light into spectral rainbow flashes.",
          "Scintillation: The pattern of light and dark areas with dynamic flashes when moving.",
        ],
        callout: "A smaller diamond with an Excellent cut will often outshine and look more impressive than a larger diamond with a mediocre cut grade.",
      },
      {
        heading: "2. Color: The Measure of Purity and Tint",
        paragraphs: [
          "The diamond color evaluation scale runs from D (completely colorless) to Z (light yellow or brown). Truly colorless diamonds (D, E, and F) are structurally pure and chemically inert, acting like clean prism windows that refract light without absorbing spectrum wavelengths.",
          "As you move down the scale to Near Colorless (G, H, I, J), subtle warmth becomes detectable under specialized gemological lighting, though often imperceptible in warm metal mountings such as yellow or rose gold.",
        ],
      },
      {
        heading: "3. Clarity: Nature's Microscopic Fingerprint",
        paragraphs: [
          "Formed deep within the Earth under immense heat and pressure over billions of years, virtually all natural diamonds contain tiny internal characteristics (inclusions) and external surface imperfections (blemishes).",
          "Clarity grading ranges from Flawless (FL) and Internally Flawless (IF), down to Included (I1-I3). Grades such as VVS (Very Very Slightly Included) and VS (Very Slightly Included) contain microscopic characteristics that require 10x magnification or laboratory microscopes to identify, ensuring an 'eye-clean' face-up appearance.",
        ],
      },
      {
        heading: "4. Carat Weight: Precision Mass Measurement",
        paragraphs: [
          "One metric carat is defined as exactly 200 milligrams (0.20 grams), subdivided into 100 'points'. Because large rough diamonds of gem quality are exponentially rarer in nature, diamond pricing increases exponentially rather than linearly with carat weight.",
        ],
      },
    ],
    faq: [
      {
        question: "Which of the 4Cs should I prioritize most?",
        answer: "Cut should almost always be prioritized highest, as it directly governs how effectively the diamond reflects and refracts light to create sparkle.",
      },
      {
        question: "What is an 'eye-clean' diamond?",
        answer: "An eye-clean diamond is one whose inclusions are so small or positioned such that they cannot be seen with the unaided human eye from a standard viewing distance.",
      },
    ],
  },
  {
    slug: "natural-vs-lab-grown-diamonds-detection-guide",
    title: "Natural vs. Lab-Grown Diamonds: Scientific Detection in Gemological Labs",
    excerpt:
      "Understand the chemical identity, crystal growth patterns (HPHT vs. CVD), and spectroscopic methods used by gemologists to distinguish natural and created stones.",
    category: "Gemology & Tech",
    author: {
      name: "Sophia Chen, FGA",
      role: "Spectroscopy Specialist & Research Director",
    },
    publishDate: "August 05, 2026",
    readTime: "7 min read",
    image: "/img/blogs/labgrown-diamonds.jpg",
    imageAlt: "Gemological microscope analyzing natural vs lab grown diamond crystal lattice",
    featured: false,
    tags: ["Lab Grown Diamonds", "CVD Diamonds", "HPHT", "Spectroscopy", "Gem Lab Tech"],
    keyTakeaways: [
      "Natural and laboratory-grown diamonds share identical optical, physical, and chemical carbon properties.",
      "Advanced laboratory spectroscopy (FTIR, Photoluminescence, Deep UV Imaging) is required for definitive origin identification.",
      "HPHT diamonds grow in cuboctahedral patterns, while CVD diamonds develop in tabular cubic layers.",
      "Independent gemological certification clearly discloses origin to protect marketplace transparency.",
    ],
    sections: [
      {
        heading: "The Modern Diamond Landscape",
        paragraphs: [
          "Laboratory-grown diamonds (LGDs) have become a major presence in today's fine jewellery industry. Because both natural and lab-created diamonds are composed of pure crystallized carbon in an isometric lattice, they exhibit identical refractive index (2.417), hardness (10 on Mohs scale), and thermal conductivity.",
          "Standard handheld thermal diamond testers cannot distinguish between them. Determining whether a stone was formed over billions of years in the Earth's mantle or synthesized in a laboratory reactor requires advanced gemological laboratory equipment.",
        ],
      },
      {
        heading: "Growth Technologies: HPHT vs. CVD",
        paragraphs: [
          "There are two primary methods used to create gem-quality diamonds in laboratories:",
        ],
        bulletPoints: [
          "High Pressure High Temperature (HPHT): Replicates the extreme tectonic environment of the Earth (up to 60,000 atmospheres and 1,500°C) using cubic or belt presses.",
          "Chemical Vapor Deposition (CVD): Uses a carbon-rich plasma gas (such as methane and hydrogen) inside a vacuum chamber to deposit carbon atoms layer-by-layer onto a diamond seed crystal.",
        ],
      },
      {
        heading: "How Gemological Laboratories Verify Origin",
        paragraphs: [
          "Professional gemological institutes like GGDL employ multi-tiered testing protocols to deliver 100% conclusive identification:",
          "1. Fourier-Transform Infrared Spectroscopy (FTIR): Determines diamond type (Type Ia, Ib, IIa, IIb). Over 98% of natural diamonds are Type Ia (containing aggregated nitrogen), whereas most lab-grown diamonds are Type IIa (near-zero nitrogen).",
          "2. Deep UV Luminescence Imaging: Analyzes growth morphology. Natural diamonds show octahedral growth sectors, HPHT stones exhibit geometric cross patterns, and CVD stones reveal planar dislocation striations.",
          "3. Photoluminescence (PL) Spectroscopy at Cryogenic Temperatures: Detects atomic-level lattice defects, silicon-vacancy centers (SiV-), and catalyst metal trace residues (like nickel or iron).",
        ],
        callout: "Every diamond certified at GGDL undergoes rigorous automated and spectroscopic screening to guarantee origin disclosure on every grading report.",
      },
    ],
    faq: [
      {
        question: "Can a jeweler tell a lab diamond with a standard loupe?",
        answer: "No. Because the optical properties and inclusions are identical, only specialized laboratory spectrometers and UV luminescence instruments can provide definitive origin verification.",
      },
      {
        question: "Are lab-grown diamonds real diamonds?",
        answer: "Yes, chemically, physically, and optically they are pure crystallized carbon diamonds; the only difference is their origin and growth timeline.",
      },
    ],
  },
  {
    slug: "colored-gemstone-identification-rubies-sapphires-emeralds",
    title: "Colored Gemstone Authentication: Rubies, Sapphires, Emeralds & Treatment Detection",
    excerpt:
      "A comprehensive guide to identifying the Big Three precious gemstones, recognizing common heat and clarity treatments, and understanding geographic origin determinations.",
    category: "Gemstone Identification",
    author: {
      name: "Marcus Thorne, GG",
      role: "Senior Colored Stone Evaluator",
    },
    publishDate: "July 28, 2026",
    readTime: "8 min read",
    image: "/img/blogs/colored-gemstones.jpg",
    imageAlt: "Vibrant arrangement of faceted ruby, sapphire and emerald gemstones on reflective dark surface",
    featured: false,
    tags: ["Ruby", "Sapphire", "Emerald", "Gemstone Treatments", "Origin Determination"],
    keyTakeaways: [
      "The 'Big Three' (Ruby, Sapphire, Emerald) account for the vast majority of precious colored gemstone trade.",
      "Heat treatment in corundum is common and accepted, but must always be disclosed on reports.",
      "Emeralds naturally contain intricate inclusions known as 'jardin' and are often clarity-enhanced with cedarwood oil or resins.",
      "Microscopic inclusion study and laser ablation trace element analysis reveal both treatment status and country of origin.",
    ],
    sections: [
      {
        heading: "The Fascination of the Big Three",
        paragraphs: [
          "For millennia, Rubies, Sapphires (both varieties of the mineral Corundum, Al2O3), and Emeralds (the green variety of Beryl, Be3Al2Si6O18) have captivated royalty and connoisseurs. Evaluating colored gems requires a different methodology than diamond grading—color saturation, tone, and hue are the paramount drivers of value.",
        ],
      },
      {
        heading: "Common Enhancements and Laboratory Detection",
        paragraphs: [
          "Because untreated, high-clarity colored gemstones of vibrant color are exceedingly scarce, the gemstone trade has developed various enhancement methods over centuries:",
        ],
        bulletPoints: [
          "Traditional Heat Treatment: Used to dissolve rutile silk inclusions and intensify blue or red tones in corundum. Detectable by melted crystal inclusions and discoid stress halos.",
          "Beryllium & Titanium Diffusion: Introduces trace elements at surface level under high heat to artificially alter hue. Detected through immersion microscopy and chemical profiling.",
          "Clarity Enhancement (Oiling & Resins in Emeralds): Fractures reaching the surface are filled with refractive index-matched substances. Gem labs use infrared spectroscopy to classify filling as Minor, Moderate, or Significant.",
          "Glass Filling (Lead Glass in Rubies): Low-grade corundum is permeated with high-lead glass to enhance transparency. Distinct flash effects and gas bubbles reveal this treatment.",
        ],
        callout: "A certified unheated Burmese ruby or untreated Kashmir sapphire can command price premiums of 300% to 1000% over heated counterparts of comparable appearance.",
      },
      {
        heading: "Geographic Origin Analysis",
        paragraphs: [
          "Origin reports provide valuable insight for collectors. By cross-referencing geological inclusion suites (such as calcite rhombs in Burmese rubies or three-phase inclusions in Colombian emeralds) alongside LA-ICP-MS trace element mapping, gemologists establish probable geographic origins such as Sri Lanka, Madagascar, Myanmar, or Colombia.",
        ],
      },
    ],
  },
  {
    slug: "caring-for-fine-diamond-and-gemstone-jewellery",
    title: "The Ultimate Guide to Cleaning & Caring for Fine Diamond Jewellery",
    excerpt:
      "Keep your heirloom jewellery sparkling for generations. Expert tips on safe at-home cleaning, ultrasonic cleaner hazards, and storage best practices.",
    category: "Jewellery Care",
    author: {
      name: "Elena Rostova",
      role: "Master Jeweller & Conservation Consultant",
    },
    publishDate: "July 19, 2026",
    readTime: "5 min read",
    image: "/img/blogs/jewellery-care.jpg",
    imageAlt: "Polishing a solitaire diamond ring with a soft microfiber cloth and fine cleanser",
    featured: false,
    tags: ["Jewellery Care", "Cleaning Tips", "Prong Inspection", "Storage", "Diamond Maintenance"],
    keyTakeaways: [
      "Diamonds attract oil naturally (lipophilic); regular warm soapy water cleaning restores fire and sparkle.",
      "Never use ultrasonic cleaners for emeralds, opals, pearls, or fracture-filled gemstones.",
      "Store individual pieces in separate fabric pouches to avoid diamonds scratching other metals and gems.",
      "Have prongs, clasps, and settings inspected by a professional bench jeweller once every 12 months.",
    ],
    sections: [
      {
        heading: "Why Fine Jewellery Needs Regular Maintenance",
        paragraphs: [
          "Diamonds and precious gemstones endure daily contact with cosmetics, skin oils, lotions, hand soaps, and dust. Because diamonds are naturally lipophilic (oil-attracting), a thin microscopic film accumulates on pavilion facets within days of regular wear, dulling their refractive performance.",
        ],
      },
      {
        heading: "Safe At-Home Cleaning Routine",
        paragraphs: [
          "For diamonds, sapphires, rubies, and solid gold or platinum jewellery, the safest and most effective cleaning routine requires simple household materials:",
        ],
        bulletPoints: [
          "Step 1: Soak in a bowl of warm water mixed with a few drops of mild, phosphate-free dishwashing liquid for 15 minutes.",
          "Step 2: Use a soft-bristled baby toothbrush to gently scrub behind the stone and around the basket where oils gather.",
          "Step 3: Rinse thoroughly under warm running water (ensure the sink drain is securely plugged).",
          "Step 4: Pat dry with a lint-free microfiber lens cloth.",
        ],
      },
      {
        heading: "Gems That Require Delicate Handling",
        paragraphs: [
          "Certain gemstones must never be submerged in hot water or placed in ultrasonic machines:",
          "Emeralds are porous and often oil-treated; ultrasonic vibrations strip natural oils, making internal fractures starkly visible. Pearls, opals, and tanzanite have low hardness or moisture sensitivity and should only be wiped clean with a damp, soft cloth.",
        ],
        callout: "Always put on jewellery LAST after perfume, hairspray, and lotion have completely dried on your skin.",
      },
    ],
  },
  {
    slug: "diamond-fluorescence-myths-science-and-impact",
    title: "Diamond Fluorescence: Myths, Science & Impact on Visual Appearance",
    excerpt:
      "Does blue UV fluorescence make a diamond look milky or whiter? Learn what causes fluorescence, how laboratories grade it, and when it represents smart buying value.",
    category: "Diamond Grading",
    author: {
      name: "Dr. Alistair Vance",
      role: "Lead Gemologist & Head of Grading, GGDL",
    },
    publishDate: "July 10, 2026",
    readTime: "5 min read",
    image: "/img/blogs/diamond-fluorescence.jpg",
    imageAlt: "Comparative demonstration of diamonds under daylight versus glowing blue under UV light",
    featured: false,
    tags: ["Diamond Fluorescence", "UV Light", "Diamond Buying", "Gemology"],
    keyTakeaways: [
      "Fluorescence is the emission of visible light when a diamond is exposed to long-wave ultraviolet (UV) radiation.",
      "Approximately 25% to 35% of natural diamonds exhibit some degree of fluorescence, predominantly blue.",
      "In lower color grades (I, J, K), medium to strong blue fluorescence can make the stone appear whiter face-up in natural daylight.",
      "In less than 0.2% of highly fluorescent stones, an oily or milky haziness occurs; the vast majority show zero negative optical impact.",
    ],
    sections: [
      {
        heading: "What is Diamond Fluorescence?",
        paragraphs: [
          "When subjected to long-wave ultraviolet (UV) light—such as blacklights or direct sunlight—certain diamonds emit a temporary soft glow. This optical phenomenon, known as fluorescence, is caused by submicroscopic sub-atomic trace element structures, most commonly sub-microscopic nitrogen clusters (N3 centers).",
          "Laboratory grading reports classify fluorescence into standardized intensity categories: None, Faint, Medium, Strong, and Very Strong, along with the fluorescent color (over 95% of fluorescent diamonds glow blue).",
        ],
      },
      {
        heading: "How Does Fluorescence Affect Value and Appearance?",
        paragraphs: [
          "In the trade, market sentiment often discounts fluorescent diamonds in top color grades (D-F), creating an outstanding opportunity for informed buyers:",
        ],
        bulletPoints: [
          "For Near-Colorless to Faint Yellow Diamonds (I-M): Blue is the complementary color to yellow. Moderate to strong blue fluorescence cancels out yellowish tints in outdoor daylight, making a J-color stone face up looking like an H or G.",
          "For Colorless Diamonds (D-F): Fluorescence generally has no visible effect indoors. Only in rare cases of extreme 'Very Strong' fluorescence does a diamond display an over-saturated hazy appearance.",
        ],
        callout: "Studies across major gemological laboratories have proven that the vast majority of consumers cannot differentiate between fluorescent and non-fluorescent diamonds in blind daylight tests.",
      },
    ],
  },
  {
    slug: "why-independent-gemological-certification-matters",
    title: "Why Independent Gemological Certification Matters for Buyers & Retailers",
    excerpt:
      "Learn the crucial difference between store appraisals and third-party laboratory reports, and why independent certification is essential for security and resale value.",
    category: "Consumer Guide",
    author: {
      name: "Marcus Thorne, GG",
      role: "Senior Colored Stone Evaluator",
    },
    publishDate: "June 29, 2026",
    readTime: "6 min read",
    image: "/img/blogs/gemological-certification.jpg",
    imageAlt: "Official GGDL diamond grading certificate report with embossed gold seal and gemologist tools",
    featured: false,
    tags: ["Certification", "Appraisal vs Report", "Consumer Protection", "Report Verification", "Trust"],
    keyTakeaways: [
      "A gemological report is an objective scientific analysis; a retail appraisal is a monetary insurance estimation.",
      "Independent laboratories do not buy, sell, or value gems, ensuring unbiased zero-conflict grading.",
      "Digital verification systems and QR codes protect buyers from counterfeit reports and substituted stones.",
      "Certified stones maintain higher liquidity and command recognized international trade value.",
    ],
    sections: [
      {
        heading: "The Critical Role of Objective Grading",
        paragraphs: [
          "Purchasing a diamond, colored gemstone, or heirloom jewellery piece represents both an emotional milestone and a financial investment. In an era where advanced lab treatments, synthetic growth, and simulant technologies are increasingly sophisticated, trust in the transaction is paramount.",
          "An independent grading certificate from an accredited institute like GGDL provides an impartial, scientific assessment that protects both the buyer and the seller from misrepresentation.",
        ],
      },
      {
        heading: "Certificate vs. Appraisal: The Essential Distinction",
        paragraphs: [
          "Many consumers confuse retail appraisals with laboratory grading reports. The differences are vital:",
        ],
        bulletPoints: [
          "Laboratory Grading Report: An objective, scientific evaluation of the stone's physical, optical, and structural properties (weight, cut symmetry, color grade, clarity plot, origin). It contains NO financial valuation, eliminating conflicts of interest.",
          "Retail Appraisal: A monetary estimate calculated for insurance replacement purposes. Appraisals are subjective and subject to inflation or market fluctuations.",
        ],
      },
      {
        heading: "Digital Verification and QR Technology",
        paragraphs: [
          "Modern gem laboratories utilize tamper-proof digital authentication systems. Each GGDL certificate features a unique QR code and report number that links directly to the secure laboratory database.",
          "Whether verifying from a smartphone at the jewelry counter or transferring ownership during resale, instant digital report verification delivers permanent peace of mind.",
        ],
        callout: "Never purchase a high-value diamond or precious gemstone without an official independent grading report that can be verified online.",
      },
    ],
  },
];

export function getAllBlogs(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedBlog(): BlogPost {
  return BLOG_POSTS.find((b) => b.featured) ?? BLOG_POSTS[0];
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(currentSlug);
  return BLOG_POSTS.filter((b) => b.slug !== currentSlug)
    .sort((a, b) => {
      if (current && a.category === current.category) return -1;
      if (current && b.category === current.category) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getBlogCategories(): string[] {
  const categories = new Set(BLOG_POSTS.map((b) => b.category));
  return ["All", ...Array.from(categories)];
}
