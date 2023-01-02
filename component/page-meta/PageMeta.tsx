//@ts-ignore
import { FC } from 'react';
// import { Helmet } from 'react-helmet-async';

// import { APP_NAME } from 'constants/commonConstants';

// import favicon1 from 'images/favicon1.png';
// import favicon2 from 'images/favicon.svg?url';
// import { APP_NAME } from 'constants/commonConstants';
import Head from 'next/head';
import images from '../utils/images';

export type Props = {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
};

const cutTags = (text = '') => text.replace(/<\/?.+?>/gi, '');

const prepareData = ({ title, description, image, canonicalUrl }: Props) => ({
  title: cutTags(title),
  description: cutTags(description).substr(0, 250),
  image,
  canonicalUrl,
});

const PageMeta: FC<Props> = (props: Props) => {
  const { title, description, image, canonicalUrl } = prepareData(props);
  console.log('this is title====', title, description, canonicalUrl);
  return (
    <Head>
      {title ? (
        // <title>{title} - {APP_NAME} </title>
        <title>{title} </title>
      ) : (
        // <title>{APP_NAME}</title>
        <title>"APP_NAME"</title>
      )}
      {/* <link rel="icon" type="image/svg+xml" href={images.favicon2} /> */}
      {/* <link rel="icon" type="image/png" href={images.favicon1} /> */}
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {/* <meta name="robots" content="index, follow"/>  */}
      <meta name="robots" content="noindex, nofollow" />
      {description && <meta name="description" content={description} />}
      {description && <meta name="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
    </Head>
  );
};

const memorizedPageMeta = PageMeta;

export { memorizedPageMeta as PageMeta };
