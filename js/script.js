(function () {
  "use strict";

  const STORAGE_KEYS = {
    cart: "playpro_cart_v3",
    wishlist: "playpro_wishlist_v3",
    compare: "playpro_compare_v1",
    promo: "playpro_promo_v1",
    shipping: "playpro_shipping_v1",
    orders: "playpro_orders_v1",
    theme: "playpro_theme_v1",
    loyalty: "playpro_loyalty_v1",
    activity: "playpro_activity_v1",
    savedSearches: "playpro_saved_searches_v1",
    stockAlerts: "playpro_stock_alerts_v1",
    checkoutDraft: "playpro_checkout_draft_v1",
    personalization: "playpro_personalization_v1",
    reviews: "playpro_reviews_v1",
    referrals: "playpro_referrals_v1",
    admin: "playpro_admin_v1",
    currency: "playpro_currency_v1",
    locale: "playpro_locale_v1",
    reducedMotion: "playpro_reduced_motion_v1",
    cartAbandon: "playpro_cart_abandon_v1",
    authUsers: "playpro_auth_users_v1",
    authSession: "playpro_auth_session_v1",
    aiCoachSize: "playpro_ai_coach_size_v1",
  };

  const STORE_CONFIG = {
    taxRate: 0.08,
    freeShippingThreshold: 180,
    shippingRates: {
      standard: 8,
      express: 22,
    },
    currencies: {
      USD: { symbol: "$", rate: 1 },
      EUR: { symbol: "€", rate: 0.92 },
      GBP: { symbol: "£", rate: 0.79 },
      INR: { symbol: "₹", rate: 84.2 },
    },
  };

  const promoDiscountRate = 0.1;

  const SPORT_PROFILES = {
    Football: {
      key: "football",
      accent: "#4ad1ff",
      motif: "pitch-grid",
      style: "high-contrast turf and motion blur",
    },
    Basketball: {
      key: "basketball",
      accent: "#ff9f43",
      motif: "court-lines",
      style: "warm gym lighting and close-up textures",
    },
    Running: {
      key: "running",
      accent: "#2de2a5",
      motif: "lane-stripes",
      style: "natural daylight and stride composition",
    },
    Cricket: {
      key: "cricket",
      accent: "#ffd166",
      motif: "crease-lines",
      style: "grass pitch depth and bat-focus framing",
    },
    Recovery: {
      key: "recovery",
      accent: "#9f87ff",
      motif: "soft-wave",
      style: "clean studio scenes and calm tonal contrast",
    },
    Training: {
      key: "training",
      accent: "#ff6a3d",
      motif: "strength-grid",
      style: "industrial gym framing and directional light",
    },
  };

  const USE_CASES = ["Beginner", "Academy", "Pro-Level", "Indoor", "Outdoor"];
  const PLAY_STYLES = ["Speed", "Control", "Power", "Endurance", "Recovery"];

  const INTENT_HINTS = [
    {
      key: "wet field",
      copy: "Best football gear for wet field grip and control",
      filters: { category: "Football", playStyle: "Control", useCase: "Outdoor" },
    },
    {
      key: "indoor court",
      copy: "Basketball gear optimized for indoor court traction",
      filters: { category: "Basketball", useCase: "Indoor", playStyle: "Control" },
    },
    {
      key: "academy training",
      copy: "Team-approved academy training bundles",
      filters: { useCase: "Academy" },
    },
    {
      key: "injury recovery",
      copy: "Low-impact recovery kit for muscle release",
      filters: { category: "Recovery", playStyle: "Recovery" },
    },
    {
      key: "speed drills",
      copy: "Explosive speed training essentials",
      filters: { category: "Training", playStyle: "Speed" },
    },
  ];

  const pexels = (id, width = 1200) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

  const unsplash = (id, width = 1200) =>
    `https://unsplash.com/photos/${id}/download?force=true&w=${width}`;

  const IMAGE = {
    footballBall: unsplash("ifRkVm7fxag"),
    footballBallClose: pexels(15632966),
    footballBoots: pexels(6077791),
    footballCleats: pexels(1598505),
    footballAction: pexels(1884574),
    footballField: pexels(274422),
    goalkeeperGloves: unsplash("Wtx4cku85Pg"),
    basketballBall: pexels(1752757),
    basketballBallGame: pexels(2834917),
    basketballShoes: pexels(1767957),
    basketballGear: pexels(2294361),
    basketballHoop: pexels(3148452),
    dumbbells: pexels(416778),
    agility: pexels(4586740),
    resistance: pexels(6550825),
    trainingKit: pexels(4056723),
    runningShoes: pexels(1456706),
    runningTrack: pexels(1199590),
    runningVest: pexels(292999),
    smartwatch: unsplash("eX2wDKGHN10"),
    smartwatchAlt: unsplash("tT_V3qBCbak"),
    cricketBat: pexels(1661950),
    cricketGloves: pexels(2116469),
    cricketAction: pexels(12995627),
    recoveryRoller: pexels(3757374),
    recoveryTool: unsplash("rMNof7GivtE"),
    yogaMat: unsplash("JW6r_0CPYec"),
  };

  const PRODUCTS = [
    {
      id: "aero-match-football",
      name: "Aero Match Football",
      category: "Football",
      price: 89,
      oldPrice: 109,
      rating: 4.8,
      reviews: 201,
      stock: 43,
      badge: "Best Seller",
      short: "Tournament football with stable flight and elite first touch.",
      description:
        "Designed for high-level play with precision panel shaping and consistent bounce.",
      features: [
        "Thermobonded panel structure",
        "True-flight bladder balance",
        "Water-resistant micro-texture",
      ],
      image: IMAGE.footballBall,
      gallery: [
        IMAGE.footballBall,
        IMAGE.footballBallClose,
        IMAGE.footballField,
        IMAGE.footballAction,
      ],
      featured: true,
      popularity: 99,
      newArrival: false,
    },
    {
      id: "velocity-studs-pro",
      name: "Velocity Studs Pro",
      category: "Football",
      price: 124,
      oldPrice: 149,
      rating: 4.7,
      reviews: 147,
      stock: 31,
      badge: "Pro Pick",
      short: "Lightweight football boots tuned for speed and quick direction changes.",
      description:
        "Engineered for aggressive acceleration with superior traction and lockdown fit.",
      features: [
        "Dual-density outsole studs",
        "Breathable performance upper",
        "Reinforced heel stability",
      ],
      image: IMAGE.footballBoots,
      gallery: [
        IMAGE.footballBoots,
        IMAGE.footballCleats,
        IMAGE.footballAction,
        IMAGE.footballField,
      ],
      featured: true,
      popularity: 96,
      newArrival: true,
    },
    {
      id: "striker-pro-match-ball",
      name: "Striker Pro Match Ball",
      category: "Football",
      price: 76,
      oldPrice: 94,
      rating: 4.6,
      reviews: 138,
      stock: 56,
      badge: "Match Day",
      short: "Professional-grade training and match football with strong shape retention.",
      description:
        "Built for clubs and academies that need reliable control over long sessions.",
      features: [
        "Reinforced stitched seam build",
        "Optimized air retention",
        "Textured control panels",
      ],
      image: IMAGE.footballBallClose,
      gallery: [
        IMAGE.footballBallClose,
        IMAGE.footballBall,
        IMAGE.footballAction,
        IMAGE.footballField,
      ],
      featured: true,
      popularity: 93,
      newArrival: false,
    },
    {
      id: "keeper-guard-gloves",
      name: "Keeper Guard Gloves",
      category: "Football",
      price: 58,
      oldPrice: 74,
      rating: 4.5,
      reviews: 117,
      stock: 48,
      badge: "Grip Max",
      short: "Goalkeeper gloves with impact shielding and sticky grip palms.",
      description:
        "Secure catches and protect fingers with match-ready padding and high-friction latex.",
      features: [
        "3.5mm grip latex",
        "Finger support spines",
        "Breathable stretch mesh",
      ],
      image: IMAGE.goalkeeperGloves,
      gallery: [
        IMAGE.goalkeeperGloves,
        IMAGE.footballField,
        IMAGE.footballAction,
        IMAGE.footballBall,
      ],
      featured: false,
      popularity: 88,
      newArrival: false,
    },
    {
      id: "matchday-shin-guards",
      name: "Matchday Shin Guards",
      category: "Football",
      price: 34,
      oldPrice: 44,
      rating: 4.4,
      reviews: 93,
      stock: 72,
      badge: "Essential",
      short: "Low-profile shin protection built for comfort and impact resistance.",
      description:
        "Lightweight protective shell with foam backing for secure all-game comfort.",
      features: [
        "High-impact outer shell",
        "Moisture-wicking liner",
        "Ergonomic calf fit",
      ],
      image: IMAGE.footballCleats,
      gallery: [
        IMAGE.footballCleats,
        IMAGE.footballBoots,
        IMAGE.footballAction,
        IMAGE.footballField,
      ],
      featured: false,
      popularity: 82,
      newArrival: true,
    },
    {
      id: "street-king-basketball",
      name: "Street King Basketball",
      category: "Basketball",
      price: 74,
      oldPrice: 92,
      rating: 4.7,
      reviews: 244,
      stock: 44,
      badge: "Outdoor",
      short: "Outdoor basketball with deep channels and dependable grip.",
      description:
        "Built for concrete courts with durable rubber composite and controlled bounce.",
      features: [
        "Long-wear composite shell",
        "Enhanced grip channels",
        "Consistent rebound core",
      ],
      image: IMAGE.basketballBall,
      gallery: [
        IMAGE.basketballBall,
        IMAGE.basketballBallGame,
        IMAGE.basketballHoop,
        IMAGE.basketballGear,
      ],
      featured: true,
      popularity: 95,
      newArrival: false,
    },
    {
      id: "rimfire-hoops-shoes",
      name: "Rimfire Hoops Shoes",
      category: "Basketball",
      price: 148,
      oldPrice: 176,
      rating: 4.9,
      reviews: 121,
      stock: 22,
      badge: "New Drop",
      short: "Mid-top basketball shoes with explosive cushioning and ankle support.",
      description:
        "Designed for quick drives and stable landings with high-traction outsole geometry.",
      features: [
        "Responsive foam midsole",
        "Locked-in heel structure",
        "Multi-court traction pattern",
      ],
      image: IMAGE.basketballShoes,
      gallery: [
        IMAGE.basketballShoes,
        IMAGE.basketballGear,
        IMAGE.basketballHoop,
        IMAGE.basketballBallGame,
      ],
      featured: true,
      popularity: 97,
      newArrival: true,
    },
    {
      id: "gripmax-pro-basketball",
      name: "GripMax Pro Basketball",
      category: "Basketball",
      price: 82,
      oldPrice: 99,
      rating: 4.6,
      reviews: 154,
      stock: 39,
      badge: "Indoor / Outdoor",
      short: "All-surface basketball tuned for stable control and shot consistency.",
      description:
        "Balanced core and tacky panel finish to maintain control across different courts.",
      features: [
        "Dual-surface rubber blend",
        "Precision channel depth",
        "Long shape retention",
      ],
      image: IMAGE.basketballBallGame,
      gallery: [
        IMAGE.basketballBallGame,
        IMAGE.basketballBall,
        IMAGE.basketballHoop,
        IMAGE.basketballGear,
      ],
      featured: true,
      popularity: 90,
      newArrival: false,
    },
    {
      id: "court-vision-shooting-sleeve",
      name: "Court Vision Shooting Sleeve",
      category: "Basketball",
      price: 29,
      oldPrice: 37,
      rating: 4.4,
      reviews: 86,
      stock: 78,
      badge: "Comfort Fit",
      short: "Compression shooting sleeve for support, circulation, and comfort.",
      description:
        "Breathable, stretch-fit sleeve designed for extended court sessions and recovery.",
      features: [
        "Moisture-wicking knit",
        "Targeted compression zones",
        "Slip-resistant cuff",
      ],
      image: IMAGE.basketballGear,
      gallery: [
        IMAGE.basketballGear,
        IMAGE.basketballShoes,
        IMAGE.basketballBall,
        IMAGE.basketballBallGame,
      ],
      featured: false,
      popularity: 79,
      newArrival: true,
    },
    {
      id: "pro-rim-backboard-set",
      name: "Pro Rim Backboard Set",
      category: "Basketball",
      price: 229,
      oldPrice: 269,
      rating: 4.7,
      reviews: 66,
      stock: 14,
      badge: "Home Court",
      short: "Adjustable basketball hoop system with weather-ready backboard.",
      description:
        "Reinforced rim mount and stable base for driveway and training-court setups.",
      features: [
        "Height-adjustable system",
        "Impact-resistant board",
        "Heavy-duty steel frame",
      ],
      image: IMAGE.basketballHoop,
      gallery: [
        IMAGE.basketballHoop,
        IMAGE.basketballBallGame,
        IMAGE.basketballBall,
        IMAGE.basketballShoes,
      ],
      featured: false,
      popularity: 84,
      newArrival: false,
    },
    {
      id: "powercore-dumbbell-kit",
      name: "PowerCore Dumbbell Kit",
      category: "Training",
      price: 169,
      oldPrice: 199,
      rating: 4.8,
      reviews: 175,
      stock: 25,
      badge: "Gym Essential",
      short: "Adjustable dumbbell set for progressive strength training.",
      description:
        "Quick-change system and compact footprint for home gym and performance programs.",
      features: [
        "Adjustable weight range",
        "Fast lock-switch mechanism",
        "Space-saving rack",
      ],
      image: IMAGE.dumbbells,
      gallery: [
        IMAGE.dumbbells,
        IMAGE.trainingKit,
        IMAGE.resistance,
        IMAGE.agility,
      ],
      featured: true,
      popularity: 91,
      newArrival: false,
    },
    {
      id: "agility-ladder-set",
      name: "Agility Ladder Set",
      category: "Training",
      price: 46,
      oldPrice: 59,
      rating: 4.6,
      reviews: 141,
      stock: 67,
      badge: "Coach Favorite",
      short: "Footwork ladder kit for speed, reaction, and acceleration drills.",
      description:
        "Perfect for athletes who want sharper movement mechanics and explosive starts.",
      features: [
        "12 quick-adjust rungs",
        "Carry bag and markers included",
        "Indoor and outdoor compatible",
      ],
      image: IMAGE.agility,
      gallery: [
        IMAGE.agility,
        IMAGE.trainingKit,
        IMAGE.resistance,
        IMAGE.dumbbells,
      ],
      featured: true,
      popularity: 89,
      newArrival: false,
    },
    {
      id: "flexband-strength-pack",
      name: "FlexBand Strength Pack",
      category: "Training",
      price: 39,
      oldPrice: 52,
      rating: 4.6,
      reviews: 187,
      stock: 84,
      badge: "Value Pack",
      short: "Multi-resistance band set for activation, mobility, and strength.",
      description:
        "Five resistance levels for warmups, rehab, and explosive accessory work.",
      features: [
        "Five resistance levels",
        "Anti-snap premium latex",
        "Portable travel pouch",
      ],
      image: IMAGE.resistance,
      gallery: [
        IMAGE.resistance,
        IMAGE.trainingKit,
        IMAGE.agility,
        IMAGE.dumbbells,
      ],
      featured: false,
      popularity: 87,
      newArrival: false,
    },
    {
      id: "speed-cone-pro-kit",
      name: "Speed Cone Pro Kit",
      category: "Training",
      price: 32,
      oldPrice: 43,
      rating: 4.5,
      reviews: 98,
      stock: 91,
      badge: "Team Kit",
      short: "Training cone set for tactical drills, coordination, and sprint lanes.",
      description:
        "Flexible, high-visibility cones engineered for repetitive field and gym sessions.",
      features: [
        "20-piece cone set",
        "Carry stand included",
        "Impact-flex polymer",
      ],
      image: IMAGE.trainingKit,
      gallery: [
        IMAGE.trainingKit,
        IMAGE.agility,
        IMAGE.resistance,
        IMAGE.dumbbells,
      ],
      featured: false,
      popularity: 80,
      newArrival: true,
    },
    {
      id: "paceflow-running-shoes",
      name: "PaceFlow Running Shoes",
      category: "Running",
      price: 132,
      oldPrice: 158,
      rating: 4.7,
      reviews: 167,
      stock: 34,
      badge: "High Demand",
      short: "Road-running shoes with responsive cushioning and breathable mesh.",
      description:
        "Optimized for long tempo sessions with stable transitions and durable grip.",
      features: [
        "High-return midsole foam",
        "Engineered airflow upper",
        "Abrasion-resistant outsole",
      ],
      image: IMAGE.runningShoes,
      gallery: [
        IMAGE.runningShoes,
        IMAGE.runningTrack,
        IMAGE.runningVest,
        IMAGE.smartwatch,
      ],
      featured: true,
      popularity: 94,
      newArrival: true,
    },
    {
      id: "racepulse-smart-watch",
      name: "RacePulse Smart Watch",
      category: "Running",
      price: 189,
      oldPrice: 225,
      rating: 4.6,
      reviews: 126,
      stock: 28,
      badge: "Tech",
      short: "GPS smart watch with pace, recovery, and heart-rate analytics.",
      description:
        "Track workouts with race-day precision and actionable performance insights.",
      features: [
        "Dual-band GPS",
        "Heart-rate and VO2 tracking",
        "Recovery and sleep analytics",
      ],
      image: IMAGE.smartwatch,
      gallery: [
        IMAGE.smartwatch,
        IMAGE.smartwatchAlt,
        IMAGE.runningTrack,
        IMAGE.runningVest,
      ],
      featured: true,
      popularity: 86,
      newArrival: true,
    },
    {
      id: "endurance-hydration-vest",
      name: "Endurance Hydration Vest",
      category: "Running",
      price: 68,
      oldPrice: 84,
      rating: 4.5,
      reviews: 92,
      stock: 45,
      badge: "Distance Ready",
      short: "Lightweight running vest with balanced hydration storage.",
      description:
        "Stay fueled over long sessions with low-bounce fit and quick-access pockets.",
      features: [
        "Dual flask pockets",
        "Lightweight mesh body",
        "Adjustable chest straps",
      ],
      image: IMAGE.runningVest,
      gallery: [
        IMAGE.runningVest,
        IMAGE.runningTrack,
        IMAGE.runningShoes,
        IMAGE.smartwatch,
      ],
      featured: false,
      popularity: 81,
      newArrival: false,
    },
    {
      id: "titan-cricket-bat",
      name: "Titan Cricket Bat",
      category: "Cricket",
      price: 142,
      oldPrice: 169,
      rating: 4.8,
      reviews: 113,
      stock: 21,
      badge: "Premium Willow",
      short: "English willow bat with balanced pickup and strong sweet spot.",
      description:
        "Crafted for controlled stroke play with reliable response across formats.",
      features: [
        "Select willow profile",
        "Shock-absorbing handle",
        "Extended sweet spot zone",
      ],
      image: IMAGE.cricketBat,
      gallery: [
        IMAGE.cricketBat,
        IMAGE.cricketAction,
        IMAGE.cricketGloves,
        IMAGE.cricketBat,
      ],
      featured: true,
      popularity: 90,
      newArrival: false,
    },
    {
      id: "powerplay-cricket-gloves",
      name: "PowerPlay Cricket Gloves",
      category: "Cricket",
      price: 64,
      oldPrice: 79,
      rating: 4.6,
      reviews: 84,
      stock: 39,
      badge: "Match Comfort",
      short: "Cricket batting gloves designed for grip, comfort, and impact control.",
      description:
        "Multi-zone finger protection with flexible build for long innings.",
      features: [
        "High-density finger guards",
        "Breathable palm mesh",
        "Secure wrist closure",
      ],
      image: IMAGE.cricketGloves,
      gallery: [
        IMAGE.cricketGloves,
        IMAGE.cricketBat,
        IMAGE.cricketAction,
        IMAGE.cricketGloves,
      ],
      featured: false,
      popularity: 78,
      newArrival: true,
    },
    {
      id: "rapid-recovery-roller",
      name: "Rapid Recovery Roller",
      category: "Recovery",
      price: 34,
      oldPrice: 46,
      rating: 4.5,
      reviews: 107,
      stock: 61,
      badge: "Recovery",
      short: "Textured foam roller for post-training muscle release.",
      description:
        "Target tight muscle groups and improve mobility after intense sessions.",
      features: [
        "Dual-density foam core",
        "Deep tissue texture zones",
        "Sweat-resistant finish",
      ],
      image: IMAGE.recoveryRoller,
      gallery: [
        IMAGE.recoveryRoller,
        IMAGE.recoveryTool,
        IMAGE.yogaMat,
        IMAGE.runningTrack,
      ],
      featured: false,
      popularity: 83,
      newArrival: false,
    },
    {
      id: "recovery-massage-gun",
      name: "Recovery Massage Gun",
      category: "Recovery",
      price: 149,
      oldPrice: 179,
      rating: 4.6,
      reviews: 132,
      stock: 27,
      badge: "Deep Relief",
      short: "Portable massage gun for targeted post-workout muscle treatment.",
      description:
        "Reduce soreness quickly with variable speed percussion and ergonomic grip.",
      features: [
        "4 interchangeable heads",
        "Quiet high-torque motor",
        "USB-C fast charging",
      ],
      image: IMAGE.recoveryTool,
      gallery: [
        IMAGE.recoveryTool,
        IMAGE.recoveryRoller,
        IMAGE.yogaMat,
        IMAGE.runningShoes,
      ],
      featured: false,
      popularity: 85,
      newArrival: true,
    },
    {
      id: "titan-yoga-mat-pro",
      name: "Titan Yoga Mat Pro",
      category: "Recovery",
      price: 42,
      oldPrice: 56,
      rating: 4.4,
      reviews: 96,
      stock: 74,
      badge: "Mobility",
      short: "Non-slip yoga mat for cooldown, mobility, and recovery flows.",
      description:
        "Cushioned support and stable grip surface for stretching and floor training.",
      features: [
        "High-grip textured base",
        "6mm comfort cushioning",
        "Roll-and-carry strap",
      ],
      image: IMAGE.yogaMat,
      gallery: [
        IMAGE.yogaMat,
        IMAGE.recoveryRoller,
        IMAGE.recoveryTool,
        IMAGE.trainingKit,
      ],
      featured: false,
      popularity: 76,
      newArrival: false,
    },
  ];

  const GENERATED_CATALOG_TARGET = 210;
  const GENERATED_NAME_PREFIXES = [
    "Apex",
    "Vector",
    "Titan",
    "Pulse",
    "Prime",
    "Ignite",
    "Forge",
    "Summit",
    "Rapid",
    "Vertex",
    "Elite",
    "Rally",
    "Nova",
    "Striker",
    "Power",
    "Swift",
    "Crest",
    "Core",
    "Onyx",
    "Velocity",
  ];
  const GENERATED_SERIES_LABELS = [
    "Core",
    "Pro",
    "Elite",
    "Team",
    "Club",
    "Match",
    "Academy",
    "Series",
  ];

  const GENERATED_CATALOG_CONFIG = {
    Football: {
      imagePool: [
        IMAGE.footballBall,
        IMAGE.footballBallClose,
        IMAGE.footballBoots,
        IMAGE.footballCleats,
        IMAGE.footballAction,
        IMAGE.footballField,
        IMAGE.goalkeeperGloves,
      ],
      templates: [
        {
          label: "Match Ball",
          short: "Match football with predictable flight and clean first-touch control.",
          description: "Tournament-ready ball designed for consistent pace, spin, and control.",
          features: ["Precision panel geometry", "Stable bladder core", "Water-resistant shell"],
          priceMin: 44,
          priceMax: 118,
          images: [IMAGE.footballBall, IMAGE.footballBallClose],
          badges: ["Match Ready", "Control"],
        },
        {
          label: "Training Ball",
          short: "Durable training football built for repetitive drills and shape retention.",
          description: "High-mileage ball tuned for daily sessions across academy and team use.",
          features: ["Durable composite shell", "Balanced rebound", "Long-shape retention"],
          priceMin: 32,
          priceMax: 84,
          images: [IMAGE.footballBallClose, IMAGE.footballField],
          badges: ["Academy Pick", "High Mileage"],
        },
        {
          label: "Firm Ground Boots",
          short: "Firm-ground boots engineered for acceleration, grip, and fast transitions.",
          description: "Explosive football boots with stable traction for match-speed direction changes.",
          features: ["Dual-density studs", "Lockdown heel fit", "Lightweight upper"],
          priceMin: 96,
          priceMax: 199,
          images: [IMAGE.footballBoots, IMAGE.footballCleats],
          badges: ["Speed", "Pro Pick"],
        },
        {
          label: "Turf Boots",
          short: "Turf football boots with responsive grip and cushioned underfoot comfort.",
          description: "Engineered for hard-ground and turf sessions with all-day training comfort.",
          features: ["Turf-specific outsole", "Reinforced toe zone", "Breathable mesh lining"],
          priceMin: 88,
          priceMax: 179,
          images: [IMAGE.footballCleats, IMAGE.footballBoots],
          badges: ["Turf Control", "Session Ready"],
        },
        {
          label: "Goalkeeper Gloves",
          short: "Goalkeeper gloves with strong palm grip and flexible impact support.",
          description: "Secure catches and shot-stopping confidence with match-grade grip latex.",
          features: ["High-grip palm latex", "Finger support zones", "Ventilated backhand panel"],
          priceMin: 42,
          priceMax: 116,
          images: [IMAGE.goalkeeperGloves, IMAGE.footballAction],
          badges: ["Grip Max", "Keeper Choice"],
        },
        {
          label: "Shin Guard Set",
          short: "Lightweight shin guard set with impact protection and stable fit.",
          description: "Low-profile protection for football training and full-match intensity.",
          features: ["Impact-resistant shell", "Foam comfort lining", "Secure calf wrap"],
          priceMin: 24,
          priceMax: 68,
          images: [IMAGE.footballCleats, IMAGE.footballField],
          badges: ["Protection", "Essential"],
        },
        {
          label: "Rebound Trainer Net",
          short: "Rebound net system for passing, first touch, and control repetitions.",
          description: "Portable football trainer that helps build touch quality and passing rhythm.",
          features: ["Quick-fold frame", "Angle-adjustable rebounds", "Field-ready base anchors"],
          priceMin: 58,
          priceMax: 142,
          images: [IMAGE.footballAction, IMAGE.footballField],
          badges: ["Skill Builder", "Coach Favorite"],
        },
        {
          label: "Speed Cone Set",
          short: "Agility cone set for football speed ladders, cuts, and directional drills.",
          description: "High-visibility cone kit built for repeated movement work and team drills.",
          features: ["Flexible polymer cones", "Stack-and-carry rack", "Indoor/outdoor use"],
          priceMin: 22,
          priceMax: 52,
          images: [IMAGE.footballField, IMAGE.footballAction],
          badges: ["Team Kit", "Drill Ready"],
        },
      ],
    },
    Basketball: {
      imagePool: [
        IMAGE.basketballBall,
        IMAGE.basketballBallGame,
        IMAGE.basketballShoes,
        IMAGE.basketballGear,
        IMAGE.basketballHoop,
      ],
      templates: [
        {
          label: "Indoor Match Ball",
          short: "Indoor basketball tuned for clean grip, touch, and shot consistency.",
          description: "Control-focused basketball built for hardwood play and repeated shooting reps.",
          features: ["Tacky composite shell", "True-bounce core", "Deep control channels"],
          priceMin: 48,
          priceMax: 122,
          images: [IMAGE.basketballBall, IMAGE.basketballBallGame],
          badges: ["Indoor", "Control"],
        },
        {
          label: "Outdoor Grip Ball",
          short: "Outdoor basketball with durable surface grip for rough-court sessions.",
          description: "Long-wear ball built for asphalt courts and high-frequency training.",
          features: ["Abrasion-resistant shell", "Stable bounce tuning", "Durable channel design"],
          priceMin: 38,
          priceMax: 92,
          images: [IMAGE.basketballBallGame, IMAGE.basketballBall],
          badges: ["Outdoor", "Durability"],
        },
        {
          label: "Mid-Top Court Shoes",
          short: "Mid-top basketball shoes with ankle support and explosive cushioning.",
          description: "Court footwear designed for sharp cuts, jumps, and stable landings.",
          features: ["Impact-absorb midsole", "Lateral support frame", "High-grip outsole"],
          priceMin: 110,
          priceMax: 229,
          images: [IMAGE.basketballShoes, IMAGE.basketballGear],
          badges: ["Court Pro", "High Demand"],
        },
        {
          label: "Low-Top Speed Shoes",
          short: "Low-top basketball shoes for quick first step and directional speed.",
          description: "Agility-first shoe profile with responsive court feel and fast transitions.",
          features: ["Low-profile chassis", "Multi-zone traction", "Breathable upper"],
          priceMin: 102,
          priceMax: 214,
          images: [IMAGE.basketballShoes, IMAGE.basketballBallGame],
          badges: ["Speed", "New Drop"],
        },
        {
          label: "Shooting Sleeve",
          short: "Compression sleeve for court support, warmth, and shooting comfort.",
          description: "Lightweight sleeve designed to stay secure through full training blocks.",
          features: ["Targeted compression", "Slip-resistant cuff", "Moisture-wick fabric"],
          priceMin: 18,
          priceMax: 48,
          images: [IMAGE.basketballGear, IMAGE.basketballShoes],
          badges: ["Comfort Fit", "Essentials"],
        },
        {
          label: "Compression Knee Sleeve",
          short: "Knee support sleeve for impact sessions and court movement stability.",
          description: "Flexible support layer for repetitive jump, cut, and landing patterns.",
          features: ["Elastic support weave", "Breathable panel zones", "Comfort lock seam"],
          priceMin: 24,
          priceMax: 62,
          images: [IMAGE.basketballGear, IMAGE.basketballBallGame],
          badges: ["Support", "Recovery Fit"],
        },
        {
          label: "Rebound Trainer Net",
          short: "Basketball rebound net for passing, catch timing, and reaction drills.",
          description: "Portable trainer that improves shot follow-up and rebound consistency.",
          features: ["Adjustable return angles", "Fast setup frame", "Stable court anchors"],
          priceMin: 56,
          priceMax: 138,
          images: [IMAGE.basketballHoop, IMAGE.basketballBallGame],
          badges: ["Skill Builder", "Coach Favorite"],
        },
        {
          label: "Dribble Cone Kit",
          short: "Cone kit for dribbling patterns, change-of-direction, and footwork.",
          description: "Training cone setup for handles, pace control, and movement mechanics.",
          features: ["High-visibility cone set", "Carry rack included", "Durable flex material"],
          priceMin: 22,
          priceMax: 54,
          images: [IMAGE.basketballGear, IMAGE.basketballHoop],
          badges: ["Handle Lab", "Team Kit"],
        },
      ],
    },
    Training: {
      imagePool: [IMAGE.dumbbells, IMAGE.agility, IMAGE.resistance, IMAGE.trainingKit],
      templates: [
        {
          label: "Adjustable Dumbbell Set",
          short: "Adjustable dumbbell set for progressive strength and hypertrophy sessions.",
          description: "Home and studio strength tool with quick weight-change control.",
          features: ["Adjustable load system", "Secure lock mechanism", "Compact rack format"],
          priceMin: 120,
          priceMax: 249,
          images: [IMAGE.dumbbells, IMAGE.trainingKit],
          badges: ["Gym Essential", "Strength Core"],
        },
        {
          label: "Resistance Band Kit",
          short: "Multi-level resistance bands for warmups, mobility, and strength work.",
          description: "Portable resistance set supporting activation and full accessory sessions.",
          features: ["Multiple resistance levels", "Anti-snap material", "Carry pouch included"],
          priceMin: 26,
          priceMax: 72,
          images: [IMAGE.resistance, IMAGE.trainingKit],
          badges: ["Portable", "Versatile"],
        },
        {
          label: "Agility Ladder",
          short: "Agility ladder for foot speed, coordination, and reaction-time drills.",
          description: "Coach-grade ladder built for team and individual movement sessions.",
          features: ["Adjustable rung spacing", "Carry bag included", "Indoor/outdoor ready"],
          priceMin: 28,
          priceMax: 68,
          images: [IMAGE.agility, IMAGE.trainingKit],
          badges: ["Footwork", "Coach Favorite"],
        },
        {
          label: "Plyometric Box",
          short: "Plyometric box for explosive jumps, landing mechanics, and power output.",
          description: "Stable platform for jump training, step-ups, and conditioning circuits.",
          features: ["Reinforced frame build", "Multi-height support", "Anti-slip surface"],
          priceMin: 74,
          priceMax: 178,
          images: [IMAGE.trainingKit, IMAGE.dumbbells],
          badges: ["Power Build", "Performance"],
        },
        {
          label: "Kettlebell Pair",
          short: "Balanced kettlebell pair for strength endurance and functional training.",
          description: "Smooth-handled kettlebells for swings, carries, and full-body power work.",
          features: ["Powder-coat grip finish", "Balanced cast profile", "Floor-safe base"],
          priceMin: 64,
          priceMax: 168,
          images: [IMAGE.dumbbells, IMAGE.resistance],
          badges: ["Strength", "Functional"],
        },
        {
          label: "Speed Rope Pro",
          short: "Speed rope for conditioning, rhythm, and quick-foot turnover drills.",
          description: "High-rotation rope with adjustable length for cardio and warmup blocks.",
          features: ["Smooth bearing handles", "Adjustable cable length", "Durable coated rope"],
          priceMin: 18,
          priceMax: 49,
          images: [IMAGE.agility, IMAGE.trainingKit],
          badges: ["Conditioning", "Cardio"],
        },
        {
          label: "Weighted Vest",
          short: "Weighted vest for loaded sprints, jumps, and resistance conditioning.",
          description: "Secure-fit vest to add progressive load to athletic training sessions.",
          features: ["Adjustable load pockets", "Locked shoulder fit", "Breathable mesh body"],
          priceMin: 68,
          priceMax: 172,
          images: [IMAGE.trainingKit, IMAGE.resistance],
          badges: ["Explosive", "Power"],
        },
        {
          label: "Medicine Ball",
          short: "Medicine ball for rotational power, throws, and core conditioning.",
          description: "Durable training ball for wall drills, slams, and partner work.",
          features: ["Textured grip shell", "Balanced weight distribution", "Impact-ready core"],
          priceMin: 32,
          priceMax: 88,
          images: [IMAGE.dumbbells, IMAGE.agility],
          badges: ["Core Training", "Team Use"],
        },
      ],
    },
    Running: {
      imagePool: [IMAGE.runningShoes, IMAGE.runningTrack, IMAGE.runningVest, IMAGE.smartwatch, IMAGE.smartwatchAlt],
      templates: [
        {
          label: "Daily Trainer Shoes",
          short: "Daily running shoes with stable cushioning for high weekly mileage.",
          description: "Road trainer built for comfort, durability, and smooth pace transitions.",
          features: ["Responsive foam base", "Breathable engineered mesh", "Long-wear outsole"],
          priceMin: 88,
          priceMax: 198,
          images: [IMAGE.runningShoes, IMAGE.runningTrack],
          badges: ["Daily Mileage", "Runner Pick"],
        },
        {
          label: "Tempo Racing Shoes",
          short: "Tempo running shoes tuned for faster sessions and race-pace efforts.",
          description: "Fast-feel running platform for progression runs and speed blocks.",
          features: ["High-return midsole", "Lightweight profile", "Grip-ready forefoot"],
          priceMin: 112,
          priceMax: 219,
          images: [IMAGE.runningShoes, IMAGE.runningVest],
          badges: ["Speed", "Race Ready"],
        },
        {
          label: "Hydration Vest",
          short: "Low-bounce hydration vest for long runs and endurance training.",
          description: "Distance-ready vest with balanced storage and stable fit adjustability.",
          features: ["Dual front flask pockets", "Adjustable chest straps", "Quick-access storage"],
          priceMin: 44,
          priceMax: 106,
          images: [IMAGE.runningVest, IMAGE.runningTrack],
          badges: ["Distance", "Endurance"],
        },
        {
          label: "GPS Sport Watch",
          short: "GPS running watch with pace, heart-rate, and recovery insights.",
          description: "Performance wearable for route tracking and training-load awareness.",
          features: ["Multi-band GPS", "Recovery analytics", "Long-battery training mode"],
          priceMin: 140,
          priceMax: 259,
          images: [IMAGE.smartwatch, IMAGE.smartwatchAlt],
          badges: ["Smart Gear", "Data Driven"],
        },
        {
          label: "Running Cap",
          short: "Lightweight running cap for sun coverage and sweat control.",
          description: "Breathable cap built for hot-weather runs and tempo sessions.",
          features: ["Ventilated panel mesh", "Quick-dry fabric", "Adjustable fit strap"],
          priceMin: 18,
          priceMax: 42,
          images: [IMAGE.runningTrack, IMAGE.runningVest],
          badges: ["Heat Ready", "Essential"],
        },
        {
          label: "Compression Sock Set",
          short: "Compression running socks for support and long-run comfort.",
          description: "Performance sock set designed for reduced fatigue during distance blocks.",
          features: ["Targeted compression zones", "Breathable knit structure", "Arch support fit"],
          priceMin: 20,
          priceMax: 48,
          images: [IMAGE.runningShoes, IMAGE.runningTrack],
          badges: ["Support", "Recovery Fit"],
        },
        {
          label: "Running Belt",
          short: "Minimal running belt for secure phone, gels, and key storage.",
          description: "No-bounce belt engineered for steady comfort over daily runs.",
          features: ["Stretch storage pocket", "Anti-bounce fit", "Reflective trim details"],
          priceMin: 22,
          priceMax: 56,
          images: [IMAGE.runningVest, IMAGE.runningTrack],
          badges: ["Carry Smart", "Long Run"],
        },
        {
          label: "Reflective Jacket",
          short: "Lightweight reflective jacket for low-light training conditions.",
          description: "Weather-ready running shell with visibility and breathable layering.",
          features: ["Reflective visibility strips", "Wind-resistant shell", "Vent-back airflow"],
          priceMin: 58,
          priceMax: 148,
          images: [IMAGE.runningTrack, IMAGE.runningVest],
          badges: ["Night Run", "Weather Ready"],
        },
      ],
    },
    Cricket: {
      imagePool: [IMAGE.cricketBat, IMAGE.cricketGloves, IMAGE.cricketAction],
      templates: [
        {
          label: "English Willow Bat",
          short: "English willow cricket bat with balanced pickup and strong sweet spot.",
          description: "Premium bat profile tuned for controlled stroke play and fast hands.",
          features: ["Select willow profile", "Shock-absorb handle", "Expanded sweet spot"],
          priceMin: 128,
          priceMax: 229,
          images: [IMAGE.cricketBat, IMAGE.cricketAction],
          badges: ["Premium Willow", "Match Pick"],
        },
        {
          label: "Kashmir Willow Bat",
          short: "Reliable cricket bat built for regular nets and match practice.",
          description: "Consistent response and value-focused design for academy progression.",
          features: ["Balanced bat weight", "Durable edge profile", "Comfort grip handle"],
          priceMin: 84,
          priceMax: 176,
          images: [IMAGE.cricketBat, IMAGE.cricketGloves],
          badges: ["Academy", "Value Pick"],
        },
        {
          label: "Batting Gloves",
          short: "Batting gloves with layered finger protection and grip control.",
          description: "Flexible glove build with impact safety for long innings and net sessions.",
          features: ["Multi-zone finger guards", "Ventilated palm mesh", "Secure wrist fit"],
          priceMin: 38,
          priceMax: 92,
          images: [IMAGE.cricketGloves, IMAGE.cricketAction],
          badges: ["Match Comfort", "Grip Control"],
        },
        {
          label: "Batting Pads",
          short: "Cricket batting pads with full-leg coverage and flexible movement.",
          description: "Protective leg guards designed for confidence at the crease.",
          features: ["Impact foam channels", "Ergonomic knee shaping", "Quick strap closure"],
          priceMin: 56,
          priceMax: 132,
          images: [IMAGE.cricketAction, IMAGE.cricketGloves],
          badges: ["Protection", "Crease Ready"],
        },
        {
          label: "Cricket Helmet",
          short: "Ventilated cricket helmet with secure fit and impact shielding.",
          description: "Lightweight protective shell designed for batting confidence and comfort.",
          features: ["Adjustable head fit", "Steel face grill", "Airflow vent channels"],
          priceMin: 64,
          priceMax: 148,
          images: [IMAGE.cricketAction, IMAGE.cricketBat],
          badges: ["Safety First", "Pro Guard"],
        },
        {
          label: "Ball Pack",
          short: "Cricket leather ball pack for nets, drills, and match prep.",
          description: "Training-ready ball set with stable seam and durable wear profile.",
          features: ["Consistent seam finish", "Balanced core density", "Practice-ready pack"],
          priceMin: 24,
          priceMax: 66,
          images: [IMAGE.cricketAction, IMAGE.cricketBat],
          badges: ["Net Sessions", "Team Pack"],
        },
        {
          label: "Stump Set",
          short: "Portable stump set for cricket drills and backyard practice.",
          description: "Quick-setup wicket kit for repeated accuracy and bowling sessions.",
          features: ["Portable base design", "Fast setup format", "Durable training build"],
          priceMin: 34,
          priceMax: 89,
          images: [IMAGE.cricketBat, IMAGE.cricketAction],
          badges: ["Practice Kit", "Coach Pick"],
        },
        {
          label: "Arm Guard",
          short: "Cricket arm guard for impact protection and batting confidence.",
          description: "Ergonomic protective guard with secure fit for long batting spells.",
          features: ["Low-profile shield", "Adjustable straps", "Sweat-friendly lining"],
          priceMin: 22,
          priceMax: 58,
          images: [IMAGE.cricketGloves, IMAGE.cricketAction],
          badges: ["Protection", "Essential"],
        },
      ],
    },
    Recovery: {
      imagePool: [IMAGE.recoveryRoller, IMAGE.recoveryTool, IMAGE.yogaMat, IMAGE.runningTrack],
      templates: [
        {
          label: "Deep Tissue Roller",
          short: "Textured foam roller for muscle release and mobility recovery work.",
          description: "Recovery roller designed for post-session tissue care and stiffness reduction.",
          features: ["Dual-density foam core", "Targeted texture zones", "Sweat-resistant finish"],
          priceMin: 22,
          priceMax: 58,
          images: [IMAGE.recoveryRoller, IMAGE.yogaMat],
          badges: ["Recovery", "Mobility"],
        },
        {
          label: "Percussion Massage Gun",
          short: "Percussion massage gun for deep recovery and soreness management.",
          description: "Portable recovery device with adjustable speeds and focused muscle treatment.",
          features: ["Quiet high-torque motor", "Interchangeable head kit", "Fast USB-C charging"],
          priceMin: 110,
          priceMax: 189,
          images: [IMAGE.recoveryTool, IMAGE.recoveryRoller],
          badges: ["Deep Relief", "High Demand"],
        },
        {
          label: "Mobility Mat",
          short: "Non-slip mobility mat for cooldown stretches and recovery sessions.",
          description: "Comfort-support mat built for daily flexibility, breathwork, and floor drills.",
          features: ["Textured grip surface", "Cushioned support layer", "Roll-and-carry strap"],
          priceMin: 26,
          priceMax: 72,
          images: [IMAGE.yogaMat, IMAGE.recoveryRoller],
          badges: ["Mobility", "Daily Use"],
        },
        {
          label: "Recovery Band Set",
          short: "Recovery bands for activation, joint prep, and low-impact movement work.",
          description: "Flexible loop bands supporting prehab, rehab, and cooldown routines.",
          features: ["Progressive tension levels", "Soft skin-friendly latex", "Compact carry pouch"],
          priceMin: 18,
          priceMax: 49,
          images: [IMAGE.recoveryRoller, IMAGE.runningTrack],
          badges: ["Activation", "Portable"],
        },
        {
          label: "Cold Therapy Wrap",
          short: "Cold therapy wrap for targeted post-training inflammation control.",
          description: "Reusable wrap system built for quick recovery after high-load sessions.",
          features: ["Flexible gel insert", "Secure compression strap", "Reusable cold pack design"],
          priceMin: 20,
          priceMax: 56,
          images: [IMAGE.recoveryTool, IMAGE.runningTrack],
          badges: ["Cold Recovery", "Post Match"],
        },
        {
          label: "Heat Relief Pack",
          short: "Heat pack for stiffness relief and pre-session mobility preparation.",
          description: "Thermal recovery aid built for warmup comfort and joint looseness.",
          features: ["Reusable heat core", "Body-contour fit", "Fast heating format"],
          priceMin: 22,
          priceMax: 62,
          images: [IMAGE.recoveryTool, IMAGE.yogaMat],
          badges: ["Heat Therapy", "Recovery Support"],
        },
        {
          label: "Stretch Strap",
          short: "Stretch strap for flexibility progressions and recovery cooldown routines.",
          description: "Simple mobility tool that supports controlled range-of-motion work.",
          features: ["Multiple grip loops", "Durable woven strap", "Travel-ready compact size"],
          priceMin: 16,
          priceMax: 39,
          images: [IMAGE.yogaMat, IMAGE.recoveryRoller],
          badges: ["Flexibility", "Essential"],
        },
        {
          label: "Massage Ball Kit",
          short: "Massage ball kit for focused trigger-point and foot recovery work.",
          description: "Precision recovery set for tight spots across calves, back, and feet.",
          features: ["Multi-density ball pair", "Target-point pressure control", "Carry pouch included"],
          priceMin: 18,
          priceMax: 48,
          images: [IMAGE.recoveryRoller, IMAGE.recoveryTool],
          badges: ["Target Relief", "Compact"],
        },
      ],
    },
  };

  function slugifyCatalogToken(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function buildCatalogGallery(primaryImage, imagePool) {
    const gallery = [primaryImage];
    (Array.isArray(imagePool) ? imagePool : []).forEach((image) => {
      if (!image || gallery.includes(image)) return;
      gallery.push(image);
    });
    while (gallery.length < 4) {
      gallery.push(primaryImage);
    }
    return gallery.slice(0, 4);
  }

  function buildGeneratedCatalog(existingProducts, targetCount = GENERATED_CATALOG_TARGET) {
    if (!Array.isArray(existingProducts) || existingProducts.length >= targetCount) return [];

    const generated = [];
    const existingIds = new Set(existingProducts.map((product) => product.id));
    const existingNames = new Set(existingProducts.map((product) => String(product.name || "").toLowerCase()));
    const categories = Object.keys(GENERATED_CATALOG_CONFIG);
    let cycle = 0;
    const maxCycles = 220;

    while (existingProducts.length + generated.length < targetCount && cycle < maxCycles) {
      categories.forEach((category, categoryIndex) => {
        if (existingProducts.length + generated.length >= targetCount) return;
        const config = GENERATED_CATALOG_CONFIG[category];
        if (!config || !Array.isArray(config.templates) || !config.templates.length) return;

        const template = config.templates[(cycle + categoryIndex) % config.templates.length];
        const prefix = GENERATED_NAME_PREFIXES[(cycle * 2 + categoryIndex) % GENERATED_NAME_PREFIXES.length];
        const series = GENERATED_SERIES_LABELS[(cycle + categoryIndex * 3) % GENERATED_SERIES_LABELS.length];
        const edition = cycle + 1;

        let name = `${prefix} ${template.label} ${series} ${edition}`;
        let nameKey = name.toLowerCase();
        let nameSuffix = 2;
        while (existingNames.has(nameKey)) {
          name = `${prefix} ${template.label} ${series} ${edition}-${nameSuffix}`;
          nameKey = name.toLowerCase();
          nameSuffix += 1;
        }
        existingNames.add(nameKey);

        const idBase = `pp-${category.toLowerCase()}-${slugifyCatalogToken(prefix)}-${slugifyCatalogToken(
          template.label
        )}-${edition}`;
        let id = idBase;
        let idSuffix = 2;
        while (existingIds.has(id)) {
          id = `${idBase}-${idSuffix}`;
          idSuffix += 1;
        }
        existingIds.add(id);

        const span = Math.max(1, template.priceMax - template.priceMin + 1);
        const price = template.priceMin + ((cycle * 17 + categoryIndex * 9) % span);
        const oldPrice = price + Math.max(8, Math.round(price * (0.14 + ((cycle + categoryIndex) % 4) * 0.02)));
        const rating = Number((4.2 + ((cycle + categoryIndex * 2) % 8) * 0.1).toFixed(1));
        const reviews = 40 + ((cycle * 19 + categoryIndex * 23) % 290);
        const stock = 9 + ((cycle * 13 + categoryIndex * 17) % 88);
        const images = Array.isArray(template.images) && template.images.length
          ? template.images
          : config.imagePool;
        const primaryImage = images[(cycle + categoryIndex) % images.length];
        const badgeList = Array.isArray(template.badges) && template.badges.length
          ? template.badges
          : ["Performance Pick"];
        const badge = badgeList[(cycle + categoryIndex) % badgeList.length];
        const features = Array.isArray(template.features) && template.features.length
          ? template.features.slice(0, 3)
          : ["Athlete-tested design", "Performance-ready construction", "Durable materials"];

        generated.push({
          id,
          name,
          category,
          price,
          oldPrice,
          rating,
          reviews,
          stock,
          badge,
          short: template.short,
          description: template.description,
          features,
          image: primaryImage,
          gallery: buildCatalogGallery(primaryImage, config.imagePool),
          featured: (cycle + categoryIndex) % 19 === 0,
          popularity: 68 + ((cycle * 7 + categoryIndex * 11) % 31),
          newArrival: (cycle + categoryIndex) % 6 === 0,
        });
      });
      cycle += 1;
    }

    return generated;
  }

  PRODUCTS.push(...buildGeneratedCatalog(PRODUCTS, GENERATED_CATALOG_TARGET));

  const CATEGORY_META = [
    {
      id: "Football",
      name: "Football",
      copy: "Real match balls, boots, protection, and goalkeeper essentials.",
      image: IMAGE.footballAction,
    },
    {
      id: "Basketball",
      name: "Basketball",
      copy: "Court balls, shoes, sleeves, and pro training accessories.",
      image: IMAGE.basketballBallGame,
    },
    {
      id: "Training",
      name: "Training",
      copy: "Strength, agility, and conditioning equipment for serious progress.",
      image: IMAGE.dumbbells,
    },
    {
      id: "Running",
      name: "Running",
      copy: "Performance shoes, smart wearables, and endurance gear.",
      image: IMAGE.runningTrack,
    },
    {
      id: "Cricket",
      name: "Cricket",
      copy: "Willow bats and batting gear for match and practice sessions.",
      image: IMAGE.cricketAction,
    },
    {
      id: "Recovery",
      name: "Recovery",
      copy: "Rollers, massage tools, and mobility products for rapid recovery.",
      image: IMAGE.recoveryRoller,
    },
  ];

  const SEASONAL_CAMPAIGNS = [
    {
      id: "world-cup",
      title: "World Cup Peak Form",
      copy: "Football match balls, boots, and team bundles curated for tournament season.",
      accent: "#4ad1ff",
      cta: "Explore Football Drops",
      href: "drops.html",
    },
    {
      id: "playoffs",
      title: "Playoffs Pressure Lab",
      copy: "Basketball playoff-ready rotation with high-traction shoes and control balls.",
      accent: "#ff9f43",
      cta: "See Court Bundles",
      href: "bundles.html",
    },
    {
      id: "summer-training",
      title: "Summer Training Camp",
      copy: "Heat-optimized running, hydration, and recovery kits for high-volume weeks.",
      accent: "#2de2a5",
      cta: "Build Camp Kit",
      href: "resources.html",
    },
    {
      id: "back-to-school",
      title: "Back To Academy",
      copy: "Starter kits, academy packs, and student athlete essentials with loyalty perks.",
      accent: "#ffd166",
      cta: "Shop Academy Gear",
      href: "team-orders.html",
    },
  ];

  const HOME_SPORT_SCENES = {
    Football: {
      hero: IMAGE.footballAction,
      heroAlt: "Football athlete sprinting with match ball",
      cards: [
        { label: "Hot Right Now", name: "Aero Match Football", image: IMAGE.footballBallClose },
        { label: "Top Rated", name: "Velocity Studs Pro", image: IMAGE.footballBoots },
      ],
    },
    Basketball: {
      hero: IMAGE.basketballHoop,
      heroAlt: "Basketball player in live game action",
      cards: [
        { label: "Hot Right Now", name: "Street King Basketball", image: IMAGE.basketballBallGame },
        { label: "Top Rated", name: "Rimfire Hoops Shoes", image: IMAGE.basketballShoes },
      ],
    },
    Running: {
      hero: IMAGE.runningTrack,
      heroAlt: "Runner on track during a speed session",
      cards: [
        { label: "Hot Right Now", name: "AeroSprint Carbon Shoes", image: IMAGE.runningShoes },
        { label: "Top Rated", name: "RacePulse Smart Watch", image: IMAGE.smartwatch },
      ],
    },
    Cricket: {
      hero: IMAGE.cricketAction,
      heroAlt: "Cricket player preparing for a strike",
      cards: [
        { label: "Hot Right Now", name: "PowerPlay Cricket Bat", image: IMAGE.cricketBat },
        { label: "Top Rated", name: "Aegis Pro Cricket Gloves", image: IMAGE.cricketGloves },
      ],
    },
    Recovery: {
      hero: IMAGE.recoveryTool,
      heroAlt: "Athlete using recovery and mobility tools",
      cards: [
        { label: "Hot Right Now", name: "RecoveryFlow Roller", image: IMAGE.recoveryRoller },
        { label: "Top Rated", name: "FlexTherm Massage Tool", image: IMAGE.recoveryTool },
      ],
    },
    Training: {
      hero: IMAGE.trainingKit,
      heroAlt: "Athlete training with strength equipment",
      cards: [
        { label: "Hot Right Now", name: "PowerCore Dumbbell Kit", image: IMAGE.dumbbells },
        { label: "Top Rated", name: "Agility Matrix Set", image: IMAGE.agility },
      ],
    },
  };

  const HOME_TESTIMONIALS = [
    {
      athlete: "Coach Aaron",
      role: "Football Academy",
      quote:
        "Our academy replaced multiple suppliers and immediately improved consistency in training quality.",
      productId: "velocity-studs-pro",
      video: "https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0",
    },
    {
      athlete: "Maya Patel",
      role: "Basketball Prospect",
      quote:
        "The grip and cushioning upgrades made my weekly jump and landing work noticeably better.",
      productId: "rimfire-hoops-shoes",
      video: "https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0",
    },
    {
      athlete: "Luca Reyes",
      role: "Endurance Runner",
      quote:
        "The kit recommendations aligned perfectly with my training blocks and recovery windows.",
      productId: "paceflow-running-shoes",
      video: "https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0",
    },
  ];

  const HOME_OUTCOME_STORIES = [
    {
      title: "Sprint Split Gain",
      before: "11.8s",
      after: "10.9s",
      delta: "-0.9s",
      copy: "Stud setup + speed drill bundle over 10 weeks.",
      image: IMAGE.footballBoots,
    },
    {
      title: "Vertical Jump Lift",
      before: "24 in",
      after: "29 in",
      delta: "+5 in",
      copy: "Hoops footwear + strength and recovery pairing.",
      image: IMAGE.basketballShoes,
    },
    {
      title: "Recovery Window",
      before: "48 hrs",
      after: "30 hrs",
      delta: "-18 hrs",
      copy: "Wearable insights + mobility and tissue-care stack.",
      image: IMAGE.recoveryRoller,
    },
  ];

  const CUSTOM_ICONS = Object.freeze({
    Football:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 4.6v14.8M4.6 12h14.8"></path></svg>',
    Basketball:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.2"></circle><path d="M3.8 12h16.4M12 3.8c2.8 2.3 2.8 14.1 0 16.4M12 3.8c-2.8 2.3-2.8 14.1 0 16.4"></path></svg>',
    Training:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10h4v4H4zM16 10h4v4h-4z"></path><path d="M8 12h8M2 8h2v8H2zM20 8h2v8h-2z"></path></svg>',
    Running:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 17c3-3 5-4 8-4h8"></path><path d="M7 14 5 8l3-2 4 2 1 4"></path><circle cx="10" cy="5" r="1.2"></circle></svg>',
    Cricket:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m7 18 6-12 3 1-6 12z"></path><circle cx="17.5" cy="16.5" r="2.2"></circle></svg>',
    Recovery:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 14c0-3.3 2.7-6 6-6 1.5 0 2.9.5 4 1.5 1.1-1 2.5-1.5 4-1.5 1.7 0 3 1.3 3 3 0 3-4 5.5-7 7-3-1.5-10-4.4-10-10z"></path></svg>',
    quickView:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3.2"></circle><path d="M2.8 12s3.2-5.7 9.2-5.7 9.2 5.7 9.2 5.7-3.2 5.7-9.2 5.7S2.8 12 2.8 12z"></path></svg>',
    compare:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M8 5h3v14H8zM13 8h3v11h-3z"></path></svg>',
    alert:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 4v8"></path><path d="M8.2 14 4.5 20h15L15.8 14"></path><circle cx="12" cy="21" r="1"></circle></svg>',
  });

  const CATEGORY_USE_CASES = {
    Football: ["Academy", "Pro-Level", "Outdoor"],
    Basketball: ["Beginner", "Indoor", "Pro-Level"],
    Training: ["Beginner", "Academy", "Outdoor"],
    Running: ["Beginner", "Outdoor", "Endurance"],
    Cricket: ["Academy", "Outdoor", "Pro-Level"],
    Recovery: ["Beginner", "Recovery", "Indoor"],
  };

  const CATEGORY_PLAY_STYLES = {
    Football: ["Speed", "Control", "Power"],
    Basketball: ["Control", "Speed", "Power"],
    Training: ["Power", "Speed", "Endurance"],
    Running: ["Endurance", "Speed", "Recovery"],
    Cricket: ["Control", "Power", "Endurance"],
    Recovery: ["Recovery", "Control", "Endurance"],
  };

  const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];
  const COLOR_OPTIONS = ["Graphite", "Volt", "Crimson", "Navy", "Ice"];
  const PACK_OPTIONS = ["Single", "Duo", "Team Pack"];

  PRODUCTS.forEach((product, index) => {
    const categoryCases = CATEGORY_USE_CASES[product.category] || ["Beginner"];
    const categoryStyles = CATEGORY_PLAY_STYLES[product.category] || ["Control"];
    const sportProfile = SPORT_PROFILES[product.category] || SPORT_PROFILES.Training;

    product.sportKey = sportProfile.key;
    product.useCase = categoryCases[index % categoryCases.length];
    product.playStyle = categoryStyles[index % categoryStyles.length];
    product.surface = product.useCase === "Indoor" ? "indoor" : "outdoor";
    product.intensity = product.useCase === "Pro-Level" ? "High" : product.useCase === "Academy" ? "Medium" : "Adaptive";
    product.altImage = product.gallery[1] || product.image;
    product.lowStock = product.stock <= 24;
    product.stockStatus = product.stock <= 8 ? "Critical" : product.stock <= 24 ? "Low" : "Healthy";
    product.etaDays = product.stock <= 8 ? "4-6 days" : product.stock <= 24 ? "2-4 days" : "1-3 days";
    product.variants = {
      size: SIZE_OPTIONS.slice(0, 4),
      color: COLOR_OPTIONS.slice(index % 2, index % 2 + 3),
      pack: PACK_OPTIONS.slice(0, 2 + (index % 2)),
    };
    product.materials = [
      "Engineered composite",
      "Reinforced stitching",
      "Moisture-managed finish",
    ];
    product.certifications = [
      "PlayPro Lab Verified",
      "Athlete Tested",
      "Durability Grade A",
    ];
    product.skillLevel =
      product.useCase === "Pro-Level"
        ? "Best for intermediate and pro players"
        : product.useCase === "Academy"
        ? "Best for academy athletes building consistency"
        : "Best for beginners and developing athletes";
    product.trainingGuide = [
      "Warm-up with mobility and control drills",
      "Main session with progressive intensity blocks",
      "Cooldown with recovery and feedback review",
    ];
    product.coachTips = [
      "Use this gear in scenario-based drills to mirror match conditions.",
      "Track repeat quality, not just quantity, in each session block.",
    ];
    product.demoVideo =
      "https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0";
    product.dropTag = index % 5 === 0 ? "Limited Drop" : index % 4 === 0 ? "Seasonal Pick" : "";
    product.bundleIds = PRODUCTS.slice(Math.max(0, index - 2), index + 3)
      .filter((item) => item && item.id !== product.id)
      .map((item) => item.id)
      .slice(0, 3);
  });

  function getCurrency() {
    const saved = String(readStorage(STORAGE_KEYS.currency, "USD") || "USD").toUpperCase();
    return STORE_CONFIG.currencies[saved] ? saved : "USD";
  }

  function setCurrency(code) {
    const upper = String(code || "").toUpperCase();
    if (!STORE_CONFIG.currencies[upper]) return;
    writeStorage(STORAGE_KEYS.currency, upper);
  }

  function getLocale() {
    const saved = String(readStorage(STORAGE_KEYS.locale, "en-US") || "en-US");
    return saved || "en-US";
  }

  function convertPrice(value, targetCurrency = getCurrency()) {
    const amount = Number(value || 0);
    const target = STORE_CONFIG.currencies[targetCurrency];
    if (!target) return amount;
    return amount * target.rate;
  }

  function getCurrencyFormatter(code = getCurrency(), locale = getLocale()) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    });
  }

  const page = document.body.dataset.page || "";
  const pageFile = String(window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  function isPageFile(fileName) {
    return pageFile === String(fileName || "").toLowerCase();
  }

  function iconMarkup(name) {
    return CUSTOM_ICONS[name] || "";
  }

  let revealObserver = null;

  function query(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function queryAll(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  }

  function readStorage(key, fallbackValue) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallbackValue;
      return JSON.parse(raw);
    } catch {
      return fallbackValue;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* noop */
    }
  }

  function formatCurrency(value) {
    const currency = getCurrency();
    const locale = getLocale();
    return getCurrencyFormatter(currency, locale).format(convertPrice(value, currency));
  }

  function findProduct(id) {
    return PRODUCTS.find((product) => product.id === id) || null;
  }

  function normalizeCart(cart) {
    if (!Array.isArray(cart)) return [];
    return cart
      .map((item) => {
        const product = findProduct(item.id);
        if (!product) return null;
        const quantity = Number(item.quantity || 0);
        if (!Number.isFinite(quantity) || quantity < 1) return null;
        return {
          id: product.id,
          quantity: Math.min(Math.floor(quantity), 99),
        };
      })
      .filter(Boolean);
  }

  function getCart() {
    return normalizeCart(readStorage(STORAGE_KEYS.cart, []));
  }

  function saveCart(cart) {
    writeStorage(STORAGE_KEYS.cart, normalizeCart(cart));
  }

  function getWishlist() {
    const list = readStorage(STORAGE_KEYS.wishlist, []);
    if (!Array.isArray(list)) return [];
    return list.filter((id) => !!findProduct(id));
  }

  function saveWishlist(list) {
    writeStorage(
      STORAGE_KEYS.wishlist,
      Array.from(new Set(list.filter((id) => !!findProduct(id))))
    );
  }

  function getCompareList() {
    const list = readStorage(STORAGE_KEYS.compare, []);
    if (!Array.isArray(list)) return [];
    return list.filter((id) => !!findProduct(id)).slice(0, 4);
  }

  function saveCompareList(list) {
    writeStorage(
      STORAGE_KEYS.compare,
      Array.from(new Set(list.filter((id) => !!findProduct(id)))).slice(0, 4)
    );
  }

  function getLoyaltyPoints() {
    const points = Number(readStorage(STORAGE_KEYS.loyalty, 1200));
    return Number.isFinite(points) && points >= 0 ? Math.floor(points) : 1200;
  }

  function setLoyaltyPoints(points) {
    const next = Number(points);
    const value = Number.isFinite(next) && next >= 0 ? Math.floor(next) : 1200;
    writeStorage(STORAGE_KEYS.loyalty, value);
    const tier = value >= 2600 ? "Elite" : value >= 1700 ? "Pro" : "Starter";
    savePersonalizationState({ tier });
  }

  function getPersonalizationState() {
    const fallback = {
      sport: "",
      goal: "",
      level: "",
      location: "US",
      fit: "Regular",
      reducedMotion: false,
      profileComplete: false,
      tier: "Starter",
    };

    const saved = readStorage(STORAGE_KEYS.personalization, fallback);
    if (!saved || typeof saved !== "object") return fallback;
    return { ...fallback, ...saved };
  }

  function savePersonalizationState(patch) {
    const current = getPersonalizationState();
    const next = { ...current, ...patch };
    writeStorage(STORAGE_KEYS.personalization, next);
    return next;
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getAuthUsers() {
    const users = readStorage(STORAGE_KEYS.authUsers, []);
    if (!Array.isArray(users)) return [];
    return users.filter((user) => user && typeof user === "object" && normalizeEmail(user.email));
  }

  function saveAuthUsers(users) {
    const cleaned = Array.isArray(users)
      ? users.filter((user) => user && typeof user === "object" && normalizeEmail(user.email))
      : [];
    writeStorage(STORAGE_KEYS.authUsers, cleaned);
    return cleaned;
  }

  function getAuthSession() {
    const fallback = {
      loggedIn: false,
      email: "",
      name: "",
      signedInAt: "",
    };
    const saved = readStorage(STORAGE_KEYS.authSession, fallback);
    if (!saved || typeof saved !== "object") return fallback;
    return { ...fallback, ...saved, email: normalizeEmail(saved.email) };
  }

  function setAuthSession(patch) {
    const current = getAuthSession();
    const next = {
      ...current,
      ...patch,
      email: normalizeEmail((patch && patch.email) || current.email),
      name: String((patch && patch.name) || current.name || "").trim(),
    };
    writeStorage(STORAGE_KEYS.authSession, next);
    return next;
  }

  function signOutUser() {
    writeStorage(STORAGE_KEYS.authSession, {
      loggedIn: false,
      email: "",
      name: "",
      signedInAt: "",
    });
  }

  function getCurrentUser() {
    const session = getAuthSession();
    if (!session.loggedIn || !session.email) return null;
    const user = getAuthUsers().find((item) => normalizeEmail(item.email) === session.email);
    if (!user) return null;
    return user;
  }

  function ensureAuthSeedUser() {
    const users = getAuthUsers();
    if (users.length) return;
    saveAuthUsers([
      {
        id: `usr_${Date.now()}`,
        name: "Demo Athlete",
        email: "demo@playpro.com",
        password: "demo1234",
        sport: "Football",
        goal: "Academy",
        phone: "",
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function registerAuthUser(payload) {
    const users = getAuthUsers();
    const email = normalizeEmail(payload.email);
    if (!email) return { ok: false, message: "Email is required." };
    if (users.some((user) => normalizeEmail(user.email) === email)) {
      return { ok: false, message: "This email already has an account." };
    }
    const name = String(payload.name || "").trim();
    const password = String(payload.password || "");
    if (!name || password.length < 6) {
      return { ok: false, message: "Enter a valid name and password (min 6 characters)." };
    }
    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      sport: String(payload.sport || "Football"),
      goal: String(payload.goal || "Beginner"),
      phone: String(payload.phone || "").trim(),
      createdAt: new Date().toISOString(),
    };
    saveAuthUsers([user, ...users]);
    setAuthSession({
      loggedIn: true,
      email: user.email,
      name: user.name,
      signedInAt: new Date().toISOString(),
    });
    savePersonalizationState({
      sport: user.sport,
      goal: user.goal,
      profileComplete: true,
    });
    return { ok: true, user };
  }

  function authenticateUser(emailInput, passwordInput) {
    const email = normalizeEmail(emailInput);
    const password = String(passwordInput || "");
    const user = getAuthUsers().find((item) => normalizeEmail(item.email) === email);
    if (!user) return { ok: false, message: "No account found for this email." };
    if (String(user.password || "") !== password) {
      return { ok: false, message: "Incorrect password." };
    }
    setAuthSession({
      loggedIn: true,
      email: user.email,
      name: user.name,
      signedInAt: new Date().toISOString(),
    });
    return { ok: true, user };
  }

  function updateAuthUserProfile(patch) {
    const session = getAuthSession();
    if (!session.loggedIn || !session.email) return { ok: false };
    const users = getAuthUsers();
    const index = users.findIndex((item) => normalizeEmail(item.email) === session.email);
    if (index < 0) return { ok: false };
    const current = users[index];
    const next = {
      ...current,
      name: String(patch.name || current.name || "").trim(),
      phone: String(patch.phone || current.phone || "").trim(),
      sport: String(patch.sport || current.sport || "Football"),
      goal: String(patch.goal || current.goal || "Beginner"),
      location: String(patch.location || current.location || "US").toUpperCase(),
    };
    users[index] = next;
    saveAuthUsers(users);
    setAuthSession({ name: next.name, email: next.email });
    savePersonalizationState({
      sport: next.sport,
      goal: next.goal,
      location: next.location || "US",
      profileComplete: true,
    });
    return { ok: true, user: next };
  }

  function getSavedSearches() {
    const list = readStorage(STORAGE_KEYS.savedSearches, []);
    if (!Array.isArray(list)) return [];
    return list.slice(0, 15);
  }

  function saveSearchTerm(term) {
    const value = String(term || "").trim();
    if (!value) return;
    const next = [value, ...getSavedSearches().filter((item) => item.toLowerCase() !== value.toLowerCase())];
    writeStorage(STORAGE_KEYS.savedSearches, next.slice(0, 15));
  }

  function getStockAlerts() {
    const list = readStorage(STORAGE_KEYS.stockAlerts, []);
    if (!Array.isArray(list)) return [];
    return list.filter((id) => !!findProduct(id));
  }

  function toggleStockAlert(productId) {
    const current = getStockAlerts();
    if (current.includes(productId)) {
      writeStorage(
        STORAGE_KEYS.stockAlerts,
        current.filter((id) => id !== productId)
      );
      return false;
    }
    writeStorage(STORAGE_KEYS.stockAlerts, [...current, productId]);
    return true;
  }

  function getActivityLog() {
    const log = readStorage(STORAGE_KEYS.activity, []);
    if (!Array.isArray(log)) return [];
    return log.slice(0, 400);
  }

  function recordActivity(type, payload = {}) {
    const item = {
      type,
      payload,
      at: Date.now(),
    };
    const next = [item, ...getActivityLog()].slice(0, 400);
    writeStorage(STORAGE_KEYS.activity, next);
  }

  function getReviews() {
    const raw = readStorage(STORAGE_KEYS.reviews, {});
    if (!raw || typeof raw !== "object") return {};
    return raw;
  }

  function saveReview(productId, review) {
    if (!productId) return;
    const all = getReviews();
    const current = Array.isArray(all[productId]) ? all[productId] : [];
    all[productId] = [review, ...current].slice(0, 30);
    writeStorage(STORAGE_KEYS.reviews, all);
  }

  function getReferralState() {
    const fallback = {
      leaderboard: [
        { name: "Athena FC", points: 1220 },
        { name: "City Hoops Lab", points: 1175 },
        { name: "Stride Club", points: 1080 },
      ],
    };
    const saved = readStorage(STORAGE_KEYS.referrals, fallback);
    if (!saved || typeof saved !== "object" || !Array.isArray(saved.leaderboard)) return fallback;
    return saved;
  }

  function updateReferralLeaderboard(entryName, increment = 50) {
    const state = getReferralState();
    const cleaned = String(entryName || "").trim();
    if (!cleaned) return state;
    const existing = state.leaderboard.find((item) => item.name.toLowerCase() === cleaned.toLowerCase());
    if (existing) {
      existing.points += increment;
    } else {
      state.leaderboard.push({ name: cleaned, points: 900 + increment });
    }
    state.leaderboard.sort((a, b) => b.points - a.points);
    state.leaderboard = state.leaderboard.slice(0, 10);
    writeStorage(STORAGE_KEYS.referrals, state);
    return state;
  }

  function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
  }

  function getWishlistCount() {
    return getWishlist().length;
  }

  function getPromoCode() {
    const promo = readStorage(STORAGE_KEYS.promo, "");
    return typeof promo === "string" ? promo.toUpperCase() : "";
  }

  function setPromoCode(value) {
    if (Array.isArray(value)) {
      writeStorage(STORAGE_KEYS.promo, value.map((item) => String(item || "").toUpperCase()).join("+"));
      return;
    }
    writeStorage(STORAGE_KEYS.promo, String(value || "").toUpperCase());
  }

  function parsePromoCodes(value = getPromoCode()) {
    const raw = String(value || "")
      .toUpperCase()
      .split(/[\s,+]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    return Array.from(new Set(raw));
  }

  function getShippingMode() {
    const mode = readStorage(STORAGE_KEYS.shipping, "standard");
    return mode === "express" ? "express" : "standard";
  }

  function setShippingMode(mode) {
    writeStorage(STORAGE_KEYS.shipping, mode === "express" ? "express" : "standard");
  }

  function buildStars(rating) {
    const rounded = Math.round(rating);
    return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
  }

  function lineSubtotal(item) {
    const product = findProduct(item.id);
    if (!product) return 0;
    return product.price * item.quantity;
  }

  function cartTotals(cart, shippingMode = "standard", promoCode = "") {
    const subtotal = cart.reduce((sum, item) => sum + lineSubtotal(item), 0);
    const codes = parsePromoCodes(promoCode);
    const personalization = getPersonalizationState();

    let shipping = STORE_CONFIG.shippingRates.standard;
    if (subtotal >= STORE_CONFIG.freeShippingThreshold && shippingMode === "standard") {
      shipping = 0;
    }
    if (shippingMode === "express") {
      shipping = STORE_CONFIG.shippingRates.express;
    }

    if (codes.includes("FREESHIP") && shippingMode === "standard") {
      shipping = 0;
    }

    const loyaltyRate = personalization.tier === "Elite"
      ? 0.07
      : personalization.tier === "Pro"
      ? 0.04
      : 0;

    let discount = 0;
    if (codes.includes("PLAYPRO10")) {
      discount += subtotal * promoDiscountRate;
    }
    if (codes.includes("VIP5")) {
      discount += subtotal * 0.05;
    }
    if (codes.includes("BUNDLE12")) {
      discount += subtotal * 0.12;
    }
    if (loyaltyRate) {
      discount += subtotal * loyaltyRate;
    }

    discount = Math.min(discount, subtotal * 0.35);
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * STORE_CONFIG.taxRate;
    const total = taxableAmount + shipping + tax;

    return {
      subtotal,
      shipping,
      discount,
      tax,
      total,
      hasPromo: codes.length > 0,
      promoCodes: codes,
      loyaltyRate,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  function updateBadges() {
    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    queryAll("[data-cart-count]").forEach((badge) => {
      badge.textContent = cartCount > 0 ? String(cartCount) : "";
      badge.classList.toggle("has-items", cartCount > 0);
    });

    queryAll("[data-wishlist-count]").forEach((badge) => {
      badge.textContent = wishlistCount > 0 ? String(wishlistCount) : "";
      badge.classList.toggle("has-items", wishlistCount > 0);
    });
  }

  function getToastStack() {
    let stack = query("#toastStack");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "toastStack";
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    return stack;
  }

  function showToast(title, copy, type = "success") {
    const stack = getToastStack();
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-copy">${copy}</div>
    `;
    stack.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  function productScoresFromActivity() {
    const scores = {};
    getActivityLog().forEach((event) => {
      const id = event && event.payload ? event.payload.productId : "";
      if (!id || !findProduct(id)) return;
      const weight =
        event.type === "purchase"
          ? 9
          : event.type === "add_to_cart"
          ? 4
          : event.type === "wishlist_toggle"
          ? 2
          : event.type === "product_view"
          ? 1.3
          : 0.8;
      scores[id] = (scores[id] || 0) + weight;
    });
    return scores;
  }

  function getTrendingProducts(limit = 8) {
    const activityScores = productScoresFromActivity();
    return [...PRODUCTS]
      .sort((a, b) => {
        const scoreA = (activityScores[a.id] || 0) + a.popularity * 0.65;
        const scoreB = (activityScores[b.id] || 0) + b.popularity * 0.65;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  function getUserAffinity() {
    const byCategory = {};
    getActivityLog().forEach((event) => {
      const product = findProduct(event && event.payload ? event.payload.productId : "");
      if (!product) return;
      byCategory[product.category] = (byCategory[product.category] || 0) + 1;
    });
    getWishlist().forEach((id) => {
      const product = findProduct(id);
      if (!product) return;
      byCategory[product.category] = (byCategory[product.category] || 0) + 1.5;
    });
    return byCategory;
  }

  function getPersonalizedRecommendations(limit = 6, categoryHint = "") {
    const affinity = getUserAffinity();
    const personalization = getPersonalizationState();
    const targetCategory = categoryHint || personalization.sport || "";
    return [...PRODUCTS]
      .sort((a, b) => {
        const affA = (affinity[a.category] || 0) + (a.category === targetCategory ? 1.6 : 0);
        const affB = (affinity[b.category] || 0) + (b.category === targetCategory ? 1.6 : 0);
        return affB - affA || b.rating - a.rating || b.popularity - a.popularity;
      })
      .slice(0, limit);
  }

  function matchingBundleProducts(term = "", limit = 3) {
    const queryTerm = String(term || "").trim().toLowerCase();
    if (!queryTerm) return [];
    const base = searchMatches(queryTerm, 4);
    if (!base.length) return [];
    const bundleSet = new Set();
    base.forEach((product) => {
      (product.bundleIds || []).forEach((id) => bundleSet.add(id));
    });
    return Array.from(bundleSet)
      .map((id) => findProduct(id))
      .filter(Boolean)
      .slice(0, limit);
  }

  function getSeasonalCampaignForCategory(category) {
    if (category === "Football") return SEASONAL_CAMPAIGNS[0];
    if (category === "Basketball") return SEASONAL_CAMPAIGNS[1];
    if (category === "Running" || category === "Recovery") return SEASONAL_CAMPAIGNS[2];
    return SEASONAL_CAMPAIGNS[3];
  }

  function setNavActiveState() {
    const experiencePages = new Set([
      "bundles",
      "drops",
      "rewards",
      "track-order",
      "returns",
      "team-orders",
      "gift-cards",
      "resources",
      "partnerships",
      "press",
      "trust",
      "dashboard",
      "analytics",
      "admin",
      "blog",
      "live",
      "queue",
      "vip",
      "spotlight",
    ]);
    const activePage = page === "product" ? "shop" : experiencePages.has(page) ? "experience" : page;

    queryAll("[data-page-link]").forEach((link) => {
      const active = link.dataset.pageLink === activePage;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function authIconMarkup() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2"></circle>
        <path d="M5 20c0-3.5 2.9-6.2 7-6.2s7 2.7 7 6.2"></path>
      </svg>
    `;
  }

  function initAuthNavEntry() {
    const session = getAuthSession();
    const currentUser = getCurrentUser();
    queryAll(".nav-actions").forEach((actions) => {
      let link = query("[data-auth-link]", actions);
      if (!link) {
        link = document.createElement("a");
        link.className = "icon-link auth-link";
        link.dataset.authLink = "1";
        const toggle = query(".nav-toggle", actions);
        if (toggle) {
          actions.insertBefore(link, toggle);
        } else {
          actions.appendChild(link);
        }
      }

      const loggedIn = session.loggedIn && !!currentUser;
      link.href = loggedIn ? "profile.html" : "login.html";
      link.setAttribute("aria-label", loggedIn ? "Open profile" : "Login or sign up");
      link.setAttribute("title", loggedIn ? "Profile" : "Login / Sign up");
      link.innerHTML = `${authIconMarkup()}${
        loggedIn
          ? `<span class="auth-initial" aria-hidden="true">${String(currentUser.name || "U").trim().charAt(0).toUpperCase()}</span>`
          : ""
      }`;
      link.classList.toggle("is-authenticated", loggedIn);
    });
  }

  function getInitialTheme() {
    const savedTheme = readStorage(STORAGE_KEYS.theme, "");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    const prefersLight =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function applyTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;

    queryAll("[data-theme-toggle]").forEach((button) => {
      const targetTheme = nextTheme === "light" ? "dark" : "light";
      button.setAttribute("aria-label", `Switch to ${targetTheme} mode`);
      button.setAttribute("title", `Switch to ${targetTheme} mode`);
    });

    return nextTheme;
  }

  function initTheme() {
    applyTheme(getInitialTheme());

    queryAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const currentTheme = document.body.dataset.theme === "light" ? "light" : "dark";
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(nextTheme);
        writeStorage(STORAGE_KEYS.theme, nextTheme);
      });
    });
  }

  function searchMatches(term, limit = 6) {
    const queryTerm = String(term || "").trim().toLowerCase();
    if (!queryTerm) return [];

    return PRODUCTS.map((product) => {
      const haystackName = product.name.toLowerCase();
      const haystackCategory = product.category.toLowerCase();
      const haystackCopy = `${product.short} ${product.description} ${product.useCase} ${product.playStyle}`.toLowerCase();

      let score = 0;
      if (haystackName.startsWith(queryTerm)) score += 7;
      if (haystackName.includes(queryTerm)) score += 4;
      if (haystackCategory.includes(queryTerm)) score += 2;
      if (haystackCopy.includes(queryTerm)) score += 1;

      if (!score) return null;
      return { score, product };
    })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity)
      .slice(0, limit)
      .map((entry) => entry.product);
  }

  function categoryMatches(term, limit = 3) {
    const queryTerm = String(term || "").trim().toLowerCase();
    if (!queryTerm) return [];
    return CATEGORY_META.filter(
      (category) =>
        category.name.toLowerCase().includes(queryTerm) || category.copy.toLowerCase().includes(queryTerm)
    ).slice(0, limit);
  }

  function intentMatches(term, limit = 3) {
    const queryTerm = String(term || "").trim().toLowerCase();
    if (!queryTerm) return [];
    return INTENT_HINTS.filter((item) => item.key.includes(queryTerm) || queryTerm.includes(item.key)).slice(
      0,
      limit
    );
  }

  function groupedSearchMatches(term) {
    return {
      products: searchMatches(term, 6),
      categories: categoryMatches(term, 4),
      intents: intentMatches(term, 3),
    };
  }

  function initHeaderSearch() {
    const searchForms = queryAll("[data-site-search]");
    if (!searchForms.length) return;

    const queryTerm = String(new URLSearchParams(window.location.search).get("q") || "").trim();

    searchForms.forEach((form, formIndex) => {
      const input = query("[data-site-search-input]", form);
      if (!input) return;

      const suggestionBox = document.createElement("div");
      suggestionBox.className = "site-search-suggestions";
      suggestionBox.setAttribute("role", "listbox");
      suggestionBox.hidden = true;
      const suggestionId = `siteSearchSuggestions${formIndex + 1}`;
      suggestionBox.id = suggestionId;
      form.appendChild(suggestionBox);

      input.setAttribute("autocomplete", "off");
      input.setAttribute("aria-controls", suggestionId);
      input.setAttribute("aria-expanded", "false");

      let suggestions = [];
      let activeIndex = -1;

      function closeSuggestions() {
        suggestions = [];
        activeIndex = -1;
        suggestionBox.hidden = true;
        suggestionBox.innerHTML = "";
        input.setAttribute("aria-expanded", "false");
      }

      function openSuggestions() {
        suggestionBox.hidden = false;
        input.setAttribute("aria-expanded", "true");
      }

      function navigateSuggestion(item) {
        if (!item) return;
        if (item.kind === "product") {
          const product = findProduct(item.id);
          if (!product) return;
          recordActivity("search_select", { productId: product.id, term: input.value.trim() });
          window.location.href = `product.html?id=${encodeURIComponent(product.id)}`;
          return;
        }
        if (item.kind === "category") {
          window.location.href = `shop.html?category=${encodeURIComponent(item.id)}&q=${encodeURIComponent(
            input.value.trim()
          )}`;
          return;
        }
        if (item.kind === "intent") {
          window.location.href = `shop.html?q=${encodeURIComponent(item.copy)}&intent=${encodeURIComponent(item.key)}`;
        }
      }

      function paintActiveSuggestion() {
        queryAll("[data-search-suggestion]", suggestionBox).forEach((button, index) => {
          button.classList.toggle("active", index === activeIndex);
        });
      }

      function renderSuggestions(value) {
        const term = String(value || "").trim();
        if (!term) {
          closeSuggestions();
          return;
        }

        const groups = groupedSearchMatches(term);
        suggestions = [
          ...groups.products.map((product) => ({ kind: "product", id: product.id })),
          ...groups.categories.map((category) => ({ kind: "category", id: category.id })),
          ...groups.intents.map((intent) => ({ kind: "intent", id: intent.key, key: intent.key, copy: intent.copy })),
        ];
        activeIndex = -1;

        if (!suggestions.length) {
          suggestionBox.innerHTML = `<div class="site-search-empty">No matching products found.</div>`;
          openSuggestions();
          return;
        }

        const productMarkup = groups.products
          .map(
            (product) => `
              <button
                type="button"
                class="site-search-item"
                data-search-suggestion
                data-search-kind="product"
                data-search-id="${product.id}"
                role="option"
                aria-label="${product.name}"
              >
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="site-search-text">
                  <strong>${product.name}</strong>
                  <span class="site-search-sub">${product.category} • ${product.useCase} • ${formatCurrency(
              product.price
            )}</span>
                </span>
              </button>
            `
          )
          .join("");

        const categoryMarkup = groups.categories
          .map(
            (category) => `
              <button
                type="button"
                class="site-search-item category-item"
                data-search-suggestion
                data-search-kind="category"
                data-search-id="${category.id}"
                role="option"
                aria-label="${category.name}"
              >
                <img src="${category.image}" alt="${category.name}" loading="lazy">
                <span class="site-search-text">
                  <strong>${category.name}</strong>
                  <span class="site-search-sub">Explore ${category.name} gear</span>
                </span>
              </button>
            `
          )
          .join("");

        const intentMarkup = groups.intents
          .map(
            (intent) => `
              <button
                type="button"
                class="site-search-item intent-item"
                data-search-suggestion
                data-search-kind="intent"
                data-search-id="${intent.key}"
                data-search-copy="${intent.copy}"
                role="option"
                aria-label="${intent.copy}"
              >
                <span class="site-search-text">
                  <strong>${intent.copy}</strong>
                  <span class="site-search-sub">Intent shortcut</span>
                </span>
              </button>
            `
          )
          .join("");

        suggestionBox.innerHTML = `
          ${productMarkup ? `<div class="site-search-group"><p class="site-search-group-title">Products</p>${productMarkup}</div>` : ""}
          ${categoryMarkup ? `<div class="site-search-group"><p class="site-search-group-title">Categories</p>${categoryMarkup}</div>` : ""}
          ${intentMarkup ? `<div class="site-search-group"><p class="site-search-group-title">Intent</p>${intentMarkup}</div>` : ""}
        `;

        openSuggestions();
      }

      input.value = queryTerm;

      input.addEventListener("focus", () => {
        if (input.value.trim()) renderSuggestions(input.value);
      });

      input.addEventListener("input", () => {
        renderSuggestions(input.value);
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeSuggestions();
          return;
        }

        if (!suggestions.length || suggestionBox.hidden) return;

        if (event.key === "ArrowDown") {
          event.preventDefault();
          activeIndex = (activeIndex + 1) % suggestions.length;
          paintActiveSuggestion();
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          activeIndex = activeIndex <= 0 ? suggestions.length - 1 : activeIndex - 1;
          paintActiveSuggestion();
          return;
        }

        if (event.key === "Enter" && activeIndex >= 0) {
          event.preventDefault();
          navigateSuggestion(suggestions[activeIndex]);
        }
      });

      form.addEventListener("click", (event) => {
        const target = event.target.closest("[data-search-suggestion]");
        if (!target) return;
        const kind = target.dataset.searchKind || "product";
        const id = target.dataset.searchId || "";
        const copy = target.dataset.searchCopy || "";
        navigateSuggestion({ kind, id, key: id, copy });
      });

      document.addEventListener("click", (event) => {
        if (!form.contains(event.target)) closeSuggestions();
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const term = String(input.value || "").trim();
        const target = term ? `shop.html?q=${encodeURIComponent(term)}` : "shop.html";
        closeSuggestions();
        if (term) {
          saveSearchTerm(term);
          recordActivity("search_submit", { term });
        }

        if (page === "shop") {
          shopState.term = term;
          shopState.category = "all";
          shopState.categories = [];
          shopState.page = 1;
          shopState.visibleCount = shopState.pageSize;

          const shopSearch = query("#shopSearch");
          const shopCategory = query("#shopCategory");
          if (shopSearch) shopSearch.value = term;
          if (shopCategory) shopCategory.value = "all";

          window.history.replaceState({}, "", target);
          renderShopResults();
          return;
        }

        window.location.href = target;
      });
    });
  }

  function initNavToggle() {
    const nav = query("[data-main-nav]");
    const toggle = query("[data-nav-toggle]");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });

    queryAll(".nav-link", nav).forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
      });
    });
  }

  function initFooterYear() {
    const year = String(new Date().getFullYear());
    queryAll("[data-year]").forEach((node) => {
      node.textContent = year;
    });
  }

  function initRevealObserver() {
    if (revealObserver) return;

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );
  }

  function bindRevealAnimations(scope = document) {
    initRevealObserver();
    const groups = new Map();
    queryAll(".reveal", scope).forEach((node) => {
      const parent = node.parentElement || scope;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(node);
    });

    let waveOffset = 0;
    groups.forEach((nodes) => {
      nodes.forEach((node, index) => {
        if (node.dataset.revealBound) return;
        node.dataset.revealBound = "1";
        const column = index % 4;
        const row = Math.floor(index / 4);
        const delay = waveOffset + column * 58 + row * 34;
        node.style.setProperty("--reveal-delay", `${delay}ms`);
        revealObserver.observe(node);
      });
      waveOffset = (waveOffset + 24) % 140;
    });
  }

  function animateCounter(node, target) {
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(target * eased);
      node.textContent = `${value}${node.dataset.suffix || ""}`;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = queryAll("[data-counter]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const target = Number(node.dataset.counter || "0");
          animateCounter(node, Number.isFinite(target) ? target : 0);
          observer.unobserve(node);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((node) => observer.observe(node));
  }

  function fallbackImageForAlt(altText) {
    const lower = String(altText || "").toLowerCase();
    if (lower.includes("basket")) return "images/hoops-basketball.svg";
    return "images/elite-football.svg";
  }

  function initImageFallbacks() {
    document.addEventListener(
      "error",
      (event) => {
        const target = event.target;
        if (!(target instanceof HTMLImageElement)) return;
        if (target.dataset.fallbackApplied) return;
        target.dataset.fallbackApplied = "1";
        target.src = fallbackImageForAlt(target.alt);
      },
      true
    );
  }

  function initImageLoadingHints() {
    const heroImage = query(".hero img, .page-hero img");
    if (heroImage) {
      heroImage.loading = "eager";
      heroImage.fetchPriority = "high";
      heroImage.decoding = "async";
    }
    queryAll("img").forEach((img) => {
      if (img === heroImage) return;
      if (!img.getAttribute("loading")) img.loading = "lazy";
      if (!img.getAttribute("decoding")) img.decoding = "async";
    });
  }

  function productMiniSuggestions(product, limit = 2) {
    return PRODUCTS.filter((item) => item.id !== product.id && item.category === product.category)
      .slice(0, limit)
      .map((item) => item.name);
  }

  function productRelevanceLabel(product) {
    const wishlistCategories = new Set(
      getWishlist()
        .map((id) => findProduct(id))
        .filter(Boolean)
        .map((item) => item.category)
    );
    if (!wishlistCategories.size) return "";
    if (wishlistCategories.has(product.category)) return "Matches your wishlist";
    return "";
  }

  function cardTemplate(product, wishlistSet, compareSet = new Set()) {
    const inWishlist = wishlistSet.has(product.id);
    const inCompare = compareSet.has(product.id);
    const relevanceLabel = productRelevanceLabel(product);
    const stockClass = product.stock <= 8 ? "critical" : product.stock <= 24 ? "low" : "healthy";
    const personalization = getPersonalizationState();

    return `
      <article class="product-card reveal sport-card ${product.sportKey}">
        <div class="product-media">
          <a class="product-media-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="${product.name}">
            <img class="media-primary" src="${product.image}" alt="${product.name}" loading="lazy">
            <img class="media-secondary" src="${product.altImage}" alt="${product.name} alternate view" loading="lazy">
            ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
            ${product.dropTag ? `<span class="drop-badge">${product.dropTag}</span>` : ""}
            ${relevanceLabel ? `<span class="relevance-badge">${relevanceLabel}</span>` : ""}
          </a>
          <button class="mobile-quick-add" type="button" data-add-cart="${product.id}" aria-label="Quick add ${product.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="9" cy="20" r="1.5"></circle>
              <circle cx="17" cy="20" r="1.5"></circle>
              <path d="M3 4h2l2.4 10.2a1 1 0 0 0 .98.8H18.2a1 1 0 0 0 .98-.8L21 7H7"></path>
            </svg>
          </button>
        </div>
        <div class="product-content">
          <div class="product-top">
            <div>
              <p class="product-category">${product.category}</p>
              <h3 class="product-title">${product.name}</h3>
            </div>
            <div class="product-rating" title="${product.rating} out of 5">
              <span>${buildStars(product.rating)}</span>
            </div>
          </div>
          <div class="product-price-row">
            <span class="product-price">${formatCurrency(product.price)}</span>
            <span class="product-old-price">${formatCurrency(product.oldPrice)}</span>
          </div>
          <div class="product-meta-row">
            <span class="stock-pill ${stockClass}">${product.stock} in stock</span>
            <span class="eta-pill">ETA ${product.etaDays} • ${personalization.location}</span>
          </div>
          <div class="product-actions">
            <button
              class="btn btn-primary btn-small cart-icon-btn"
              data-add-cart="${product.id}"
              aria-label="Add ${product.name} to cart"
              title="Add to cart"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <circle cx="9" cy="20" r="1.5"></circle>
                <circle cx="17" cy="20" r="1.5"></circle>
                <path d="M3 4h2l2.4 10.2a1 1 0 0 0 .98.8H18.2a1 1 0 0 0 .98-.8L21 7H7"></path>
              </svg>
            </button>
            <a class="btn btn-secondary btn-small details-btn" href="product.html?id=${encodeURIComponent(
              product.id
            )}">Details</a>
            <button class="wishlist-btn ${inWishlist ? "active" : ""}" data-wishlist-toggle="${product.id}" aria-label="Toggle wishlist for ${product.name}">
              <svg viewBox="0 0 24 24" fill="${inWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M12 21s-6.716-4.35-9.2-8.281C1.424 10.565 2.052 7.44 4.42 5.82c2.165-1.48 4.773-.915 6.58 1.2 1.807-2.115 4.416-2.68 6.58-1.2 2.368 1.62 2.996 4.745 1.62 6.9C18.716 16.65 12 21 12 21z"/>
              </svg>
            </button>
          </div>
          <div class="product-utility">
            <button class="utility-link" type="button" data-quick-view="${product.id}"><span class="utility-icon">${iconMarkup(
      "quickView"
    )}</span><span>Quick View</span></button>
            <button class="utility-link ${inCompare ? "active" : ""}" type="button" data-compare-toggle="${product.id}">
              <span class="utility-icon">${iconMarkup("compare")}</span>
              <span>${inCompare ? "Compared" : "Compare"}</span>
            </button>
            <button class="utility-link" type="button" data-stock-alert-toggle="${product.id}">
              <span class="utility-icon">${iconMarkup("alert")}</span>
              <span>${getStockAlerts().includes(product.id) ? "Alert On" : "Restock Alert"}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function addToCart(productId, quantity = 1) {
    const product = findProduct(productId);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, 99);
    } else {
      cart.push({ id: productId, quantity: Math.max(1, quantity) });
    }

    saveCart(cart);
    recordActivity("add_to_cart", { productId, quantity });
    updateBadges();
    showToast("Added to Cart", `${product.name} was added to your cart.`, "success");
    renderCartDrawer();
    if (page !== "cart" && page !== "checkout") {
      openCartDrawer();
    }

    if (page === "cart") {
      renderCartPage();
    }

    if (page === "checkout") {
      renderCheckoutSummary();
    }
  }

  function toggleWishlist(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const wishlist = getWishlist();
    const exists = wishlist.includes(productId);
    const nextWishlist = exists
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    saveWishlist(nextWishlist);
    recordActivity("wishlist_toggle", { productId, active: !exists });
    updateBadges();

    showToast(
      exists ? "Removed from Wishlist" : "Saved to Wishlist",
      exists
        ? `${product.name} was removed from your wishlist.`
        : `${product.name} is now in your wishlist.`,
      exists ? "warn" : "success"
    );

    if (page === "home") renderHomeProducts();
    if (page === "shop") renderShopResults();
    if (page === "wishlist") renderWishlistPage();
    if (page === "product") renderProductPage();
  }

  function toggleCompare(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const current = getCompareList();
    const exists = current.includes(productId);
    let next = current;

    if (exists) {
      next = current.filter((id) => id !== productId);
      showToast("Compare Updated", `${product.name} removed from compare.`, "warn");
    } else {
      if (current.length >= 4) {
        showToast("Compare Limit", "You can compare up to 4 products.", "warn");
        return;
      }
      next = [...current, productId];
      showToast("Compare Updated", `${product.name} added to compare.`, "success");
    }

    saveCompareList(next);
    recordActivity("compare_toggle", { productId, active: !exists });
    renderCompareDock();

    if (page === "home") renderHomeProducts();
    if (page === "shop") renderShopResults();
    if (page === "wishlist") renderWishlistPage();
    if (page === "product") renderProductPage();
  }

  function ensureQuickViewModal() {
    let modal = query("#quickViewModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "quickViewModal";
    modal.className = "overlay-modal hidden";
    modal.innerHTML = `
      <div class="overlay-backdrop" data-overlay-close></div>
      <article class="overlay-panel">
        <button class="overlay-close" type="button" data-overlay-close aria-label="Close quick view">x</button>
        <div id="quickViewBody"></div>
      </article>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-overlay-close]")) {
        modal.classList.add("hidden");
      }
    });

    return modal;
  }

  function openQuickView(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const modal = ensureQuickViewModal();
    const body = query("#quickViewBody", modal);
    if (!body) return;

    body.innerHTML = `
      <div class="quick-view-layout">
        <div class="quick-view-media">
          <img src="${product.gallery[0]}" alt="${product.name}">
        </div>
        <div class="quick-view-content">
          <p class="eyebrow">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="product-rating">${buildStars(product.rating)} ${product.rating} (${product.reviews})</p>
          <p class="product-copy">${product.short}</p>
          <div class="product-price-row">
            <span class="product-price">${formatCurrency(product.price)}</span>
            <span class="product-old-price">${formatCurrency(product.oldPrice)}</span>
          </div>
          <div class="product-meta-row">
            <span class="stock-pill ${product.lowStock ? "low" : "healthy"}">${product.stockStatus} stock</span>
            <span class="eta-pill">ETA ${product.etaDays}</span>
          </div>
          <div class="variant-row">
            <label>
              <span>Size</span>
              <select class="variant-select" aria-label="Select size for ${product.name}">
                ${product.variants.size.map((size) => `<option value="${size}">${size}</option>`).join("")}
              </select>
            </label>
            <label>
              <span>Pack</span>
              <select class="variant-select" aria-label="Select pack for ${product.name}">
                ${product.variants.pack.map((pack) => `<option value="${pack}">${pack}</option>`).join("")}
              </select>
            </label>
          </div>
          <ul class="product-highlights">
            ${product.features.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="detail-actions">
            <button class="btn btn-primary" data-add-cart="${product.id}" data-quantity="1">Add to Cart</button>
            <a class="btn btn-secondary" href="product.html?id=${encodeURIComponent(product.id)}">Full Details</a>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  function ensureCompareDock() {
    let dock = query("#compareDock");
    if (dock) return dock;

    dock = document.createElement("div");
    dock.id = "compareDock";
    dock.className = "compare-dock hidden";
    dock.innerHTML = `
      <div class="compare-dock-copy">
        <strong data-compare-count>0 items</strong>
        <span>selected for compare</span>
      </div>
      <div class="compare-dock-actions">
        <button class="btn btn-secondary btn-small" type="button" data-compare-open>Open Compare</button>
        <button class="btn btn-ghost btn-small" type="button" data-compare-clear>Clear</button>
      </div>
    `;
    document.body.appendChild(dock);

    dock.addEventListener("click", (event) => {
      if (event.target.closest("[data-compare-clear]")) {
        saveCompareList([]);
        renderCompareDock();
        if (page === "shop") renderShopResults();
      }
      if (event.target.closest("[data-compare-open]")) {
        openCompareModal();
      }
    });

    return dock;
  }

  function ensureCompareModal() {
    let modal = query("#compareModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "compareModal";
    modal.className = "overlay-modal hidden";
    modal.innerHTML = `
      <div class="overlay-backdrop" data-compare-close></div>
      <article class="overlay-panel wide">
        <button class="overlay-close" type="button" data-compare-close aria-label="Close compare">x</button>
        <div id="compareBody"></div>
      </article>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-compare-close]")) {
        modal.classList.add("hidden");
      }
    });

    return modal;
  }

  function openCompareModal() {
    const compareIds = getCompareList();
    if (!compareIds.length) {
      showToast("Compare", "Add products to compare first.", "warn");
      return;
    }

    const products = compareIds.map((id) => findProduct(id)).filter(Boolean);
    const modal = ensureCompareModal();
    const body = query("#compareBody", modal);
    if (!body) return;

    body.innerHTML = `
      <h3 class="section-title" style="font-size:2rem; margin-bottom: 0.7rem;">Compare Products</h3>
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Attribute</th>
              ${products.map((product) => `<th>${product.name}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr><td>Category</td>${products.map((product) => `<td>${product.category}</td>`).join("")}</tr>
            <tr><td>Price</td>${products
              .map((product) => `<td>${formatCurrency(product.price)}</td>`)
              .join("")}</tr>
            <tr><td>Rating</td>${products
              .map((product) => `<td>${product.rating} / 5</td>`)
              .join("")}</tr>
            <tr><td>Stock</td>${products.map((product) => `<td>${product.stock}</td>`).join("")}</tr>
            <tr><td>Primary Use</td>${products.map((product) => `<td>${product.short}</td>`).join("")}</tr>
          </tbody>
        </table>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  function renderCompareDock() {
    const dock = ensureCompareDock();
    const count = query("[data-compare-count]", dock);
    if (!dock || !count) return;

    const compareIds = getCompareList();
    if (page !== "shop" || !compareIds.length) {
      dock.classList.add("hidden");
      return;
    }

    count.textContent = `${compareIds.length} item${compareIds.length > 1 ? "s" : ""}`;
    dock.classList.remove("hidden");
  }

  function ensureCartDrawer() {
    let drawer = query("#cartDrawer");
    if (drawer) return drawer;

    drawer = document.createElement("aside");
    drawer.id = "cartDrawer";
    drawer.className = "cart-drawer";
    drawer.innerHTML = `
      <div class="cart-drawer-backdrop" data-cart-drawer-close></div>
      <div class="cart-drawer-panel" role="dialog" aria-modal="true" aria-label="Smart cart drawer">
        <button class="overlay-close" type="button" data-cart-drawer-close aria-label="Close cart drawer">x</button>
        <div class="cart-drawer-header">
          <h3>Smart Cart</h3>
          <p class="muted">Persistent context, bundles, and shipping incentives.</p>
        </div>
        <div id="cartDrawerBody"></div>
      </div>
    `;
    document.body.appendChild(drawer);
    drawer.addEventListener("click", (event) => {
      if (event.target.closest("[data-cart-drawer-close]")) {
        closeCartDrawer();
      }
    });
    return drawer;
  }

  function closeCartDrawer() {
    const drawer = ensureCartDrawer();
    drawer.classList.remove("open");
  }

  function openCartDrawer() {
    const drawer = ensureCartDrawer();
    renderCartDrawer();
    drawer.classList.add("open");
  }

  function cartProgressMarkup(totals) {
    const progress = Math.min(1, totals.subtotal / STORE_CONFIG.freeShippingThreshold);
    const percentage = Math.round(progress * 100);
    const remain = Math.max(0, STORE_CONFIG.freeShippingThreshold - totals.subtotal);
    return `
      <div class="shipping-progress">
        <div class="shipping-progress-head">
          <span>Free Shipping Progress</span>
          <strong>${percentage}%</strong>
        </div>
        <div class="shipping-progress-track"><i style="width:${percentage}%"></i></div>
        <p class="muted">${
          remain > 0
            ? `Add ${formatCurrency(remain)} to unlock free standard shipping.`
            : "Free shipping unlocked."
        }</p>
      </div>
    `;
  }

  function renderCartDrawer() {
    const drawer = ensureCartDrawer();
    const body = query("#cartDrawerBody", drawer);
    if (!body) return;
    const cart = getCart();
    const totals = cartTotals(cart, getShippingMode(), getPromoCode());
    if (!cart.length) {
      body.innerHTML = `<div class="empty-state">Your cart is empty. Add products to activate smart cart insights.</div>`;
      return;
    }

    const bundleSuggestions = Array.from(
      new Set(
        cart
          .map((line) => findProduct(line.id))
          .filter(Boolean)
          .flatMap((product) => product.bundleIds || [])
      )
    )
      .map((id) => findProduct(id))
      .filter(Boolean)
      .slice(0, 3);

    body.innerHTML = `
      ${cartProgressMarkup(totals)}
      <div class="cart-drawer-lines">
        ${cart
          .map((line) => {
            const product = findProduct(line.id);
            if (!product) return "";
            return `
              <article class="cart-drawer-line">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div>
                  <strong>${product.name}</strong>
                  <p class="muted">${line.quantity} x ${formatCurrency(product.price)}</p>
                </div>
                <strong>${formatCurrency(lineSubtotal(line))}</strong>
              </article>
            `;
          })
          .join("")}
      </div>
      ${
        bundleSuggestions.length
          ? `
            <div class="cart-drawer-bundles">
              <p class="section-kicker">Complete The Kit</p>
              <div class="lane-row">
                ${bundleSuggestions
                  .map(
                    (item) => `
                      <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <span>${item.name}</span>
                      </button>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }
      <div class="cart-drawer-total">
        <span>Total</span>
        <strong>${formatCurrency(totals.total)}</strong>
      </div>
      <div class="cart-drawer-actions">
        <a class="btn btn-secondary btn-small" href="cart.html">Open Cart</a>
        <a class="btn btn-primary btn-small" href="checkout.html">Checkout</a>
      </div>
    `;
  }

  function initGlobalProductActions() {
    document.addEventListener("click", (event) => {
      const addButton = event.target.closest("[data-add-cart]");
      if (addButton) {
        event.preventDefault();
        const id = addButton.dataset.addCart;
        const quantity = Number(addButton.dataset.quantity || "1");
        addToCart(id, Number.isFinite(quantity) ? quantity : 1);
        return;
      }

      const wishlistButton = event.target.closest("[data-wishlist-toggle]");
      if (wishlistButton) {
        event.preventDefault();
        toggleWishlist(wishlistButton.dataset.wishlistToggle || "");
        wishlistButton.classList.add("wishlist-pop");
        window.setTimeout(() => wishlistButton.classList.remove("wishlist-pop"), 460);
        return;
      }

      const quickViewButton = event.target.closest("[data-quick-view]");
      if (quickViewButton) {
        event.preventDefault();
        openQuickView(quickViewButton.dataset.quickView || "");
        return;
      }

      const compareButton = event.target.closest("[data-compare-toggle]");
      if (compareButton) {
        event.preventDefault();
        toggleCompare(compareButton.dataset.compareToggle || "");
        return;
      }

      const stockAlertButton = event.target.closest("[data-stock-alert-toggle]");
      if (stockAlertButton) {
        event.preventDefault();
        const productId = stockAlertButton.dataset.stockAlertToggle || "";
        if (!findProduct(productId)) return;
        const active = toggleStockAlert(productId);
        stockAlertButton.textContent = active ? "Alert On" : "Restock Alert";
        showToast(
          active ? "Alert Enabled" : "Alert Removed",
          active
            ? "You will be notified when stock or drops update."
            : "Restock alert removed for this product.",
          active ? "success" : "warn"
        );
      }
    });

    document.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      if (!target.matches("[data-variant-size], [data-variant-color], [data-variant-pack]")) return;
      const productId =
        target.dataset.variantSize || target.dataset.variantColor || target.dataset.variantPack || "";
      if (!productId) return;
      recordActivity("variant_select", { productId, value: target.value });
    });
  }

  function initCartQuickAccess() {
    queryAll("a.icon-link[href='cart.html']").forEach((link) => {
      link.dataset.skipLoader = "1";
      link.addEventListener("click", (event) => {
        const modifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        if (modifiedClick || page === "cart" || page === "checkout") return;
        event.preventDefault();
        openCartDrawer();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeCartDrawer();
    });
  }

  function getShopState() {
    return {
      term: "",
      category: "all",
      categories: [],
      useCase: "all",
      playStyle: "all",
      visualSport: "all",
      sort: "popular",
      maxPrice: 260,
      density: "standard",
      browseMode: "pagination",
      page: 1,
      pageSize: 8,
      visibleCount: 8,
      intent: "",
    };
  }

  const shopState = getShopState();
  let shopInfiniteObserver = null;

  function filterAndSortProducts() {
    const term = shopState.term.trim().toLowerCase();
    const intentTerm = shopState.intent.trim().toLowerCase();
    const selectedCategories = shopState.categories || [];
    const byUseCaseOrder = {
      Beginner: 1,
      Academy: 2,
      "Pro-Level": 3,
      Indoor: 4,
      Outdoor: 5,
    };
    const activityScores = productScoresFromActivity();

    const filtered = PRODUCTS.filter((product) => {
      const termMatch =
        !term ||
        `${product.name} ${product.category} ${product.short} ${product.description} ${product.useCase} ${product.playStyle}`
          .toLowerCase()
          .includes(term);

      const categoryMatch = shopState.category === "all" || product.category === shopState.category;
      const multiCategoryMatch =
        !selectedCategories.length || selectedCategories.includes(product.category);
      const useCaseMatch = shopState.useCase === "all" || product.useCase === shopState.useCase;
      const playStyleMatch =
        shopState.playStyle === "all" || product.playStyle === shopState.playStyle;
      const visualSportMatch =
        shopState.visualSport === "all" || product.sportKey === shopState.visualSport;
      const intentMatch =
        !intentTerm ||
        `${product.name} ${product.short} ${product.category} ${product.useCase} ${product.playStyle}`
          .toLowerCase()
          .includes(intentTerm);

      const priceMatch = product.price <= shopState.maxPrice;

      return (
        termMatch &&
        categoryMatch &&
        multiCategoryMatch &&
        useCaseMatch &&
        playStyleMatch &&
        visualSportMatch &&
        intentMatch &&
        priceMatch
      );
    });

    const sorted = [...filtered];

    switch (shopState.sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      case "use-case":
        sorted.sort(
          (a, b) =>
            (byUseCaseOrder[a.useCase] || 99) - (byUseCaseOrder[b.useCase] || 99) ||
            b.rating - a.rating
        );
        break;
      case "trending":
        sorted.sort(
          (a, b) =>
            (activityScores[b.id] || 0) - (activityScores[a.id] || 0) || b.popularity - a.popularity
        );
        break;
      default:
        sorted.sort((a, b) => b.popularity - a.popularity);
    }

    return sorted;
  }

  function renderHomeCategories() {
    const wrap = query("#homeCategoryGrid");
    if (!wrap) return;

    wrap.innerHTML = CATEGORY_META.map(
      (category) => `
      <article class="category-card reveal sport-${(SPORT_PROFILES[category.name] || SPORT_PROFILES.Training).key}">
        <img src="${category.image}" alt="${category.name}" loading="lazy">
        <div class="category-card-content">
          <span class="category-icon" aria-hidden="true">${iconMarkup(category.name)}</span>
          <h3>${category.name}</h3>
          <p>${category.copy}</p>
          <a class="category-link" href="shop.html?category=${encodeURIComponent(
            category.id
          )}">Shop ${category.name}</a>
        </div>
      </article>
    `
    ).join("");

    bindRevealAnimations(wrap);
  }

  function renderHomeProducts() {
    const grid = query("#featuredGrid");
    if (!grid) return;

    const personalization = getPersonalizationState();
    const sport = personalization.sport;
    const featured = PRODUCTS.filter((item) => item.featured && (!sport || item.category === sport)).slice(0, 8);
    const wishlistSet = new Set(getWishlist());
    const compareSet = new Set(getCompareList());

    grid.innerHTML = featured.map((item) => cardTemplate(item, wishlistSet, compareSet)).join("");
    bindRevealAnimations(grid);
  }

  function ensureHomeWowModules() {
    const root = query("main");
    const homeGrid = query("#featuredGrid");
    if (!root || !homeGrid) return;
    if (query("#homeWowModules")) return;

    const section = document.createElement("section");
    section.id = "homeWowModules";
    section.className = "section-tight";
    section.innerHTML = `
      <div class="container">
        <div class="wow-shell reveal">
          <div class="wow-head">
            <p class="section-kicker">Choose Your Sport</p>
            <h2 class="section-title" style="font-size:2.4rem">Instant Sport Theme Switch</h2>
          </div>
          <div class="sport-switcher" id="homeSportSwitcher">
            ${Object.keys(SPORT_PROFILES)
              .map(
                (category) => `<button class="chip" type="button" data-sport-switch="${category}">${category}</button>`
              )
              .join("")}
          </div>
          <div class="sport-story" id="homeSportStory"></div>
        </div>
        <div class="lane-card reveal" id="homeDropsLane"></div>
        <div class="lane-card reveal" id="homeTrendingLane"></div>
        <div class="lane-card reveal" id="homeCampaignLane"></div>
        <div class="lane-card reveal" id="homeHighlightReel"></div>
        <div class="lane-card reveal" id="homeTestimonialLane"></div>
        <div class="lane-card reveal" id="homeOutcomeLane"></div>
        <div class="lane-card reveal" id="homeDashboardLane"></div>
      </div>
    `;

    const featuredSection = homeGrid.closest(".section");
    if (featuredSection) {
      featuredSection.insertAdjacentElement("beforebegin", section);
    } else {
      root.appendChild(section);
    }
  }

  function renderHomeHeroScene(category) {
    const scene = HOME_SPORT_SCENES[category] || HOME_SPORT_SCENES.Football;
    const heroImage = query(".hero-media > img");
    const spotlightGrid = query(".hero-static-grid");
    if (heroImage) {
      heroImage.src = scene.hero;
      heroImage.alt = scene.heroAlt;
      heroImage.fetchPriority = "high";
    }
    if (spotlightGrid) {
      spotlightGrid.innerHTML = scene.cards
        .map(
          (item) => `
            <article class="spotlight-card">
              <img src="${item.image}" alt="${item.name}" loading="lazy" />
              <div>
                <small>${item.label}</small>
                <strong>${item.name}</strong>
              </div>
            </article>
          `
        )
        .join("");
    }
  }

  function initHomeHeroParallax() {
    const hero = query(".hero");
    const media = query(".hero-media");
    if (!hero || !media || media.dataset.parallaxBound) return;
    media.dataset.parallaxBound = "1";

    media.addEventListener("pointermove", (event) => {
      const rect = media.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--hero-parallax-x", `${(offsetX * 14).toFixed(2)}px`);
      hero.style.setProperty("--hero-parallax-y", `${(offsetY * 10).toFixed(2)}px`);
    });

    media.addEventListener("pointerleave", () => {
      hero.style.setProperty("--hero-parallax-x", "0px");
      hero.style.setProperty("--hero-parallax-y", "0px");
    });
  }

  function renderHomeDropsLane() {
    const lane = query("#homeDropsLane");
    if (!lane) return;
    const now = Date.now();
    const dropPool = PRODUCTS.filter((item) => item.dropTag || item.newArrival || item.featured);
    if (!dropPool.length) {
      lane.innerHTML = "";
      return;
    }

    const offset = Number(lane.dataset.offset || "0");
    const picks = Array.from({ length: 3 }, (_, idx) => dropPool[(offset + idx) % dropPool.length]);
    const nextOffset = (offset + 1) % dropPool.length;
    lane.dataset.offset = String(nextOffset);

    lane.innerHTML = `
      <p class="section-kicker">Today's Drops</p>
      <div class="drop-strip">
        ${picks
          .map((item, idx) => {
            const target = now + (idx + 1) * 1000 * 60 * 40;
            const minutes = Math.max(1, Math.floor((target - now) / (1000 * 60)));
            const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
            const mins = String(minutes % 60).padStart(2, "0");
            return `
              <article class="drop-card">
                <img src="${item.image}" alt="${item.name}" loading="lazy" />
                <div>
                  <strong>${item.name}</strong>
                  <p class="drop-countdown">${hours}:${mins}:00</p>
                  <button class="btn btn-primary btn-small" type="button" data-add-cart="${item.id}">Instant Buy</button>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    `;

    if (!lane.dataset.timerBound) {
      lane.dataset.timerBound = "1";
      window.setInterval(() => {
        renderHomeDropsLane();
      }, 14000);
    }
  }

  function renderHomeTestimonialLane() {
    const lane = query("#homeTestimonialLane");
    if (!lane) return;
    lane.innerHTML = `
      <p class="section-kicker">Built By Athletes</p>
      <div class="testimonial-wall">
        ${HOME_TESTIMONIALS.map((item) => {
          const product = findProduct(item.productId);
          return `
            <article class="testimonial-card">
              <div class="testimonial-video">
                <iframe src="${item.video}" title="${item.athlete} video snippet" loading="lazy" allowfullscreen></iframe>
              </div>
              <strong>${item.athlete}</strong>
              <span class="muted">${item.role}</span>
              <p>${item.quote}</p>
              ${
                product
                  ? `<a class="chip" href="product.html?id=${encodeURIComponent(product.id)}">Shop ${product.name}</a>`
                  : ""
              }
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderHomeOutcomeLane() {
    const lane = query("#homeOutcomeLane");
    if (!lane) return;
    const activeIndex = Number(lane.dataset.activeIndex || "0");
    lane.innerHTML = `
      <p class="section-kicker">Before / After Outcomes</p>
      <div class="outcome-carousel">
        ${HOME_OUTCOME_STORIES.map(
          (item, index) => `
            <article class="outcome-card ${index === activeIndex ? "active" : ""}">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
              <div>
                <strong>${item.title}</strong>
                <p class="outcome-split"><span>Before ${item.before}</span><span>After ${item.after}</span></p>
                <p class="chip">${item.delta}</p>
                <p>${item.copy}</p>
              </div>
            </article>
          `
        ).join("")}
      </div>
    `;

    if (!lane.dataset.bound) {
      lane.dataset.bound = "1";
      window.setInterval(() => {
        const next = (Number(lane.dataset.activeIndex || "0") + 1) % HOME_OUTCOME_STORIES.length;
        lane.dataset.activeIndex = String(next);
        renderHomeOutcomeLane();
      }, 6200);
    }
  }

  function renderHomeSportStory() {
    const story = query("#homeSportStory");
    const switcher = query("#homeSportSwitcher");
    if (!story || !switcher) return;
    const personalization = getPersonalizationState();
    const selected = personalization.sport && SPORT_PROFILES[personalization.sport]
      ? personalization.sport
      : "Football";

    queryAll("[data-sport-switch]", switcher).forEach((button) => {
      button.classList.toggle("active", button.dataset.sportSwitch === selected);
    });

    const profile = SPORT_PROFILES[selected] || SPORT_PROFILES.Football;
    const campaign = getSeasonalCampaignForCategory(selected);
    story.innerHTML = `
      <article class="experience-card sport-story-card ${profile.key}">
        <h3>${selected} Identity</h3>
        <p>Accent: ${profile.accent} • Motif: ${profile.motif}</p>
        <p>Photography Direction: ${profile.style}</p>
        <a class="btn btn-secondary btn-small" href="${campaign.href}">${campaign.cta}</a>
      </article>
    `;

    const hero = query(".hero");
    if (hero) {
      hero.dataset.sportTheme = profile.key;
    }
    renderHomeHeroScene(selected);
  }

  function renderHomeTrendingLane() {
    const lane = query("#homeTrendingLane");
    if (!lane) return;
    const items = getTrendingProducts(8);
    lane.innerHTML = `
      <p class="section-kicker">Trending Now</p>
      <div class="lane-row">
        ${items
          .map(
            (item) => `
              <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <span>${item.name}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderHomeCampaignLane() {
    const lane = query("#homeCampaignLane");
    if (!lane) return;
    lane.innerHTML = `
      <p class="section-kicker">Seasonal Campaigns</p>
      <div class="campaign-grid">
        ${SEASONAL_CAMPAIGNS.map(
          (campaign) => `
            <article class="campaign-card" style="--campaign-accent:${campaign.accent}">
              <h3>${campaign.title}</h3>
              <p>${campaign.copy}</p>
              <a class="chip" href="${campaign.href}">${campaign.cta}</a>
            </article>
          `
        ).join("")}
      </div>
    `;
  }

  function renderHomeHighlightReel() {
    const lane = query("#homeHighlightReel");
    if (!lane) return;
    const highlightItems = getTrendingProducts(4);
    lane.innerHTML = `
      <p class="section-kicker">Shoppable Highlight Reel</p>
      <div class="highlight-grid">
        ${highlightItems
          .map(
            (item) => `
              <article class="highlight-card">
                <img src="${item.gallery[0]}" alt="${item.name}" loading="lazy">
                <div>
                  <strong>${item.name}</strong>
                  <p>${item.short}</p>
                  <button class="btn btn-primary btn-small" type="button" data-add-cart="${item.id}">Quick Add</button>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderHomeDashboardLane() {
    const lane = query("#homeDashboardLane");
    if (!lane) return;
    const personalization = getPersonalizationState();
    const recentActivity = getActivityLog().slice(0, 3);
    lane.innerHTML = `
      <p class="section-kicker">Personal Dashboard Snapshot</p>
      <div class="metric-strip">
        <article class="kpi-card"><p class="kpi-label">Preferred Sport</p><p class="kpi-value">${
          personalization.sport || "Not set"
        }</p></article>
        <article class="kpi-card"><p class="kpi-label">Goal</p><p class="kpi-value">${
          personalization.goal || "Build all-round kit"
        }</p></article>
        <article class="kpi-card"><p class="kpi-label">Loyalty Tier</p><p class="kpi-value">${
          personalization.tier || "Starter"
        }</p></article>
        <article class="kpi-card"><p class="kpi-label">Recent Actions</p><p class="kpi-value">${recentActivity.length}</p></article>
      </div>
    `;
  }

  function initHomePage() {
    ensureHomeWowModules();
    initHomeHeroParallax();
    renderHomeCategories();
    renderHomeProducts();
    renderHomeSportStory();
    renderHomeDropsLane();
    renderHomeTrendingLane();
    renderHomeCampaignLane();
    renderHomeHighlightReel();
    renderHomeTestimonialLane();
    renderHomeOutcomeLane();
    renderHomeDashboardLane();

    const switcher = query("#homeSportSwitcher");
    if (switcher && !switcher.dataset.bound) {
      switcher.dataset.bound = "1";
      switcher.addEventListener("click", (event) => {
        const button = event.target.closest("[data-sport-switch]");
        if (!button) return;
        const category = button.dataset.sportSwitch || "";
        savePersonalizationState({ sport: category, profileComplete: true });
        renderHomeSportStory();
        renderHomeProducts();
        renderHomeDashboardLane();
      });
    }
  }

  function populateShopFilters() {
    const categorySelect = query("#shopCategory");
    const categories = Array.from(new Set(PRODUCTS.map((item) => item.category))).sort();
    if (categorySelect) {
      categorySelect.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
      `;
    }

    const sortSelect = query("#shopSort");
    if (sortSelect && !sortSelect.querySelector("option[value='trending']")) {
      sortSelect.insertAdjacentHTML(
        "beforeend",
        `
          <option value="trending">Trending Activity</option>
          <option value="use-case">Sort by Use Case</option>
        `
      );
    }

    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get("category");
    const urlIntent = params.get("intent");
    if (urlCategory && categories.includes(urlCategory)) {
      shopState.category = urlCategory;
      if (categorySelect) categorySelect.value = urlCategory;
      if (!shopState.categories.includes(urlCategory)) {
        shopState.categories.push(urlCategory);
      }
    }
    if (urlIntent) {
      shopState.intent = urlIntent;
    }
  }

  function renderSavedSearchesUI() {
    const wrap = query("#shopSavedSearches");
    if (!wrap) return;
    const items = getSavedSearches();
    if (!items.length) {
      wrap.innerHTML = `<span class="muted">No saved searches yet.</span>`;
      return;
    }
    wrap.innerHTML = items
      .slice(0, 8)
      .map((item) => `<button class="chip" type="button" data-load-search="${item}">${item}</button>`)
      .join("");
  }

  function renderSeoLinksUI() {
    const wrap = query("#shopSeoLinks");
    if (!wrap) return;
    const clusters = [
      { label: "Football Wet Field (US)", href: "shop.html?category=Football&q=best+football+for+wet+field&intent=wet+field&loc=US" },
      { label: "Indoor Hoops Gear", href: "shop.html?category=Basketball&q=indoor+court+traction+gear&intent=indoor+court" },
      { label: "Academy Starter Kits", href: "shop.html?q=academy+training+starter+kit&intent=academy+training" },
      { label: "Recovery for Sprinters", href: "shop.html?category=Recovery&q=injury+recovery+for+sprinting&intent=injury+recovery" },
    ];
    wrap.innerHTML = clusters
      .map((item) => `<a class="chip" href="${item.href}">${item.label}</a>`)
      .join("");
  }

  function renderStockAlertsUI() {
    const wrap = query("#shopAlertList");
    if (!wrap) return;
    const products = getStockAlerts().map((id) => findProduct(id)).filter(Boolean);
    if (!products.length) {
      wrap.innerHTML = `<span class="muted">No restock alerts enabled.</span>`;
      return;
    }
    wrap.innerHTML = products
      .slice(0, 6)
      .map((item) => `<button class="chip" type="button" data-open-product="${item.id}">${item.name}</button>`)
      .join("");
  }

  function renderShopPagination(totalItems) {
    const wrap = query("#shopPagination");
    if (!wrap) return;
    if (shopState.browseMode !== "pagination") {
      wrap.innerHTML = "";
      return;
    }
    const totalPages = Math.max(1, Math.ceil(totalItems / shopState.pageSize));
    shopState.page = Math.min(Math.max(shopState.page, 1), totalPages);
    wrap.innerHTML = `
      <button type="button" class="btn btn-ghost btn-small" data-shop-page="prev" ${
        shopState.page <= 1 ? "disabled" : ""
      }>Prev</button>
      <span class="muted">Page ${shopState.page} / ${totalPages}</span>
      <button type="button" class="btn btn-ghost btn-small" data-shop-page="next" ${
        shopState.page >= totalPages ? "disabled" : ""
      }>Next</button>
    `;
  }

  function renderShopDynamicLanes(results) {
    const bundleLane = query("#shopBundleLane");
    const recommendationLane = query("#shopRecommendationLane");
    if (bundleLane) {
      const bundles = matchingBundleProducts(shopState.term || shopState.intent, 4);
      if (!bundles.length) {
        bundleLane.innerHTML = "";
      } else {
        bundleLane.innerHTML = `
          <div class="lane-card reveal">
            <p class="section-kicker">Matching Bundles</p>
            <div class="lane-row">
              ${bundles
                .map(
                  (item) => `
                  <a class="lane-item" href="product.html?id=${encodeURIComponent(item.id)}">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <span>${item.name}</span>
                  </a>
                `
                )
                .join("")}
            </div>
          </div>
        `;
      }
    }

    if (recommendationLane) {
      const topCategory = shopState.category !== "all" ? shopState.category : "";
      const recs = getPersonalizedRecommendations(5, topCategory);
      recommendationLane.innerHTML = `
        <div class="lane-card reveal">
          <p class="section-kicker">Recommended For You</p>
          <div class="lane-row">
            ${recs
              .map(
                (item) => `
                <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                  <img src="${item.image}" alt="${item.name}" loading="lazy">
                  <span>${item.name}</span>
                </button>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    }
    bindRevealAnimations(bundleLane || document);
    bindRevealAnimations(recommendationLane || document);
  }

  function bindShopInfiniteScroll(totalItems, rerender) {
    const sentinel = query("#shopInfiniteSentinel");
    if (!sentinel) return;
    if (shopInfiniteObserver) {
      shopInfiniteObserver.disconnect();
      shopInfiniteObserver = null;
    }
    if (shopState.browseMode !== "infinite") {
      sentinel.classList.add("hidden");
      return;
    }
    sentinel.classList.remove("hidden");
    shopInfiniteObserver = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((entry) => entry.isIntersecting);
        if (!hit) return;
        if (shopState.visibleCount >= totalItems) return;
        shopState.visibleCount = Math.min(totalItems, shopState.visibleCount + shopState.pageSize);
        rerender();
      },
      { threshold: 0.6 }
    );
    shopInfiniteObserver.observe(sentinel);
  }

  function ensureShopEnhancementUI() {
    const layout = query(".shop-layout section");
    const toolbar = query(".shop-toolbar");
    if (!layout || !toolbar) return;

    let panel = query("#shopAdvancedPanel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "shopAdvancedPanel";
      panel.className = "shop-advanced-panel reveal";
      panel.innerHTML = `
        <div class="advanced-filter-bar">
          <div class="chip-group" id="shopCategoryChips"></div>
          <div class="advanced-controls">
            <select id="shopUseCase" class="filter-control">
              <option value="all">All Use Cases</option>
              ${USE_CASES.map((item) => `<option value="${item}">${item}</option>`).join("")}
            </select>
            <select id="shopPlayStyle" class="filter-control">
              <option value="all">All Play Styles</option>
              ${PLAY_STYLES.map((item) => `<option value="${item}">${item}</option>`).join("")}
            </select>
            <select id="shopBrowseMode" class="filter-control">
              <option value="pagination">Classic Pagination</option>
              <option value="infinite">Infinite Scroll</option>
            </select>
          </div>
          <div class="density-toggle" role="group" aria-label="Grid density">
            <button class="chip" type="button" data-density="compact">Compact</button>
            <button class="chip" type="button" data-density="standard">Standard</button>
            <button class="chip" type="button" data-density="detail">Detail</button>
          </div>
          <div class="visual-filter-grid" id="shopVisualFilterGrid">
            ${CATEGORY_META.map((item) => {
              const profile = SPORT_PROFILES[item.name] || SPORT_PROFILES.Training;
              return `
                <button type="button" class="visual-filter-chip" data-visual-sport="${profile.key}" aria-label="Filter by ${item.name}">
                  <img src="${item.image}" alt="${item.name}" loading="lazy" />
                  <span>${iconMarkup(item.name)}</span>
                  <strong>${item.name}</strong>
                </button>
              `;
            }).join("")}
            <button type="button" class="visual-filter-chip all" data-visual-sport="all" aria-label="Show all sports">
              <span>${iconMarkup("Training")}</span>
              <strong>All</strong>
            </button>
          </div>
        </div>
        <div class="advanced-meta-row">
          <button class="btn btn-ghost btn-small" type="button" id="shopSaveSearch">Save Search</button>
          <div class="advanced-inline-list" id="shopSavedSearches"></div>
        </div>
        <div class="advanced-meta-row">
          <span class="muted">Intent & Location Landing Clusters</span>
          <div class="advanced-inline-list" id="shopSeoLinks"></div>
        </div>
        <div class="advanced-meta-row">
          <span class="muted">Out-of-stock alerts</span>
          <div class="advanced-inline-list" id="shopAlertList"></div>
        </div>
        <div class="advanced-meta-row">
          <span class="muted">Camera / Visual Search</span>
          <input id="shopVisualSearchInput" class="form-control" type="file" accept="image/*" capture="environment">
          <div class="tool-result" id="shopVisualSearchResult">Upload a photo to match similar products.</div>
        </div>
      `;
      toolbar.insertAdjacentElement("afterend", panel);
      const empty = query("#shopEmpty");
      if (empty) {
        empty.insertAdjacentHTML(
          "afterend",
          `
            <div id="shopBundleLane"></div>
            <div id="shopRecommendationLane"></div>
            <div id="shopPagination" class="shop-pagination"></div>
            <div id="shopInfiniteSentinel" class="shop-infinite-sentinel hidden">Loading more products…</div>
          `
        );
      }
    }

    const categoryChipWrap = query("#shopCategoryChips");
    if (categoryChipWrap && !categoryChipWrap.dataset.bound) {
      const categories = Array.from(new Set(PRODUCTS.map((item) => item.category))).sort();
      categoryChipWrap.innerHTML = categories
        .map((category) => `<button type="button" class="chip" data-category-chip="${category}">${category}</button>`)
        .join("");
      categoryChipWrap.dataset.bound = "1";
      categoryChipWrap.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category-chip]");
        if (!button) return;
        const category = button.dataset.categoryChip || "";
        const exists = shopState.categories.includes(category);
        shopState.categories = exists
          ? shopState.categories.filter((item) => item !== category)
          : [...shopState.categories, category];
        shopState.page = 1;
        renderShopResults();
      });
    }

    const visualWrap = query("#shopVisualFilterGrid");
    if (visualWrap && !visualWrap.dataset.bound) {
      visualWrap.dataset.bound = "1";
      visualWrap.addEventListener("click", (event) => {
        const button = event.target.closest("[data-visual-sport]");
        if (!button) return;
        shopState.visualSport = button.dataset.visualSport || "all";
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
    }

    queryAll("[data-density]", panel).forEach((button) => {
      button.classList.toggle("active", button.dataset.density === shopState.density);
    });

    renderSavedSearchesUI();
    renderSeoLinksUI();
    renderStockAlertsUI();
    bindRevealAnimations(panel);
  }

  function renderShopResults() {
    const grid = query("#shopGrid");
    const count = query("#shopCount");
    const empty = query("#shopEmpty");
    if (!grid || !count || !empty) return;

    ensureShopEnhancementUI();
    const results = filterAndSortProducts();
    const wishlistSet = new Set(getWishlist());
    const compareSet = new Set(getCompareList());
    const total = results.length;

    let visible = results;
    if (shopState.browseMode === "pagination") {
      const start = (shopState.page - 1) * shopState.pageSize;
      visible = results.slice(start, start + shopState.pageSize);
    } else {
      visible = results.slice(0, shopState.visibleCount);
    }

    count.textContent =
      shopState.browseMode === "infinite"
        ? `${visible.length} of ${total} products`
        : `${total} products found`;

    if (!total) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      renderShopDynamicLanes([]);
      renderShopPagination(0);
      bindShopInfiniteScroll(0, renderShopResults);
      return;
    }

    empty.classList.add("hidden");
    grid.classList.remove("grid-compact", "grid-detail");
    if (shopState.density === "compact") grid.classList.add("grid-compact");
    if (shopState.density === "detail") grid.classList.add("grid-detail");
    grid.innerHTML = visible.map((product) => cardTemplate(product, wishlistSet, compareSet)).join("");
    bindRevealAnimations(grid);
    renderShopDynamicLanes(visible);
    renderShopPagination(total);
    bindShopInfiniteScroll(total, renderShopResults);
    renderCompareDock();

    queryAll("[data-category-chip]").forEach((chip) => {
      const category = chip.dataset.categoryChip || "";
      chip.classList.toggle("active", shopState.categories.includes(category));
    });
    queryAll("[data-visual-sport]").forEach((chip) => {
      const key = chip.dataset.visualSport || "all";
      chip.classList.toggle("active", key === shopState.visualSport);
    });
  }

  function initShopPage() {
    const searchInput = query("#shopSearch");
    const categorySelect = query("#shopCategory");
    const sortSelect = query("#shopSort");
    const rangeInput = query("#shopMaxPrice");
    const rangeOutput = query("#shopMaxPriceOutput");
    const clearButton = query("#shopClear");

    populateShopFilters();
    ensureShopEnhancementUI();

    const initialParams = new URLSearchParams(window.location.search);
    const urlQuery = String(initialParams.get("q") || "").trim();
    if (urlQuery) {
      shopState.term = urlQuery;
      if (searchInput) searchInput.value = urlQuery;
    }
    const urlIntent = String(initialParams.get("intent") || "").trim();
    if (urlIntent) {
      shopState.intent = urlIntent;
    }

    function updateRangeOutput() {
      if (!rangeOutput) return;
      rangeOutput.textContent = formatCurrency(shopState.maxPrice);
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        shopState.term = searchInput.value;
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        shopState.category = categorySelect.value;
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        shopState.sort = sortSelect.value;
        shopState.page = 1;
        renderShopResults();
      });
    }

    if (rangeInput) {
      rangeInput.addEventListener("input", () => {
        shopState.maxPrice = Number(rangeInput.value || "260");
        updateRangeOutput();
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
      shopState.maxPrice = Number(rangeInput.value || "260");
    }

    const useCaseSelect = query("#shopUseCase");
    const playStyleSelect = query("#shopPlayStyle");
    const browseModeSelect = query("#shopBrowseMode");
    const saveSearchButton = query("#shopSaveSearch");
    const visualSearchInput = query("#shopVisualSearchInput");
    const visualSearchResult = query("#shopVisualSearchResult");

    if (useCaseSelect) {
      useCaseSelect.value = shopState.useCase;
      useCaseSelect.addEventListener("change", () => {
        shopState.useCase = useCaseSelect.value;
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
    }

    if (playStyleSelect) {
      playStyleSelect.value = shopState.playStyle;
      playStyleSelect.addEventListener("change", () => {
        shopState.playStyle = playStyleSelect.value;
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
    }

    if (browseModeSelect) {
      browseModeSelect.value = shopState.browseMode;
      browseModeSelect.addEventListener("change", () => {
        shopState.browseMode = browseModeSelect.value === "infinite" ? "infinite" : "pagination";
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        renderShopResults();
      });
    }

    queryAll("[data-density]").forEach((button) => {
      button.addEventListener("click", () => {
        shopState.density = button.dataset.density || "standard";
        renderShopResults();
      });
    });

    if (saveSearchButton) {
      saveSearchButton.addEventListener("click", () => {
        const term = shopState.term.trim();
        if (!term) {
          showToast("Saved Search", "Type a search term first.", "warn");
          return;
        }
        saveSearchTerm(term);
        renderSavedSearchesUI();
        showToast("Saved Search", `Saved "${term}" for quick access.`, "success");
      });
    }

    if (visualSearchInput && visualSearchResult) {
      visualSearchInput.addEventListener("change", () => {
        const file = visualSearchInput.files && visualSearchInput.files[0];
        if (!file) return;
        const name = file.name.toLowerCase();
        const matched =
          searchMatches(name, 3).length > 0
            ? searchMatches(name, 3)
            : getTrendingProducts(3);
        const names = matched.map((item) => item.name).join(", ");
        visualSearchResult.textContent = `Visual search matched: ${names}.`;
        if (matched[0]) {
          shopState.term = matched[0].category;
          if (searchInput) searchInput.value = matched[0].category;
          renderShopResults();
        }
      });
    }

    const advancedPanel = query("#shopAdvancedPanel");
    if (advancedPanel && !advancedPanel.dataset.actionsBound) {
      advancedPanel.dataset.actionsBound = "1";
      advancedPanel.addEventListener("click", (event) => {
        const loadButton = event.target.closest("[data-load-search]");
        if (loadButton) {
          const term = loadButton.dataset.loadSearch || "";
          shopState.term = term;
          shopState.page = 1;
          shopState.visibleCount = shopState.pageSize;
          if (searchInput) searchInput.value = term;
          renderShopResults();
          return;
        }
        const openProduct = event.target.closest("[data-open-product]");
        if (openProduct) {
          const id = openProduct.dataset.openProduct || "";
          if (!id) return;
          window.location.href = `product.html?id=${encodeURIComponent(id)}`;
          return;
        }
        const pageButton = event.target.closest("[data-shop-page]");
        if (pageButton) {
          if (pageButton.dataset.shopPage === "prev") {
            shopState.page = Math.max(1, shopState.page - 1);
          } else {
            shopState.page += 1;
          }
          renderShopResults();
        }
      });
    }

    const paginationWrap = query("#shopPagination");
    if (paginationWrap && !paginationWrap.dataset.bound) {
      paginationWrap.dataset.bound = "1";
      paginationWrap.addEventListener("click", (event) => {
        const pageButton = event.target.closest("[data-shop-page]");
        if (!pageButton) return;
        if (pageButton.dataset.shopPage === "prev") {
          shopState.page = Math.max(1, shopState.page - 1);
        } else {
          shopState.page += 1;
        }
        renderShopResults();
      });
    }

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        shopState.term = "";
        shopState.category = "all";
        shopState.categories = [];
        shopState.useCase = "all";
        shopState.playStyle = "all";
        shopState.visualSport = "all";
        shopState.sort = "popular";
        shopState.maxPrice = 260;
        shopState.density = "standard";
        shopState.browseMode = "pagination";
        shopState.page = 1;
        shopState.visibleCount = shopState.pageSize;
        shopState.intent = "";

        if (searchInput) searchInput.value = "";
        if (categorySelect) categorySelect.value = "all";
        if (sortSelect) sortSelect.value = "popular";
        if (rangeInput) rangeInput.value = "260";
        if (useCaseSelect) useCaseSelect.value = "all";
        if (playStyleSelect) playStyleSelect.value = "all";
        if (browseModeSelect) browseModeSelect.value = "pagination";

        window.history.replaceState({}, "", "shop.html");

        updateRangeOutput();
        renderShopResults();
      });
    }

    updateRangeOutput();
    renderShopResults();
  }

  function productGalleryTemplate(product) {
    return `
      <div class="gallery-card reveal">
        <div class="gallery-main zoom-ready" id="productMainImageWrap">
          <img src="${product.gallery[0]}" alt="${product.name}" id="productMainImage" data-zoomable-image>
          <span class="zoom-hint">Hover to zoom</span>
          <span class="sport-pill ${product.sportKey}">${product.category}</span>
        </div>
        <div class="gallery-control-row">
          <label class="filter-label" for="product360Range">360 Preview</label>
          <input id="product360Range" type="range" min="0" max="${Math.max(0, product.gallery.length - 1)}" value="0" />
          <p class="muted">Slide to rotate through angles and details.</p>
        </div>
        <div class="gallery-thumbs" id="productThumbs">
          ${product.gallery
            .map(
              (src, index) => `
              <button class="gallery-thumb ${index === 0 ? "active" : ""}" data-gallery-src="${src}" type="button" aria-label="View image ${
                index + 1
              }">
                <img src="${src}" alt="${product.name} image ${index + 1}" loading="lazy">
              </button>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function productPanelTemplate(product, inWishlist) {
    return `
      <div class="panel-card product-panel reveal">
        <p class="product-category">${product.category}</p>
        <h2>${product.name}</h2>
        <div class="product-rating">${buildStars(product.rating)} ${product.rating} (${product.reviews} reviews)</div>
        <p class="product-copy">${product.description}</p>
        <p class="skill-pill">${product.skillLevel}</p>
        <div class="product-price-row">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <span class="product-old-price">${formatCurrency(product.oldPrice)}</span>
        </div>
        <ul class="product-highlights">
          ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        <div class="info-grid">
          <article class="info-card">
            <p class="label">Availability</p>
            <p class="value">${product.stock} units ready (${product.stockStatus})</p>
          </article>
          <article class="info-card">
            <p class="label">Shipping</p>
            <p class="value">ETA ${product.etaDays} • Free over ${formatCurrency(
      STORE_CONFIG.freeShippingThreshold
    )}</p>
          </article>
          <article class="info-card">
            <p class="label">Returns</p>
            <p class="value">30-day easy returns</p>
          </article>
        </div>
        <div class="qty-row">
          <button class="qty-button" type="button" data-qty-step="-1" aria-label="Decrease quantity">-</button>
          <input id="productQty" class="qty-input" type="number" min="1" max="20" value="1">
          <button class="qty-button" type="button" data-qty-step="1" aria-label="Increase quantity">+</button>
        </div>
        <div class="detail-actions">
          <button class="btn btn-primary" data-product-add-main="${product.id}">Add to Cart</button>
          <button class="btn btn-secondary ${inWishlist ? "active" : ""}" data-wishlist-toggle="${product.id}">
            ${inWishlist ? "Saved" : "Save"}
          </button>
          <button class="btn btn-ghost" data-preorder-toggle="${product.id}" type="button">Preorder / Restock</button>
        </div>
        <div class="variant-row">
          <label>
            <span>Size</span>
            <select class="variant-select" data-variant-size="${product.id}">
              ${product.variants.size.map((size) => `<option value="${size}">${size}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Color</span>
            <select class="variant-select" data-variant-color="${product.id}">
              ${product.variants.color.map((color) => `<option value="${color}">${color}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Pack</span>
            <select class="variant-select" data-variant-pack="${product.id}">
              ${product.variants.pack.map((pack) => `<option value="${pack}">${pack}</option>`).join("")}
            </select>
          </label>
        </div>
        <details class="spec-accordion" open>
          <summary>Specifications & Durability</summary>
          <table class="spec-table">
            <tbody>
              <tr><th>Use Case</th><td>${product.useCase}</td></tr>
              <tr><th>Play Style</th><td>${product.playStyle}</td></tr>
              <tr><th>Surface</th><td>${product.surface}</td></tr>
              <tr><th>Intensity</th><td>${product.intensity}</td></tr>
              <tr><th>Materials</th><td>${product.materials.join(", ")}</td></tr>
            </tbody>
          </table>
        </details>
        <details class="spec-accordion">
          <summary>Compatibility Matrix</summary>
          <div class="compat-grid">
            ${(product.bundleIds || [])
              .map((id) => findProduct(id))
              .filter(Boolean)
              .map(
                (item) => `
                  <a class="chip" href="product.html?id=${encodeURIComponent(item.id)}">${item.name}</a>
                `
              )
              .join("")}
          </div>
        </details>
        <details class="spec-accordion">
          <summary>Coach Tips & Training Guide</summary>
          <ul class="product-highlights">
            ${product.trainingGuide.map((item) => `<li>${item}</li>`).join("")}
            ${product.coachTips.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </details>
        <div class="cert-grid">
          ${product.certifications.map((cert) => `<span class="chip">${cert}</span>`).join("")}
        </div>
        <form class="tool-form compact" data-fit-form>
          <p class="section-kicker">Fit & Sizing Assistant</p>
          <label>Height (cm)<input type="number" name="height" class="form-control" min="120" max="230" value="175"></label>
          <label>Play Intensity
            <select name="intensity" class="form-control">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <button type="submit" class="btn btn-secondary btn-small">Get Fit Recommendation</button>
          <div class="tool-result" id="fitAssistantResult">Personalized fit guidance appears here.</div>
        </form>
        <form class="tool-form compact" data-restock-form>
          <p class="section-kicker">Restock & Preorder</p>
          <label>Email<input type="email" name="email" class="form-control" placeholder="you@domain.com" required></label>
          <button class="btn btn-ghost btn-small" type="submit">Notify Me</button>
          <div class="tool-result" id="restockResult">Join to receive restock and preorder updates.</div>
        </form>
      </div>
    `;
  }

  function productExperienceTemplate(product) {
    const comparisonPool = PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 3);
    return `
      <div class="panel-card product-extra reveal">
        <p class="section-kicker">Video Demo</p>
        <div class="video-frame">
          <iframe src="${product.demoVideo}" title="${product.name} demo video" loading="lazy" allowfullscreen></iframe>
        </div>
        <p class="section-kicker" style="margin-top:0.8rem">Performance Comparison</p>
        <div class="perf-chart">
          ${[product, ...comparisonPool]
            .slice(0, 4)
            .map((item) => {
              const value = Math.round((item.rating / 5) * 100);
              return `
                <div class="perf-row">
                  <span>${item.name}</span>
                  <div class="perf-track"><i style="width:${value}%"></i></div>
                  <strong>${value}</strong>
                </div>
              `;
            })
            .join("")}
        </div>
        <p class="section-kicker" style="margin-top:0.8rem">How To Train With This Gear</p>
        <div class="stack-grid">
          ${product.trainingGuide.map((item) => `<article class="experience-card"><p>${item}</p></article>`).join("")}
        </div>
        <div class="tool-form compact">
          <p class="section-kicker">AR Preview</p>
          <button class="btn btn-ghost btn-small" type="button" data-ar-preview="${product.id}">Launch AR Try-Preview</button>
          <div class="tool-result" id="arPreviewResult">Use camera-enabled preview to visualize product placement.</div>
        </div>
        <form class="tool-form compact" data-review-form>
          <p class="section-kicker">Verified Buyer Reviews</p>
          <label>Name<input name="name" class="form-control" required></label>
          <label>Rating
            <select name="rating" class="form-control">
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Great</option>
              <option value="3">3 - Good</option>
            </select>
          </label>
          <label>Review<textarea name="message" class="form-control" rows="3" required></textarea></label>
          <label>Photo / Video<input type="file" name="media" class="form-control" accept="image/*,video/*"></label>
          <button class="btn btn-primary btn-small" type="submit">Submit Review</button>
          <div class="tool-result" id="reviewSubmitResult">Share your setup and help other athletes choose better gear.</div>
        </form>
        <div id="reviewList" class="review-list"></div>
      </div>
    `;
  }

  function renderProductReviews(product) {
    const list = query("#reviewList");
    if (!list) return;
    const reviews = Array.isArray(getReviews()[product.id]) ? getReviews()[product.id] : [];
    if (!reviews.length) {
      list.innerHTML = `<div class="empty-state">No reviews yet. Be the first verified buyer to post one.</div>`;
      return;
    }
    list.innerHTML = reviews
      .map(
        (review) => `
          <article class="review-card">
            <strong>${review.name}</strong>
            <span class="muted">${buildStars(review.rating)} • ${new Date(review.createdAt).toLocaleDateString()}</span>
            <p>${review.message}</p>
            ${review.mediaName ? `<span class="chip">Media: ${review.mediaName}</span>` : ""}
          </article>
        `
      )
      .join("");
  }

  function bindProductPageInteractions(product) {
    const mainImage = query("#productMainImage");
    const mainWrap = query("#productMainImageWrap");
    const thumbsWrap = query("#productThumbs");
    const qtyInput = query("#productQty");
    const rotateRange = query("#product360Range");
    const fitForm = query("[data-fit-form]");
    const fitResult = query("#fitAssistantResult");
    const restockForm = query("[data-restock-form]");
    const restockResult = query("#restockResult");
    const reviewForm = query("[data-review-form]");
    const reviewResult = query("#reviewSubmitResult");
    const arButton = query("[data-ar-preview]");
    const arResult = query("#arPreviewResult");

    if (thumbsWrap && mainImage) {
      thumbsWrap.addEventListener("click", (event) => {
        const button = event.target.closest("[data-gallery-src]");
        if (!button) return;
        const src = button.dataset.gallerySrc;
        mainImage.src = src;
        queryAll(".gallery-thumb", thumbsWrap).forEach((thumb) => {
          thumb.classList.remove("active");
        });
        button.classList.add("active");
      });
    }

    if (rotateRange && mainImage && thumbsWrap) {
      rotateRange.addEventListener("input", () => {
        const index = Math.max(
          0,
          Math.min(product.gallery.length - 1, Number(rotateRange.value || "0"))
        );
        mainImage.src = product.gallery[index];
        queryAll(".gallery-thumb", thumbsWrap).forEach((thumb, idx) => {
          thumb.classList.toggle("active", idx === index);
        });
      });
    }

    if (mainWrap && mainImage && rotateRange && product.gallery.length > 1) {
      let touchStartX = 0;
      mainWrap.addEventListener(
        "touchstart",
        (event) => {
          const touch = event.changedTouches && event.changedTouches[0];
          if (!touch) return;
          touchStartX = touch.clientX;
        },
        { passive: true }
      );
      mainWrap.addEventListener(
        "touchend",
        (event) => {
          const touch = event.changedTouches && event.changedTouches[0];
          if (!touch) return;
          const deltaX = touch.clientX - touchStartX;
          if (Math.abs(deltaX) < 28) return;
          const current = Number(rotateRange.value || "0");
          const next =
            deltaX < 0
              ? Math.min(product.gallery.length - 1, current + 1)
              : Math.max(0, current - 1);
          if (next === current) return;
          rotateRange.value = String(next);
          mainImage.src = product.gallery[next];
          queryAll(".gallery-thumb", thumbsWrap).forEach((thumb, idx) => {
            thumb.classList.toggle("active", idx === next);
          });
        },
        { passive: true }
      );
    }

    if (mainWrap && mainImage) {
      mainWrap.addEventListener("mousemove", (event) => {
        const rect = mainWrap.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        mainImage.style.transformOrigin = `${x}% ${y}%`;
      });
    }

    queryAll("[data-qty-step]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!qtyInput) return;
        const step = Number(button.dataset.qtyStep || "0");
        const next = Math.max(1, Math.min(20, Number(qtyInput.value || "1") + step));
        qtyInput.value = String(next);
      });
    });

    const addMainButton = query("[data-product-add-main]");
    if (addMainButton) {
      addMainButton.addEventListener("click", () => {
        const quantity = qtyInput ? Number(qtyInput.value || "1") : 1;
        addToCart(product.id, Number.isFinite(quantity) ? Math.max(1, quantity) : 1);
      });
    }

    if (fitForm && fitResult) {
      fitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(fitForm);
        const height = Number(data.get("height") || 175);
        const intensity = String(data.get("intensity") || "medium");
        let size = "M";
        if (height >= 186) size = "L";
        if (height <= 162) size = "S";
        if (intensity === "high" && size !== "L") size = "M";
        fitResult.textContent = `Recommended size: ${size}. Suggested fit profile: ${intensity} intensity / ${product.useCase}.`;
        savePersonalizationState({
          fit: size,
          sport: product.category,
          level: product.useCase,
          profileComplete: true,
        });
      });
    }

    if (restockForm && restockResult) {
      restockForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(restockForm);
        const email = String(formData.get("email") || "").trim();
        if (!email) return;
        const active = toggleStockAlert(product.id);
        if (!active) toggleStockAlert(product.id);
        restockResult.textContent = `Restock + preorder alert enabled for ${email}. You will be notified for ${product.name}.`;
        showToast("Alert Enabled", "Restock notification activated.", "success");
      });
    }

    queryAll("[data-preorder-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        showToast(
          "Preorder Queue",
          `${product.name} added to your preorder interest queue.`,
          "success"
        );
        recordActivity("preorder_interest", { productId: product.id });
      });
    });

    if (reviewForm && reviewResult) {
      reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(reviewForm);
        const name = String(formData.get("name") || "").trim();
        const rating = Number(formData.get("rating") || 5);
        const message = String(formData.get("message") || "").trim();
        const media = formData.get("media");
        if (!name || !message) return;
        saveReview(product.id, {
          name,
          rating: Math.max(1, Math.min(5, rating)),
          message,
          mediaName: media instanceof File && media.name ? media.name : "",
          createdAt: new Date().toISOString(),
          verified: true,
        });
        reviewResult.textContent = "Review submitted. Thanks for contributing to the athlete community.";
        reviewForm.reset();
        renderProductReviews(product);
      });
    }

    if (arButton && arResult) {
      arButton.addEventListener("click", () => {
        arResult.textContent =
          "AR preview initialized: camera feed and floor detection simulated for product placement.";
        recordActivity("ar_preview", { productId: product.id });
        showToast("AR Preview", "AR placement preview is now active (simulation mode).", "success");
      });
    }
  }

  function renderProductPage() {
    const detailWrap = query("#productDetail");
    const relatedWrap = query("#relatedGrid");
    if (!detailWrap) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id") || "";
    const product = findProduct(requestedId) || PRODUCTS[0];

    const wishlistSet = new Set(getWishlist());

    detailWrap.innerHTML = `
      ${productGalleryTemplate(product)}
      ${productPanelTemplate(product, wishlistSet.has(product.id))}
      ${productExperienceTemplate(product)}
    `;
    recordActivity("product_view", { productId: product.id });

    const related = PRODUCTS.filter(
      (item) => item.category === product.category && item.id !== product.id
    ).slice(0, 4);

    if (relatedWrap) {
      const compareSet = new Set(getCompareList());
      relatedWrap.innerHTML = related
        .map((item) => cardTemplate(item, wishlistSet, compareSet))
        .join("");
      bindRevealAnimations(relatedWrap);
    }

    bindProductPageInteractions(product);
    renderProductReviews(product);
    bindRevealAnimations(detailWrap);
  }

  function updateCartQuantity(productId, delta) {
    const cart = getCart();
    const target = cart.find((item) => item.id === productId);
    if (!target) return;

    target.quantity = Math.max(1, Math.min(99, target.quantity + delta));
    saveCart(cart);
    updateBadges();
    renderCartPage();
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((item) => item.id !== productId));
    updateBadges();
    renderCartPage();
  }

  function clearCart() {
    saveCart([]);
    updateBadges();
    renderCartPage();
    showToast("Cart Cleared", "All items were removed from your cart.", "warn");
  }

  function renderCartPage() {
    const cartList = query("#cartList");
    const emptyState = query("#cartEmpty");
    const contentState = query("#cartContent");
    const subtotalNode = query("#summarySubtotal");
    const shippingNode = query("#summaryShipping");
    const discountNode = query("#summaryDiscount");
    const taxNode = query("#summaryTax");
    const totalNode = query("#summaryTotal");
    const shippingSelect = query("#shippingSelect");
    const promoInput = query("#promoCode");
    const checkoutButton = query("#checkoutLink");

    if (!cartList || !emptyState || !contentState) return;

    const cart = getCart();
    const shipping = getShippingMode();
    const promo = getPromoCode();

    if (shippingSelect) shippingSelect.value = shipping;
    if (promoInput) promoInput.value = promo;

    if (!cart.length) {
      emptyState.classList.remove("hidden");
      contentState.classList.add("hidden");
      if (subtotalNode) subtotalNode.textContent = formatCurrency(0);
      if (shippingNode) shippingNode.textContent = formatCurrency(0);
      if (discountNode) discountNode.textContent = formatCurrency(0);
      if (taxNode) taxNode.textContent = formatCurrency(0);
      if (totalNode) totalNode.textContent = formatCurrency(0);
      if (checkoutButton) checkoutButton.classList.add("hidden");
      renderCartDrawer();
      renderCartSmartModules([], { subtotal: 0, total: 0 });
      return;
    }

    emptyState.classList.add("hidden");
    contentState.classList.remove("hidden");
    if (checkoutButton) checkoutButton.classList.remove("hidden");

    cartList.innerHTML = cart
      .map((line) => {
        const product = findProduct(line.id);
        if (!product) return "";

        return `
          <article class="cart-item reveal">
            <div class="cart-item-media">
              <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div>
              <h3 class="cart-item-title">${product.name}</h3>
              <p class="cart-item-meta">${product.category} • ${buildStars(product.rating)} ${
          product.rating
        }</p>
              <p class="cart-item-meta">Unit Price: ${formatCurrency(product.price)}</p>
              <div class="cart-item-controls">
                <button class="qty-button" data-cart-action="decrement" data-product-id="${
                  product.id
                }" aria-label="Decrease quantity">-</button>
                <span>${line.quantity}</span>
                <button class="qty-button" data-cart-action="increment" data-product-id="${
                  product.id
                }" aria-label="Increase quantity">+</button>
                <button class="btn btn-ghost btn-small" data-cart-action="remove" data-product-id="${
                  product.id
                }">Remove</button>
              </div>
            </div>
            <div>
              <p class="product-price">${formatCurrency(lineSubtotal(line))}</p>
            </div>
          </article>
        `;
      })
      .join("");

    const totals = cartTotals(cart, shipping, promo);

    if (subtotalNode) subtotalNode.textContent = formatCurrency(totals.subtotal);
    if (shippingNode) shippingNode.textContent = formatCurrency(totals.shipping);
    if (discountNode)
      discountNode.textContent = totals.discount
        ? `-${formatCurrency(totals.discount)}`
        : formatCurrency(0);
    if (taxNode) taxNode.textContent = formatCurrency(totals.tax);
    if (totalNode) totalNode.textContent = formatCurrency(totals.total);
    renderCartDrawer();
    renderCartSmartModules(cart, totals);

    bindRevealAnimations(cartList);
  }

  function renderCartSmartModules(cart, totals) {
    let wrap = query("#cartSmartModules");
    const summary = query(".cart-summary");
    if (!summary) return;
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "cartSmartModules";
      wrap.className = "cart-smart-modules";
      summary.appendChild(wrap);
    }

    if (!cart.length) {
      wrap.innerHTML = "";
      return;
    }

    const suggestionIds = Array.from(
      new Set(
        cart
          .map((line) => findProduct(line.id))
          .filter(Boolean)
          .flatMap((item) => item.bundleIds || [])
      )
    )
      .filter((id) => !cart.some((line) => line.id === id))
      .slice(0, 3);
    const suggestions = suggestionIds.map((id) => findProduct(id)).filter(Boolean);

    wrap.innerHTML = `
      ${cartProgressMarkup(totals)}
      <div class="tool-form compact" id="cartGiftOptions">
        <p class="section-kicker">Gift Options</p>
        <label><input type="checkbox" id="giftWrapToggle"> Add premium gift wrap</label>
        <label><input type="checkbox" id="sendAsGiftToggle"> Send as gift to another address</label>
        <label>Gift note<textarea id="giftNoteInput" class="form-control" rows="2" placeholder="Add a personal note"></textarea></label>
      </div>
      ${
        suggestions.length
          ? `
            <div class="cart-suggest-block">
              <p class="section-kicker">Complete The Kit</p>
              <div class="lane-row">
                ${suggestions
                  .map(
                    (item) => `
                      <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <span>${item.name}</span>
                      </button>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }
    `;
  }

  function initCartPage() {
    const cartList = query("#cartList");
    const clearButton = query("#clearCartButton");
    const shippingSelect = query("#shippingSelect");
    const promoInput = query("#promoCode");
    const promoApply = query("#promoApply");

    if (cartList) {
      cartList.addEventListener("click", (event) => {
        const actionButton = event.target.closest("[data-cart-action]");
        if (!actionButton) return;
        const action = actionButton.dataset.cartAction;
        const productId = actionButton.dataset.productId || "";

        if (action === "increment") updateCartQuantity(productId, 1);
        if (action === "decrement") updateCartQuantity(productId, -1);
        if (action === "remove") removeFromCart(productId);
      });
    }

    if (clearButton) {
      clearButton.addEventListener("click", clearCart);
    }

    if (shippingSelect) {
      shippingSelect.addEventListener("change", () => {
        setShippingMode(shippingSelect.value);
        renderCartPage();
      });
    }

    if (promoApply && promoInput) {
      promoApply.addEventListener("click", () => {
        const codes = parsePromoCodes(promoInput.value);
        if (!codes.length) {
          showToast("Promo Code", "Enter a promo code first.", "warn");
          return;
        }

        const validCodes = ["PLAYPRO10", "FREESHIP", "VIP5", "BUNDLE12"];
        const activeCodes = codes.filter((code) => validCodes.includes(code));
        if (!activeCodes.length) {
          setPromoCode("");
          showToast(
            "Invalid Code",
            "Active promo codes: PLAYPRO10, FREESHIP, VIP5, BUNDLE12.",
            "error"
          );
          renderCartPage();
          return;
        } else {
          setPromoCode(activeCodes);
          showToast("Promo Applied", `${activeCodes.join(", ")} applied.`, "success");
        }

        renderCartPage();
      });
    }

    renderCartPage();
  }

  function renderCheckoutSummary() {
    const wrap = query("#checkoutSummary");
    const empty = query("#checkoutEmpty");
    const form = query("#checkoutForm");

    if (!wrap || !empty || !form) return;

    const cart = getCart();
    if (!cart.length) {
      empty.classList.remove("hidden");
      wrap.classList.add("hidden");
      form.classList.add("hidden");
      return;
    }

    empty.classList.add("hidden");
    wrap.classList.remove("hidden");
    form.classList.remove("hidden");

    const totals = cartTotals(cart, getShippingMode(), getPromoCode());

    wrap.innerHTML = `
      <h3 class="summary-title">Order Snapshot</h3>
      ${cart
        .map((line) => {
          const product = findProduct(line.id);
          if (!product) return "";
          return `
            <div class="summary-row">
              <span>${product.name} x ${line.quantity}</span>
              <span>${formatCurrency(lineSubtotal(line))}</span>
            </div>
          `;
        })
        .join("")}
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatCurrency(totals.subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${formatCurrency(totals.shipping)}</span>
      </div>
      <div class="summary-row">
        <span>Savings</span>
        <span>-${formatCurrency(totals.discount)}</span>
      </div>
      ${
        totals.promoCodes && totals.promoCodes.length
          ? `<p class="muted">Active promos: ${totals.promoCodes.join(", ")}</p>`
          : ""
      }
      <div class="summary-row total">
        <span>Final Total</span>
        <span>${formatCurrency(totals.total)}</span>
      </div>
      <p class="summary-note">Includes taxes, selected shipping mode, and loyalty pricing adjustments.</p>
    `;
  }

  function createOrderRecord(customer = {}) {
    const cart = getCart();
    const totals = cartTotals(cart, getShippingMode(), getPromoCode());
    const orderId = `PP-${Date.now().toString().slice(-7)}`;

    const record = {
      id: orderId,
      createdAt: new Date().toISOString(),
      total: totals.total,
      items: cart,
      customerEmail: normalizeEmail(customer.email),
      customerName: String(customer.name || "").trim(),
    };

    const existingOrders = readStorage(STORAGE_KEYS.orders, []);
    writeStorage(STORAGE_KEYS.orders, [record, ...existingOrders]);

    return orderId;
  }

  function initCheckoutPage() {
    const form = query("#checkoutForm");
    const success = query("#checkoutSuccess");
    if (!form || !success) {
      renderCheckoutSummary();
      return;
    }

    let assistWrap = query("#checkoutAssist");
    if (!assistWrap) {
      assistWrap = document.createElement("div");
      assistWrap.id = "checkoutAssist";
      assistWrap.className = "checkout-assist";
      form.insertAdjacentElement("afterbegin", assistWrap);
    }
    assistWrap.innerHTML = `
      <div class="express-checkout-row">
        <button type="button" class="chip" data-express="apple">Apple Pay</button>
        <button type="button" class="chip" data-express="google">Google Pay</button>
        <button type="button" class="chip" data-express="paypal">PayPal</button>
      </div>
      <div class="address-autocomplete">
        <label class="filter-label" for="checkoutAddressSuggest">Address Quick Fill</label>
        <input id="checkoutAddressSuggest" class="form-control" list="addressSuggestions" placeholder="Start typing address">
        <datalist id="addressSuggestions">
          <option value="22 Madison Ave, New York, NY 10010"></option>
          <option value="845 Market St, San Francisco, CA 94103"></option>
          <option value="1600 Pennsylvania Ave NW, Washington, DC 20500"></option>
          <option value="401 Lakeshore Dr, Chicago, IL 60611"></option>
        </datalist>
        <button type="button" class="btn btn-ghost btn-small" id="estimateShippingButton">Estimate Shipping ETA</button>
        <div class="tool-result" id="shippingEstimateResult">Pre-check delivery estimate before placing your order.</div>
      </div>
    `;

    const draft = readStorage(STORAGE_KEYS.checkoutDraft, {});
    queryAll("input, select, textarea", form).forEach((field) => {
      const key = field.id || field.name;
      if (!key) return;
      if (Object.prototype.hasOwnProperty.call(draft, key) && draft[key] !== undefined) {
        if (field.type === "checkbox") {
          field.checked = Boolean(draft[key]);
        } else {
          field.value = String(draft[key]);
        }
      }
      field.addEventListener("input", () => {
        const nextDraft = readStorage(STORAGE_KEYS.checkoutDraft, {});
        nextDraft[key] = field.type === "checkbox" ? field.checked : field.value;
        writeStorage(STORAGE_KEYS.checkoutDraft, nextDraft);
      });
      field.addEventListener("change", () => {
        const nextDraft = readStorage(STORAGE_KEYS.checkoutDraft, {});
        nextDraft[key] = field.type === "checkbox" ? field.checked : field.value;
        writeStorage(STORAGE_KEYS.checkoutDraft, nextDraft);
      });
    });

    assistWrap.addEventListener("click", (event) => {
      const express = event.target.closest("[data-express]");
      if (express) {
        const provider = express.dataset.express || "";
        showToast("Express Checkout", `${provider.toUpperCase()} flow simulated for this build.`, "success");
        return;
      }
      if (event.target.id === "estimateShippingButton") {
        const addressField = query("#checkoutAddress", form);
        const cityField = query("#checkoutCity", form);
        const result = query("#shippingEstimateResult");
        const address = String(addressField ? addressField.value : "").trim();
        const city = String(cityField ? cityField.value : "").trim();
        if (!result) return;
        if (!address || !city) {
          result.textContent = "Enter address and city to estimate shipping.";
          return;
        }
        result.textContent = `Estimated delivery to ${city}: 2-4 business days (express: 1-2 business days).`;
      }
    });

    const suggestionInput = query("#checkoutAddressSuggest");
    if (suggestionInput) {
      suggestionInput.addEventListener("change", () => {
        const value = String(suggestionInput.value || "").trim();
        const addressField = query("#checkoutAddress", form);
        if (addressField && value) addressField.value = value;
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = queryAll("[required]", form);
      const invalid = requiredFields.filter((field) => !String(field.value || "").trim());

      if (invalid.length) {
        showToast("Missing Details", "Please complete all required checkout fields.", "error");
        invalid[0].focus();
        return;
      }

      const emailInput = query("#checkoutEmail", form);
      const emailValue = String(emailInput ? emailInput.value : "").trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        showToast("Invalid Email", "Please enter a valid email address.", "error");
        if (emailInput) emailInput.focus();
        return;
      }

      const orderId = createOrderRecord({
        email: emailValue,
        name: String(query("#checkoutName", form)?.value || "").trim(),
      });
      recordActivity("purchase", { orderId, value: cartTotals(getCart(), getShippingMode(), getPromoCode()).total });

      saveCart([]);
      setPromoCode("");
      updateBadges();
      renderCheckoutSummary();

      success.classList.remove("hidden");
      success.innerHTML = `
        <strong>Order ${orderId} confirmed.</strong>
        <p>Your order is now processing. A confirmation has been sent to ${emailValue}.</p>
        <div class="post-purchase-upsell">
          <p class="section-kicker">Add Before Shipment</p>
          <div class="lane-row">
            ${getTrendingProducts(3)
              .map(
                (item) => `
                  <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <span>${item.name}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      `;

      form.reset();
      writeStorage(STORAGE_KEYS.checkoutDraft, {});
      showToast("Order Confirmed", `Your order ${orderId} is confirmed.`, "success");
      success.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    renderCheckoutSummary();
  }

  function renderWishlistPage() {
    const grid = query("#wishlistGrid");
    const empty = query("#wishlistEmpty");
    if (!grid || !empty) return;

    const wishlistIds = getWishlist();
    const products = wishlistIds.map((id) => findProduct(id)).filter(Boolean);

    if (!products.length) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      const shareWrap = query("#wishlistShare");
      if (shareWrap) shareWrap.remove();
      return;
    }

    empty.classList.add("hidden");
    const wishlistSet = new Set(wishlistIds);
    const compareSet = new Set(getCompareList());
    grid.innerHTML = products.map((product) => cardTemplate(product, wishlistSet, compareSet)).join("");
    let shareWrap = query("#wishlistShare");
    if (!shareWrap) {
      shareWrap = document.createElement("div");
      shareWrap.id = "wishlistShare";
      shareWrap.className = "lane-card";
      grid.insertAdjacentElement("afterend", shareWrap);
    }
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encodeURIComponent(
      wishlistIds.join(",")
    )}`;
    shareWrap.innerHTML = `
      <p class="section-kicker">Public Wishlist</p>
      <p class="muted">Share your kit board with teams, coaches, or friends.</p>
      <div class="promo-row">
        <input type="text" value="${shareUrl}" readonly id="wishlistShareUrl">
        <button class="btn btn-secondary btn-small" type="button" id="wishlistShareCopy">Copy</button>
      </div>
    `;
    const copyButton = query("#wishlistShareCopy");
    const shareInput = query("#wishlistShareUrl");
    if (copyButton && shareInput) {
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(shareInput.value);
          showToast("Wishlist Link", "Share link copied to clipboard.", "success");
        } catch {
          shareInput.select();
          document.execCommand("copy");
          showToast("Wishlist Link", "Share link copied.", "success");
        }
      });
    }
    bindRevealAnimations(grid);
  }

  function initLoginPage() {
    if (page !== "login" && !isPageFile("login.html")) return;
    const form = query("#loginForm");
    const result = query("#loginResult");
    const demoButton = query("#loginDemoButton");
    if (!form || !result) return;

    const existing = getCurrentUser();
    if (existing) {
      result.textContent = `Signed in as ${existing.name}. Redirecting to profile...`;
      window.setTimeout(() => {
        window.location.href = "profile.html";
      }, 700);
      return;
    }

    if (demoButton) {
      demoButton.addEventListener("click", () => {
        const email = query("#loginEmail", form);
        const password = query("#loginPassword", form);
        if (email) email.value = "demo@playpro.com";
        if (password) password.value = "demo1234";
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "");
      const remember = data.get("remember") === "on";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        result.textContent = "Enter a valid email address.";
        showToast("Login", "Enter a valid email address.", "error");
        return;
      }
      if (password.length < 6) {
        result.textContent = "Password must be at least 6 characters.";
        showToast("Login", "Password must be at least 6 characters.", "error");
        return;
      }

      const login = authenticateUser(email, password);
      if (!login.ok) {
        result.textContent = login.message;
        showToast("Login Failed", login.message, "error");
        return;
      }

      if (remember) {
        setAuthSession({
          loggedIn: true,
          email: login.user.email,
          name: login.user.name,
          signedInAt: new Date().toISOString(),
          remember: true,
        });
      }
      initAuthNavEntry();
      result.textContent = `Welcome back, ${login.user.name}. Redirecting...`;
      showToast("Login Successful", `Signed in as ${login.user.name}.`, "success");
      window.setTimeout(() => {
        window.location.href = "profile.html";
      }, 700);
    });
  }

  function initSignupPage() {
    if (page !== "signup" && !isPageFile("signup.html")) return;
    const form = query("#signupForm");
    const result = query("#signupResult");
    if (!form || !result) return;

    const existing = getCurrentUser();
    if (existing) {
      result.textContent = `You are already signed in as ${existing.name}.`;
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const password = String(data.get("password") || "");
      const confirm = String(data.get("confirmPassword") || "");
      const sport = String(data.get("sport") || "Football");
      const goal = String(data.get("goal") || "Beginner");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name) {
        result.textContent = "Enter your full name.";
        return;
      }
      if (!emailRegex.test(email)) {
        result.textContent = "Enter a valid email address.";
        return;
      }
      if (password.length < 6) {
        result.textContent = "Password must be at least 6 characters.";
        return;
      }
      if (password !== confirm) {
        result.textContent = "Passwords do not match.";
        return;
      }

      const created = registerAuthUser({
        name,
        email,
        password,
        sport,
        goal,
      });
      if (!created.ok) {
        result.textContent = created.message;
        showToast("Sign Up Failed", created.message, "error");
        return;
      }

      initAuthNavEntry();
      result.textContent = `Account created for ${created.user.name}. Redirecting to profile...`;
      showToast("Account Created", "Welcome to PlayPro.", "success");
      window.setTimeout(() => {
        window.location.href = "profile.html";
      }, 850);
    });
  }

  function renderProfileOrders(user) {
    const wrap = query("#profileOrders");
    if (!wrap) return;
    const allOrders = readStorage(STORAGE_KEYS.orders, []);
    const ownOrders = Array.isArray(allOrders)
      ? allOrders
          .filter(
            (order) =>
              !order ||
              !order.customerEmail ||
              normalizeEmail(order.customerEmail) === normalizeEmail(user.email)
          )
          .slice(0, 6)
      : [];
    if (!ownOrders.length) {
      wrap.innerHTML = `<div class="empty-state">No orders yet. Start with the <a href="shop.html">shop catalog</a>.</div>`;
      return;
    }
    wrap.innerHTML = ownOrders
      .map(
        (order) => `
          <article class="experience-card">
            <h3>${order.id || "Order"}</h3>
            <p>${new Date(order.createdAt || Date.now()).toLocaleDateString()} • ${formatCurrency(
          Number(order.total || 0)
        )}</p>
            <a class="chip" href="track-order.html">Track Order</a>
          </article>
        `
      )
      .join("");
  }

  function initProfilePage() {
    if (page !== "profile" && !isPageFile("profile.html")) return;
    const guest = query("#profileGuest");
    const shell = query("#profileShell");
    const form = query("#profileForm");
    const result = query("#profileResult");
    const logoutButton = query("#profileLogoutButton");
    const loginButton = query("#profileLoginButton");
    const user = getCurrentUser();

    if (loginButton) {
      loginButton.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }

    if (!user) {
      if (guest) guest.classList.remove("hidden");
      if (shell) shell.classList.add("hidden");
      return;
    }

    if (guest) guest.classList.add("hidden");
    if (shell) shell.classList.remove("hidden");

    const nameNode = query("#profileName");
    const emailNode = query("#profileEmail");
    const tierNode = query("#profileTier");
    const wishlistNode = query("#profileWishlistCount");
    const cartNode = query("#profileCartCount");
    const pointsNode = query("#profilePoints");
    if (nameNode) nameNode.textContent = user.name;
    if (emailNode) emailNode.textContent = user.email;
    if (tierNode) tierNode.textContent = getPersonalizationState().tier || "Starter";
    if (wishlistNode) wishlistNode.textContent = String(getWishlistCount());
    if (cartNode) cartNode.textContent = String(getCartCount());
    if (pointsNode) pointsNode.textContent = String(getLoyaltyPoints());

    if (form) {
      const fields = {
        name: query("#profileFieldName", form),
        phone: query("#profileFieldPhone", form),
        sport: query("#profileFieldSport", form),
        goal: query("#profileFieldGoal", form),
        location: query("#profileFieldLocation", form),
      };
      if (fields.name) fields.name.value = user.name || "";
      if (fields.phone) fields.phone.value = user.phone || "";
      if (fields.sport) fields.sport.value = user.sport || "Football";
      if (fields.goal) fields.goal.value = user.goal || "Beginner";
      if (fields.location) fields.location.value = user.location || "US";

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const saved = updateAuthUserProfile({
          name: String(data.get("name") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          sport: String(data.get("sport") || "Football"),
          goal: String(data.get("goal") || "Beginner"),
          location: String(data.get("location") || "US").toUpperCase(),
        });
        if (!saved.ok) {
          if (result) result.textContent = "Unable to save profile. Please log in again.";
          return;
        }
        if (nameNode) nameNode.textContent = saved.user.name;
        if (tierNode) tierNode.textContent = getPersonalizationState().tier || "Starter";
        initAuthNavEntry();
        if (result) result.textContent = "Profile updated successfully.";
        showToast("Profile Updated", "Your account settings were saved.", "success");
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        signOutUser();
        initAuthNavEntry();
        showToast("Logged Out", "You have been signed out.", "warn");
        window.location.href = "login.html";
      });
    }

    renderProfileOrders(user);
  }

  function initAuthPages() {
    initLoginPage();
    initSignupPage();
    initProfilePage();
  }

  function initContactPage() {
    const form = query("#contactForm");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const requiredFields = queryAll("[required]", form);
        const invalid = requiredFields.filter((field) => !String(field.value || "").trim());

        if (invalid.length) {
          showToast("Missing Fields", "Please complete all required form fields.", "error");
          invalid[0].focus();
          return;
        }

        const emailInput = query("#contactEmail", form);
        const emailValue = String(emailInput ? emailInput.value : "").trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
          showToast("Invalid Email", "Please use a valid email address.", "error");
          if (emailInput) emailInput.focus();
          return;
        }

        form.reset();
        showToast("Message Sent", "Our team will get back to you within 24 hours.", "success");
      });
    }

    initFaqAccordions();
  }

  function initFaqAccordions(scope = document) {
    queryAll(".faq-item", scope).forEach((item) => {
      if (item.dataset.boundFaq) return;
      item.dataset.boundFaq = "1";
      const button = query(".faq-question", item);
      if (!button) return;
      button.addEventListener("click", () => {
        item.classList.toggle("open");
      });
    });
  }

  function initNewsletterForms() {
    queryAll("[data-newsletter-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = query("input[type='email']", form);
        const email = String(input ? input.value : "").trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          showToast("Invalid Email", "Please enter a valid email address.", "error");
          if (input) input.focus();
          return;
        }

        if (input) input.value = "";
        showToast("Subscribed", "You are now on the PlayPro insiders list.", "success");
      });
    });
  }

  function initCartRecovery() {
    const cart = getCart();
    const abandonedAt = Number(readStorage(STORAGE_KEYS.cartAbandon, 0));
    const thirtyMinutes = 1000 * 60 * 30;
    if (
      cart.length &&
      abandonedAt > 0 &&
      Date.now() - abandonedAt > thirtyMinutes &&
      page !== "cart" &&
      page !== "checkout"
    ) {
      showToast(
        "Saved Cart Found",
        `You still have ${cart.length} item${cart.length > 1 ? "s" : ""} waiting in your cart.`,
        "warn"
      );
    }

    window.addEventListener("beforeunload", () => {
      if (getCart().length && page !== "checkout") {
        writeStorage(STORAGE_KEYS.cartAbandon, Date.now());
      }
    });
  }

  function initReducedMotionPreference() {
    const saved = readStorage(STORAGE_KEYS.reducedMotion, null);
    const prefersReduced =
      saved === null
        ? typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : Boolean(saved);
    document.body.classList.toggle("reduced-motion", prefersReduced);
  }

  function initMobileBottomNav() {
    if (query("#mobileBottomNav")) return;
    const loggedIn = !!getCurrentUser();
    const nav = document.createElement("nav");
    nav.id = "mobileBottomNav";
    nav.className = "mobile-bottom-nav";
    nav.innerHTML = `
      <a href="shop.html">Shop</a>
      <a href="wishlist.html">Wishlist</a>
      <button type="button" data-mobile-cart>Cart</button>
      <a href="experience.html">X Lab</a>
      <a href="${loggedIn ? "profile.html" : "login.html"}">${loggedIn ? "Profile" : "Login"}</a>
    `;
    document.body.appendChild(nav);
    nav.addEventListener("click", (event) => {
      const cartButton = event.target.closest("[data-mobile-cart]");
      if (!cartButton) return;
      event.preventDefault();
      openCartDrawer();
    });
  }

  function initLoadingScreen() {
    let loader = query("#pageLoader");
    if (!loader) {
      loader = document.createElement("div");
      loader.id = "pageLoader";
      loader.className = "page-loader active";
      loader.innerHTML = `
        <div class="loader-mark">
          <strong><span>Play</span>Pro X</strong>
          <p>Loading athlete-grade experience...</p>
        </div>
      `;
      document.body.appendChild(loader);
    }
    window.requestAnimationFrame(() => {
      window.setTimeout(() => loader.classList.remove("active"), 260);
    });
  }

  function initPageTransitions() {
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest("a[href$='.html'], a[href*='.html?']");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("#")) return;
      if (anchor.dataset.skipLoader === "1") return;
      if (anchor.getAttribute("target") && anchor.getAttribute("target") !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (modified) return;
      const loader = query("#pageLoader");
      if (!loader) return;
      window.setTimeout(() => {
        if (event.defaultPrevented) return;
        if (!document.body.contains(loader)) return;
        loader.classList.add("active");
      }, 0);
    });
  }

  function initSocialProofFeed() {
    if (query("#socialProofFeed")) return;
    const feed = document.createElement("div");
    feed.id = "socialProofFeed";
    feed.className = "social-proof-feed";
    document.body.appendChild(feed);

    const canned = [
      "Athena FC added Velocity Studs Pro to team cart.",
      "City Hoops Lab purchased 12 GripMax Pro Basketball units.",
      "Runner in Austin enabled restock alerts for RacePulse Smart Watch.",
      "Academy buyer unlocked BUNDLE12 savings.",
    ];

    function render() {
      const activity = getActivityLog().slice(0, 4);
      let text = canned[Math.floor(Math.random() * canned.length)];
      if (activity.length) {
        const entry = activity[Math.floor(Math.random() * activity.length)];
        const product = findProduct(entry && entry.payload ? entry.payload.productId : "");
        if (product) {
          text = `${entry.type.replace(/_/g, " ")}: ${product.name}`;
        }
      }
      feed.textContent = text;
    }

    render();
    window.setInterval(render, 6800);
  }

  const COACH_DEFAULT_NEXT_STEP =
    "Recommended next step: set your sport in the home switcher, then browse with Use Case + Play Style filters.";

  const COACH_SPORT_ALIASES = [
    {
      category: "Football",
      patterns: [/\bfootball\b/, /\bfootballer\b/, /\bsoccer\b/, /\bstriker\b/, /\bkeeper\b/, /\bgoalkeeper\b/],
    },
    {
      category: "Basketball",
      patterns: [/\bbasketball\b/, /\bhoop\b/, /\bhoops\b/, /\bpoint guard\b/, /\bshooting guard\b/],
    },
    {
      category: "Running",
      patterns: [/\brunning\b/, /\brunner\b/, /\bmarathon\b/, /\bjog\b/, /\bjogger\b/, /\bsprint\b/],
    },
    {
      category: "Cricket",
      patterns: [/\bcricket\b/, /\bbatsman\b/, /\bbatting\b/, /\bbowling\b/, /\bspinner\b/, /\bfast bowler\b/],
    },
    {
      category: "Training",
      patterns: [/\btraining\b/, /\bgym\b/, /\bstrength\b/, /\bworkout\b/, /\bconditioning\b/],
    },
    {
      category: "Recovery",
      patterns: [/\brecovery\b/, /\brehab\b/, /\bphysio\b/, /\bmobility\b/, /\bsoreness\b/],
    },
  ];

  const COACH_GOAL_HINTS = [
    { goal: "speed", patterns: [/\bspeed\b/, /\bfaster\b/, /\bquick\b/, /\bacceleration\b/, /\bexplosive\b/] },
    { goal: "control", patterns: [/\bcontrol\b/, /\btouch\b/, /\bdribble\b/, /\btechnique\b/, /\bprecision\b/] },
    { goal: "power", patterns: [/\bpower\b/, /\bstrength\b/, /\bstrong\b/, /\bshot power\b/, /\bjump\b/] },
    { goal: "endurance", patterns: [/\bendurance\b/, /\bstamina\b/, /\bdistance\b/, /\blong run\b/] },
    { goal: "recovery", patterns: [/\brecovery\b/, /\brehab\b/, /\binjury\b/, /\bsoreness\b/, /\bmuscle\b/] },
    { goal: "academy", patterns: [/\bacademy\b/, /\bschool\b/, /\bteam training\b/, /\bclub training\b/] },
    { goal: "pro", patterns: [/\bpro\b/, /\bprofessional\b/, /\bmatch\b/, /\btournament\b/, /\bcompetition\b/] },
    { goal: "beginner", patterns: [/\bbeginner\b/, /\bnew\b/, /\bstarting\b/, /\bjust started\b/] },
    { goal: "indoor", patterns: [/\bindoor\b/, /\bcourt\b/] },
    { goal: "outdoor", patterns: [/\boutdoor\b/, /\bfield\b/, /\bturf\b/] },
  ];

  const COACH_GOAL_FILTERS = {
    speed: { playStyle: "Speed" },
    control: { playStyle: "Control" },
    power: { playStyle: "Power" },
    endurance: { playStyle: "Endurance" },
    recovery: { playStyle: "Recovery" },
    academy: { useCase: "Academy" },
    pro: { useCase: "Pro-Level" },
    beginner: { useCase: "Beginner" },
    indoor: { useCase: "Indoor" },
    outdoor: { useCase: "Outdoor" },
  };

  function getDefaultCoachContext() {
    return {
      sport: "",
      goal: "",
      budgetText: "",
      budgetMin: 0,
      budgetMax: 0,
    };
  }

  function extractCoachSport(text) {
    const lower = String(text || "").toLowerCase();
    for (const item of COACH_SPORT_ALIASES) {
      if (item.patterns.some((pattern) => pattern.test(lower))) {
        return item.category;
      }
    }
    return "";
  }

  function extractCoachGoal(text) {
    const lower = String(text || "").toLowerCase();
    for (const item of COACH_GOAL_HINTS) {
      if (item.patterns.some((pattern) => pattern.test(lower))) {
        return item.goal;
      }
    }
    return "";
  }

  function extractCoachBudget(text) {
    const lower = String(text || "").toLowerCase();
    const clamp = (value) => {
      const num = Number(value || 0);
      if (!Number.isFinite(num)) return 0;
      return Math.max(10, Math.min(2000, Math.round(num)));
    };

    const between = lower.match(/\b(?:between|from)\s*\$?\s*(\d{2,4})\s*(?:and|to|-)\s*\$?\s*(\d{2,4})\b/);
    if (between) {
      const first = clamp(between[1]);
      const second = clamp(between[2]);
      const min = Math.min(first, second);
      const max = Math.max(first, second);
      return {
        budgetMin: min,
        budgetMax: max,
        budgetText: `${formatCurrency(min)} to ${formatCurrency(max)}`,
      };
    }

    const under = lower.match(/\b(?:under|below|upto|up to|max(?:imum)?|around|about)\s*\$?\s*(\d{2,4})\b/);
    if (under) {
      const max = clamp(under[1]);
      return {
        budgetMin: 0,
        budgetMax: max,
        budgetText: `under ${formatCurrency(max)}`,
      };
    }

    const budgetAfterLabel = lower.match(/\bbudget\b[^\d]{0,8}(\d{2,4})\b/);
    if (budgetAfterLabel) {
      const max = clamp(budgetAfterLabel[1]);
      return {
        budgetMin: 0,
        budgetMax: max,
        budgetText: `around ${formatCurrency(max)}`,
      };
    }

    const explicit = lower.match(/\$\s*(\d{2,4})\b/) || lower.match(/\b(\d{2,4})\s*(?:usd|dollars?)\b/);
    if (explicit) {
      const max = clamp(explicit[1]);
      return {
        budgetMin: 0,
        budgetMax: max,
        budgetText: `around ${formatCurrency(max)}`,
      };
    }

    return null;
  }

  function updateCoachContextFromMessage(userMessage) {
    const text = String(userMessage || "").trim();
    const current = aiCoachRuntime && aiCoachRuntime.coachContext ? aiCoachRuntime.coachContext : getDefaultCoachContext();
    const signals = {
      sport: extractCoachSport(text),
      goal: extractCoachGoal(text),
      budget: extractCoachBudget(text),
    };
    const next = { ...current };
    if (signals.sport) next.sport = signals.sport;
    if (signals.goal) next.goal = signals.goal;
    if (signals.budget) {
      next.budgetText = signals.budget.budgetText || "";
      next.budgetMin = Number(signals.budget.budgetMin || 0);
      next.budgetMax = Number(signals.budget.budgetMax || 0);
    }
    if (aiCoachRuntime) {
      aiCoachRuntime.coachContext = next;
    }
    return { context: next, signals };
  }

  function buildCoachMissingPrompt(context) {
    const summary = [];
    if (context.sport) summary.push(`sport: ${context.sport}`);
    if (context.goal) summary.push(`goal: ${context.goal}`);
    if (context.budgetMax) summary.push(`budget: ${context.budgetText || `under ${formatCurrency(context.budgetMax)}`}`);

    const missing = [];
    if (!context.sport) missing.push("sport");
    if (!context.goal) missing.push("goal");
    if (!context.budgetMax) missing.push("budget");

    if (!missing.length) {
      return "I have your sport, goal, and budget. Say “build my kit” and I will return exact picks.";
    }

    if (summary.length) {
      return `So far I have ${summary.join(", ")}. Tell me your ${missing.join(" and ")}.`;
    }
    return "Tell me your sport, goal, and budget. I will build your full training kit.";
  }

  function scoreCoachProductFit(product, context) {
    const goalFilter = context.goal ? COACH_GOAL_FILTERS[context.goal] : null;
    let score = product.rating * 20 + product.popularity;
    if (context.sport) {
      score += product.category === context.sport ? 140 : -1000;
    }
    if (goalFilter && goalFilter.playStyle && product.playStyle === goalFilter.playStyle) {
      score += 36;
    }
    if (goalFilter && goalFilter.useCase && product.useCase === goalFilter.useCase) {
      score += 36;
    }
    if (context.budgetMax) {
      if (product.price <= context.budgetMax) {
        score += 28;
        score -= Math.max(0, context.budgetMax - product.price) * 0.05;
      } else {
        score -= 180;
      }
    }
    return score;
  }

  function getCoachRecommendations(context, limit = 3) {
    let pool = PRODUCTS.slice();
    if (context.sport) {
      pool = pool.filter((product) => product.category === context.sport);
    }

    const goalFilter = context.goal ? COACH_GOAL_FILTERS[context.goal] : null;
    if (goalFilter) {
      if (goalFilter.playStyle) {
        const byStyle = pool.filter((product) => product.playStyle === goalFilter.playStyle);
        if (byStyle.length >= 2) pool = byStyle;
      }
      if (goalFilter.useCase) {
        const byUseCase = pool.filter((product) => product.useCase === goalFilter.useCase);
        if (byUseCase.length >= 2) pool = byUseCase;
      }
    }

    if (context.budgetMax) {
      const withinBudget = pool.filter((product) => product.price <= context.budgetMax);
      if (withinBudget.length >= 2) {
        pool = withinBudget;
      }
    }

    return pool
      .sort((a, b) => scoreCoachProductFit(b, context) - scoreCoachProductFit(a, context))
      .slice(0, limit);
  }

  function buildCoachKitReply(context) {
    const picks = getCoachRecommendations(context, 3);
    if (!picks.length) {
      return `I could not find strong matches for ${context.sport || "that setup"} in ${context.budgetText || "that budget range"}. Try raising the budget slightly.`;
    }

    const headline = `${context.sport || "Sport"} kit for ${context.goal || "performance"} ${
      context.budgetText ? `(${context.budgetText})` : ""
    }:`;
    const list = picks.map((product) => `${product.name} (${formatCurrency(product.price)})`).join(", ");
    return `${headline} ${list}. Want shoes-only picks or a full match + training + recovery kit?`;
  }

  function getRuleBasedCoachReply(userMessage) {
    const message = String(userMessage || "").trim();
    if (!message) return "Tell me your sport, goal, and budget. I will build your full training kit.";
    const lower = message.toLowerCase();
    const { context, signals } = updateCoachContextFromMessage(message);

    if (/^\s*(hi|hey|hello|yo|hola)\b/.test(lower)) {
      return context.sport || context.goal || context.budgetMax
        ? `${buildCoachMissingPrompt(context)}`
        : "Hey. Tell me your sport, training goal, and budget, and I will build your full kit in under a minute.";
    }

    if (/^\?+$/.test(lower) || /^\s*(what|huh|help|confused)\b/.test(lower)) {
      return buildCoachMissingPrompt(context);
    }

    if (context.sport && context.goal && context.budgetMax) {
      return buildCoachKitReply(context);
    }

    if (signals.sport && !context.goal && !context.budgetMax) {
      return `Locked in: ${context.sport}. Tell me your goal (speed, control, power, endurance, or recovery) and budget.`;
    }

    if (!context.sport && (signals.goal || signals.budget)) {
      return "Got it. Tell me your sport first, then I will build your exact kit.";
    }

    if (context.sport && context.goal && !context.budgetMax) {
      return `Great. What budget should I stay under for your ${context.sport} ${context.goal} kit?`;
    }

    if (context.sport && context.budgetMax && !context.goal) {
      return `Budget ${context.budgetText || `under ${formatCurrency(context.budgetMax)}`} noted. What is your goal: speed, control, power, endurance, or recovery?`;
    }

    const canned = assistantResponse(message);
    if (canned && canned !== COACH_DEFAULT_NEXT_STEP) return canned;

    if (context.sport || context.goal || context.budgetMax) {
      return buildCoachMissingPrompt(context);
    }

    return null;
  }

  function assistantResponse(input) {
    const text = String(input || "").toLowerCase();
    if (!text.trim()) return "Tell me your sport and goal. I will build your full training kit.";
    if (/^\s*(hi|hey|hello|yo|hola)\b/.test(text)) {
      return "Hey. Tell me your sport, training goal, and budget, and I will build your full kit in under a minute.";
    }
    if (text.includes("shoe") || text.includes("boot") || text.includes("cleat") || text.includes("stud")) {
      let category = "";
      if (text.includes("football")) category = "Football";
      if (text.includes("basketball") || text.includes("hoop")) category = "Basketball";
      if (text.includes("running")) category = "Running";
      if (!category && aiCoachRuntime && aiCoachRuntime.coachContext && aiCoachRuntime.coachContext.sport) {
        category = aiCoachRuntime.coachContext.sport;
      }

      const suggestions = PRODUCTS.filter((product) => {
        const haystack = `${product.name} ${product.short} ${product.description}`.toLowerCase();
        const shoeMatch =
          haystack.includes("shoe") || haystack.includes("boot") || haystack.includes("cleat") || haystack.includes("stud");
        if (!shoeMatch) return false;
        if (!category) return true;
        return product.category === category;
      })
        .sort((a, b) => b.rating - a.rating || b.popularity - a.popularity)
        .slice(0, 3);

      if (suggestions.length) {
        return `Top picks: ${suggestions
          .map((product) => `${product.name} (${formatCurrency(product.price)})`)
          .join(", ")}. Tell me your sport + budget and I will narrow this further.`;
      }

      return "Tell me your sport first (football, basketball, or running), and I will suggest the best shoes for your budget.";
    }
    const detectedSport = extractCoachSport(text);
    if (detectedSport) {
      return `Locked in: ${detectedSport}. Tell me your goal and budget, and I will build your best product mix.`;
    }
    if (text.includes("wet") && text.includes("football")) {
      return "For wet football fields: Aero Match Football, Velocity Studs Pro, and Keeper Guard Gloves.";
    }
    if (text.includes("build") && text.includes("kit")) {
      return "Start with one match product, one training product, and one recovery product. I can auto-build this in Bundles.";
    }
    if (text.includes("size") || text.includes("fit")) {
      return "Use the fit assistant on any product page. It adapts size guidance by height and intensity.";
    }
    if (text.includes("budget")) {
      return "Use promo stack PLAYPRO10 + BUNDLE12 and check matching bundles on the shop page.";
    }
    return COACH_DEFAULT_NEXT_STEP;
  }

  const AI_COACH_CONFIG = {
    pythonCoachUrl: "http://127.0.0.1:8008/coach",
    pythonCoachModel: "gpt2",
    pythonTimeoutMs: 22000,
    ollamaBaseUrl: "http://127.0.0.1:11434",
    ollamaModel: "qwen2.5:3b",
    browserModelTask: "text2text-generation",
    browserModelId: "Xenova/flan-t5-small",
    timeoutMs: 12000,
    retryDelayMs: 120000,
  };

  const aiCoachRuntime = {
    coachContext: getDefaultCoachContext(),
    pythonNextRetryAt: 0,
    nextRetryAt: 0,
    warnedOffline: false,
    browserPipelinePromise: null,
  };

  function appendAIChatLine(logNode, role, message, extraClass = "") {
    if (!logNode) return;
    const line = document.createElement("p");
    if (extraClass) line.className = extraClass;
    const strong = document.createElement("strong");
    strong.textContent = `${role}:`;
    line.appendChild(strong);
    line.appendChild(document.createTextNode(` ${String(message || "").trim()}`));
    logNode.appendChild(line);
  }

  function setAIStatus(statusNode, copy, mode = "neutral") {
    if (!statusNode) return;
    statusNode.textContent = copy;
    statusNode.classList.remove("ok", "warn", "info");
    if (mode === "ok") statusNode.classList.add("ok");
    if (mode === "warn") statusNode.classList.add("warn");
    if (mode === "info") statusNode.classList.add("info");
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getCoachCatalogContext(limit = 8) {
    return PRODUCTS.slice()
      .sort((a, b) => b.rating - a.rating || b.popularity - a.popularity)
      .slice(0, limit)
      .map(
        (product) =>
          `${product.name} | ${product.category} | ${formatCurrency(product.price)} | ${product.useCase || "General"}`
      )
      .join("\n");
  }

  function buildCoachPrompt(userMessage) {
    const personalization = getPersonalizationState();
    return `
You are the PlayPro Sports AI Coach.
Rules:
- Reply in 2-5 concise lines.
- Recommend specific products from catalog when relevant.
- If unsure, ask one clarifying question.
- Keep tone practical and direct.

User profile:
Sport: ${personalization.sport || "Unknown"}
Goal: ${personalization.goal || "Unknown"}
Tier: ${personalization.tier || "Starter"}
Location: ${personalization.location || "US"}

Catalog snapshot:
${getCoachCatalogContext(10)}

User query:
${String(userMessage || "").trim()}
`.trim();
  }

  function buildBrowserCoachPrompt(userMessage) {
    const personalization = getPersonalizationState();
    return `
You are a practical sports shopping coach.
Recommend gear from this catalog:
${getCoachCatalogContext(6)}

User sport: ${personalization.sport || "Unknown"}
User goal: ${personalization.goal || "Unknown"}
Question: ${String(userMessage || "").trim()}
Answer in 2-4 short lines.
`.trim();
  }

  async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      window.clearTimeout(timer);
    }
  }

  function normalizeModelReply(rawReply) {
    const cleaned = String(rawReply || "")
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/\r/g, "")
      .trim();
    if (!cleaned) return "";
    const lines = cleaned
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 6);
    return lines.join(" ");
  }

  function stripPromptArtifacts(reply, userMessage) {
    let cleaned = normalizeModelReply(reply);
    const artifacts = [
      "Answer in 2-4 short lines.",
      "Question:",
      "User sport:",
      "User goal:",
      "Recommend gear from this catalog:",
      "You are a practical sports shopping coach.",
    ];

    artifacts.forEach((item) => {
      cleaned = cleaned.replace(new RegExp(escapeRegExp(item), "gi"), "").trim();
    });

    const user = String(userMessage || "").trim();
    if (user && cleaned.toLowerCase().startsWith(user.toLowerCase())) {
      cleaned = cleaned.slice(user.length).replace(/^[\s:,\-.]+/, "").trim();
    }

    return cleaned;
  }

  function isLowQualityModelReply(reply, userMessage) {
    const text = String(reply || "").trim();
    if (!text || text.length < 12) return true;
    if (/(?:\b\w+\b)(?:\s+\1){6,}/i.test(text)) return true;
    if (/\bi(?:\s+i){6,}\b/i.test(text)) return true;
    if (/answer in 2-4 short lines|question:|recommend gear from this catalog/i.test(text)) return true;

    const tokens = text
      .toLowerCase()
      .split(/\s+/)
      .map((token) => token.replace(/[^\w]/g, ""))
      .filter(Boolean);
    if (tokens.length >= 9) {
      const uniqueRatio = new Set(tokens).size / tokens.length;
      if (uniqueRatio < 0.45) return true;
    }

    const userTokens = String(userMessage || "")
      .toLowerCase()
      .split(/\s+/)
      .map((token) => token.replace(/[^\w]/g, ""))
      .filter((token) => token.length > 2);
    if (userTokens.length >= 3) {
      const overlap = userTokens.filter((token) => text.toLowerCase().includes(token));
      if (overlap.length >= Math.max(3, userTokens.length - 1) && text.length < String(userMessage).length + 46) {
        return true;
      }
    }

    return false;
  }

  async function requestOllamaReply(userMessage) {
    const endpoint = `${AI_COACH_CONFIG.ollamaBaseUrl}/api/generate`;
    const payload = {
      model: AI_COACH_CONFIG.ollamaModel,
      prompt: buildCoachPrompt(userMessage),
      stream: false,
      options: {
        temperature: 0.35,
        num_predict: 180,
      },
    };

    const response = await fetchWithTimeout(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      AI_COACH_CONFIG.timeoutMs
    );

    if (!response.ok) {
      throw new Error(`Local model request failed (${response.status})`);
    }

    const data = await response.json();
    const reply = normalizeModelReply(data && data.response ? data.response : "");
    if (!reply) throw new Error("Local model returned an empty response.");
    return reply;
  }

  async function requestPythonGpt2Reply(userMessage) {
    const context = aiCoachRuntime && aiCoachRuntime.coachContext ? aiCoachRuntime.coachContext : getDefaultCoachContext();
    const payload = {
      message: String(userMessage || "").trim(),
      context: {
        sport: context.sport || "",
        goal: context.goal || "",
        budget: context.budgetText || "",
        budgetMax: Number(context.budgetMax || 0),
      },
      catalog: getCoachCatalogContext(10),
    };

    const response = await fetchWithTimeout(
      AI_COACH_CONFIG.pythonCoachUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      AI_COACH_CONFIG.pythonTimeoutMs
    );

    if (!response.ok) {
      throw new Error(`Python GPT-2 request failed (${response.status})`);
    }

    const data = await response.json();
    const raw = data && (data.reply || data.text || data.response) ? data.reply || data.text || data.response : "";
    const reply = stripPromptArtifacts(raw, userMessage);
    if (!reply || isLowQualityModelReply(reply, userMessage)) {
      throw new Error("Python GPT-2 returned low-quality output.");
    }
    return reply;
  }

  async function requestBrowserModelReply(userMessage) {
    if (!aiCoachRuntime.browserPipelinePromise) {
      aiCoachRuntime.browserPipelinePromise = import(
        "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2"
      ).then(async ({ pipeline, env }) => {
        env.allowLocalModels = false;
        env.useBrowserCache = true;
        return pipeline(AI_COACH_CONFIG.browserModelTask, AI_COACH_CONFIG.browserModelId, {
          quantized: true,
        });
      });
    }

    const generator = await aiCoachRuntime.browserPipelinePromise;
    const output = await generator(buildBrowserCoachPrompt(userMessage), {
      max_new_tokens: 96,
      temperature: 0.3,
      do_sample: false,
      repetition_penalty: 1.2,
      no_repeat_ngram_size: 3,
      num_beams: 4,
    });
    const raw = Array.isArray(output) && output[0] ? output[0].generated_text : "";
    const reply = stripPromptArtifacts(raw, userMessage);
    if (!reply || isLowQualityModelReply(reply, userMessage)) {
      throw new Error("Browser model produced low-quality output.");
    }
    return reply;
  }

  function canUsePythonGpt2Direct() {
    const host = String(window.location.hostname || "").toLowerCase();
    const isLoopback = host === "localhost" || host === "127.0.0.1";
    return window.location.protocol !== "https:" && isLoopback;
  }

  function canUseOllamaDirect() {
    const host = String(window.location.hostname || "").toLowerCase();
    const isLoopback = host === "localhost" || host === "127.0.0.1";
    return window.location.protocol !== "https:" && isLoopback;
  }

  function getAICoachBounds() {
    const maxWidth = Math.min(760, Math.max(340, window.innerWidth - 24));
    const maxHeight = Math.min(640, Math.max(280, window.innerHeight - 120));
    return {
      minWidth: 300,
      minHeight: 220,
      maxWidth,
      maxHeight,
    };
  }

  function clampValue(value, min, max) {
    return Math.max(min, Math.min(max, Number(value || 0)));
  }

  function applyAICoachSize(bodyNode, size, persist = true) {
    if (!bodyNode || !size) return;
    const bounds = getAICoachBounds();
    const width = clampValue(size.width, bounds.minWidth, bounds.maxWidth);
    const height = clampValue(size.height, bounds.minHeight, bounds.maxHeight);
    if (!Number.isFinite(width) || !Number.isFinite(height)) return;
    bodyNode.style.width = `${Math.round(width)}px`;
    bodyNode.style.height = `${Math.round(height)}px`;
    if (persist) {
      writeStorage(STORAGE_KEYS.aiCoachSize, { width: Math.round(width), height: Math.round(height) });
    }
  }

  function initAICoachResize(panelNode, bodyNode, handleNode, statusNode) {
    if (!panelNode || !bodyNode || !handleNode) return;

    const presets = {
      sm: { width: 340, height: 300 },
      md: { width: 440, height: 380 },
      lg: { width: 560, height: 500 },
    };

    const saved = readStorage(STORAGE_KEYS.aiCoachSize, null);
    if (saved && typeof saved === "object") {
      applyAICoachSize(bodyNode, saved, false);
    }

    queryAll("[data-ai-size]", panelNode).forEach((button) => {
      button.addEventListener("click", () => {
        const key = String(button.dataset.aiSize || "").toLowerCase();
        const preset = presets[key] || presets.md;
        applyAICoachSize(bodyNode, preset, true);
        if (statusNode) setAIStatus(statusNode, "Mode: Panel resized", "info");
      });
    });

    let active = false;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    const onMove = (event) => {
      if (!active) return;
      const deltaX = Number(event.clientX || 0) - startX;
      const deltaY = Number(event.clientY || 0) - startY;
      applyAICoachSize(
        bodyNode,
        {
          width: startWidth + deltaX,
          height: startHeight + deltaY,
        },
        false
      );
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      bodyNode.classList.remove("resizing");
      const rect = bodyNode.getBoundingClientRect();
      writeStorage(STORAGE_KEYS.aiCoachSize, {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    handleNode.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const rect = bodyNode.getBoundingClientRect();
      active = true;
      startX = Number(event.clientX || 0);
      startY = Number(event.clientY || 0);
      startWidth = rect.width;
      startHeight = rect.height;
      bodyNode.classList.add("resizing");
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });

    window.addEventListener("resize", () => {
      const current = bodyNode.getBoundingClientRect();
      applyAICoachSize(
        bodyNode,
        {
          width: current.width,
          height: current.height,
        },
        false
      );
    });
  }

  async function getCoachReply(userMessage) {
    const message = String(userMessage || "").trim();
    if (!message) {
      return { reply: "Tell me your sport, goal, and budget. I will build your full training kit.", provider: "rules" };
    }

    const rulesReply = getRuleBasedCoachReply(message);
    if (rulesReply) {
      return { reply: rulesReply, provider: "rules" };
    }

    if (message.split(/\s+/).length <= 3) {
      return { reply: COACH_DEFAULT_NEXT_STEP, provider: "rules" };
    }

    const localModelHost = canUsePythonGpt2Direct() || canUseOllamaDirect();
    if (!localModelHost) {
      return {
        reply: getRuleBasedCoachReply(message) || assistantResponse(message) || COACH_DEFAULT_NEXT_STEP,
        provider: "rules",
      };
    }

    const now = Date.now();
    const canRetryPython =
      canUsePythonGpt2Direct() &&
      (aiCoachRuntime.pythonNextRetryAt <= now || aiCoachRuntime.pythonNextRetryAt === 0);
    if (canRetryPython) {
      try {
        const reply = await requestPythonGpt2Reply(userMessage);
        aiCoachRuntime.pythonNextRetryAt = 0;
        return { reply, provider: "python-gpt2" };
      } catch {
        aiCoachRuntime.pythonNextRetryAt = Date.now() + AI_COACH_CONFIG.retryDelayMs;
      }
    }

    const canRetryLocal = canUseOllamaDirect() && (aiCoachRuntime.nextRetryAt <= now || aiCoachRuntime.nextRetryAt === 0);

    if (canRetryLocal) {
      try {
        const reply = await requestOllamaReply(userMessage);
        aiCoachRuntime.nextRetryAt = 0;
        return { reply, provider: "ollama" };
      } catch {
        aiCoachRuntime.nextRetryAt = Date.now() + AI_COACH_CONFIG.retryDelayMs;
      }
    }

    try {
      const reply = await requestBrowserModelReply(userMessage);
      return { reply, provider: "browser" };
    } catch (error) {
      return {
        reply: getRuleBasedCoachReply(userMessage) || assistantResponse(userMessage),
        provider: "fallback",
        error,
      };
    }
  }

  function initAIShoppingAssistant() {
    if (query("#aiAssistant")) return;
    const panel = document.createElement("section");
    panel.id = "aiAssistant";
    panel.className = "ai-assistant";
    panel.innerHTML = `
      <button class="ai-toggle" type="button" data-ai-toggle>AI Coach</button>
      <div class="ai-body hidden" id="aiAssistantBody">
        <p class="section-kicker">AI Stylist / Coach</p>
        <p class="ai-status" id="aiAssistantStatus">Mode: Smart coach rules (GitHub Pages-safe) + local GPT-2 optional.</p>
        <div class="ai-toolbar">
          <span class="ai-resize-tip">Resize panel</span>
          <div class="ai-size-actions">
            <button type="button" class="ai-size-btn" data-ai-size="sm" aria-label="Small coach panel">S</button>
            <button type="button" class="ai-size-btn" data-ai-size="md" aria-label="Medium coach panel">M</button>
            <button type="button" class="ai-size-btn" data-ai-size="lg" aria-label="Large coach panel">L</button>
          </div>
          <button type="button" class="ai-resize-handle" id="aiAssistantResizer" aria-label="Drag to resize panel" title="Drag to resize">
            ↘
          </button>
        </div>
        <div class="ai-log" id="aiAssistantLog">
          <p>Tell me your sport, goal, and budget. I will build your full training kit.</p>
          <p>Local GPT-2 (Python) is used automatically on localhost when available.</p>
        </div>
        <form class="ai-form" id="aiAssistantForm">
          <input type="text" id="aiAssistantInput" placeholder="e.g. best football for wet field">
          <button class="btn btn-primary btn-small" type="submit">Ask</button>
        </form>
      </div>
    `;
    document.body.appendChild(panel);

    const toggle = query("[data-ai-toggle]", panel);
    const body = query("#aiAssistantBody", panel);
    const form = query("#aiAssistantForm", panel);
    const log = query("#aiAssistantLog", panel);
    const input = query("#aiAssistantInput", panel);
    const status = query("#aiAssistantStatus", panel);
    const submit = query("button[type='submit']", form);
    const resizer = query("#aiAssistantResizer", panel);
    if (!toggle || !body || !form || !log || !input || !status || !submit || !resizer) return;

    initAICoachResize(panel, body, resizer, status);

    toggle.addEventListener("click", () => {
      body.classList.toggle("hidden");
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = String(input.value || "").trim();
      if (!message) return;
      appendAIChatLine(log, "You", message);
      input.value = "";
      input.disabled = true;
      submit.disabled = true;
      setAIStatus(status, "Mode: Thinking...", "neutral");

      const { reply, provider, error } = await getCoachReply(message);
      appendAIChatLine(log, "AI", reply);

      if (provider === "python-gpt2") {
        setAIStatus(status, `Mode: Local Python GPT-2 active (${AI_COACH_CONFIG.pythonCoachModel})`, "ok");
      } else if (provider === "ollama") {
        setAIStatus(status, `Mode: Local Ollama active (${AI_COACH_CONFIG.ollamaModel})`, "ok");
      } else if (provider === "browser") {
        setAIStatus(status, `Mode: In-browser model active (${AI_COACH_CONFIG.browserModelId})`, "ok");
      } else if (provider === "rules") {
        setAIStatus(status, "Mode: Smart coach rules", "info");
      } else {
        setAIStatus(status, "Mode: Smart fallback (model unavailable right now)", "warn");
        if (error && !aiCoachRuntime.warnedOffline) {
          appendAIChatLine(
            log,
            "System",
            "Tip: On localhost, run `python3 ai/gpt2_coach_server.py` for GPT-2 responses. On GitHub Pages, smart coach rules run without any key."
          );
          aiCoachRuntime.warnedOffline = true;
        }
      }

      input.disabled = false;
      submit.disabled = false;
      input.focus();
      log.scrollTop = log.scrollHeight;
      recordActivity("ai_assistant", { term: message, provider });
    });
  }

  function initOnboardingQuiz() {
    if (page !== "home") return;
    const personalization = getPersonalizationState();
    if (personalization.profileComplete) return;
    if (query("#onboardingModal")) return;
    const modal = document.createElement("section");
    modal.id = "onboardingModal";
    modal.className = "overlay-modal";
    modal.innerHTML = `
      <div class="overlay-backdrop"></div>
      <article class="overlay-panel" style="max-width:560px">
        <h3 class="section-title" style="font-size:2rem">Training Goal Onboarding</h3>
        <p class="muted" style="margin-bottom:0.7rem">Set your sport profile to unlock tailored recommendations.</p>
        <form class="tool-form compact" id="onboardingForm">
          <label>Primary Sport
            <select class="form-control" name="sport">
              ${Object.keys(SPORT_PROFILES).map((item) => `<option value="${item}">${item}</option>`).join("")}
            </select>
          </label>
          <label>Goal
            <select class="form-control" name="goal">
              <option value="Beginners">Beginner Progress</option>
              <option value="Academy">Academy Performance</option>
              <option value="Pro-Level">Pro-Level Competition</option>
            </select>
          </label>
          <label>Location Code<input class="form-control" name="location" value="US"></label>
          <button class="btn btn-primary" type="submit">Save Profile</button>
        </form>
      </article>
    `;
    document.body.appendChild(modal);
    const form = query("#onboardingForm", modal);
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      savePersonalizationState({
        sport: String(data.get("sport") || "Football"),
        goal: String(data.get("goal") || "Beginners"),
        level: String(data.get("goal") || "Beginners"),
        location: String(data.get("location") || "US").toUpperCase(),
        profileComplete: true,
      });
      modal.remove();
      if (page === "home") {
        renderHomeSportStory();
        renderHomeProducts();
        renderHomeDashboardLane();
      }
      showToast("Profile Saved", "Personalized recommendations are now active.", "success");
    });
  }

  function initFounderTimeline() {
    if (page !== "about" && !isPageFile("about.html")) return;
    const timeline = query(".timeline");
    if (!timeline || timeline.dataset.bound) return;
    timeline.dataset.bound = "1";
    const items = queryAll(".timeline-item", timeline);
    if (!items.length) return;

    const detail = document.createElement("article");
    detail.className = "timeline-detail panel-card";
    timeline.insertAdjacentElement("afterend", detail);

    function activate(index) {
      const current = items[index] || items[0];
      items.forEach((item, idx) => {
        item.classList.toggle("active", idx === index);
        item.setAttribute("aria-selected", idx === index ? "true" : "false");
      });
      const year = query(".timeline-year", current);
      const copy = query("p:not(.timeline-year)", current);
      detail.innerHTML = `
        <p class="section-kicker">Founder Timeline Story</p>
        <h3 class="section-title" style="font-size:2rem">${year ? year.textContent : "Milestone"}</h3>
        <p class="section-copy">${copy ? copy.textContent : ""}</p>
        <div class="metric-strip">
          <article class="kpi-card"><p class="kpi-label">Founder</p><p class="kpi-value">Deon Menezes</p></article>
          <article class="kpi-card"><p class="kpi-label">Focus</p><p class="kpi-value">Athlete Outcomes</p></article>
          <article class="kpi-card"><p class="kpi-label">Standard</p><p class="kpi-value">Premium Verified</p></article>
        </div>
      `;
    }

    items.forEach((item, index) => {
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-selected", "false");
      item.addEventListener("click", () => activate(index));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate(index);
        }
      });
    });

    activate(0);
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("sw.js").catch(() => {
      /* noop */
    });
  }

  function initPerformanceAndErrorMonitoring() {
    const metrics = { lcp: null, cls: 0 };
    if (typeof PerformanceObserver === "function") {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          metrics.lcp = Math.round(last.startTime);
          writeStorage("playpro_perf_metrics_v1", metrics);
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch {
        /* noop */
      }
      try {
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) metrics.cls += entry.value;
          });
          writeStorage("playpro_perf_metrics_v1", metrics);
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      } catch {
        /* noop */
      }
    }

    window.addEventListener("error", (event) => {
      const logs = readStorage("playpro_error_log_v1", []);
      logs.unshift({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        at: Date.now(),
      });
      writeStorage("playpro_error_log_v1", logs.slice(0, 50));
    });
  }

  function initCountdowns() {
    const nodes = queryAll("[data-countdown-target]");
    if (!nodes.length) return;

    function renderNode(node) {
      const targetRaw = node.dataset.countdownTarget;
      if (!targetRaw) return;
      const targetTs = new Date(targetRaw).getTime();
      if (!Number.isFinite(targetTs)) return;

      const diff = Math.max(0, targetTs - Date.now());
      if (!diff) {
        node.textContent = "LIVE";
        return;
      }

      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      node.textContent = `${String(totalHours).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;
    }

    nodes.forEach(renderNode);
    window.setInterval(() => nodes.forEach(renderNode), 1000);
  }

  function initExperienceTools() {
    const loyaltyNode = query("#loyaltyPoints");
    if (loyaltyNode) loyaltyNode.textContent = String(getLoyaltyPoints());

    const bundleForm = query("[data-bundle-form]");
    const bundleResult = query("#bundleResult");
    if (bundleForm && bundleResult) {
      bundleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const selected = queryAll("input[name='item']:checked", bundleForm);
        const subtotal = selected.reduce((sum, input) => sum + Number(input.value || 0), 0);
        if (!selected.length) {
          bundleResult.textContent = "Select at least one item to build a bundle.";
          return;
        }

        const discount = subtotal * 0.12;
        const total = subtotal - discount;
        bundleResult.textContent = `Bundle subtotal ${formatCurrency(
          subtotal
        )} • Discount ${formatCurrency(discount)} • Final ${formatCurrency(total)}`;
        recordActivity("bundle_build", { subtotal, total });
      });
    }

    const challengeForm = query("[data-challenge-form]");
    const challengeResult = query("#challengeResult");
    if (challengeForm && challengeResult) {
      challengeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const selected = queryAll("input[type='checkbox']:checked", challengeForm);
        const gained = selected.reduce((sum, input) => sum + Number(input.value || 0), 0);
        if (!selected.length) {
          challengeResult.textContent = "Select at least one completed challenge.";
          return;
        }

        const nextPoints = getLoyaltyPoints() + gained;
        setLoyaltyPoints(nextPoints);
        challengeResult.textContent = `+${gained} points added. New balance: ${nextPoints}.`;
        if (loyaltyNode) loyaltyNode.textContent = String(nextPoints);
        recordActivity("challenge_complete", { gained });
      });
    }

    const trackForm = query("[data-track-form]");
    const trackResult = query("#trackResult");
    if (trackForm && trackResult) {
      trackForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(trackForm);
        const orderId = String(formData.get("orderId") || "").trim();
        const email = String(formData.get("email") || "").trim();
        if (!orderId || !email) return;
        trackResult.textContent = `Order ${orderId}: In Transit • Estimated delivery in 2 business days.`;
      });
    }

    const returnForm = query("[data-return-form]");
    const returnResult = query("#returnResult");
    if (returnForm && returnResult) {
      returnForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(returnForm);
        const orderId = String(formData.get("orderId") || "").trim();
        const reason = String(formData.get("reason") || "").trim();
        if (!orderId || !reason) return;
        returnResult.textContent = `Return request created for ${orderId}. Reason: ${reason}. Pickup window: 24-48 hours.`;
      });
    }

    const bulkForm = query("[data-bulk-form]");
    const bulkResult = query("#bulkResult");
    if (bulkForm && bulkResult) {
      bulkForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(bulkForm);
        const org = String(formData.get("org") || "").trim();
        const sport = String(formData.get("sport") || "").trim();
        const qty = Number(formData.get("qty") || 0);
        if (!org || !sport || qty < 10) return;
        const quote = qty * 42;
        bulkResult.textContent = `${org}: estimated ${sport} program quote is ${formatCurrency(
          quote
        )}. Team specialist callback queued.`;
      });
    }

    const giftForm = query("[data-gift-form]");
    const giftResult = query("#giftResult");
    if (giftForm && giftResult) {
      giftForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(giftForm);
        const amount = Number(formData.get("amount") || 0);
        const recipient = String(formData.get("recipient") || "").trim();
        if (!amount || !recipient) return;
        giftResult.textContent = `Gift card ${formatCurrency(amount)} generated for ${recipient}. Delivery: instant.`;
      });
    }

    const quizForm = query("[data-quiz-form]");
    const quizResult = query("#quizResult");
    if (quizForm && quizResult) {
      quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const sport = String(formData.get("sport") || "").trim();
        const level = String(formData.get("level") || "").trim();
        if (!sport || !level) return;
        const match = PRODUCTS.filter((product) => product.category === sport).slice(0, 3);
        const names = match.map((product) => product.name).join(", ");
        quizResult.textContent = `${level} ${sport} setup recommendation: ${names || "Custom kit plan"}.`;
        savePersonalizationState({ sport, goal: level, level, profileComplete: true });
      });
    }

    const partnerForm = query("[data-partner-form]");
    const partnerResult = query("#partnerResult");
    if (partnerForm && partnerResult) {
      partnerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(partnerForm);
        const name = String(formData.get("name") || "").trim();
        const sport = String(formData.get("sport") || "").trim();
        const audience = Number(formData.get("audience") || 0);
        if (!name || !sport || !audience) return;
        partnerResult.textContent = `${name} (${sport}) profile submitted. Audience score: ${audience}. Team review started.`;
      });
    }

    const mediaForm = query("[data-media-form]");
    const mediaResult = query("#mediaResult");
    if (mediaForm && mediaResult) {
      mediaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(mediaForm);
        const publication = String(formData.get("publication") || "").trim();
        const email = String(formData.get("email") || "").trim();
        if (!publication || !email) return;
        mediaResult.textContent = `Media request logged for ${publication}. Press desk will respond at ${email}.`;
      });
    }
  }

  function initRewardsPageEnhancements() {
    if (page !== "rewards" && !isPageFile("rewards.html")) return;
    const container = query("main .container");
    if (!container) return;
    let wrap = query("#rewardsDynamic");
    if (!wrap) {
      wrap = document.createElement("section");
      wrap.id = "rewardsDynamic";
      wrap.className = "section-tight";
      container.appendChild(wrap);
    }

    const leaderboard = getReferralState().leaderboard;
    const points = getLoyaltyPoints();
    const tier = points >= 2600 ? "Elite" : points >= 1700 ? "Pro" : "Starter";
    wrap.innerHTML = `
      <div class="split-layout">
        <article class="panel-card reveal">
          <p class="section-kicker">Tiered Loyalty Program</p>
          <h2 class="section-title" style="font-size:2rem">Tier: ${tier}</h2>
          <p class="muted">Perks include early drops, personalized pricing moments, and challenge multipliers.</p>
          <button class="btn btn-primary btn-small" type="button" id="spinToWinButton">Spin To Win</button>
          <div class="tool-result" id="spinResult">Mystery discount events are tuned for premium experience.</div>
        </article>
        <article class="panel-card reveal">
          <p class="section-kicker">Referral Leaderboard</p>
          <div class="leaderboard-list" id="refLeaderboard">
            ${leaderboard
              .map(
                (entry, index) => `
                  <div class="leaderboard-row">
                    <span>#${index + 1} ${entry.name}</span>
                    <strong>${entry.points}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
          <form class="tool-form compact" id="refForm">
            <label>Team / Community name<input class="form-control" name="name" required></label>
            <button class="btn btn-secondary btn-small" type="submit">Add Referral Points</button>
          </form>
        </article>
      </div>
    `;

    const spinButton = query("#spinToWinButton");
    const spinResult = query("#spinResult");
    if (spinButton && spinResult) {
      spinButton.addEventListener("click", () => {
        const rewards = ["5% bonus", "10% bonus", "free shipping", "double points"];
        const reward = rewards[Math.floor(Math.random() * rewards.length)];
        spinResult.textContent = `Unlocked: ${reward}. Applied to your loyalty profile.`;
      });
    }

    const refForm = query("#refForm");
    if (refForm) {
      refForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(refForm);
        const name = String(data.get("name") || "").trim();
        if (!name) return;
        updateReferralLeaderboard(name, 75);
        initRewardsPageEnhancements();
        showToast("Referral Updated", `${name} moved up the leaderboard.`, "success");
      });
    }

    bindRevealAnimations(wrap);
  }

  function initTrustPageEnhancements() {
    if (page !== "trust" && !isPageFile("trust.html")) return;
    const container = query("main .container");
    if (!container) return;
    let wrap = query("#trustDynamic");
    if (!wrap) {
      wrap = document.createElement("section");
      wrap.id = "trustDynamic";
      wrap.className = "section-tight";
      container.appendChild(wrap);
    }

    wrap.innerHTML = `
      <div class="split-layout">
        <article class="panel-card reveal">
          <p class="section-kicker">Delivery SLA Dashboard</p>
          <div class="metric-strip">
            <article class="kpi-card"><p class="kpi-label">On-time Delivery</p><p class="kpi-value">97.8%</p></article>
            <article class="kpi-card"><p class="kpi-label">Avg Fulfillment</p><p class="kpi-value">14h</p></article>
            <article class="kpi-card"><p class="kpi-label">NPS</p><p class="kpi-value">74</p></article>
            <article class="kpi-card"><p class="kpi-label">Quality Pass</p><p class="kpi-value">99.1%</p></article>
          </div>
        </article>
        <article class="panel-card reveal">
          <p class="section-kicker">Return Flow Simulator</p>
          <form class="tool-form compact" id="trustReturnSimulator">
            <label>Order age (days)<input class="form-control" type="number" name="age" min="1" max="180" value="14"></label>
            <label>Condition
              <select class="form-control" name="condition">
                <option value="new">Like new</option>
                <option value="used">Lightly used</option>
                <option value="damaged">Damaged</option>
              </select>
            </label>
            <button class="btn btn-secondary btn-small" type="submit">Simulate Eligibility</button>
            <div class="tool-result" id="trustReturnResult">Simulated eligibility appears here.</div>
          </form>
        </article>
      </div>
      <div class="lane-card reveal" style="margin-top:0.8rem">
        <p class="section-kicker">Structured FAQ</p>
        <div class="faq-list">
          <article class="faq-item">
            <button class="faq-question" type="button">Pre-purchase: how authenticity is verified?</button>
            <div class="faq-answer"><p>Each item follows a catalog quality checklist and certification metadata review.</p></div>
          </article>
          <article class="faq-item">
            <button class="faq-question" type="button">Delivery: when will my order arrive?</button>
            <div class="faq-answer"><p>Estimated dates are shown at checkout and updated in the track-order flow with SLA status.</p></div>
          </article>
          <article class="faq-item">
            <button class="faq-question" type="button">Returns: can I exchange for another size?</button>
            <div class="faq-answer"><p>Yes. Eligible orders can choose replacement and exchange options during return submission.</p></div>
          </article>
          <article class="faq-item">
            <button class="faq-question" type="button">Warranty: what if quality issues appear later?</button>
            <div class="faq-answer"><p>Submit photos/video in support and quality review cases are escalated for replacement/refund.</p></div>
          </article>
        </div>
      </div>
    `;

    const form = query("#trustReturnSimulator");
    const result = query("#trustReturnResult");
    if (form && result) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const age = Number(data.get("age") || 0);
        const condition = String(data.get("condition") || "used");
        if (age <= 30 && condition !== "damaged") {
          result.textContent = "Eligible for fast return + instant exchange option.";
        } else if (age <= 45) {
          result.textContent = "Eligible with inspection. Refund in 3-5 business days.";
        } else {
          result.textContent = "Out of policy window. Support escalation required.";
        }
      });
    }

    bindRevealAnimations(wrap);
  }

  function initResourcesPageEnhancements() {
    if (page !== "resources" && !isPageFile("resources.html")) return;
    const container = query("main .container");
    if (!container) return;
    let wrap = query("#resourcesDynamic");
    if (!wrap) {
      wrap = document.createElement("section");
      wrap.id = "resourcesDynamic";
      wrap.className = "section-tight";
      container.appendChild(wrap);
    }
    wrap.innerHTML = `
      <div class="split-layout">
        <article class="panel-card reveal">
          <p class="section-kicker">Beginner To Pro Learning Paths</p>
          <div class="experience-grid">
            <article class="experience-card"><h3>Foundation</h3><p>Build movement quality and equipment familiarity.</p></article>
            <article class="experience-card"><h3>Performance</h3><p>Increase volume, intensity, and tactical control.</p></article>
            <article class="experience-card"><h3>Competition</h3><p>Scenario-based sessions, load management, and recovery.</p></article>
          </div>
        </article>
        <article class="panel-card reveal">
          <p class="section-kicker">Season Planner</p>
          <form class="tool-form compact" id="seasonPlannerForm">
            <label>Primary Sport
              <select class="form-control" name="sport">
                ${Object.keys(SPORT_PROFILES).map((item) => `<option value="${item}">${item}</option>`).join("")}
              </select>
            </label>
            <label>Weeks to peak event<input class="form-control" type="number" name="weeks" min="4" max="52" value="12"></label>
            <button class="btn btn-secondary btn-small" type="submit">Build Season Plan</button>
            <div class="tool-result" id="seasonPlannerResult">Personalized planner output appears here.</div>
          </form>
        </article>
      </div>
    `;
    const form = query("#seasonPlannerForm");
    const result = query("#seasonPlannerResult");
    if (form && result) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const sport = String(data.get("sport") || "Football");
        const weeks = Number(data.get("weeks") || 12);
        const recs = getPersonalizedRecommendations(3, sport).map((item) => item.name).join(", ");
        result.textContent = `${weeks}-week ${sport} calendar generated. Recommended gear sequence: ${recs}.`;
      });
    }
    bindRevealAnimations(wrap);
  }

  function initSpotlightPageEnhancements() {
    if (page !== "spotlight" && !isPageFile("spotlight.html")) return;
    const container = query("main .container");
    if (!container) return;
    let wrap = query("#spotlightDynamic");
    if (!wrap) {
      wrap = document.createElement("section");
      wrap.id = "spotlightDynamic";
      wrap.className = "section-tight";
      container.appendChild(wrap);
    }

    const athletePicks = getTrendingProducts(6);
    wrap.innerHTML = `
      <div class="split-layout">
        <article class="panel-card reveal">
          <p class="section-kicker">Ambassador Storefronts</p>
          <div class="lane-row">
            ${athletePicks
              .map(
                (item) => `
                  <a class="lane-item" href="product.html?id=${encodeURIComponent(item.id)}">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" />
                    <span>${item.name}</span>
                  </a>
                `
              )
              .join("")}
          </div>
        </article>
        <article class="panel-card reveal">
          <p class="section-kicker">UGC Setup Submission</p>
          <form class="tool-form compact" id="ugcForm">
            <label>Name<input class="form-control" name="name" required /></label>
            <label>Team / Academy<input class="form-control" name="team" required /></label>
            <label>Upload photo/video<input class="form-control" type="file" name="media" accept="image/*,video/*" required /></label>
            <button class="btn btn-primary btn-small" type="submit">Submit Setup</button>
            <div class="tool-result" id="ugcResult">Share your setup to appear in the community wall.</div>
          </form>
        </article>
      </div>
      <div class="lane-card reveal" style="margin-top:0.9rem">
        <p class="section-kicker">Community Challenge Hub</p>
        <div class="experience-grid">
          <article class="experience-card"><h3>Challenge: 30-Day Ball Mastery</h3><p>Complete 12 sessions and unlock reward credits.</p></article>
          <article class="experience-card"><h3>Challenge: Vertical Upgrade</h3><p>Strength + plyo completion unlocks bonus loyalty points.</p></article>
          <article class="experience-card"><h3>Challenge: Recovery Consistency</h3><p>Track 21 consecutive recovery days for VIP boost.</p></article>
          <article class="experience-card"><h3>Public Kit Boards</h3><p>Create and share wishlist boards with teammates and coaches.</p></article>
        </div>
      </div>
    `;

    const form = query("#ugcForm");
    const result = query("#ugcResult");
    if (form && result) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const team = String(data.get("team") || "").trim();
        const media = data.get("media");
        if (!name || !team || !(media instanceof File) || !media.name) return;
        result.textContent = `Submission received from ${name} (${team}). Media: ${media.name}.`;
        updateReferralLeaderboard(team, 40);
      });
    }

    bindRevealAnimations(wrap);
  }

  function initLaunchAndVipEnhancements() {
    const container = query("main .container");
    if (!container) return;

    if (page === "live" || isPageFile("live.html")) {
      let wrap = query("#liveDynamic");
      if (!wrap) {
        wrap = document.createElement("section");
        wrap.id = "liveDynamic";
        wrap.className = "section-tight";
        container.appendChild(wrap);
      }
      wrap.innerHTML = `
        <div class="lane-card reveal">
          <p class="section-kicker">Live Shopping Rail</p>
          <div class="lane-row">
            ${getTrendingProducts(6)
              .map(
                (item) => `
                  <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" />
                    <span>${item.name}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      `;
      bindRevealAnimations(wrap);
    }

    if (page === "queue" || isPageFile("queue.html")) {
      const positionNode = query(".kpi-card .kpi-value");
      if (positionNode && !positionNode.dataset.boundQueue) {
        positionNode.dataset.boundQueue = "1";
        window.setInterval(() => {
          const current = Number(String(positionNode.textContent || "#482").replace(/[^\d]/g, "")) || 482;
          const next = Math.max(1, current - Math.floor(Math.random() * 6));
          positionNode.textContent = `#${next}`;
        }, 4500);
      }
    }

    if (page === "vip" || isPageFile("vip.html")) {
      let wrap = query("#vipDynamic");
      if (!wrap) {
        wrap = document.createElement("section");
        wrap.id = "vipDynamic";
        wrap.className = "section-tight";
        container.appendChild(wrap);
      }
      wrap.innerHTML = `
        <div class="split-layout">
          <article class="panel-card reveal">
            <p class="section-kicker">Season Pass</p>
            <form class="tool-form compact" id="vipPassForm">
              <label>Member name<input class="form-control" name="name" required /></label>
              <label>Preferred sport
                <select class="form-control" name="sport">
                  ${Object.keys(SPORT_PROFILES).map((item) => `<option value="${item}">${item}</option>`).join("")}
                </select>
              </label>
              <button class="btn btn-primary btn-small" type="submit">Activate Pass</button>
              <div class="tool-result" id="vipPassResult">Unlock recurring seasonal benefits and early windows.</div>
            </form>
          </article>
          <article class="panel-card reveal">
            <p class="section-kicker">VIP Member Exclusives</p>
            <div class="experience-grid">
              <article class="experience-card"><h3>Private Drop Queue</h3><p>Priority ranking boost during limited launches.</p></article>
              <article class="experience-card"><h3>Concierge Checkout</h3><p>Express validation and premium shipping credits.</p></article>
              <article class="experience-card"><h3>Personalized Pricing</h3><p>Tier-based price moments and seasonal multipliers.</p></article>
              <article class="experience-card"><h3>Early Content Access</h3><p>Training plans and curated kits before public release.</p></article>
            </div>
          </article>
        </div>
      `;

      const form = query("#vipPassForm");
      const result = query("#vipPassResult");
      if (form && result) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(form);
          const name = String(data.get("name") || "").trim();
          const sport = String(data.get("sport") || "Football");
          if (!name) return;
          savePersonalizationState({ tier: "Elite", sport, profileComplete: true });
          result.textContent = `${name} activated VIP season pass for ${sport}. Elite pricing moments enabled.`;
        });
      }
      bindRevealAnimations(wrap);
    }
  }

  function initDropNotificationPrompt() {
    if (
      !["drops", "live", "queue"].includes(page) &&
      !isPageFile("drops.html") &&
      !isPageFile("live.html") &&
      !isPageFile("queue.html")
    ) {
      return;
    }
    const target =
      query(".newsletter-form") ||
      query(".section .container") ||
      query("main .container");
    if (!target || query("#dropNotifyButton")) return;
    const button = document.createElement("button");
    button.id = "dropNotifyButton";
    button.type = "button";
    button.className = "btn btn-ghost btn-small";
    button.textContent = "Enable Push Alerts";
    target.insertAdjacentElement("beforeend", button);
    button.addEventListener("click", async () => {
      if (!("Notification" in window)) {
        showToast("Push Alerts", "Notifications are not supported in this browser.", "warn");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        showToast("Push Alerts", "Drop and restock alerts are enabled.", "success");
      } else {
        showToast("Push Alerts", "Notification permission denied.", "warn");
      }
    });
  }

  function initInsightPages() {
    if (page !== "dashboard" && page !== "analytics" && page !== "admin") return;
    const container = query("main .container");
    if (!container) return;
    let wrap = query("#insightRoot");
    if (!wrap) {
      wrap = document.createElement("section");
      wrap.id = "insightRoot";
      wrap.className = "section-tight";
      container.appendChild(wrap);
    }

    if (page === "dashboard") {
      const recs = getPersonalizedRecommendations(6);
      const personalization = getPersonalizationState();
      const reorderPool = PRODUCTS.filter((item) => ["Recovery", "Running", "Training"].includes(item.category)).slice(
        0,
        3
      );
      wrap.innerHTML = `
        <div class="panel-card reveal">
          <p class="section-kicker">Personal Dashboard</p>
          <h2 class="section-title" style="font-size:2rem">Gear & Progress</h2>
          <p class="muted">Goal: ${personalization.goal || "Build complete high-performance kit"} • Tier: ${
        personalization.tier || "Starter"
      }</p>
          <div class="lane-row">
            ${recs
              .map(
                (item) => `
                  <button class="lane-item lane-item-button" type="button" data-add-cart="${item.id}">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <span>${item.name}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="lane-card reveal" style="margin-top:0.8rem">
          <p class="section-kicker">Smart Reorder & Content</p>
          <div class="experience-grid">
            ${reorderPool
              .map(
                (item) => `
                  <article class="experience-card">
                    <h3>${item.name}</h3>
                    <p>Suggested reorder in 14 days • Based on training cadence.</p>
                    <a class="chip" href="product.html?id=${encodeURIComponent(item.id)}">Review Product</a>
                  </article>
                `
              )
              .join("")}
            <article class="experience-card">
              <h3>Context-Aware Guide</h3>
              <p>Training drills and recovery guides surfaced from your browsing behavior.</p>
              <a class="chip" href="resources.html">Open Resources Hub</a>
            </article>
          </div>
        </div>
      `;
    }

    if (page === "analytics") {
      const activity = getActivityLog();
      const searches = activity.filter((item) => item.type === "search_submit").length;
      const addToCartEvents = activity.filter((item) => item.type === "add_to_cart").length;
      const purchases = activity.filter((item) => item.type === "purchase").length;
      const perf = readStorage("playpro_perf_metrics_v1", { lcp: "-", cls: "-" });
      wrap.innerHTML = `
        <div class="panel-card reveal">
          <p class="section-kicker">Analytics & Experimentation</p>
          <div class="metric-strip">
            <article class="kpi-card"><p class="kpi-label">Searches</p><p class="kpi-value">${searches}</p></article>
            <article class="kpi-card"><p class="kpi-label">Add to Cart</p><p class="kpi-value">${addToCartEvents}</p></article>
            <article class="kpi-card"><p class="kpi-label">Purchases</p><p class="kpi-value">${purchases}</p></article>
            <article class="kpi-card"><p class="kpi-label">LCP/CLS</p><p class="kpi-value">${perf.lcp || "-"} / ${
        perf.cls ? Number(perf.cls).toFixed(2) : "-"
      }</p></article>
          </div>
          <p class="muted">A/B framework active for hero/cards/checkout variants via local experiment buckets.</p>
        </div>
        <div class="lane-card reveal" style="margin-top:0.8rem">
          <p class="section-kicker">Retention & Growth Metrics</p>
          <div class="experience-grid">
            <article class="experience-card"><h3>Cohort Analysis</h3><p>Returning vs new buyer trends across 7/30 day windows.</p></article>
            <article class="experience-card"><h3>Search Intelligence</h3><p>Zero-result tracking, conversion by query, and intent term quality.</p></article>
            <article class="experience-card"><h3>Promotion Efficiency</h3><p>Discount impact, bundle attachment rate, and incremental revenue lift.</p></article>
            <article class="experience-card"><h3>LTV Signal</h3><p>Loyalty behavior and repeat-category probability scoring.</p></article>
            <article class="experience-card"><h3>Heatmaps</h3><p>Tap/click intensity layers to identify UX friction zones.</p></article>
            <article class="experience-card"><h3>Session Replay</h3><p>Behavior trace playback for checkout and search drop-off analysis.</p></article>
            <article class="experience-card"><h3>Merchandising Board</h3><p>SKU velocity, sell-through, and margin quality across sports.</p></article>
            <article class="experience-card"><h3>Discount ROI</h3><p>Promotion efficiency by campaign, channel, and season.</p></article>
          </div>
        </div>
      `;
    }

    if (page === "admin") {
      const errors = readStorage("playpro_error_log_v1", []);
      wrap.innerHTML = `
        <div class="split-layout">
          <article class="panel-card reveal">
            <p class="section-kicker">Operations Console</p>
            <form class="tool-form compact" id="adminSettingsForm">
              <label>Default Currency
                <select class="form-control" name="currency">
                  ${Object.keys(STORE_CONFIG.currencies)
                    .map(
                      (code) => `<option value="${code}" ${getCurrency() === code ? "selected" : ""}>${code}</option>`
                    )
                    .join("")}
                </select>
              </label>
              <label>Locale
                <select class="form-control" name="locale">
                  <option value="en-US" ${getLocale() === "en-US" ? "selected" : ""}>en-US</option>
                  <option value="en-GB" ${getLocale() === "en-GB" ? "selected" : ""}>en-GB</option>
                  <option value="en-IN" ${getLocale() === "en-IN" ? "selected" : ""}>en-IN</option>
                  <option value="es-ES" ${getLocale() === "es-ES" ? "selected" : ""}>es-ES</option>
                  <option value="fr-FR" ${getLocale() === "fr-FR" ? "selected" : ""}>fr-FR</option>
                </select>
              </label>
              <label><input type="checkbox" name="reducedMotion" ${
                document.body.classList.contains("reduced-motion") ? "checked" : ""
              }> Force reduced motion mode</label>
              <button class="btn btn-primary btn-small" type="submit">Save Settings</button>
              <div class="tool-result" id="adminSettingsResult">Manage CMS-like storefront controls.</div>
            </form>
          </article>
          <article class="panel-card reveal">
            <p class="section-kicker">Error & Audit Logs</p>
            <div class="stack-grid">
              ${
                errors.length
                  ? errors
                      .slice(0, 8)
                      .map(
                        (entry) => `
                          <article class="experience-card">
                            <strong>${entry.message}</strong>
                            <p>${entry.source || "inline script"} • line ${entry.line || "-"}</p>
                          </article>
                        `
                      )
                      .join("")
                  : `<div class="empty-state">No runtime errors logged.</div>`
              }
            </div>
          </article>
        </div>
        <div class="lane-card reveal" style="margin-top:0.8rem">
          <p class="section-kicker">Enterprise Extensions</p>
          <div class="experience-grid">
            <article class="experience-card"><h3>Multi-Warehouse Routing</h3><p>Simulated nearest-warehouse allocation with SLA prioritization.</p></article>
            <article class="experience-card"><h3>B2B Portal Controls</h3><p>Academy pricing tiers, tax profile rules, and recurring procurement logic.</p></article>
            <article class="experience-card"><h3>Fraud & Risk Scoring</h3><p>Order risk flagging thresholds with manual review escalation paths.</p></article>
            <article class="experience-card"><h3>Regional Rules</h3><p>Country-specific shipping/payment constraints and compliance profile.</p></article>
            <article class="experience-card"><h3>Subscription Engine</h3><p>Recurring replenishment products and refill reminders.</p></article>
            <article class="experience-card"><h3>Localized Catalog</h3><p>Multi-currency and multi-language storefront controls.</p></article>
          </div>
        </div>
        <div class="lane-card reveal" style="margin-top:0.8rem">
          <p class="section-kicker">Operations Tooling</p>
          <div class="split-layout">
            <form class="tool-form compact" id="adminCatalogForm">
              <p class="section-kicker">Catalog Management</p>
              <label>Bulk edit payload<input class="form-control" name="payload" placeholder="SKU123:+12 stock, SKU188:-4 stock" required></label>
              <button class="btn btn-secondary btn-small" type="submit">Apply Bulk Update</button>
            </form>
            <form class="tool-form compact" id="adminCampaignForm">
              <p class="section-kicker">Campaign Scheduler</p>
              <label>Campaign name<input class="form-control" name="campaign" required></label>
              <label>Launch date<input class="form-control" type="date" name="date" required></label>
              <button class="btn btn-secondary btn-small" type="submit">Schedule Launch</button>
            </form>
            <form class="tool-form compact" id="adminAccessForm">
              <p class="section-kicker">Role-Based Access</p>
              <label>Team member<input class="form-control" name="member" required></label>
              <label>Role
                <select class="form-control" name="role">
                  <option value="merchandising">Merchandising</option>
                  <option value="support">Support</option>
                  <option value="operations">Operations</option>
                  <option value="finance">Finance</option>
                </select>
              </label>
              <button class="btn btn-secondary btn-small" type="submit">Grant Role</button>
            </form>
          </div>
          <div class="tool-result" id="adminOpsResult">Run operational updates and audit actions from one console.</div>
        </div>
      `;

      const form = query("#adminSettingsForm");
      const result = query("#adminSettingsResult");
      if (form && result) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(form);
          const currency = String(data.get("currency") || "USD");
          const locale = String(data.get("locale") || "en-US");
          const reducedMotion = data.get("reducedMotion") === "on";
          setCurrency(currency);
          writeStorage(STORAGE_KEYS.locale, locale);
          writeStorage(STORAGE_KEYS.reducedMotion, reducedMotion);
          document.body.classList.toggle("reduced-motion", reducedMotion);
          result.textContent = "Settings saved. Reload page to apply currency/locale globally.";
        });
      }

      const opsResult = query("#adminOpsResult");
      const catalogForm = query("#adminCatalogForm");
      const campaignForm = query("#adminCampaignForm");
      const accessForm = query("#adminAccessForm");

      if (catalogForm && opsResult) {
        catalogForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const payload = String(new FormData(catalogForm).get("payload") || "").trim();
          if (!payload) return;
          opsResult.textContent = `Catalog bulk update queued: ${payload}. Audit log entry created.`;
        });
      }
      if (campaignForm && opsResult) {
        campaignForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(campaignForm);
          const campaign = String(data.get("campaign") || "").trim();
          const date = String(data.get("date") || "").trim();
          if (!campaign || !date) return;
          opsResult.textContent = `Campaign "${campaign}" scheduled for ${date}. Launch workflow armed.`;
        });
      }
      if (accessForm && opsResult) {
        accessForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(accessForm);
          const member = String(data.get("member") || "").trim();
          const role = String(data.get("role") || "").trim();
          if (!member || !role) return;
          opsResult.textContent = `Role ${role} granted to ${member}. RBAC policy and audit stamp updated.`;
        });
      }
    }

    bindRevealAnimations(wrap);
  }

  function ensureSocialMeta() {
    const title = document.title || "PlayPro Sports";
    const descriptionNode = query("meta[name='description']");
    const description = descriptionNode ? descriptionNode.getAttribute("content") || "" : "";
    const image = query(".hero img, .page-hero img");
    const imageSrc = image ? image.getAttribute("src") || "" : "";
    const imageUrl = imageSrc ? new URL(imageSrc, window.location.origin).href : "";

    function upsertMeta(selector, attr, key, value) {
      if (!value) return;
      let node = query(selector);
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attr, key);
        document.head.appendChild(node);
      }
      node.setAttribute("content", value);
    }

    upsertMeta("meta[property='og:title']", "property", "og:title", title);
    upsertMeta("meta[property='og:description']", "property", "og:description", description);
    upsertMeta("meta[property='og:url']", "property", "og:url", window.location.href);
    upsertMeta("meta[property='og:image']", "property", "og:image", imageUrl);
    upsertMeta("meta[name='twitter:card']", "name", "twitter:card", "summary_large_image");
    upsertMeta("meta[name='twitter:title']", "name", "twitter:title", title);
    upsertMeta("meta[name='twitter:description']", "name", "twitter:description", description);
    upsertMeta("meta[name='twitter:image']", "name", "twitter:image", imageUrl);
  }

  function injectStructuredData() {
    const canonicalMap = {
      home: "index.html",
      shop: "shop.html",
      product: "product.html",
      cart: "cart.html",
      checkout: "checkout.html",
      wishlist: "wishlist.html",
      about: "about.html",
      contact: "contact.html",
      experience: "experience.html",
      dashboard: "dashboard.html",
      analytics: "analytics.html",
      admin: "admin.html",
      blog: "blog.html",
      live: "live.html",
      queue: "queue.html",
      vip: "vip.html",
      spotlight: "spotlight.html",
      login: "login.html",
      signup: "signup.html",
      profile: "profile.html",
    };

    const pagePath = pageFile || canonicalMap[page] || `${page || "index"}.html`;
    if (!query("link[rel='canonical']")) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = new URL(pagePath, window.location.origin).href;
      document.head.appendChild(canonical);
    }

    if (!query("script[data-schema='website']")) {
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "PlayPro Sports",
        url: "/index.html",
        potentialAction: {
          "@type": "SearchAction",
          target: "/shop.html?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      };
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PlayPro Sports",
        founder: "Deon Menezes",
        url: "/index.html",
      };

      const websiteNode = document.createElement("script");
      websiteNode.type = "application/ld+json";
      websiteNode.dataset.schema = "website";
      websiteNode.textContent = JSON.stringify(websiteSchema);
      document.head.appendChild(websiteNode);

      const orgNode = document.createElement("script");
      orgNode.type = "application/ld+json";
      orgNode.dataset.schema = "organization";
      orgNode.textContent = JSON.stringify(orgSchema);
      document.head.appendChild(orgNode);
    }

    if (page === "product" && !query("script[data-schema='product']")) {
      const params = new URLSearchParams(window.location.search);
      const product = findProduct(params.get("id") || "") || PRODUCTS[0];
      const reviewEntries = Array.isArray(getReviews()[product.id]) ? getReviews()[product.id] : [];
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.gallery[0],
        description: product.description,
        brand: { "@type": "Brand", name: "PlayPro Sports" },
        offers: {
          "@type": "Offer",
          priceCurrency: getCurrency(),
          price: convertPrice(product.price, getCurrency()).toFixed(2),
          availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
        },
      };
      if (reviewEntries.length) {
        productSchema.review = reviewEntries.slice(0, 5).map((review) => ({
          "@type": "Review",
          author: { "@type": "Person", name: review.name || "Verified Buyer" },
          reviewRating: { "@type": "Rating", ratingValue: Number(review.rating || 5) },
          reviewBody: review.message || "",
        }));
      }
      const productNode = document.createElement("script");
      productNode.type = "application/ld+json";
      productNode.dataset.schema = "product";
      productNode.textContent = JSON.stringify(productSchema);
      document.head.appendChild(productNode);
    }

    const faqNodes = queryAll(".faq-item");
    if (faqNodes.length && !query("script[data-schema='faq']")) {
      const entities = faqNodes
        .map((item) => {
          const q = query(".faq-question", item);
          const a = query(".faq-answer", item);
          const question = q ? q.textContent : "";
          const answer = a ? a.textContent : "";
          if (!question || !answer) return null;
          return {
            "@type": "Question",
            name: question.trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: answer.trim(),
            },
          };
        })
        .filter(Boolean);
      if (entities.length) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: entities,
        };
        const faqNode = document.createElement("script");
        faqNode.type = "application/ld+json";
        faqNode.dataset.schema = "faq";
        faqNode.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(faqNode);
      }
    }
  }

  function initPage() {
    initLoadingScreen();
    initPageTransitions();
    initReducedMotionPreference();
    initTheme();
    initHeaderSearch();
    ensureAuthSeedUser();
    initAuthNavEntry();
    setNavActiveState();
    initNavToggle();
    initFooterYear();
    initImageFallbacks();
    initImageLoadingHints();
    initGlobalProductActions();
    initCartQuickAccess();
    initMobileBottomNav();
    initCartRecovery();
    initSocialProofFeed();
    initAIShoppingAssistant();
    initPerformanceAndErrorMonitoring();
    ensureSocialMeta();
    registerServiceWorker();
    initCounters();
    initNewsletterForms();
    initCountdowns();
    initExperienceTools();
    updateBadges();
    renderCompareDock();
    renderCartDrawer();

    if (page === "home") initHomePage();
    if (page === "shop") initShopPage();
    if (page === "product") renderProductPage();
    if (page === "cart") initCartPage();
    if (page === "checkout") initCheckoutPage();
    if (page === "wishlist") renderWishlistPage();
    if (page === "contact") initContactPage();
    initAuthPages();
    initRewardsPageEnhancements();
    initTrustPageEnhancements();
    initResourcesPageEnhancements();
    initSpotlightPageEnhancements();
    initLaunchAndVipEnhancements();
    initDropNotificationPrompt();
    initInsightPages();
    initOnboardingQuiz();
    initFounderTimeline();
    initFaqAccordions();
    injectStructuredData();

    bindRevealAnimations();
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
