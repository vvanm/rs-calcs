import React from "react";
import { NavLink } from "react-router-dom";
import Base from "antd/lib/menu";
import { Img, Icon } from "components";

const Menu = props => {
  const renderSubMenu = (link, icon, label, children) => {
    return (
      <Base.SubMenu
        key={link}
        title={
          <span>
            <Icon type={icon} />
            {!props.hideLabels && label}
          </span>
        }
      >
        {children.map(child => renderItem(link + child.link, child.icon, child.img, child.label))}
      </Base.SubMenu>
    );
  };

  const renderItem = (link, icon, img, label) => {
    return (
      <Base.Item key={link}>
        <NavLink to={link}>
          {icon !== undefined && <Icon type={icon} />}
          {img !== undefined && <Img id={img} />}
          <span>{label}</span>
        </NavLink>
      </Base.Item>
    );
  };

  let _props = { ...props };

  delete _props.hideLabels;

  return (
    <Base {..._props}>
      {props.options.map(option => {
        const { link, label, img, icon, children } = option;
        return children !== undefined ? renderSubMenu(link, icon, label, children) : renderItem(props.prefix + link, icon, img, label);
      })}
    </Base>
  );
};

Menu.defaultProps = {
  prefix: "",
  selectedKeys: []
};

export default Menu;
