/**
 * menu菜单导航  用于模块的中使用到的树形导航
 */

import React, {Component} from 'react';
import {Router, Route, Link} from 'react-router';

import PropTypes from 'prop-types';

import {Menu, Layout} from 'antd';
const {SubMenu, ItemGroup} = Menu;
const {Header, Content} = Layout;

import './MenuNav.less';

class MenuNav extends Component {
  static propTypes = {
    selected: PropTypes.string,
    menu: PropTypes.array.isRequired,
    updateNew: PropTypes.bool,
    updateNewKey: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {selected, menu, children, updateNew, updateNewKey} = this.props;
    const moduelPerfix = 'm-menuNav';

    //获取分组菜单的key,默认全部展开
    const groupkeys = menu.filter(m => {
      return !!m.children;
    }).map(m => {
      return m.key;
    });

    return (<Layout className={`${moduelPerfix}`}>
      <Header className={`${moduelPerfix}-header`}>
        {children}
      </Header>
      <Content className={`${moduelPerfix}-content`}>
        <Menu defaultSelectedKeys={[menu[0].key]} selectedKeys={[selected]} defaultOpenKeys={groupkeys} mode="inline">

          {
            menu.map((item) => {
              if (item.url) {
                return (<Menu.Item key={item.key}>
                  <Link to={item.url}>
                    {item.name}
                  </Link>
                </Menu.Item>);
              } else if (item.children) {
                const children = item.children.map(c => {
                  return (<Menu.Item key={c.key} className={{'m-menuNav-new': updateNew && c.key==updateNewKey}}>
                    <Link to={c.url}>
                      {c.name}
                    </Link>
                  </Menu.Item>);
                });
                return (<SubMenu key={item.key} title={item.name}>
                  {children}
                </SubMenu>);
              }

            })
          }
        </Menu>
      </Content>
    </Layout>);

  }
}

export default MenuNav;
