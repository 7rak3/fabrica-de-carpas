export interface ProposalItem {
  name: string;
  description: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ProposalPricing {
  currency: string;
  subtotal: number;
  ivaRate: number;
  ivaAmount: number;
  total: number;
  deliveryText: string;
  paymentTerms: string;
  validityDays: number;
  items: ProposalItem[];
}

export interface Proposal {
  slug: string;
  title: string;
  clientName: string;
  clientSub: string;
  clientLogo: string;
  projectCode: string;
  date: string;
  validUntil: string;
  accessPin: string;
  alternativePins?: string[];
  status: 'active' | 'approved' | 'in_review';
  executive: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
  product: {
    name: string;
    badge: string;
    dimensions: string;
    height: string;
    area: string;
    color: string;
    capacity: string;
    windResistance: string;
    highlights: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  elevationViews: {
    id: string;
    title: string;
    dimensions: string;
    image: string;
    description: string;
  }[];
  terrainViews: {
    id: string;
    title: string;
    image: string;
    caption: string;
  }[];
  techSpecs: {
    category: string;
    items: {
      label: string;
      value: string;
    }[];
  }[];
  certifications: {
    name: string;
    badge: string;
    desc: string;
  }[];
  pricing: ProposalPricing;
  pdfUrl: string;
}

export const PROPOSALS: Record<string, Proposal> = {
  ciahn: {
    slug: 'ciahn',
    title: 'Propuesta Técnica 01: Carpa Cerrada 7x5 H4 Black Edition',
    clientName: 'CIAHN ATACAMA',
    clientSub: 'Corporación de Investigación y Avance de la Paleontología e Historia Natural de Atacama',
    clientLogo: '/proposals/ciahn/ciahn-logo.webp',
    projectCode: 'FDC-CIAHN-2026-01',
    date: '12 de Septiembre, 2026',
    validUntil: '30 de Septiembre, 2026 (18 días)',
    accessPin: 'ciaahn2026',
    alternativePins: ['ciahn2026', 'ciahn', 'ciaahn', 'atacama'],
    status: 'active',
    executive: {
      name: 'Equipo Comercial & Ingeniería',
      role: 'Especialista en Estructuras Modulares',
      phone: '+56959192685',
      whatsapp: '56959192685',
      email: 'contacto@fabricadecarpas.cl'
    },
    product: {
      name: 'Carpa Cerrada 7x5 H4 Negra con Estampado Institucional',
      badge: 'Modelo Industrial Reforzado para Desierto',
      dimensions: '7.00 m (Largo) x 5.00 m (Ancho)',
      height: '4.00 m (Altura libre en cumbrera)',
      area: '35 m² de superficie cubierta',
      color: 'Negro Mate Industrial Alta Densidad (Blackout)',
      capacity: 'Aforo técnico 30-45 personas / Estación móvil de laboratorio y faena',
      windResistance: 'Resistencia estructural certificada hasta 85 km/h con anclaje a suelo',
      highlights: [
        {
          title: '35 m² de Espacio Útil',
          desc: 'Dimensiones amplias de 7x5m con 4 metros de altura para equipos, laboratorios o personal en faena.',
          icon: 'Maximize2'
        },
        {
          title: 'Protección UV UPF 50+',
          desc: 'Filtro solar de máxima graduación certificado contra la radiación extrema del desierto de Atacama.',
          icon: 'ShieldCheck'
        },
        {
          title: 'Estructura Mecano 1045',
          desc: 'Perfilería de 50x50mm en acero zincado de alta resistencia con uniones mecanizadas de aluminio.',
          icon: 'Layers'
        },
        {
          title: 'Impermeabilidad >5000 mm',
          desc: 'Columna de agua sellada y repelencia total al agua, llovizna costera y condensación térmica.',
          icon: 'Sparkles'
        }
      ]
    },
    elevationViews: [
      {
        id: 'frontal',
        title: 'Vista Frontal (5 MT x 4 MT)',
        dimensions: '5.00 m ancho × 4.00 m alto',
        image: '/proposals/ciahn/slide-2.webp',
        description: 'Frontis principal con puerta de acceso enrollable central de altura libre y logotipo oficial CIAHN Atacama estampado en termo-transferencia de alta resolución.'
      },
      {
        id: 'lateral',
        title: 'Vista Lateral (7 MT x 4 MT)',
        dimensions: '7.00 m largo × 4.00 m alto',
        image: '/proposals/ciahn/slide-3.webp',
        description: 'Cerramiento lateral continuo de 7 metros con panel de ventilación protegido por malla técnica microperforada para circulación térmica y logo CIAHN centrado.'
      },
      {
        id: 'diagonal',
        title: 'Vista Diagonal Isométrica 3D',
        dimensions: '7.00 m × 5.00 m × 4.00 m H',
        image: '/proposals/ciahn/slide-4.webp',
        description: 'Proyección volumétrica 3D del domo iglú con geometría aerodinámica que disipa la carga eólica y maximiza el volumen interior sin pilares centrales.'
      },
      {
        id: 'ficha',
        title: 'Diagrama de Componentes & Ficha',
        dimensions: 'Desglose Mecánico y Materiales',
        image: '/proposals/ciahn/slide-6.webp',
        description: 'Identificación de uniones de aluminio mecanizado, perfilería de acero 1045 zincado, refuerzo doble capa textil y estacas de anclaje de tierra.'
      }
    ],
    terrainViews: [
      {
        id: 'panorama',
        title: 'Simulación Fotorrealista en Desierto de Atacama',
        image: '/proposals/ciahn/slide-5.webp',
        caption: 'Renderizado en entorno real de faena paleontológica: Vistas Diagonal, Lateral y Frontal integradas al paisaje desértico.'
      },
      {
        id: 'diagonal-terreno',
        title: 'Perspectiva Diagonal en Terreno',
        image: '/proposals/ciahn/terreno-diagonal.webp',
        caption: 'Apreciación del volumen, tensión de cubierta y presencia corporativa en terreno árido.'
      },
      {
        id: 'lateral-terreno',
        title: 'Perspectiva Lateral en Terreno',
        image: '/proposals/ciahn/terreno-lateral.webp',
        caption: 'Amplitud de los 7 metros de fondo y ventana técnica con protección solar.'
      },
      {
        id: 'frente-terreno',
        title: 'Perspectiva Frontal en Terreno',
        image: '/proposals/ciahn/terreno-frente.webp',
        caption: 'Acceso frontal con altura libre adecuada para tránsito de personal y equipamiento de investigación.'
      }
    ],
    techSpecs: [
      {
        category: 'Estructura Portante',
        items: [
          { label: 'Perfil Principal', value: 'Perfil tubular cuadrado 50x50 mm en acero al carbono 1045' },
          { label: 'Tratamiento Superficial', value: 'Zincado electrolítico de alta resistencia contra corrosión y salinidad' },
          { label: 'Sistema de Ensamble', value: 'Mecano modular de rápido montaje sin necesidad de soldaduras en terreno' },
          { label: 'Conectores y Nodos', value: 'Uniones mecanizadas en aluminio grado estructural de alta tenacidad' },
          { label: 'Resistencia Eólica', value: 'Cálculo para vientos de hasta 85 km/h con sistema de estacas instalado' }
        ]
      },
      {
        category: 'Techo y Laterales (Textil)',
        items: [
          { label: 'Composición', value: '100% Poliéster de alta tenacidad con refuerzo bicapa (Blackout)' },
          { label: 'Protección Solar', value: 'Filtro UV certificado UPF 50+ con bloqueo de radiación >98%' },
          { label: 'Impermeabilidad', value: 'Mayor a 5.000 mm de columna de agua (100% impermeable)' },
          { label: 'Cerramientos', value: '4 paredes perimetrales desmontables con cierres industriales de alta resistencia' },
          { label: 'Ventilación', value: 'Ventana lateral con malla técnica para flujo de aire anti-condensación' },
          { label: 'Acceso', value: 'Puerta frontal enrollable con correas de sujeción reforzadas' }
        ]
      },
      {
        category: 'Personalización & Gráfica',
        items: [
          { label: 'Técnica de Impresión', value: 'Impresión digital de alta resolución UV-Curado y termo-estampado' },
          { label: 'Ubicación de Logos', value: 'Frontis superior + paneles laterales (según plano aprobado)' },
          { label: 'Durabilidad Gráfica', value: 'Tintas curadas con resistencia UV grado intemperie (sin decoloración prematura)' }
        ]
      },
      {
        category: 'Fijación & Terreno',
        items: [
          { label: 'Anclaje Base', value: 'Incluye kit de estacas de acero galvanizado reforzadas para tierra y maicillo' },
          { label: 'Platinas de Apoyo', value: 'Placas base de acero perforadas para anclaje a suelo o pernos de expansión' },
          { label: 'Vientos de Tensión', value: 'Cintas tensoras perimetrales con trinquetes de amarre rápido' }
        ]
      }
    ],
    certifications: [
      {
        name: 'ASTM International',
        badge: 'ASTM',
        desc: 'Cumplimiento de estándares de resistencia a la tracción y rasgado de telas industriales.'
      },
      {
        name: 'Caltex Quality System',
        badge: 'Caltex',
        desc: 'Certificación de calidad textil, sellado hermético y protección contra rayos ultravioleta.'
      },
      {
        name: 'ISO 9001:2015',
        badge: 'ISO 9001',
        desc: 'Procesos de fabricación industrial y control de calidad bajo norma internacional.'
      }
    ],
    pricing: {
      currency: 'CLP',
      subtotal: 4890000,
      ivaRate: 0.19,
      ivaAmount: 929100,
      total: 5819100,
      deliveryText: '10 a 15 días hábiles a partir de la confirmación de la orden de compra y aprobación gráfica.',
      paymentTerms: '50% anticipo al iniciar fabricación / 50% contra entrega conforme o despacho a Copiapó.',
      validityDays: 18,
      items: [
        {
          name: 'Estructura Modular Mecano 7x5 H4 Industrial',
          description: 'Estructura completa en perfil 50x50mm acero 1045 zincado, cumbrera a 4.0m de altura libre, uniones en aluminio mecanizado y platinas base.',
          qty: 1,
          unitPrice: 2790000,
          totalPrice: 2790000
        },
        {
          name: 'Set de Cubiertas Blackout Techo + 4 Laterales Desmontables',
          description: 'Tela 100% poliéster bicapa alta tenacidad, protección solar UPF 50+, impermeabilidad >5000mm, puerta enrollable y ventana técnica de ventilación.',
          qty: 1,
          unitPrice: 1450000,
          totalPrice: 1450000
        },
        {
          name: 'Personalización Gráfica UV-Curado Logos CIAHN ATACAMA',
          description: 'Estampado de alta durabilidad en frontis y paneles laterales según diagramas técnicos aprobados.',
          qty: 1,
          unitPrice: 380000,
          totalPrice: 380000
        },
        {
          name: 'Kit de Anclaje de Alta Fijación para Terreno Desértico',
          description: 'Juego de estacas de acero galvanizado reforzadas tipo mecano y cintas de tensión con trinquete.',
          qty: 1,
          unitPrice: 270000,
          totalPrice: 270000
        },
        {
          name: 'Embalaje de Protección y Preparación de Despacho Logístico',
          description: 'Bolsas de transporte de uso rudo para perfilería y fundas protectoras para lonas textiles.',
          qty: 1,
          unitPrice: 0,
          totalPrice: 0
        }
      ]
    },
    pdfUrl: '/proposals/ciahn/propuesta-tecnica-ciahn-carpa-7x5-fdc.pdf'
  }
};

export function getProposal(slug: string): Proposal | null {
  return PROPOSALS[slug.toLowerCase()] || null;
}
