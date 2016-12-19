import { config, pages as sitePages } from 'config';
import loadContext from '.gatsby-context';

const paths = {};

function preloadPaths(pageReq) {
    sitePages
        .filter((p) => !!p.path)
        .forEach((page) => {
            let title = page.data.title;
            if (['jsx'].includes(page.file.ext)) {
                const p = pageReq(`./${page.requirePath}`);
                title = p.title;
            }

            paths[page.path] = {
                path: page.path,
                title: title,
                internal: true
            };
        });
}

loadContext((pageReq) => {
    preloadPaths(pageReq);
});

export const generateNavStructure = (section = 'docs') => {
    const {subsections} = config.sections[section];
    return subsections.map((subsection) => {
        const {name, pages} = config.subsections[subsection];

        return {
            title: name,
            pages: pages.map((path) => {
                if (path.startsWith('/')) {
                    return paths[path];
                }

                const [title, ...rest] = path.split('__');
                return {
                    path: rest.join(''),
                    title,
                    internal: false
                };
            })
        };
    });
};

// TODO : change this once going to production
export const SITE_ROOT = process.env.NODE_ENV === 'production' ? 'http://docs.smooch.io.s3-website-us-east-1.amazonaws.com' : '';
