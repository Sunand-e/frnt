import { useState, useEffect } from 'react';

const useFetchSVG = (url) => {
  const [svgContent, setSvgContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch SVG');
        }
        const svg = await response.text();
        setSvgContent(svg);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSvg();
  }, [url]);

  return { svgContent, loading, error };
};

export default useFetchSVG;