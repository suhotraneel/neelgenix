import rawProjectsData from './projects.json';

// Rewrite all /neelgenix/assets/ paths to use the dynamic base URL
const base = import.meta.env.BASE_URL;
const rewritePath = (path) => {
  if (!path) return path;
  return path.replace(/^\/neelgenix\/assets\//, `${base}assets/`);
};
const projectsData = rawProjectsData.map(project => ({
  ...project,
  image: rewritePath(project.image),
  media: project.media?.map(m => ({ ...m, url: rewritePath(m.url) })) || [],
}));

export const sectionsData = [
  {
    id: 'section-1',
    slug: 'introduction',
    number: '01',
    title: 'Who I Am',
    color: '#1e1911',
    tone: 'dark',
    designHeight: 466,
    layout: 'hero',
    eyebrow: 'Suhotra Chakraborty',
    kicker: 'aka Neel Genix',
    heading: 'Suhotra Chakraborty',
    intro: 'UX UI Designer',
    footnote: 'Also: storyteller, maker, and systems thinker.',
  },
  {
    id: 'section-2',
    slug: 'contribution',
    number: '02',
    title: 'Contribution',
    color: '#fffcf5',
    tone: 'light',
    designHeight: 402,
    layout: 'bridge',
    heading: 'I bridge business intent and user behaviour',
    intro:
      'Shaping products that are clear, usable, and built to scale. I ground decisions in real user behaviour while working with teams to create direction that can be effectively executed from concept to evolution.',
    items: [
      {
        label: 'Product Direction',
        detail: "I turn ambiguous requirements into clear product direction, defining what to build, why it matters, and how products evolve through the process.",
        image: `${import.meta.env.BASE_URL}assets/contribution-images/product-direction.jpg`,
      },
      {
        label: 'Technical Alignment',
        detail: "I design with technical feasibility in mind, working closely with engineers to refine experiences and shape products through execution.",
        image: `${import.meta.env.BASE_URL}assets/contribution-images/technical-alignment.jpg`,
      },
      {
        label: 'Systems & Storytelling',
        detail: "I design systems that go beyond screens, creating consistency and structure while shaping experiences through cohesive narratives.",
        image: `${import.meta.env.BASE_URL}assets/contribution-images/systems-storytelling.jpg`,
      },
    ],
  },
  {
    id: 'section-3',
    slug: 'clients',
    number: '03',
    title: 'Clients',
    color: '#1e1911',
    tone: 'dark',
    designHeight: 373,
    layout: 'worked-with',
    heading: "Brands I've Worked With",
  },
  {
    id: 'section-4',
    slug: 'projects',
    number: '04',
    title: "Projects",
    color: '#fffcf5',
    tone: 'light',
    designHeight: 719,
    layout: 'projects',
    heading: "THINGS I'VE BUILT",
    intro: 'Here are some of the projects that have shaped my journey as a designer and creator.',
    projects: projectsData,
  },
  {
    id: 'section-5',
    slug: 'skills',
    number: '05',
    title: 'Skills',
    color: '#fffcf5',
    tone: 'light',
    designHeight: 1204,
    layout: 'work-on',
    heading: "Here's what I work on all day",
    items: [
      {
        label: 'Product & Experience Design',
        detail:
          'I start by bringing clarity to the problem and questioning assumptions. From there, I design flows, interactions, and interfaces that align user behaviour with business intent and create direction teams can act on.',
        meta: ['UX Design', 'UI Design', 'Product Thinking', 'Interaction Design', 'User Flows', 'Journey Mapping', 'Information Architecture', 'Design Handoff'],
        image: `${import.meta.env.BASE_URL}assets/skills-images/product-experience-design.jpg`,
      },
      {
        label: 'Design Systems & Scalability',
        detail:
          'I design and build systems that ensure visual consistency and clarity across interfaces. From components to patterns, I focus on creating scalable UI foundations that support both usability and growth.',
        meta: ['Component Libraries', 'UI Consistency', 'Design Tokens', 'Responsive Design', 'Icon Libraries', 'Surface Systems', 'System Documentation', 'Design Language'],
        image: `${import.meta.env.BASE_URL}assets/skills-images/design-systems-scalability.jpg`,
      },
      {
        label: 'User Research',
        detail:
          'I work with research inputs and observed behaviour to uncover what truly matters. My focus is on translating insights into clear decisions that improve usability and make experiences more relevant.',
        meta: ['Insight Synthesis', 'Behavioral Analysis', 'Persona Mapping', 'Usability Testing', 'Problem Framing', 'Data Interpretation', 'Qualitative Research', 'Heuristic Evaluation'],
        image: `${import.meta.env.BASE_URL}assets/skills-images/user-research.jpg`,
      },
      {
        label: 'AI & Interaction Design',
        detail:
          'I design interactions for intelligent systems while leveraging AI in my own workflows to explore, iterate, and refine solutions. My focus is on making AI intuitive, usable, and meaningful in real contexts.',
        meta: ['AI Workflows', 'Prompt Design', 'Conversational UX', 'Multimodal Design', 'Interaction Patterns', 'Rapid Iteration', 'Use-case Design', 'AI Prototyping'],
        image: `${import.meta.env.BASE_URL}assets/skills-images/ai-interaction-design.jpg`,
      },
      {
        label: 'Product & Experience Design',
        detail:
          'I take designs beyond screens by building and prototyping interfaces. This helps ensure feasibility, smoother collaboration with developers, and alignment between UI intent and final output.',
        meta: ['HTML', 'CSS', 'JavaScript', 'Python', 'AI-Assisted Coding', 'Content Management System', 'Shopify', 'Git (Version Control)'],
        image: `${import.meta.env.BASE_URL}assets/skills-images/implementation.jpg`,
      },
    ],
  },
  {
    id: 'section-6',
    slug: 'tools',
    number: '06',
    title: 'Tools',
    color: '#fffcf5',
    tone: 'light',
    designHeight: 204,
    layout: 'tools',
    heading: 'Some of the tools I use',
    items: [
      { name: 'Figma', image: `${import.meta.env.BASE_URL}assets/logo-figma.svg` },
      { name: 'Anthropic', image: `${import.meta.env.BASE_URL}assets/logo-anthropic.png` },
      { name: 'Google AI Studio', image: `${import.meta.env.BASE_URL}assets/logo-gemini.svg` },
      { name: 'Cursor', image: `${import.meta.env.BASE_URL}assets/logo-cursor.png` },
      { name: 'Adobe CC', image: `${import.meta.env.BASE_URL}assets/logo-adobe.png` },
      { name: 'Runway', image: `${import.meta.env.BASE_URL}assets/logo-runway.svg` },
      { name: 'Framer', image: `${import.meta.env.BASE_URL}assets/logo-framer.svg` },
      { name: 'Anthropic_alt', image: `${import.meta.env.BASE_URL}assets/logo-anthropic-a.svg` },
      { name: 'Unity', image: `${import.meta.env.BASE_URL}assets/logo-unity.png` },
      { name: 'Shopify', image: `${import.meta.env.BASE_URL}assets/logo-shopify.png` },
      { name: 'Google Cloud', image: `${import.meta.env.BASE_URL}assets/logo-gcloud.svg` }
    ],
  },
  {
    id: 'section-7',
    slug: 'about-me',
    number: '07',
    title: 'About Me',
    color: '#1e1911',
    tone: 'dark',
    designHeight: 444,
    layout: 'story',
    pullQuote:
      'I was documenting, composing, and writing—trying to understand how people feel, what they notice, and why certain moments stay.',
    images: [
      `${import.meta.env.BASE_URL}assets/about-images/a.jpg`,
      `${import.meta.env.BASE_URL}assets/about-images/b.jpg`,
      `${import.meta.env.BASE_URL}assets/about-images/c.gif`,
      `${import.meta.env.BASE_URL}assets/about-images/d.JPG`,
      `${import.meta.env.BASE_URL}assets/about-images/e.JPG`,
    ],
    paragraphs: [
      'Through working with music artists, I saw how stories shape connection. Through photography, I learned to observe—capturing moments as they are, not as they’re supposed to be. Through writing, I explored emotions, perceptions, and the unspoken layers of human experience.',
      'All of this shaped how I see people—not just as users, but as individuals moving through moments, contexts, and internal states.',
      'Now, in design, I bring that same lens into everything I build. I approach problems as parts of a larger human journey—where behaviour, emotion, and environment intersect.',
    ],
    quote: 'Stories exist in what is built and in what is left unsaid.',
  },
  {
    id: 'section-8',
    slug: 'ai-approach',
    number: '08',
    title: 'Make With AI',
    color: '#fffcf5',
    tone: 'light',
    designHeight: 697,
    layout: 'ai',
    heading: 'MAKE WITH AI',
    intro: 'Collaborating with AI systems, balancing human thinking with structured workflows and guidelines.',
    quote: 'I iterate rapidly using multiple AI tools, understanding their strengths and limitations to assign the right tasks to the right systems. Some phases benefit from full AI workflows, while others require selective intervention.',
    items: [
      {
        label: 'Automation & Systems',
        detail: 'I design automation workflows using tools like n8n to <span class="text-bold">handle repeatable tasks</span> with defined outcomes, often integrating <span class="text-bold">human-in-the-loop</span> structures to maintain control.',
        image: `${import.meta.env.BASE_URL}assets/ai-approach-images/automation-systems.jpg`,
      },
      {
        label: 'Responsible Usage',
        detail: 'I follow principles around <span class="text-bold">ethical</span> and <span class="text-bold">effective</span> AI usage, ensuring outputs are reliable, lawful, and intentional. My approach is backed by a <span class="text-bold">Google </span>certification in <span class="text-bold">Responsible AI.</span>.',
        image: `${import.meta.env.BASE_URL}assets/ai-approach-images/responsible-usage.jpg`,
      },
      {
        label: 'Technical Understanding',
        detail: 'Beyond using AI tools, I understand <span class="text-bold">how</span> and <span class="text-bold">why</span> they work. Through collaboration with engineering teams on AI products, I contribute to <span class="text-bold">decisions</span> on when AI is effective.',
        image: `${import.meta.env.BASE_URL}assets/ai-approach-images/technical-understanding.jpg`,
      },
    ],
  },
  {
    id: 'section-9',
    slug: 'testimonials',
    number: '09',
    title: 'Testimonials',
    color: '#fffcf5',
    tone: 'light',
    designHeight: 720,
    layout: 'testimonials',
    heading: 'What People Say',
    items: [
      {
        quote: "What makes Neel an excellent designer is that his curiosity spans wide. His keen interest in music, storyboarding, and collateral, and that breadth consistently elevates the originality of his work.\n\nHe approaches every brief with rigour, validating solutions across multiple directions before converging on what's visually compelling and functionally sound. At the UX level, he connects user needs to scalable, systems- level design decisions with quiet confidence.\n\nHe's equally at ease in the AI space, bringing a considered perspective on designing for AI-driven products and what that means for both user experience and creative direction.\n\nAbove all, he bridges the tactical and the strategic with ease, aligning his decisions with business objectives in ways that hold up in the room, and his influence on the design thinking around him is unmistakable.\n\nNeel brings a perfect mix of creative range, systems thinking, and strategic clarity.",
        by: 'Vijayender Cherupally',
        role: 'Design Director',
      },
      {
        quote: "I worked closely with Neel on two different engagements involving a mature, in-market product— Teacher Assistant, with over 35,000 users. He consistently demonstrated the ability to quickly grasp product context and user behavior, which is not easy in established systems.\n\nHe iterates effectively, keeps stakeholders in sync, and seeks input at the right time. What differentiates him is his drive to understand the 'why' behind decisions—even when it's not obvious in the product—so he can design with intent and push the product forward meaningfully.\n\nWe also collaborated on a few blue-sky explorations for the student persona. Neel navigated ambiguity well—keeping multiple options on the table while making the key decisions needed to bring clarity and move into the next iteration cycles.\n\nI will strongly recommend him for his attitude and skill, he can be a great design person where decisions are deliberate, yet fast.",
        by: 'Sharad Nandwani',
        role: 'Product Leader',
      },
      {
        quote: "I have known Suhotra since we worked together on the interactive installation for the Portfolio event at Pearl Academy in 2022. From his very first steps, I saw that Suhotra was exceptional at making design functional and meaningful. His creativity with a constant urge to learn and explore new ideas always keeps him on the edge in terms of pushing the boundaries of design.\n\nOne of his standout projects was the cultural studies outcome, where his innovative design thinking and unique narrative techniques were fully displayed. Suhotra is an excellent researcher and delivers user-centric solutions that are thoughtful and impactful. His ability to blend exploration, ideation, and practical application is remarkable.\n\nI am not a bit of doubt about the brilliance of Suhotra's future in design; I wish him all the best and good fortune as he continues to grow and makes his way in the world of design.",
        by: 'Sunil Mahajan',
        role: 'Design Researcher',
      },
    ],
  },
  {
    id: 'section-10',
    slug: 'contact',
    number: '10',
    title: "Contact",
    color: '#1e1911',
    tone: 'dark',
    designHeight: 540,
    layout: 'contact',
    heading: "Let's Build",
    intro: 'Building a product or shaping an idea?',
    detail: "Let's work together to design and build something impactful, scalable, and ready to grow.",
    email: 'suhotraneel@gmail.com',
    items: [
      { label: 'Resume', href: `${import.meta.env.BASE_URL}assets/suhotra_chakraborty_resume2026_neelgenix.pdf` },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suhotra/' },
      { label: 'Instagram', href: 'https://www.instagram.com/neelgenix/' },
    ],
  },
];
