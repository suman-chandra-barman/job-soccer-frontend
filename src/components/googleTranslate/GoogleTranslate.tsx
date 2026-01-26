/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get saved language from localStorage
    const savedLang = localStorage.getItem("googtrans");
    if (savedLang) {
      // Format: /en/de or /en/en
      const lang = savedLang.split("/")[2] || "en";
      setCurrentLang(lang);
    }

    // Add the Google Translate script
    const addScript = () => {
      // Check if already loaded
      if (window.google?.translate) {
        initTranslate();
        return;
      }

      // Set init function
      window.googleTranslateElementInit = initTranslate;

      // Add script if not exists
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
      }
    };

    const initTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr",
            autoDisplay: false,
          },
          "google_translate_element",
        );

        // Mark as loaded
        setTimeout(() => {
          setIsLoaded(true);

          // Apply saved language after load
          const savedLang = localStorage.getItem("googtrans");
          if (savedLang) {
            const lang = savedLang.split("/")[2] || "en";
            if (lang !== "en") {
              triggerTranslation(lang);
            }
          }
        }, 1000);
      }
    };

    addScript();
  }, []);

  const triggerTranslation = (lang: string) => {
    const findAndTrigger = (attempts = 0) => {
      if (attempts > 30) {
        console.log("Translation trigger timeout");
        return;
      }

      const select = document.querySelector(
        "select.goog-te-combo",
      ) as HTMLSelectElement;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change", { bubbles: true }));

        // Save to localStorage
        const domain = window.location.hostname;

        if (lang === "en") {
          // Clear all translation cookies and storage
          localStorage.removeItem("googtrans");

          // Clear cookies for all domain variations
          document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        } else {
          // Set language cookies and storage
          localStorage.setItem("googtrans", `/en/${lang}`);
          document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}; max-age=2592000`;
          document.cookie = `googtrans=/en/${lang}; path=/; max-age=2592000`;
        }
      } else {
        setTimeout(() => findAndTrigger(attempts + 1), 100);
      }
    };

    findAndTrigger();
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setCurrentLang(newLang);
    triggerTranslation(newLang);
  };

  return (
    <>
      {/* Google Translate Element (hidden) */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Language Selector */}
      <div className="language-switch-container">
        <select
          className="language-select"
          value={currentLang}
          onChange={handleLanguageChange}
          disabled={!isLoaded}
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <style jsx global>{`
        /* Hide Google UI */
        .skiptranslate {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        #google_translate_element {
          display: none !important;
        }
        iframe.skiptranslate {
          display: none !important;
        }
        .goog-te-spinner-pos {
          display: none !important;
        }

        /* Container */
        .language-switch-container {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        /* Language Select */
        .language-select {
          padding: 8px 32px 8px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          border: 1px solid gray;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%2362C1BF' d='M4.5 6L8 9.5L11.5 6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          min-width: 140px;
        }

        .language-select:hover:not(:disabled) {
          border-color: #4da9a7;
          box-shadow: 0 2px 8px rgba(98, 193, 191, 0.2);
        }

        .language-select:focus {
          outline: none;
          border-color: #62c1bf;
          box-shadow: 0 0 0 3px rgba(98, 193, 191, 0.2);
        }

        .language-select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #f1f5f9;
        }

        .language-select option {
          padding: 8px;
          font-weight: 500;
        }

        /* Language Labels */
        .language-labels {
          display: flex;
          gap: 12px;
          font-weight: 600;
          font-size: 14px;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .lang-label {
          color: #94a3b8;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .lang-label.active {
          color: #62c1bf;
          transform: scale(1.1);
        }

        /* Loading Spinner */
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #e2e8f0;
          border-top-color: #62c1bf;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .language-select {
            min-width: 120px;
            font-size: 13px;
            padding: 6px 28px 6px 10px;
          }
        }
      `}</style>
    </>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useEffect, useState, useCallback } from "react";

// declare global {
//   interface Window {
//     googleTranslateElementInit?: () => void;
//     google?: any;
//   }
// }

// export default function GoogleTranslate() {
//   const [currentLang, setCurrentLang] = useState<string>("en");
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Restore saved language
//     const saved = localStorage.getItem("googtrans");
//     if (saved) {
//       const lang = saved.split("/")[2] || "en";
//       setCurrentLang(lang);
//     }

//     const addScript = () => {
//       if (window.google?.translate) {
//         initTranslate();
//         return;
//       }

//       window.googleTranslateElementInit = initTranslate;

//       if (!document.querySelector('script[src*="translate.google.com"]')) {
//         const script = document.createElement("script");
//         script.src =
//           "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//         script.async = true;
//         document.head.appendChild(script);
//       }
//     };

//     const initTranslate = () => {
//       if (!window.google?.translate?.TranslateElement) return;

//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,de",
//           autoDisplay: false,
//           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );

//       // Give extra time — very important in 2025+
//       setTimeout(() => {
//         setIsLoaded(true);

//         const saved = localStorage.getItem("googtrans");
//         if (saved) {
//           const lang = saved.split("/")[2] || "en";
//           if (lang !== "en") {
//             // Double trigger helps sometimes
//             triggerTranslation(lang);
//             setTimeout(() => triggerTranslation(lang), 800);
//           }
//         }
//       }, 1200);
//     };

//     addScript();

//     return () => {
//       // Optional cleanup
//       const script = document.querySelector('script[src*="translate.google.com"]');
//       if (script) script.remove();
//     };
//   }, [triggerTranslation]);

//   const triggerTranslation = useCallback((lang: string) => {
//     let attempts = 0;
//     const maxAttempts = 40;

//     const tryTranslate = () => {
//       if (attempts >= maxAttempts) {
//         console.warn("Could not trigger translation after max attempts");
//         return;
//       }

//       const select = document.querySelector(
//         ".goog-te-combo"
//       ) as HTMLSelectElement | null;

//       if (select) {
//         // Small priming trick — sometimes pushes better style (marketing tone)
//         // You can experiment with removing this
//         try {
//           const dummy = document.createElement("div");
//           dummy.innerHTML = "Deine ultimative Plattform";
//           document.body.appendChild(dummy);
//           setTimeout(() => dummy.remove(), 300);
//         } catch {}

//         select.value = lang;
//         select.dispatchEvent(new Event("change", { bubbles: true }));

//         // Save language state
//         saveLanguage(lang);
//       } else {
//         attempts++;
//         setTimeout(tryTranslate, 120);
//       }
//     };

//     tryTranslate();
//   }, []);

//   const saveLanguage = (lang: string) => {
//     const domain = window.location.hostname;

//     if (lang === "en") {
//       localStorage.removeItem("googtrans");
//       document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
//       document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
//       document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
//     } else {
//       const value = `/en/${lang}`;
//       localStorage.setItem("googtrans", value);
//       const thirtyDays = 30 * 24 * 60 * 60;
//       document.cookie = `googtrans=${value}; path=/; domain=${domain}; max-age=${thirtyDays}; SameSite=Lax`;
//       document.cookie = `googtrans=${value}; path=/; max-age=${thirtyDays}; SameSite=Lax`;
//     }
//   };

//   const toggleLanguage = () => {
//     if (!isLoaded) return;

//     const newLang = currentLang === "en" ? "de" : "en";
//     setCurrentLang(newLang);
//     triggerTranslation(newLang);
//   };

//   return (
//     <>
//       <div id="google_translate_element" style={{ display: "none" }} />

//       <div className="language-switch-container">
//         <div className="language-labels flex items-center gap-3">
//           <span className={`lang-label ${currentLang === "en" ? "active" : ""}`}>
//             EN
//           </span>

//           <button
//             className="language-switch"
//             onClick={toggleLanguage}
//             disabled={!isLoaded}
//             aria-label="Switch between English and German"
//           >
//             <span className={`switch-slider ${currentLang === "de" ? "active" : ""}`} />
//           </button>

//           <span className={`lang-label ${currentLang === "de" ? "active" : ""}`}>
//             DE
//           </span>
//         </div>

//         {!isLoaded && <div className="loading-spinner ml-3" />}
//       </div>

//       <style jsx global>{`
//         .skiptranslate,
//         .goog-te-banner-frame,
//         iframe.skiptranslate,
//         .goog-te-spinner-pos,
//         body > .goog-te-combo {
//           display: none !important;
//         }

//         body {
//           top: 0 !important;
//         }

//         .language-switch-container {
//           display: inline-flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .language-labels {
//           font-weight: 600;
//           font-size: 14px;
//         }

//         .lang-label {
//           color: #94a3b8;
//           transition: all 0.3s;
//         }

//         .lang-label.active {
//           color: #62c1bf;
//           transform: scale(1.08);
//         }

//         .language-switch {
//           position: relative;
//           width: 64px;
//           height: 32px;
//           background: #62c1bf;
//           border-radius: 9999px;
//           border: none;
//           cursor: pointer;
//           transition: all 0.25s;
//         }

//         .language-switch:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .switch-slider {
//           position: absolute;
//           inset: 2px;
//           width: 28px;
//           height: 28px;
//           background: white;
//           border-radius: 50%;
//           transition: all 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//           box-shadow: 0 1px 4px rgba(0,0,0,0.2);
//         }

//         .switch-slider.active {
//           transform: translateX(32px);
//         }

//         .loading-spinner {
//           width: 20px;
//           height: 20px;
//           border: 3px solid #e2e8f0;
//           border-top-color: #62c1bf;
//           border-radius: 50%;
//           animation: spin 0.9s linear infinite;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         @media (max-width: 640px) {
//           .language-switch { width: 56px; height: 28px; }
//           .switch-slider.active { transform: translateX(28px); }
//         }
//       `}</style>
//     </>
//   );
// }
