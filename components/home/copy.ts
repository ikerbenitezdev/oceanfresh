import type { Locale } from "@/lib/locale";

type Segment = string | { strong: string };

export type HomeCopy = {
  heroTitle: string;
  heroLead: (n: number) => string;
  quote: string;
  seeCatalog: string;

  rangeTitle: (n: number) => string;
  rangeLead: string;
  speciesCount: (n: number) => string;
  families: Record<"Pescado" | "Cefalópodos" | "Crustáceos" | "Condrictios", string>;

  originTitle: string;
  originLead: string;
  originPoints: Array<{ title: string; text: string }>;
  originMap: string;

  aboutTitle: string;
  statement: Segment[];

  coldTitle: string;
  coldLead: string;
  coldFacts: Array<{ value: string; label: string }>;

  docsTitle: string;
  docsLead: string;
  docs: Array<{ title: string; text: string }>;

  closeTitle: string;
  closeLead: string;

  alt: {
    hero: string;
    families: Record<"Pescado" | "Cefalópodos" | "Crustáceos" | "Condrictios", string>;
    trawler: string;
    port: string;
    prawns: string;
    monkfish: string;
    squid: string;
    onispa: string;
  };
};

export const homeCopy: Record<Locale, HomeCopy> = {
  es: {
    heroTitle: "Pescado mauritano al por mayor",
    heroLead: (n) =>
      `${n} especies del Atlántico para importadores, distribuidores y hostelería, frescas o congeladas, con certificado sanitario ONISPA para entrar en la UE.`,
    quote: "Pedir presupuesto",
    seeCatalog: "Ver el catálogo",

    rangeTitle: (n) => `${n} especies en cuatro familias`,
    rangeLead:
      "Cada ficha del catálogo indica nombre científico, presentación, envasado y zona de captura.",
    speciesCount: (n) => `${n} especies`,
    families: {
      Pescado: "Pescado",
      Cefalópodos: "Cefalópodos",
      Crustáceos: "Crustáceos",
      Condrictios: "Rayas y tiburones",
    },

    originTitle: "Pescado elegido en la lonja de Nouadhibou",
    originLead:
      "Los barcos descargan frente al banco pesquero de Mauritania. Elegimos cada lote en la lonja, en el punto de descarga, y lo exportamos nosotros mismos.",
    originPoints: [
      { title: "Selección en lonja", text: "Vemos y elegimos el pescado al bajar del barco." },
      { title: "Exportación directa", text: "Del puerto a tu almacén, sin intermediarios." },
    ],
    originMap: "Ver el puerto en el mapa",

    aboutTitle: "Sobre OceanFresh",
    statement: [
      "OceanFresh une el banco pesquero de Mauritania con compradores de Europa, Asia y América. Elegimos el pescado en lonja, ",
      { strong: "mantenemos el frío desde el barco" },
      " y enviamos cada lote con sus papeles en regla.",
    ],

    coldTitle: "Cadena de frío de +2 °C a −18 °C",
    coldLead:
      "Fresco o congelado, cada lote se mantiene frío desde que sale del barco hasta que llega a tu almacén.",
    coldFacts: [
      { value: "48 h", label: "del mar a la lonja" },
      { value: "2–20 kg", label: "cajas de cartón aluminizado" },
      { value: "FAO 34", label: "zona de captura" },
    ],

    docsTitle: "8 documentos con cada envío",
    docsLead:
      "ONISPA, la autoridad sanitaria pesquera de Mauritania, inspecciona cada lote en origen y la SMCP valida la exportación. Con la mercancía recibes:",
    docs: [
      { title: "Certificado sanitario ONISPA", text: "Acredita que el pescado puede entrar en la UE." },
      { title: "Certificado de origen y EUR.1", text: "De la Cámara de Comercio: el pescado es de Mauritania." },
      { title: "Certificado de captura", text: "Barco, zona FAO, fecha de pesca y lotes." },
      { title: "Certificado de temperatura", text: "La cadena de frío se mantuvo a −18 °C o menos." },
      { title: "Validación SMCP", text: "Autoriza la exportación y controla los valores declarados." },
      { title: "Factura comercial", text: "Comprador, cantidades, precio e Incoterms." },
      { title: "Packing list", text: "Cajas, pesos, lotes y tipo de embalaje." },
      { title: "Conocimiento de embarque o AWB", text: "Prueba que la mercancía va en el barco o en el avión." },
    ],

    closeTitle: "Presupuesto en menos de 24 horas",
    closeLead: "Dinos especie, cantidad y país de destino y te enviamos precio y plazos.",

    alt: {
      hero: "Barca de pesca varada en la playa, con el Atlántico detrás",
      families: {
        Pescado: "Pez de San Pedro sobre hielo",
        Cefalópodos: "Pulpos frescos",
        Crustáceos: "Langosta mora entera",
        Condrictios: "Raya mosaica en una caja con hielo",
      },
      trawler: "Arrastrero faenando con las redes abiertas",
      port: "Puerto de Nouadhibou con cayucos, barcos de pesca y cargueros",
      prawns: "Gambas rojas sobre hielo picado",
      monkfish: "Rape entero en una caja con hielo",
      squid: "Calamares enteros en un plato",
      onispa: "Logotipo de ONISPA",
    },
  },

  en: {
    heroTitle: "Wholesale fish from Mauritania",
    heroLead: (n) =>
      `${n} Atlantic species for importers, distributors and restaurants, fresh or frozen, with ONISPA health certificates accepted for entry into the EU.`,
    quote: "Request a quote",
    seeCatalog: "See the catalog",

    rangeTitle: (n) => `${n} species in four families`,
    rangeLead:
      "Every catalog entry lists the scientific name, presentation, packing and catch area.",
    speciesCount: (n) => `${n} species`,
    families: {
      Pescado: "Fish",
      Cefalópodos: "Cephalopods",
      Crustáceos: "Crustaceans",
      Condrictios: "Rays and sharks",
    },

    originTitle: "Fish chosen at Nouadhibou market",
    originLead:
      "Boats land their catch beside the Mauritanian fishing bank. We choose every lot on the quay where it comes ashore and export it ourselves.",
    originPoints: [
      { title: "Chosen on the quay", text: "We see and pick the fish as it comes off the boat." },
      { title: "Exported directly", text: "From the port to your warehouse, with no middlemen." },
    ],
    originMap: "See the port on the map",

    aboutTitle: "About OceanFresh",
    statement: [
      "OceanFresh links the Mauritanian fishing bank with buyers in Europe, Asia and the Americas. We pick the fish at the market, ",
      { strong: "keep it cold from the boat onward" },
      " and ship every lot with its papers in order.",
    ],

    coldTitle: "A cold chain from +2 °C to −18 °C",
    coldLead: "Fresh or frozen, every lot stays cold from the moment it leaves the boat until it reaches your warehouse.",
    coldFacts: [
      { value: "48 h", label: "from sea to market" },
      { value: "2–20 kg", label: "aluminium-lined cartons" },
      { value: "FAO 34", label: "catch area" },
    ],

    docsTitle: "8 documents with every shipment",
    docsLead:
      "ONISPA, Mauritania's fish health authority, inspects every lot at origin and SMCP validates the export. With the goods you receive:",
    docs: [
      { title: "ONISPA health certificate", text: "Shows the fish may enter the EU." },
      { title: "Certificate of origin and EUR.1", text: "From the Chamber of Commerce: the fish is Mauritanian." },
      { title: "Catch certificate", text: "Vessel, FAO area, catch date and lots." },
      { title: "Temperature certificate", text: "The cold chain held at −18 °C or below." },
      { title: "SMCP validation", text: "Authorises the export and checks the declared values." },
      { title: "Commercial invoice", text: "Buyer, quantities, price and Incoterms." },
      { title: "Packing list", text: "Cartons, weights, lots and packing type." },
      { title: "Bill of lading or air waybill", text: "Proves the goods are on the ship or the plane." },
    ],

    closeTitle: "A quote within 24 hours",
    closeLead: "Tell us the species, quantity and destination country and we send price and lead time.",

    alt: {
      hero: "Fishing boat pulled up on the beach, the Atlantic behind it",
      families: {
        Pescado: "John Dory on ice",
        Cefalópodos: "Fresh octopus",
        Crustáceos: "Whole pink spiny lobster",
        Condrictios: "Undulate ray in a crate of ice",
      },
      trawler: "Trawler at work with its nets out",
      port: "Nouadhibou port with pirogues, fishing boats and cargo ships",
      prawns: "Red prawns on crushed ice",
      monkfish: "Whole monkfish in a crate of ice",
      squid: "Whole squid on a plate",
      onispa: "ONISPA logo",
    },
  },

  fr: {
    heroTitle: "Poisson mauritanien en gros",
    heroLead: (n) =>
      `${n} espèces de l'Atlantique pour importateurs, distributeurs et restaurateurs, fraîches ou congelées, avec certificat sanitaire ONISPA reconnu pour l'entrée dans l'UE.`,
    quote: "Demander un devis",
    seeCatalog: "Voir le catalogue",

    rangeTitle: (n) => `${n} espèces en quatre familles`,
    rangeLead:
      "Chaque fiche du catalogue indique le nom scientifique, la présentation, l'emballage et la zone de capture.",
    speciesCount: (n) => `${n} espèces`,
    families: {
      Pescado: "Poissons",
      Cefalópodos: "Céphalopodes",
      Crustáceos: "Crustacés",
      Condrictios: "Raies et requins",
    },

    originTitle: "Poisson choisi à la criée de Nouadhibou",
    originLead:
      "Les bateaux débarquent face au banc de pêche mauritanien. Nous choisissons chaque lot à la criée, au point de débarquement, et l'exportons nous-mêmes.",
    originPoints: [
      { title: "Sélection à la criée", text: "Nous voyons et choisissons le poisson au débarquement." },
      { title: "Export direct", text: "Du port à votre entrepôt, sans intermédiaires." },
    ],
    originMap: "Voir le port sur la carte",

    aboutTitle: "À propos d'OceanFresh",
    statement: [
      "OceanFresh relie le banc de pêche mauritanien aux acheteurs d'Europe, d'Asie et des Amériques. Nous choisissons le poisson à la criée, ",
      { strong: "gardons le froid depuis le bateau" },
      " et expédions chaque lot avec ses papiers en règle.",
    ],

    coldTitle: "Chaîne du froid de +2 °C à −18 °C",
    coldLead: "Frais ou congelé, chaque lot reste au froid de sa sortie du bateau jusqu'à votre entrepôt.",
    coldFacts: [
      { value: "48 h", label: "de la mer à la criée" },
      { value: "2–20 kg", label: "cartons aluminisés" },
      { value: "FAO 34", label: "zone de capture" },
    ],

    docsTitle: "8 documents avec chaque envoi",
    docsLead:
      "L'ONISPA, autorité sanitaire des pêches de Mauritanie, inspecte chaque lot à l'origine et la SMCP valide l'export. Avec la marchandise, vous recevez :",
    docs: [
      { title: "Certificat sanitaire ONISPA", text: "Atteste que le poisson peut entrer dans l'UE." },
      { title: "Certificat d'origine et EUR.1", text: "De la Chambre de commerce : le poisson est mauritanien." },
      { title: "Certificat de capture", text: "Navire, zone FAO, date de pêche et lots." },
      { title: "Certificat de température", text: "La chaîne du froid a tenu à −18 °C ou moins." },
      { title: "Validation SMCP", text: "Autorise l'export et contrôle les valeurs déclarées." },
      { title: "Facture commerciale", text: "Acheteur, quantités, prix et Incoterms." },
      { title: "Liste de colisage", text: "Cartons, poids, lots et type d'emballage." },
      { title: "Connaissement ou LTA", text: "Prouve que la marchandise est à bord du navire ou de l'avion." },
    ],

    closeTitle: "Un devis en moins de 24 heures",
    closeLead: "Indiquez l'espèce, la quantité et le pays de destination, et nous envoyons prix et délais.",

    alt: {
      hero: "Barque de pêche échouée sur la plage, l'Atlantique derrière",
      families: {
        Pescado: "Saint-Pierre sur la glace",
        Cefalópodos: "Poulpes frais",
        Crustáceos: "Langouste rose entière",
        Condrictios: "Raie brunette dans une caisse de glace",
      },
      trawler: "Chalutier en pêche, filets ouverts",
      port: "Port de Nouadhibou avec pirogues, bateaux de pêche et cargos",
      prawns: "Crevettes rouges sur glace pilée",
      monkfish: "Lotte entière dans une caisse de glace",
      squid: "Calmars entiers dans une assiette",
      onispa: "Logo de l'ONISPA",
    },
  },

  ar: {
    heroTitle: "أسماك موريتانية بالجملة",
    heroLead: (n) =>
      `${n} نوعا من المحيط الأطلسي للمستوردين والموزعين والمطاعم، طازجة أو مجمدة، مع شهادة صحية من ONISPA معترف بها لدخول الاتحاد الأوروبي.`,
    quote: "اطلب عرض سعر",
    seeCatalog: "تصفح الكتالوج",

    rangeTitle: (n) => `${n} نوعا في أربع فئات`,
    rangeLead: "تذكر كل بطاقة في الكتالوج الاسم العلمي وطريقة التقديم والتعبئة ومنطقة الصيد.",
    speciesCount: (n) => `${n} نوعا`,
    families: {
      Pescado: "أسماك",
      Cefalópodos: "رأسيات الأرجل",
      Crustáceos: "قشريات",
      Condrictios: "الراي وأسماك القرش",
    },

    originTitle: "سمك نختاره في سوق نواذيبو",
    originLead:
      "ترسو القوارب قبالة المصايد الموريتانية. نختار كل دفعة في سوق السمك عند نقطة التفريغ ونتولى تصديرها بأنفسنا.",
    originPoints: [
      { title: "اختيار في السوق", text: "نعاين السمك ونختاره عند تفريغه من القارب." },
      { title: "تصدير مباشر", text: "من الميناء إلى مستودعك دون وسطاء." },
    ],
    originMap: "شاهد الميناء على الخريطة",

    aboutTitle: "عن OceanFresh",
    statement: [
      "تربط OceanFresh المصايد الموريتانية بالمشترين في أوروبا وآسيا والأمريكتين. نختار السمك في السوق، ",
      { strong: "ونحافظ على التبريد منذ القارب" },
      "، ونشحن كل دفعة بوثائقها كاملة.",
    ],

    coldTitle: "سلسلة تبريد من +2 °C إلى −18 °C",
    coldLead: "طازجا كان أو مجمدا، تبقى كل دفعة مبردة منذ خروجها من القارب حتى وصولها إلى مستودعك.",
    coldFacts: [
      { value: "48 h", label: "من البحر إلى السوق" },
      { value: "2–20 kg", label: "صناديق كرتون مبطنة بالألمنيوم" },
      { value: "FAO 34", label: "منطقة الصيد" },
    ],

    docsTitle: "8 وثائق مع كل شحنة",
    docsLead:
      "تفحص ONISPA، الهيئة الصحية للصيد في موريتانيا، كل دفعة عند المصدر وتعتمد SMCP التصدير. مع البضاعة تتسلم:",
    docs: [
      { title: "شهادة ONISPA الصحية", text: "تثبت أن السمك صالح لدخول الاتحاد الأوروبي." },
      { title: "شهادة المنشأ و EUR.1", text: "تصدرها غرفة التجارة: السمك موريتاني." },
      { title: "شهادة الصيد", text: "السفينة ومنطقة الفاو وتاريخ الصيد والدفعات." },
      { title: "شهادة الحرارة", text: "بقيت سلسلة التبريد عند −18 °C أو أقل." },
      { title: "اعتماد SMCP", text: "يأذن بالتصدير ويراقب القيم المصرح بها." },
      { title: "الفاتورة التجارية", text: "المشتري والكميات والسعر وشروط Incoterms." },
      { title: "قائمة التعبئة", text: "الصناديق والأوزان والدفعات ونوع التغليف." },
      { title: "بوليصة الشحن البحري أو الجوي", text: "تثبت أن البضاعة على متن السفينة أو الطائرة." },
    ],

    closeTitle: "عرض سعر خلال 24 ساعة",
    closeLead: "أخبرنا بالنوع والكمية وبلد الوجهة، ونرسل لك السعر ومدة التسليم.",

    alt: {
      hero: "قارب صيد على الشاطئ والمحيط الأطلسي خلفه",
      families: {
        Pescado: "سمكة القديس بطرس على الثلج",
        Cefalópodos: "أخطبوط طازج",
        Crustáceos: "جراد بحر وردي كامل",
        Condrictios: "سمكة راي في صندوق ثلج",
      },
      trawler: "سفينة صيد بشباكها المفتوحة",
      port: "ميناء نواذيبو بالقوارب التقليدية وسفن الصيد والشحن",
      prawns: "قريدس أحمر على الثلج المجروش",
      monkfish: "سمكة أبو الشص كاملة في صندوق ثلج",
      squid: "حبار كامل في طبق",
      onispa: "شعار ONISPA",
    },
  },
};
