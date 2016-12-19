import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem, Button, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { generateNavStructure } from '../utils/navigation';

export default class extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired
    };

    render() {
        const docsNavStructure = generateNavStructure(this.props.section);

        const navItems = [
            <NavItem eventKey={ 1 }
                     key={ 1 }
                     href='https://smooch.io/is/'>
                Product
            </NavItem>,
            <NavItem eventKey={ 2 }
                     key={ 2 }
                     href='https://smooch.io/is/'>
                Features
            </NavItem>,
            <NavItem eventKey={ 3 }
                     key={ 3 }
                     href='https://app.smooch.io/integrations'>
                Integrations
            </NavItem>,
            <LinkContainer to='/'
                           className='hidden-xs'
                           key={ 4 }>
                <NavItem eventKey={ 4 }>
                    Docs
                </NavItem>
            </LinkContainer>,
            <NavItem eventKey={ 5 }
                     key={ 5 }
                     href='https://smooch.io/customers/'>
                Customers
            </NavItem>,
            <NavItem eventKey={ 6 }
                     key={ 6 }
                     href='http://blog.smooch.io'>
                Blog
            </NavItem>
        ];

        docsNavStructure.forEach((section, i) => {
            const subitems = section.pages.map(({path, title, internal}, j) => {
                return internal ?
                    <LinkContainer to={ path }
                                   key={ 7.1 + i + 0.1 * j }>
                        <MenuItem eventKey={ 7.1 + i + 0.1 * j }>
                        { title }
                        </MenuItem>
                    </LinkContainer> :
                    <MenuItem eventKey={ 7.1 + i + 0.1 * j }
                              href={ path }
                              key={ 7.1 + i + 0.1 * j }>
                    { title }
                    </MenuItem>;
            });

            const item = <NavDropdown eventKey={ 7 + i }
                                      key={ 7 + i }
                                      title={ section.title }
                                      ref={ section.title }
                                      className='visible-xs'
                                      id='doc-nav'>
                             { subitems }
                         </NavDropdown>;

            navItems.push(item);
        });


        return <Navbar className='navbar-site'>
                   <Navbar.Header>
                       <Navbar.Brand>
                           <a href='https://smooch.io'><img src={ require('images/smooch_logo.svg') }
                                                            className='full-logo hidden-sm'
                                                            alt='Smooch logo' /><img src={ require('images/smooch_icon_logo.png') }
                                                                                                                                              className='logo-only visible-sm'
                                                                                                                                              alt='Smooch logo' /></a>
                       </Navbar.Brand>
                       <Navbar.Toggle />
                   </Navbar.Header>
                   <Navbar.Collapse>
                       <Nav>
                           { navItems }
                       </Nav>
                       <Nav pullRight>
                           <NavItem eventKey={ 7 + docsNavStructure.length + 1 }
                                    href='https://app.smooch.io/login'>
                               Login
                           </NavItem>
                           <NavItem eventKey={ 7 + docsNavStructure.length + 2 }
                                    href='https://app.smooch.io/signup'>
                               Sign up
                           </NavItem>
                       </Nav>
                   </Navbar.Collapse>
               </Navbar>;
    }
}
