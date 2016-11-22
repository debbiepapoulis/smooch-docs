import { config, pages as sitePages } from 'config';

export const generateNavStructure = (section = 'docs') => {
    const {subsections} = config.sections[section];
    return subsections.map((subsection) => {
        const {name, pages} = config.subsections[subsection];

        return {
            title: name,
            pages: pages.map((path) => {
                const page = sitePages.find(({path: _path}) => path === _path);

                if (!page) {
                    console.error(`No page found for path ${path}.`);
                }

                return {
                    path: page.path,
                    title: page.data.title
                };
            })
        };
    });
};

// TODO : change this once going to production
export const SITE_ROOT = process.env.NODE_ENV === 'production' ? 'http://docs.smooch.io.s3-website-us-east-1.amazonaws.com' : '';
