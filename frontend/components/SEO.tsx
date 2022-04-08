import Head from "next/head";

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    shouldExcludeTitleSuffix?: boolean;
    shouldIndexPage?: boolean;
}

export function SEO({
    title,
    description,
    image,
    shouldExcludeTitleSuffix = false,
    shouldIndexPage = true,
}: SEOProps) {

    const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| Hackathona' : ''}`;
    const pageImage = image ? `${process.env.NEXT_PUBLIC_SITE_URL}/${image}` : undefined;

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

            {description && <meta name="description" content={description} />}
            {image && <link rel="icon" href={pageImage} />}

            {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}
        </Head>
    )
}