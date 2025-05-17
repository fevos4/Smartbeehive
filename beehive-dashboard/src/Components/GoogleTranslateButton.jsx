import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../Styles/Components/GoogleTranslateButton.scss';

const GoogleTranslateButton = () => {
  const [language, setLanguage] = useState('');
  const googleTranslateElementRef = useRef(null);

  const debouncedSetLanguage = useCallback((lang) => {
    document.cookie = `googtrans=/en/${lang};path=/;domain=${window.location.hostname}`;
    window.location.reload(); // Required to trigger translation
  }, []);

  const handleChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    debouncedSetLanguage(lang);
  };

  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      if (googleTranslateElementRef.current) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      }
    };

    const interval = setInterval(() => {
      const bannerFrame = document.querySelector('iframe.goog-te-banner-frame');
      if (bannerFrame) {
        bannerFrame.style.display = 'none';
        document.body.style.top = '0px';
      }

      const googBar = document.getElementById(':1.container');
      if (googBar) {
        googBar.style.display = 'none';
      }
    }, 500);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList?.contains('goog-te-spinner-pos') || node.classList?.contains('goog-te-balloon-frame')) {
            node.style.display = 'none';
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element" ref={googleTranslateElementRef} />
      <select
        onChange={handleChange}
        value={language}
        className="language-select"
      >
        <option value="" disabled>Select Language</option>
        <option value="en">English</option>
        <option value="am">Amharic</option>
        <option value="om">Afaan Oromoo</option>
        <option value="ti">Tigrigna</option>
      </select>
    </div>
  );
};

export default GoogleTranslateButton;
