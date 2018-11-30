import * as React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import styled from "styled-components";

import { Layout, Icon, Menu } from "./components";

import { actions as ironmanActions } from "redux/ironman";
import { actions as sidebarActions } from "redux/sidebar";
import { thunks as userThunks } from "redux/user";

import Calcs from "./pages/Calcs";
import User from "./pages/User";
import Prices from "./pages/Prices";
import Admin from "./pages/Admin";
import Transcripts from "./pages/Transcripts";

const items = [
  {
    link: "/calcs",
    label: "Calculators",
    icon: "area-chart",
    comp: Calcs
  },
  {
    link: "/prices",
    label: "Prices",
    icon: "dollar",
    comp: Prices
  },
  {
    link: "/transcripts",
    label: "Transcripts",
    icon: "search",
    comp: Transcripts
  },
  {
    link: "/admin",
    icon: "lock",
    label: "Admin",
    comp: Admin,
    children: [
      {
        link: "/transcripts",
        icon: "search",
        label: "Transcripts"
      }
    ]
  }
];

class App extends React.Component {
  componentDidMount = () => {
    this.props.auth();
  };
  render() {
    const props = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Sider collapsible collapsed={props.sidebar} onCollapse={props.toggleSidebar}>
          <Logo />

          <Menu hideLabels={props.sidebar} options={items} theme="dark" mode="inline" />

          <NavLink to="/user">
            <IsUser width={props.sidebar ? 80 : 200}>
              <Icon type="user" />
              {!props.sidebar && "Account"}
            </IsUser>
          </NavLink>

          <ToggleIron onClick={props.toggleIronman} width={props.sidebar ? 80 : 200}>
            {props.ironman ? <Icon type="check" /> : <Icon type="close" />}
            {props.sidebar ? "IM" : "Ironman mode"}
          </ToggleIron>
        </Layout.Sider>
        <Layout>
          <Layout.Content style={{ margin: "8px" }}>
            <Switch>
              <Route path="/user" component={User} />

              {items.map(item => (
                <Route key={item.link} path={item.link} component={_props => <item.comp {..._props} />} />
              ))}
              <Redirect to={items[0].link} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  sidebar: state.sidebar,
  ironman: state.ironman
});

export default connect(
  mapStateToProps,
  {
    toggleIronman: ironmanActions.toggle,
    toggleSidebar: sidebarActions.toggle,
    auth: userThunks.auth
  }
)(App);

const Logo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;

const ToggleIron = styled.div.attrs({
  className: "ant-layout-sider-trigger"
})`
  bottom: 48px !important;
  width: ${props => props.width + "px"}
  background: #021b31 !important;
  i {
    margin-right:5px;
  }
`;

const IsUser = styled.div.attrs({
  className: "ant-layout-sider-trigger"
})`
bottom: 96px !important;
width: ${props => props.width + "px"}
background: #011221 !important;
i {
  margin-right:5px;
}`;
