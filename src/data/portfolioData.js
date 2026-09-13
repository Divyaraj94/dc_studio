export const PROFILE = {
  name: 'DC',
  role: 'Product Builder · Open Source Contributor',
  tagline: 'I build things that matter and ship them to the world — because good tools should be free for everyone.',
  bio: [
    "I'm DC — a builder at heart who turns ideas into real products. I believe the best software is the kind that's open, accessible, and helpful to as many people as possible.",
    "My superpower? Taking an idea from 0 to shipped in record time — without sacrificing quality. I love the entire stack: from designing the UX, writing the backend, to deploying and iterating based on real user feedback.",
    "When I'm not building, I'm contributing to open source, writing about what I've learned, or exploring the next rabbit hole that has me excited."
  ],
  github: 'https://github.com',
  email: 'dc@example.com',
  stats: [
    { num: '12+', label: 'OSS Projects' },
    { num: '1.2k+', label: 'Commits' },
    { num: '247', label: 'Day Streak' },
    { num: '890+', label: 'GitHub Stars' }
  ],
  funFacts: [
    { badge: 'GROWTH', title: 'Perpetual Learner', desc: 'Always leveling up, every single day' },
    { badge: 'OSS', title: 'OSS First', desc: 'Open source by default, always' },
    { badge: 'SPEED', title: 'Fast Shipper', desc: 'MVP in days, not months' },
    { badge: 'TEAM', title: 'Community Driven', desc: 'Building for others, with others' }
  ]
};

export const SKILLS = [
  { name: 'JavaScript', badge: 'JS', level: 92 },
  { name: 'TypeScript', badge: 'TS', level: 88 },
  { name: 'Python', badge: 'PY', level: 85 },
  { name: 'React', badge: 'REACT', level: 90 },
  { name: 'Next.js', badge: 'NEXT', level: 87 },
  { name: 'Node.js', badge: 'NODE', level: 88 },
  { name: 'DevOps / Cloud', badge: 'CLOUD', level: 78 },
  { name: 'AI / ML', badge: 'AI/ML', level: 75 },
  { name: 'Databases', badge: 'SQL', level: 82 },
  { name: 'Docker', badge: 'CONTAINER', level: 80 },
  { name: 'REST / APIs', badge: 'API', level: 93 },
  { name: 'Git / GitHub', badge: 'GIT', level: 95 }
];

export const PROJECTS = [
  {
    id: 'hypergraph',
    index: '01',
    category: '3d',
    domain: 'REAL-TIME 3D // CREATIVE TOOLS',
    title: 'HyperGraph Engine',
    badge: 'R3F / WEBGL',
    image: '/assets/projects/hypergraph.jpg',
    description: 'High-performance WebGL scene compositor and node-based graph editor for rendering real-time procedural geometry and GLSL shaders directly in the browser at 60 FPS.',
    tags: ['React 19', 'Three.js', 'GLSL Shaders', 'Web Workers'],
    stats: '60 FPS · 120k+ nodes rendered',
    github: 'https://github.com',
    live: 'https://github.com',
    architecture: {
      pipeline: 'Raw GLSL AST Parser -> OffscreenCanvas Worker -> WebGL2 Instanced Buffer -> Post-Processing Pass',
      highlights: [
        'Decoupled scene graph computation from main thread via SharedArrayBuffer and Web Workers.',
        'Custom GLSL ray-marching pass achieving smooth screen-space ambient occlusion under 2ms.',
        'Zero garbage collection pressure during node evaluation through reusable Float32Array pools.'
      ],
      benchmarks: [
        { label: 'FRAME BUDGET', value: '16.6ms Target (Avg 14.1ms)' },
        { label: 'INSTANCED NODES', value: '120,000 Concurrent' },
        { label: 'MEMORY FOOTPRINT', value: '< 64MB VRAM Footprint' }
      ],
      codeSnippet: `// HyperGraph Custom GLSL Dispersion Fragment Shader
uniform float uTime;
uniform vec2 uResolution;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
  
  // Chromatic refraction splits
  vec3 rColor = texture2D(uScene, uv + fresnel * 0.015).rgb;
  vec3 gColor = texture2D(uScene, uv).rgb;
  vec3 bColor = texture2D(uScene, uv - fresnel * 0.015).rgb;
  
  gl_FragColor = vec4(vec3(rColor.r, gColor.g, bColor.b) + fresnel * 0.4, 1.0);
}`
    }
  },
  {
    id: 'neuralmesh',
    index: '02',
    category: 'compiler',
    domain: 'SYSTEMS ARCHITECTURE // COMPILER',
    title: 'NeuralMesh Toolchain',
    badge: 'RUST / WASM',
    image: '/assets/projects/neuralmesh.jpg',
    description: 'Ultra-fast developer toolchain for optimizing complex 3D polygon meshes, generating WebAssembly bindings, and bundling glTF assets with zero runtime overhead.',
    tags: ['TypeScript', 'Rust / WASM', 'Node.js', 'CLI'],
    stats: '14x faster compile latency',
    github: 'https://github.com',
    live: 'https://github.com',
    architecture: {
      pipeline: 'glTF 2.0 Binary -> Rust SIMD Mesh Decimation -> Draco/Meshopt Compression -> WASM Runtime Bridge',
      highlights: [
        'Engineered SIMD-accelerated quadratic error metric (QEM) polygon simplification in pure Rust.',
        'Generated idiomatic TypeScript bindings via wasm-bindgen with zero-copy TypedArray transfers.',
        'Compresses 100MB+ CAD/BIM assets down to under 8MB with lossless vertex normal preservation.'
      ],
      benchmarks: [
        { label: 'COMPILATION SPEED', value: '14.2x Faster than C++ Emscripten' },
        { label: 'COMPRESSION RATIO', value: '88.4% Payload Reduction' },
        { label: 'INITIALIZATION TIME', value: '< 4ms WASM Instantiation' }
      ],
      codeSnippet: `// NeuralMesh Rust Core Decimation Kernel
#[wasm_bindgen]
pub struct MeshOptimizer {
    vertices: Vec<f32>,
    indices: Vec<u32>,
}

#[wasm_bindgen]
impl MeshOptimizer {
    pub fn simplify_quadric(&mut self, target_ratio: f32) -> Result<JsValue, JsValue> {
        let mut qem = QuadricSimplifier::new(&self.vertices, &self.indices);
        qem.reduce_to_target(target_ratio);
        serde_wasm_bindgen::to_value(&qem.export_buffers())
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }
}`
    }
  },
  {
    id: 'flowstate',
    index: '03',
    category: 'multiplayer',
    domain: 'COLLABORATIVE PLATFORM // MULTIPLAYER',
    title: 'FlowState Infinite Studio',
    badge: 'CRDT / WEBRTC',
    image: '/assets/projects/flowstate.jpg',
    description: 'Infinite-canvas collaboration workspace for engineering teams with sub-10ms peer-to-peer state synchronization, multiplayer cursors, and live code sandbox execution.',
    tags: ['Next.js', 'WebRTC', 'CRDTs', 'TailwindCSS'],
    stats: '15k+ active monthly teams',
    github: 'https://github.com',
    live: 'https://github.com',
    architecture: {
      pipeline: 'Local Vector Clock -> WebRTC DataChannel Mesh -> Distributed CRDT Log -> Canvas Render Loop',
      highlights: [
        'Built deterministic conflict-free replicated data types (CRDT) for arbitrary shape transformations.',
        'Direct P2P WebRTC mesh fallback to geo-distributed WebSocket relays for enterprise firewalls.',
        'Spatial quad-tree indexing for virtualizing rendering of 50,000+ canvas elements without frame drops.'
      ],
      benchmarks: [
        { label: 'SYNC LATENCY', value: '< 9ms Local Peer-to-Peer' },
        { label: 'CONCURRENT CURSORS', value: '250+ Per Room Smooth' },
        { label: 'OFFLINE RECONCILIATION', value: '100% Conflict-Free Guarantees' }
      ],
      codeSnippet: `// FlowState CRDT Vector Clock Peer Synchronization
export class DistributedMeshState {
  private peers = new Map<string, RTCDataChannel>();
  private localClock = new VectorClock();

  public broadcastMutation(delta: StateDelta): void {
    this.localClock.increment();
    const packet = encodePacket({ delta, clock: this.localClock.snapshot() });
    
    for (const [peerId, channel] of this.peers) {
      if (channel.readyState === 'open') {
        channel.send(packet);
      }
    }
  }
}`
    }
  }
];

export const CURRENT_PROJECT = {
  title: 'The Next Big Thing',
  badge: 'In Active Development',
  description: 'Currently building an open-source developer productivity platform that helps indie hackers ship faster. Still in stealth — but the waitlist is open.',
  progress: [
    { label: 'Overall Progress', percent: 68 },
    { label: 'Backend API', percent: 90 },
    { label: 'Frontend UI', percent: 55 }
  ],
  features: [
    { name: 'Auth system', status: 'done' },
    { name: 'Database schema', status: 'done' },
    { name: 'API endpoints', status: 'done' },
    { name: 'Dashboard UI', status: 'wip' },
    { name: 'Real-time updates', status: 'wip' },
    { name: 'Testing suite', status: 'todo' },
    { name: 'Docs site', status: 'todo' },
    { name: 'Production Launch', status: 'todo' }
  ]
};

export const EXPERIENCE = [
  {
    period: '2024 — PRESENT',
    role: 'Founder & Lead Creative Engineer',
    company: 'Independent Systems & Open Source',
    desc: 'Architecting high-performance WebGL graphics engines, WebAssembly compilers, and open-source developer tooling. Maintaining packages with 500k+ global downloads.',
    tags: ['Three.js', 'Rust / WASM', 'React 19', 'TypeScript', 'WebRTC'],
    highlight: '500k+ global package installs'
  },
  {
    period: '2022 — 2024',
    role: 'Senior Full-Stack & Systems Engineer',
    company: 'Veloce Platform Infrastructure',
    desc: 'Led core architecture for distributed real-time collaboration engine. Slashed end-to-end client latency by 65% and engineered multi-region Postgres streaming.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'CRDTs'],
    highlight: '-65% latency reduction'
  },
  {
    period: '2020 — 2022',
    role: 'Creative Frontend & WebGL Developer',
    company: 'Aether Interactive Studio',
    desc: 'Built immersive WebGL 3D brand experiences, custom GLSL fragment shaders, and high-performance design systems for tier-1 digital clients.',
    tags: ['WebGL 2.0', 'GLSL', 'JavaScript', 'CSS Modules', 'Canvas API'],
    highlight: '60–120 FPS render loops'
  }
];

export const ROADMAP = [
  { num: '01', title: 'Ship current project', desc: 'Get the current product into the hands of real users. Iterate fast. Build in public.' },
  { num: '02', title: 'Grow OSS portfolio', desc: 'Reach 5,000 GitHub stars. Create tools that save developers hours every week.' },
  { num: '03', title: 'Write & teach', desc: 'Share what I learn — technical articles, architecture breakdowns, or tutorials.' },
  { num: '04', title: 'Collaborate more', desc: 'Find the right collaborators and co-builders. The best products are built together.' }
];

export const TESTIMONIALS = [
  {
    quote: 'DC shipped a feature I requested as an open issue in 2 days. The code quality was excellent and they even wrote docs. This is what open source should look like.',
    author: 'Alex M.',
    role: 'Open Source Contributor',
    initial: 'A',
    gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
  },
  {
    quote: 'One of those rare builders who actually thinks about the person using the product. The UX decisions show real empathy. Highly recommend following their work.',
    author: 'Sana R.',
    role: 'Product Designer',
    initial: 'S',
    gradient: 'linear-gradient(135deg, #f97316, #ec4899)'
  },
  {
    quote: "Used DC's open source toolkit in our startup. Saved us at least 3 weeks of dev time. The documentation is thorough and the community is responsive.",
    author: 'Karan T.',
    role: 'Startup Founder',
    initial: 'K',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)'
  }
];

export const BLOG_POSTS = [
  {
    title: 'Why I Open Source Everything I Build',
    cat: 'Open Source',
    date: 'Aug 2026',
    tag: 'ESSAY',
    excerpt: "The real reason isn't altruism — it's about learning faster, building trust, and creating value that compounds over time."
  },
  {
    title: 'From Idea to Shipped in 7 Days — My Process',
    cat: 'Productivity',
    date: 'Jul 2026',
    tag: 'WORKFLOW',
    excerpt: 'The exact workflow I use to go from a napkin idea to something real users can try in less than a week.'
  },
  {
    title: 'Building AI Tools That Actually Help Developers',
    cat: 'AI / ML',
    date: 'Jun 2026',
    tag: 'AI',
    excerpt: "Most AI tools are demos. Here's what it takes to build ones that stick in a developer's daily workflow."
  }
];
