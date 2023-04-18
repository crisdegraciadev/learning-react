import { useEffect, useState } from 'react';

const IMAGE_API_BASE_URL = 'https://cataas.com';

type CatImageParams = {
  fact?: string;
};

export const useCatImage = ({ fact }: CatImageParams) => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (!fact) return;

    const firstWord: string = fact.split(' ')[0];

    fetch(`${IMAGE_API_BASE_URL}/cat/says/${firstWord}?size=50&color=red&json=true`)
      .then((res) => res.json())
      .then((res) => {
        const { url } = res;
        setImageUrl(url);
      });
  }, [fact]);

  return { imageUrl: `${IMAGE_API_BASE_URL}/${imageUrl}` };
};
