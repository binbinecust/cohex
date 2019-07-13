/**
 * 前端应用入口文件
 */

/**
 * 导入依赖
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

import {Popover, Layout,Menu} from 'antd';
const {Content, Sider,Header,Footer} = Layout;
const SubMenu = Menu.SubMenu;
import MenuNav from '../components/MenuNav';
import {config} from '../config';
import {postMessage} from '../utils';
import {RouteUrls} from './constants';

import '../assets/css/index.less';
import './app.less';

const moduelPerfix = 'm-app';
const pathnameMap = {
  [config.ADMIN_ROUTES.HOME]: '/daily/',
};
class App extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const {route} = props;
    this.state = {
       MENUS: config.MENUS
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  _getDefaultSelect(){
    let path=location.pathname;
    let sel="",opens=[]
    RouteUrls.map(m=>{
      if(m.subs){
        opens.push(m.key);
        m.subs.map(s=>{
          if(s.url==path){
            sel=s.key;
          }
        });
      }else{
        if(m.url==path){
          sel=m.key;
        }
      }
    });
    return {
      selKey:[sel],
      openKey:opens,
    };
  }

  render() {

    const {children} = this.props;

    const {MENUS} = this.state;
    let {pathname} = location;
    const dKey=this._getDefaultSelect();console.log(dKey);
    return (<Layout className={`${moduelPerfix}`}>
          <Header className={`${moduelPerfix}-header`}>
            <Layout>
              <Sider width={200} className="logo">logologologo</Sider>
              <Content className="menu">
                  <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">日报</Menu.Item>
                  <Menu.Item key="2">工作流</Menu.Item>
                  <Menu.Item key="3">培训</Menu.Item>
                </Menu>
              </Content>
              <Sider width={200} className="user">useruseruser</Sider>
            </Layout>
            
          </Header>
          <Layout>
            <Sider width={200} className={`${moduelPerfix}-sider`}>
             <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={dKey.selKey}
                  defaultOpenKeys={dKey.openKey}
                  style={{ lineHeight: '64px' }}
                >
                  {RouteUrls.map((menu)=>
                    menu.subs?<SubMenu key={menu.key} title={menu.name}>
                    {menu.subs.map((sub)=><Menu.Item key={sub.key}>{sub.name}</Menu.Item>)}
                  </SubMenu>:<Menu.Item key={menu.key}>{menu.name}</Menu.Item>
                  )}
                 
                </Menu>
            </Sider>
            <Content className={`${moduelPerfix}-content`}>
            {children}
            </Content>
          </Layout>
          <Footer className={`${moduelPerfix}-footer`}>Footer</Footer>
    </Layout>);
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, bindActionCreators({}, dispatch));
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
