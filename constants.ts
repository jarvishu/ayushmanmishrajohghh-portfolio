import { PortfolioData, UILabels } from './types';

export const PORTFOLIO_SCHEMA_TEMPLATE: PortfolioData = {
  "schemaVersion": "1.0",
  "basics": {
    "name": "",
    "title": "",
    "tagline": "",
    "location": "",
    "openToRelocation": false,
    "preferredLocations": [],
    "experienceYears": 0,
    "availability": "",
    "contact": {
      "email": "",
      "phone": "",
      "linkedin": ""
    }
  },
  "summary": "",
  "skills": {
    "talentAcquisition": [],
    "hrOperations": [],
    "payrollCompliance": [],
    "toolsAndPlatforms": [],
    "managementAndEngagement": []
  },
  "experience": [],
  "achievements": [],
  "education": {
    "degree": "",
    "institution": "",
    "year": 0
  },
  "preferences": {
    "rolesInterestedIn": [],
    "workType": [],
    "industries": []
  },
  "labels": {
    "experience": {
      "title": "",
      "summary": ""
    }
  }
};

export const PORTFOLIO_DATA_EN: PortfolioData = {
  "schemaVersion": "1.0",
  "basics": {
    "name": "Ayushman Mishra",
    "title": "Senior Frontend Engineer",
    "tagline": "Building scalable, high-performance UI with React",
    "location": "Noida, India",
    "openToRelocation": true,
    "preferredLocations": ["Relocate"],
    "experienceYears": 7,
    "availability": "Immediate",
    "contact": {
      "email": "ayushmishra.ui@gmail.com",
      "phone": "+91-9990931449",
      "linkedin": "https://linkedin.com/in/ayushmish/"
    }
  },

  "summary": "Senior Frontend Engineer with 7+ years of experience specializing in React.js, JavaScript, TypeScript, and Node.js. Proven expertise in building scalable, user-centric web applications for high-growth companies. Strong background in UI optimization, API integration, performance tuning, and mentoring teams in Agile environments.",

  "skills": {
    "frontend": ["React.js", "Next.js", "Astro", "Redux", "JavaScript (ES6+)", "TypeScript"],
    "styling": ["Tailwind CSS", "SCSS", "Bootstrap", "Material UI"],
    "backend": ["Node.js", "REST APIs", "GraphQL"],
    "cloudDevOps": ["AWS", "Jenkins", "GitHub Actions", "Docker (Basic)", "Netlify", "Vercel"],
    "testing": ["Jest", "Cypress", "React Testing Library"],
    "tools": ["Git", "Figma", "Adobe XD", "JIRA", "Agile/Scrum"]
  },

  "experience": [
    {
      "company": "BOLD Technology Systems Pvt. Ltd",
      "companyLogo": "/images/companies/bold.png",
      "employmentType": "Full-time",
      "totalDuration": "Aug 2020 – Present · 5 yrs 7 mos",
      "location": "Noida, Uttar Pradesh, India",
      "workMode": "Hybrid",
      "keyPlatforms": ["Monster.com", "FlexJobs.com", "MyPerfectResume.com", "LiveCareer.com"],
      "roles": [
        {
          "title": "Module Lead",
          "duration": {
            "from": "2024-07",
            "to": "Present"
          },
          "durationText": "Jul 2024 – Present · 1 yr 8 mos",
          "responsibilities": [
            "Own frontend architecture and technical direction for high-traffic web platforms serving 1M+ monthly active users",
            "Drive design decisions around scalability, performance, maintainability, and frontend best practices across teams",
            "Lead delivery planning, code reviews, and architectural discussions to ensure production-grade quality",
            "Mentor engineers on advanced React patterns, performance optimization, and scalable UI architecture",
            "Partner with product, design, and backend leadership to align technical execution with business goals"
          ]
        },
        {
          "title": "Senior Software Engineer",
          "duration": {
            "from": "2023-02",
            "to": "2024-08"
          },
          "durationText": "Feb 2023 – Aug 2024 · 1 yr 7 mos",
          "responsibilities": [
            "Led the design and implementation of scalable frontend architectures using React.js and Node.js for enterprise-grade platforms",
            "Delivered robust, high-performance UI systems supporting over 1M+ users with strict reliability and uptime requirements",
            "Played a key role in platform migrations and post-acquisition integrations using GraphQL and REST APIs with zero downtime",
            "Optimized application performance through code splitting, lazy loading, memoization, and profiling, reducing page load times by up to 40%",
            "Collaborated closely with design teams using Figma, Avocode, InVision, and Adobe XD to achieve pixel-perfect and accessible UI",
            "Implemented A/B testing, SEO best practices, and WCAG-compliant accessibility standards to improve engagement and Core Web Vitals",
            "Worked cross-functionally using Jira and Git to deliver high-impact features in Agile/Scrum environments"
          ],
          "skills": [
            "React.js",
            "Frontend Architecture",
            "Performance Optimization",
            "REST APIs",
            "SEO",
            "Accessibility"
          ]
        },
        {
          "title": "Software Developer – UI",
          "duration": {
            "from": "2021-07",
            "to": "2023-02"
          },
          "durationText": "Jul 2021 – Feb 2023 · 1 yr 8 mos",
          "responsibilities": [
            "Developed modular, reusable UI components using React, JavaScript (ES6+), and modern CSS frameworks",
            "Implemented responsive, cross-browser interfaces for high-traffic consumer-facing applications",
            "Integrated frontend components with backend APIs to deliver end-to-end user flows",
            "Contributed to performance improvements and frontend stability through refactoring and optimization initiatives"
          ]
        },
        {
          "title": "Associate Software Developer – UI",
          "duration": {
            "from": "2020-08",
            "to": "2021-07"
          },
          "durationText": "Aug 2020 – Jul 2021 · 1 yr",
          "responsibilities": [
            "Built and maintained UI features using HTML, CSS, and JavaScript within large-scale web applications",
            "Converted design specifications into functional, maintainable frontend code",
            "Collaborated with senior engineers to deliver features, fix defects, and improve overall UI quality"
          ]
        }
      ]
    },
    {
      "company": "Cognizant Technology Solutions",
      "companyLogo": "/images/companies/cognizant.png",
      "employmentType": "Full-time",
      "totalDuration": "Sep 2018 – Jul 2020 · 1 yr 11 mos",
      "location": "Bengaluru, Karnataka, India",
      "roles": [
        {
          "title": "Programmer Analyst",
          "duration": {
            "from": "2019-09",
            "to": "2020-07"
          },
          "durationText": "Sep 2019 – Jul 2020 · 11 mos",
          "responsibilities": [
            "Developed Single Page Applications using React.js, Redux, and TypeScript for enterprise clients",
            "Designed responsive, cross-browser user interfaces for banking and healthcare platforms",
            "Integrated RESTful APIs and implemented state management patterns to support complex workflows",
            "Participated in Agile delivery cycles, contributing to sprint planning and on-time feature delivery"
          ]
        },
        {
          "title": "Programmer Analyst Trainee",
          "duration": {
            "from": "2018-09",
            "to": "2019-08"
          },
          "durationText": "Sep 2018 – Aug 2019 · 1 yr",
          "responsibilities": [
            "Trained in enterprise frontend development practices and modern JavaScript frameworks",
            "Contributed to internal tools and client-facing UI modules under senior guidance",
            "Built a strong foundation in Agile development, version control, and code quality standards"
          ]
        }
      ]
    }
  ],

  "achievements": [
    "4 promotions in 5 years at BOLD Technology (fastest career progression)",
    "Featured in company newsletter for exemplary performance",
    "Multiple Kudos awards from senior leadership",
    "IELTS Band 8 – strong professional communication"
  ],

  "education": {
    "degree": "B.Tech in Computer Science & Engineering",
    "institution": "IEC College of Engineering & Technology",
    "year": 2018
  },

  "preferences": {
    "rolesInterestedIn": ["Senior Frontend Engineer", "Frontend Lead", "UI Architect"],
    "workType": ["Full-time", "Remote", "Relocation"],
    "industries": ["SaaS", "EdTech", "HRTech", "FinTech"]
  }
};

export const PORTFOLIO_DATA_DE: PortfolioData = {
  "schemaVersion": "1.0",
  "basics": {
    "name": "Ayushman Mishra",
    "title": "Senior Frontend-Entwickler",
    "tagline": "Entwicklung skalierbarer, leistungsstarker UIs mit React",
    "location": "Noida, Indien",
    "openToRelocation": true,
    "preferredLocations": ["Relocate", "Remote"],
    "experienceYears": 7,
    "availability": "Sofort verfügbar",
    "contact": {
      "email": "ayushmishra.ui@gmail.com",
      "phone": "+91-9990931449",
      "linkedin": "https://linkedin.com/in/ayushmish/"
    }
  },

  "summary": "Senior Frontend-Entwickler mit über 7 Jahren Erfahrung, spezialisiert auf React.js, JavaScript, TypeScript und Node.js. Nachgewiesene Expertise in der Entwicklung skalierbarer, benutzerzentrierter Webanwendungen für wachstumsstarke Unternehmen. Starker Hintergrund in UI-Optimierung, API-Integration, Leistungsoptimierung und Mentoring von Teams in agilen Umgebungen.",

  "skills": {
    "frontend": ["React.js", "Next.js", "Astro", "Redux", "JavaScript (ES6+)", "TypeScript"],
    "styling": ["Tailwind CSS", "SCSS", "Bootstrap", "Material UI"],
    "backend": ["Node.js", "REST APIs", "GraphQL"],
    "cloudDevOps": ["AWS", "Jenkins", "GitHub Actions", "Docker (Basic)", "Netlify", "Vercel"],
    "testing": ["Jest", "Cypress", "React Testing Library"],
    "tools": ["Git", "Figma", "Adobe XD", "JIRA", "Agile/Scrum"]
  },

  "experience": [
    {
      "company": "BOLD Technology Systems Pvt. Ltd",
      "companyLogo": "/images/companies/bold.png",
      "employmentType": "Vollzeit",
      "totalDuration": "Aug 2020 – Aktuell · 5 Jahre 7 Monate",
      "location": "Noida, Uttar Pradesh, Indien",
      "workMode": "Hybrid",
      "keyPlatforms": ["Monster.com", "FlexJobs.com", "MyPerfectResume.com", "LiveCareer.com"],
      "roles": [
        {
          "title": "Module Lead",
          "duration": {
            "from": "07.2024",
            "to": "Aktuell"
          },
          "durationText": "Juli 2024 – Aktuell · 1 Jahr 8 Monate",
          "responsibilities": [
            "Leitung der Frontend-Architektur und -Bereitstellung für groß angelegte React-Anwendungen",
            "Verantwortung für technische Entscheidungen, Codequalität und Leistungsstandards",
            "Mentoring von Ingenieuren und Code-Reviews zur Gewährleistung skalierbarer, wartbarer UI-Systeme"
          ]
        },
        {
          "title": "Senior Software Engineer",
          "duration": {
            "from": "02.2023",
            "to": "08.2024"
          },
          "durationText": "Feb 2023 – Aug 2024 · 1 Jahr 7 Monate",
          "responsibilities": [
            "Leitung des Designs und der Implementierung skalierbarer Webarchitekturen mit ReactJS und Node.js für Plattformen mit über 1 Mio. Nutzern",
            "Entwicklung und Integration von UIs mit Backend-Diensten, Sicherstellung von produktionsreifer Leistung und Zuverlässigkeit",
            "Enge Zusammenarbeit mit Designern unter Verwendung von Figma, Avocode, InVision und Adobe XD für pixelgenaue UIs",
            "Optimierung der Frontend-Leistung mit HTML5, CSS3, JavaScript (ES6+) und SASS/SCSS",
            "Durchführung von A/B-Tests, Sicherstellung der Barrierefreiheit (WCAG) und SEO-Compliance",
            "Zusammenarbeit mit funktionsübergreifenden Teams unter Verwendung von Jira und Git zur Bereitstellung hochwertiger Software"
          ],
          "skills": [
            "React.js",
            "REST APIs",
            "Frontend Entwicklung",
            "SEO",
            "Barrierefreiheit"
          ]
        },
        {
          "title": "Software Developer – UI",
          "duration": {
            "from": "07.2021",
            "to": "02.2023"
          },
          "durationText": "Juli 2021 – Feb 2023 · 1 Jahr 8 Monate",
          "responsibilities": [
            "Erstellung wiederverwendbarer UI-Komponenten mit React und modernem JavaScript",
            "Implementierung responsiver Layouts und Verbesserung der Browserkompatibilität",
            "Zusammenarbeit mit Backend-Teams für API-gesteuerte UI-Entwicklung"
          ]
        },
        {
          "title": "Associate Software Developer – UI",
          "duration": {
            "from": "08.2020",
            "to": "07.2021"
          },
          "durationText": "Aug 2020 – Juli 2021 · 1 Jahr",
          "responsibilities": [
            "Arbeit an der UI-Entwicklung mit HTML, CSS und JavaScript",
            "Umsetzung von Designs in funktionale Webseiten",
            "Unterstützung erfahrener Entwickler bei der Feature-Entwicklung und Fehlerbehebung"
          ]
        }
      ]
    },
    {
      "company": "Cognizant Technology Solutions",
      "companyLogo": "/images/companies/cognizant.png",
      "employmentType": "Vollzeit",
      "totalDuration": "Sep 2018 – Juli 2020 · 1 Jahr 11 Monate",
      "location": "Bengaluru, Karnataka, Indien",
      "roles": [
        {
          "title": "Programmer Analyst",
          "duration": {
            "from": "09.2019",
            "to": "07.2020"
          },
          "durationText": "Sep 2019 – Juli 2020 · 11 Monate",
          "responsibilities": [
            "Entwicklung von SPAs mit React.js, Redux und JavaScript",
            "Integration von REST-APIs und Implementierung von State Management",
            "Arbeit in agilen Teams zur Erfüllung von Sprint-Zielen"
          ]
        },
        {
          "title": "Programmer Analyst Trainee",
          "duration": {
            "from": "09.2018",
            "to": "08.2019"
          },
          "durationText": "Sep 2018 – Aug 2019 · 1 Jahr",
          "responsibilities": [
            "Ausbildung in Frontend-Entwicklung und Unternehmenssoftware-Praktiken",
            "Arbeit an internen Tools und kundenorientierten UI-Modulen"
          ]
        }
      ]
    }
  ],

  "achievements": [
    "4 Beförderungen in 5 Jahren bei BOLD Technology (schnellster Karriereaufstieg)",
    "Vorgestellt im Unternehmensnewsletter für beispielhafte Leistung",
    "Mehrere Auszeichnungen (Kudos) von der Geschäftsleitung",
    "Beförderung bei Cognizant innerhalb von 2 Jahren",
    "IELTS Band 8 – starke professionelle Kommunikation"
  ],

  "education": {
    "degree": "B.Tech in Informatik & Ingenieurwesen",
    "institution": "IEC College of Engineering & Technology",
    "year": 2018
  },

  "preferences": {
    "rolesInterestedIn": ["Senior Frontend Engineer", "Frontend Lead", "UI Architect"],
    "workType": ["Vollzeit", "Remote", "Umzug"],
    "industries": ["SaaS", "EdTech", "HRTech", "FinTech"]
  }
};

export const PORTFOLIO_DATA_JP: PortfolioData = {
  "schemaVersion": "1.0",
  "basics": {
    "name": "アユシュマン・ミシュラ",
    "title": "シニアフロントエンドエンジニア",
    "tagline": "Reactによるスケーラブルで高性能なUIの構築",
    "location": "インド、ノイダ",
    "openToRelocation": true,
    "preferredLocations": ["ドバイ", "リモート"],
    "experienceYears": 7,
    "availability": "即日可能",
    "contact": {
      "email": "ayushmishra.ui@gmail.com",
      "phone": "+91-9990931449",
      "linkedin": "https://linkedin.com/in/ayushmish/"
    }
  },

  "summary": "React.js、JavaScript、TypeScript、Node.jsを専門とするシニアフロントエンドエンジニアとして7年以上の経験。成長企業向けのスケーラブルでユーザー中心のWebアプリケーション構築に実績あり。UI最適化、API統合、パフォーマンスチューニング、アジャイル環境でのチームメンタリングに強みを持っています。",

  "skills": {
    "frontend": ["React.js", "Next.js", "Astro", "Redux", "JavaScript (ES6+)", "TypeScript"],
    "styling": ["Tailwind CSS", "SCSS", "Bootstrap", "Material UI"],
    "backend": ["Node.js", "REST APIs", "GraphQL"],
    "cloudDevOps": ["AWS", "Jenkins", "GitHub Actions", "Docker (Basic)", "Netlify", "Vercel"],
    "testing": ["Jest", "Cypress", "React Testing Library"],
    "tools": ["Git", "Figma", "Adobe XD", "JIRA", "Agile/Scrum"]
  },

  "experience": [
    {
      "company": "BOLD Technology Systems Pvt. Ltd",
      "companyLogo": "/images/companies/bold.png",
      "employmentType": "フルタイム",
      "totalDuration": "2020年8月 – 現在 · 5年7ヶ月",
      "location": "インド、ウッタル・プラデーシュ州ノイダ",
      "workMode": "ハイブリッド",
      "keyPlatforms": ["Monster.com", "FlexJobs.com", "MyPerfectResume.com", "LiveCareer.com"],
      "roles": [
        {
          "title": "モジュールリード",
          "duration": {
            "from": "2024年7月",
            "to": "現在"
          },
          "durationText": "2024年7月 – 現在 · 1年8ヶ月",
          "responsibilities": [
            "大規模Reactアプリケーションのフロントエンドアーキテクチャとデリバリーを主導",
            "技術的な意思決定、コード品質、パフォーマンス基準の推進",
            "エンジニアの指導とコードレビューによるスケーラブルで保守性の高いUIシステムの確保"
          ]
        },
        {
          "title": "シニアソフトウェアエンジニア",
          "duration": {
            "from": "2023年2月",
            "to": "2024年8月"
          },
          "durationText": "2023年2月 – 2024年8月 · 1年7ヶ月",
          "responsibilities": [
            "ReactJSとNode.jsを使用した、100万人以上のユーザーにサービスを提供するプラットフォームのスケーラブルなWebアーキテクチャの設計と実装を主導",
            "UIとバックエンドサービスの開発と統合、本番環境でのパフォーマンスと信頼性の確保",
            "Figma、Avocode、InVision、Adobe XDを使用してデザイナーと緊密に連携し、ピクセルパーフェクトなUIを提供",
            "HTML5、CSS3、JavaScript（ES6+）、SASS/SCSSを使用してフロントエンドパフォーマンスを最適化",
            "A/Bテストの実施、アクセシビリティ（WCAG）とSEOコンプライアンスの確保",
            "JiraとGitを使用した機能横断型チームとの連携による高品質なソフトウェアの提供"
          ],
          "skills": [
            "React.js",
            "REST APIs",
            "フロントエンド開発",
            "SEO",
            "アクセシビリティ"
          ]
        },
        {
          "title": "ソフトウェア開発者 – UI",
          "duration": {
            "from": "2021年7月",
            "to": "2023年2月"
          },
          "durationText": "2021年7月 – 2023年2月 · 1年8ヶ月",
          "responsibilities": [
            "Reactと最新のJavaScriptを使用して再利用可能なUIコンポーネントを構築",
            "レスポンシブレイアウトの実装とクロスブラウザ互換性の向上",
            "API駆動型UI開発のためのバックエンドチームとの連携"
          ]
        },
        {
          "title": "アソシエイトソフトウェア開発者 – UI",
          "duration": {
            "from": "2020年8月",
            "to": "2021年7月"
          },
          "durationText": "2020年8月 – 2021年7月 · 1年",
          "responsibilities": [
            "HTML、CSS、JavaScriptを使用したUI開発",
            "デザインの機能的なWebページへの実装",
            "機能開発とバグ修正におけるシニア開発者のサポート"
          ]
        }
      ]
    },
    {
      "company": "Cognizant Technology Solutions",
      "companyLogo": "/images/companies/cognizant.png",
      "employmentType": "フルタイム",
      "totalDuration": "2018年9月 – 2020年7月 · 1年11ヶ月",
      "location": "インド、カルナータカ州ベンガルール",
      "roles": [
        {
          "title": "プログラマーアナリスト",
          "duration": {
            "from": "2019年9月",
            "to": "2020年7月"
          },
          "durationText": "2019年9月 – 2020年7月 · 11ヶ月",
          "responsibilities": [
            "React.js、Redux、JavaScriptを使用したSPAの開発",
            "REST APIの統合と状態管理の実装",
            "アジャイルチームでのスプリントコミットメントの達成"
          ]
        },
        {
          "title": "プログラマーアナリスト研修生",
          "duration": {
            "from": "2018年9月",
            "to": "2019年8月"
          },
          "durationText": "2018年9月 – 2019年8月 · 1年",
          "responsibilities": [
            "フロントエンド開発とエンタープライズソフトウェア手法の研修",
            "内部ツールとクライアント向けUIモジュールの作業"
          ]
        }
      ]
    }
  ],

  "achievements": [
    "BOLD Technologyで5年間に4回の昇進（最速のキャリアアップ）",
    "模範的なパフォーマンスで社内報に掲載",
    "上級管理職からの複数のKudos賞",
    "Cognizantで2年以内に昇進",
    "IELTS Band 8 – 高い専門的なコミュニケーション能力"
  ],

  "education": {
    "degree": "コンピューターサイエンス工学 学士 (B.Tech)",
    "institution": "IEC College of Engineering & Technology",
    "year": 2018
  },

  "preferences": {
    "rolesInterestedIn": ["シニアフロントエンドエンジニア", "フロントエンドリード", "UIアーキテクト"],
    "workType": ["フルタイム", "リモート", "移住可"],
    "industries": ["SaaS", "EdTech", "HRTech", "FinTech"]
  }
};

export const UI_LABELS_MAP: Record<string, UILabels> = {
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      skills: "Skills",
      achievements: "Achievements",
      hireMe: "Hire Me"
    },
    hero: {
      availability: " for opportunities",
      contactMe: "Contact Me",
      downloadCV: "Download CV",
      linkedin: "LinkedIn",
      yearsExp: "Years Experience",
      openTo: "Open to"
    },
    experience: {
      title: "Professional Journey",
      summary: "Over {years} years of crafting scalable web applications and leading frontend teams to success.",
      currentRole: "Current Role",
      currentLocation: "Current Location",
      keyProjects: "Impacted Platforms"
    },
    skills: {
      title: "Technical Expertise",
      summary: "A comprehensive toolset sharpened over 7 years of building high-performance web applications."
    },
    achievements: {
      title: "Key Achievements",
      education: "Education",
      graduated: "Graduated",
      interests: "Interests"
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with React, Tailwind & Gemini API"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      experience: "Erfahrung",
      skills: "Fähigkeiten",
      achievements: "Erfolge",
      hireMe: "Mich Einstellen"
    },
    hero: {
      availability: "für Angebote",
      contactMe: "Kontaktieren",
      downloadCV: "Lebenslauf (CV)",
      linkedin: "LinkedIn",
      yearsExp: "Jahre Erfahrung",
      openTo: "Offen für"
    },
    experience: {
      title: "Beruflicher Werdegang",
      summary: "Über {years} Jahre Erfahrung in der Erstellung skalierbarer Webanwendungen und der erfolgreichen Leitung von Frontend-Teams.",
      currentRole: "Aktuelle Position",
      currentLocation: "Aktueller Standort",
      keyProjects: "Wichtige Plattformen"
    },
    skills: {
      title: "Technische Fachkenntnisse",
      summary: "Ein umfassendes Toolset, geschärft durch 7 Jahre Entwicklung leistungsstarker Webanwendungen."
    },
    achievements: {
      title: "Wichtige Erfolge",
      education: "Ausbildung",
      graduated: "Abschluss",
      interests: "Interessen"
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      builtWith: "Erstellt mit React, Tailwind & Gemini API"
    }
  },
  jp: {
    nav: {
      home: "ホーム",
      experience: "経歴",
      skills: "スキル",
      achievements: "実績",
      hireMe: "採用について"
    },
    hero: {
      availability: "求職中",
      contactMe: "お問い合わせ",
      downloadCV: "履歴書ダウンロード",
      linkedin: "LinkedIn",
      yearsExp: "年の経験",
      openTo: "希望勤務地"
    },
    experience: {
      title: "職務経歴",
      summary: "{years}年以上にわたり、スケーラブルなWebアプリケーションを作成し、フロントエンドチームを成功に導いてきました。",
      currentRole: "現在の役職",
      currentLocation: "現在の所在地",
      keyProjects: "主要なプラットフォーム"
    },
    skills: {
      title: "専門スキル",
      summary: "7年にわたる高性能Webアプリケーション開発で培われた包括的なツールセット。"
    },
    achievements: {
      title: "主な実績",
      education: "学歴",
      graduated: "卒業",
      interests: "興味・関心"
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "React, Tailwind & Gemini API で構築"
    }
  }
};

// Default export for backward compatibility with existing imports (like geminiService)
export const PORTFOLIO_DATA = PORTFOLIO_DATA_EN;