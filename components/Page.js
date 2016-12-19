import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import SiteNav from '../components/SiteNav';
import DocsNav from '../components/DocsNav';
import { SITE_ROOT } from '../utils/navigation';

export default class extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        title: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {route, className, children, title} = this.props;
        const {data} = route.page;

        const path = `${SITE_ROOT}${route.path}`;

        const meta = [{
            property: 'og:title',
            content: title || data.title
        }, {
            property: 'og:url',
            content: path
        }];

        const link = [{
            rel: 'canonical',
            href: path
        }];

        return <div className={ className }>
                   <Helmet title={ title || data.title }
                           meta={ meta }
                           link={ link } />
                   <SiteNav section={ data.section } />
                   <DocsNav route={ route } />
                   { children }
               </div>;
    }
}
