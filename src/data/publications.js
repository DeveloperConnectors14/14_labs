/**
 * 14Labs papers, by status, with every author credited as published.
 *
 * Mirrored on our researchers' own pages (`publicationSources`); keep them in
 * step when a paper moves from one status to the next. Published papers carry
 * a `slug` and get their own page under /research/papers, and a `short` title
 * for the places a full paper title will not fit (the nav, the footer). The
 * page's overview and
 * findings are our summary of the paper, not the publisher's abstract, which
 * stays on the publisher's site behind the View Paper and DOI links.
 */
export const publicationSources = [
  { name: "Mehmood ul Haq", url: "https://mehmoodulhaq570.netlify.app/research" },
  { name: "Faisal Ali", url: "https://engfaisaluet.netlify.app/research" },
];

export const publicationStatuses = ["Published", "Under review", "Work in progress"];

// Published papers are listed newest first.
export const publications = [
  {
    slug: "solar-irradiance-forecasting-meta-review",
    short: "Solar irradiance forecasting meta-review",
    title:
      "Solar Irradiance Forecasting Meta-review: An In-Depth Systematic Meta-review on Solar Irradiance Forecasting Datasets, Predictive Pipelines and Performance",
    authors: [
      "Faiza Mehmood",
      "Muhammad Nabeel Asim",
      "Aamir Mehmood",
      "Waqar Mahmood",
      "Sebastian Vollmer",
      "Mehmood Ul Haq",
      "Faisal Ali",
      "Andreas Dengel",
    ],
    venue: "Results in Engineering",
    year: "2026",
    date: "2026-08-14",
    volume: "32",
    article: "112449",
    access: "Open access",
    status: "Published",
    url: "https://www.sciencedirect.com/science/article/pii/S2590123026034675",
    doi: "https://doi.org/10.1016/j.rineng.2026.112449",
    note: "Collaboration with DFKI, Germany.",
    description:
      "A systematic meta-review of solar irradiance forecasting datasets, modelling pipelines, and predictive performance.",
    overview: [
      "Solar irradiance forecasting is central to bringing more solar power into existing grids, but the research on it is spread across a large, fragmented body of reviews. That makes it hard to see which methods work, on which data and over which forecasting horizon.",
      "This meta-review analyses 72 review articles through a structured, reproducible screening framework. It organises the forecasting horizons, compiles benchmark datasets and open-source tools from around the world, and sorts forecasting models into eight families, summarising the methods, metrics and best reported results for each.",
      "It also maps where the field publishes and closes with the open research gaps, pointing to explainable AI and physics-informed neural networks as the most promising directions.",
    ],
    findings: [
      "72 review articles screened and analysed through a structured, reproducible framework.",
      "Forecasting horizons organised into very short-term, short-term, medium-term and long-term.",
      "Models classified into eight families: physical, statistical, machine learning, deep learning, ensemble, hybrid, fuzzy logic and persistence.",
      "A repository of benchmark datasets and open-source tools, to make results reproducible and comparable.",
      "Explainable AI and physics-informed neural networks identified as the key directions for future work.",
    ],
    topics: ["Solar irradiance", "Forecasting", "Meta-review", "Benchmark datasets", "Explainable AI"],
  },
  {
    slug: "fatigue-life-prediction-am-ti6al4v",
    short: "Fatigue life prediction of AM Ti-6Al-4 V",
    title:
      "Machine learning and physics based empirical equations for fatigue life prediction of AM Ti-6Al-4 V",
    authors: [
      "Muhammad Muteeb Butt",
      "Mehmood ul Haq",
      "Varma KVVSSN",
      "Hossein Laieghi",
      "Hakan Yavas",
      "Metin U Salamci",
      "Hüseyin Kızıl",
    ],
    venue: "Progress in Additive Manufacturing",
    year: "2026",
    date: "2026-03-13",
    volume: "11",
    issue: "5",
    pages: "4731–4749",
    status: "Published",
    url: "https://link.springer.com/article/10.1007/s40964-026-01615-w",
    doi: "https://doi.org/10.1007/s40964-026-01615-w",
    description:
      "Fatigue-life prediction combining data augmentation, ANN modelling, SHAP analysis, and physics-guided empirical equations.",
    overview: [
      "Fatigue life decides whether an additively manufactured Ti-6Al-4 V part can be qualified, yet fatigue data are scarce and depend on stress, defects and build orientation all at once. Synthetic data can fill the gap, but whether generated data still behave like the real material is rarely checked.",
      "The study benchmarks several data-augmentation strategies under strict fidelity checks, so the stress–defect–life relationships survive augmentation before any model is trained. On the most reliable strategy, four regression models are compared and the best one is interpreted with SHAP to show which factors drive fatigue life.",
      "Two practical results come out of it: an interactive tool that estimates fatigue life from stress, orientation and defect inputs, and orientation-specific, physics-guided Basquin-type equations that can be used on their own.",
    ],
    findings: [
      "The Residual Bootstrapped Conditional Regression Sampler (RB-CRS) was the most reliable augmentation strategy.",
      "A compact artificial neural network gave the best accuracy of four regression models, with a test R² of about 0.98.",
      "SHAP analysis: stress amplitude explains 74% of the predicted variation, build orientation 16%, defect size 7%, distance to surface 2% and defect depth 1%.",
      "Orientation-specific Basquin-type equations track experiments up to 10⁸ cycles (R² 0.94–0.95).",
      "The model is deployed as an interactive tool for rapid fatigue-life screening.",
    ],
    topics: [
      "Additive manufacturing",
      "Fatigue life",
      "Defects",
      "Data augmentation",
      "Machine learning",
      "SHAP analysis",
    ],
  },
  {
    slug: "ml-gui-optimization-slm-ti6al4v",
    short: "ML and GUI optimisation of SLM Ti6Al4V",
    title:
      "Machine Learning Driven Prediction and GUI Based Optimization of Quasi-Static Mechanical Properties in SLM Fabricated Ti6Al4V Alloy",
    authors: [
      "Muhammad Muteeb Butt",
      "Sidra Rashid",
      "Mehmood ul Haq",
      "Ayyaz Mustafa",
      "Arshad Iqbal",
      "Hossein Laieghi",
      "Varma KVVSSN",
      "Metin U. Salamci",
      "Enrico Salvati",
      "Hüseyin Kızıl",
    ],
    venue: "International Journal of Precision Engineering and Manufacturing",
    year: "2026 · Online October 2025",
    date: "2025-10-17",
    volume: "27",
    issue: "1",
    pages: "329–348",
    status: "Published",
    url: "https://link.springer.com/article/10.1007/s12541-025-01360-0",
    doi: "https://doi.org/10.1007/s12541-025-01360-0",
    description:
      "Machine learning prediction of tensile properties in SLM-fabricated Ti6Al4V, with SHAP interpretation and a GUI for selecting process parameters.",
    overview: [
      "Selective laser melting can print Ti6Al4V parts for aerospace and biomedical use, but the tensile properties that come out depend on a tangle of process settings, and finding the right settings by experiment is slow and expensive. This paper asks whether machine learning can learn that relationship from results that have already been published.",
      "A dataset of 201 results was built from the literature, covering six SLM process parameters and three tensile properties — yield strength, ultimate tensile strength and elongation. Six classical regressors were compared with an artificial neural network, and SHAP analysis was used to show which inputs drive the network's predictions and how that lines up with the process physics.",
      "The network was then trained in reverse and wrapped in a graphical interface: an engineer enters the mechanical properties a part needs, and the tool suggests the process parameters to reach them — a practical check before anything goes into production.",
    ],
    findings: [
      "201 results from published literature: six SLM process parameters against yield strength, ultimate tensile strength and elongation.",
      "Support Vector Regression, Random Forest, K-Nearest Neighbors, Gradient Boosting, Gaussian Process Regression and Decision Trees reached only moderate accuracy.",
      "An artificial neural network captured the relationships best, with R² up to 0.84 across all three properties.",
      "SHAP analysis explains the relative importance and physical influence of each process parameter.",
      "A reverse-trained ANN behind a GUI returns process parameters for the properties a part requires.",
    ],
    topics: [
      "Selective laser melting",
      "Additive manufacturing",
      "Machine learning",
      "Artificial neural network",
      "Process optimization",
      "SHAP analysis",
    ],
  },
  {
    slug: "machine-learning-air-quality-prediction-lahore",
    short: "Machine learning for air quality prediction",
    title: "Using machine learning for air quality prediction and sustainable urban planning",
    authors: [
      "M.A. Mujtaba",
      "A. Munir",
      "Sheeraz Ali",
      "Jana Petrů",
      "Talha Ansar",
      "Waiz Akhlaq",
      "Muneeb Ahmad",
      "Haseeb Iqbal",
      "Faisal Ali",
      "Muhammad Nasir Bashir",
      "T. Jerry Alexander",
    ],
    venue: "Sustainable Futures",
    year: "2025",
    date: "2025-07-05",
    volume: "10",
    article: "100981",
    access: "Open access",
    status: "Published",
    url: "https://www.sciencedirect.com/science/article/pii/S2666188825005453",
    doi: "https://doi.org/10.1016/j.sftr.2025.100981",
    description:
      "Twenty years of Lahore pollution and weather data, forecast with statistical and machine learning models to project air quality to 2030.",
    overview: [
      "PM2.5 and other pollutants are a growing health risk in Lahore, and reliable forecasts are what regulators need to plan against them. This study tests how well time-series and machine learning models can predict the city's air quality.",
      "Using data from January 2003 to December 2022 — eight pollutants and four weather factors — it compares SARIMA, SARIMAX, LSTM and nonlinear autoregressive (NAR) models, scored with root mean squared error and dynamic time warping.",
      "The best model is used to project air quality forward, and the paper closes with mitigation strategies for regulators, framed around the Sustainable Development Goal on good health and well-being.",
    ],
    findings: [
      "Twenty years of data for Lahore, Pakistan: eight pollutants and four weather-related factors.",
      "SARIMA, SARIMAX, LSTM and NAR models compared on RMSE and dynamic time warping (DTW).",
      "NAR performed best, with an RMSE of 23.52 and a DTW of 5023.",
      "The air quality index is projected to rise by 13% by 2030 against the 2022 baseline.",
      "Mitigation strategies for regulators, aligned with the SDGs.",
    ],
    topics: ["Air quality", "Time-series forecasting", "Machine learning", "LSTM", "Urban planning"],
  },
  {
    slug: "zn-co-nanoferrite-electrocatalysts",
    short: "Zn–Co nanoferrite electrocatalysts",
    title: "Zn–Co nanoferrite electrocatalysts for enhanced hydrogen and oxygen generation",
    authors: [
      "Kiran Shahzadi",
      "Muhammad Sarfraz",
      "Muneerah Alomar",
      "M.A. Mujtaba",
      "Muhammad Nasir Bashir",
      "Muhammad Mahmood Ali",
      "Faisal Ali",
    ],
    venue: "Results in Chemistry",
    year: "2025",
    date: "2025-05-24",
    volume: "16",
    article: "102392",
    access: "Open access",
    status: "Published",
    url: "https://www.sciencedirect.com/science/article/pii/S2211715625003753",
    doi: "https://doi.org/10.1016/j.rechem.2025.102392",
    description:
      "Hydrothermally synthesised Zn–Co ferrite nanocatalysts for water splitting, with cobalt-rich compositions giving the strongest oxygen evolution.",
    overview: [
      "Water splitting is one route to clean hydrogen, and how efficient it is depends heavily on the electrocatalyst. This study looks at zinc–cobalt ferrite nanoparticles as catalysts for both hydrogen and oxygen evolution.",
      "A series of Zn₁₋ₓCoₓFe₂O₄ nanoferrites was prepared hydrothermally, with FTIR spectroscopy and X-ray diffraction confirming the synthesis and a cubic spinel structure. Their catalytic behaviour was measured with linear sweep and cyclic voltammetry and electrochemical impedance spectroscopy.",
      "Compositions richer in cobalt performed best, pointing to cobalt-rich nanoferrites as practical catalysts for clean hydrogen production.",
    ],
    findings: [
      "Zn₁₋ₓCoₓFe₂O₄ nanoferrites synthesised hydrothermally; FTIR and XRD confirm a cubic spinel structure.",
      "Catalytic performance measured by Tafel slope, overpotential and onset potential, with impedance spectroscopy for charge transfer.",
      "The cobalt-rich ferrite (CoFe₂O₄) gave the strongest oxygen evolution: charge-transfer resistance 2.1 Ω, onset potential 1.51 V, overpotential 280 mV and a Tafel slope of 65 mV/dec.",
      "Higher cobalt content makes these nanoferrites efficient catalysts for water splitting.",
    ],
    topics: ["Electrocatalysis", "Water splitting", "Nanoferrites", "Oxygen evolution", "Hydrogen"],
  },
  {
    title:
      "Ensemble-Based Solar Irradiance Forecasting for Photovoltaic Energy Planning in Lahore, Pakistan",
    status: "Under review",
    description: "Ensemble forecasting for photovoltaic energy planning in Lahore.",
  },
  {
    title:
      "Diffusion Models (DDPM) Based Re-Generation of TEM Images of PvP-Capped ZnO Nanoparticles Fabricated by Hybrid Flash Nano Precipitation–Plasma Torch (FNP-PT) Processing",
    status: "Under review",
    description: "Diffusion-based generation of microscopy images for nanoparticle research.",
  },
  {
    title:
      "Interpretable Machine Learning for SPS Process-Property Relationships Using SHAP Analysis and 2D Process Maps",
    status: "Under review",
    description: "Interpretable modelling of SPS process–property relationships.",
  },
  {
    title:
      "A Hybrid Evolutionary Optimization Framework for Machine Learning and Deep Learning-Based Air Quality Prediction in Lahore, Pakistan",
    status: "Work in progress",
    description:
      "Evolutionary optimization for air-quality prediction using machine learning and deep learning.",
  },
  {
    title:
      "Automated Vision-Based Fire Extinguishing System Using YOLOv11 and Sensor Fusion for Safety Application",
    status: "Work in progress",
    description: "Vision and sensor fusion for automated fire detection and extinguishing.",
  },
  {
    title:
      "Advancing Solar Energy Prediction Using Statistical, Machine Learning, and Deep Learning Models for Multi-Horizons in Lahore, Pakistan",
    target: "Energy Conservation and Management",
    status: "Work in progress",
    description:
      "Comparative forecasting across multiple horizons for Lahore’s solar-energy conditions.",
  },
  {
    title:
      "A Framework of Ensemble-Based Approach for Solar Irradiance Prediction Using NASA Irradiance Data",
    target: "Energy Conservation and Management",
    status: "Work in progress",
    description:
      "An ensemble framework for predicting solar irradiance from NASA irradiance data.",
  },
];
