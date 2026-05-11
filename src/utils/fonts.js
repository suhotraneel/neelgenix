/**
 * Dynamically injects Gotham @font-face declarations using Vite's BASE_URL.
 * This ensures fonts load correctly on both GitHub Pages (/neelgenix/) and Vercel (/).
 */
export function injectGothamFonts() {
  const base = import.meta.env.BASE_URL;
  const g = `${base}assets/gotham/`;

  const fontFaces = [
    { file: 'Gotham-Thin',         weight: 100, style: 'normal'  },
    { file: 'Gotham-ThinItalic',   weight: 100, style: 'italic'  },
    { file: 'Gotham-XLight',       weight: 200, style: 'normal'  },
    { file: 'Gotham-XLightItalic', weight: 200, style: 'italic'  },
    { file: 'Gotham-Light',        weight: 300, style: 'normal'  },
    { file: 'Gotham-LightItalic',  weight: 300, style: 'italic'  },
    { file: 'Gotham-Book',         weight: 400, style: 'normal'  },
    { file: 'Gotham-BookItalic',   weight: 400, style: 'italic'  },
    { file: 'Gotham-Medium',       weight: 500, style: 'normal'  },
    { file: 'Gotham-MediumItalic', weight: 500, style: 'italic'  },
    { file: 'Gotham-Bold',         weight: 700, style: 'normal'  },
    { file: 'Gotham-BoldItalic',   weight: 700, style: 'italic'  },
    { file: 'Gotham-Black',        weight: 800, style: 'normal'  },
    { file: 'Gotham-BlackItalic',  weight: 800, style: 'italic'  },
    { file: 'Gotham-Ultra',        weight: 900, style: 'normal'  },
    { file: 'Gotham-UltraItalic',  weight: 900, style: 'italic'  },
  ];

  const css = fontFaces
    .map(
      ({ file, weight, style }) =>
        `@font-face { font-family: 'Gotham'; src: url('${g}${file}.otf') format('opentype'); font-weight: ${weight}; font-style: ${style}; }`
    )
    .join('\n');

  const style = document.createElement('style');
  style.id = 'gotham-fonts';
  style.textContent = css;
  document.head.appendChild(style);
}
