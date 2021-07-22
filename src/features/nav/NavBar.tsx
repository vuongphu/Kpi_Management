import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { openCreateForm } = rootStore.projectStore;
  const { user, logout } = rootStore.userStore;
  const [state, setstate] = useState<string>();

  return (
    <Menu fixed="left" vertical widths={1}>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/bar-chart.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Management
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Project</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="Projects"
              active={state === "Projects"}
              onClick={(e, d) => {
                setstate(d.name);
              }}
              as={NavLink}
              to="/projects"
            />
            {(user?.role =='Manager' || user?.role =='Teamlead') &&  <Menu.Item
              name="Create project"
              active={state === "Create project"}
              onClick={(e, d) => {
                setstate(d.name);
                openCreateForm();
              }}
              as={NavLink}
              to="/createProject"
            />}
           {(user?.role =='Manager' || user?.role =='Teamlead') &&  <Menu.Item
              name="Confirm"
              active={state === "Confirm"}
              onClick={(e, d) => {
                setstate(d.name);
              }}
              as={NavLink}
              to="/confirm"
            />}
          </Menu.Menu>
        </Menu.Item>
        {(user?.role =='Manager' || user?.role =='Teamlead') && <Menu.Item>
          <Menu.Header>Employee</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Managemant"
              active={state === "Managemant"}
              onClick={(e, d) => {
                setstate(d.name);
              }}
              as={NavLink}
              to="/employee"
            />
          
          </Menu.Menu>
        </Menu.Item>}
        {(user?.role =='User' || user?.role =='Teamlead') &&  <Menu.Item>
          <Menu.Header>Worksheets</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="Worksheet"
              active={state === "Worksheet"}
              onClick={(e, d) => {
                setstate(d.name);
              }}
              as={NavLink}
              to="/worksheet"
            />
          </Menu.Menu>
        </Menu.Item>}
        <Menu.Item>
          <Menu.Header>Statistic</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="Statistic"
              active={state === "Statistic"}
              onClick={(e, d) => {
                setstate(d.name);
              }}
              as={NavLink}
              to="/statistic"
            />
          </Menu.Menu>
        </Menu.Item>
 

        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};
export default observer(NavBar);
