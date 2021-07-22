import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";



import { observer } from "mobx-react-lite";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import HomePage from "./../../features/home/HomePage";

import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "./../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from './../common/modals/ModalContainer';
import ProfilePage from "../../features/profiles/ProfilePage";
import Sample from "./Sample";
import WorkSheetPage from "../../features/worksheets/WorkSheetPage";
import EmployeeContent from "../../features/user/EmployeeContent";
import StatisticContent from "../../features/statistic/StatisticPage";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import ProjectForm from "../../features/project/form/ProjectForm";
import ProjectDetails from "../../features/project/details/ProjectDetails";
import ProjectWorksheetConfirm from "../../features/project/confirm/ProjectWorksheetPage";
import StatisticPage from "../../features/statistic/StatisticPage";
import PrivateRoute from "./PrivateRoute";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    }
    else {
      setAppLoaded()
    }

  }, [getUser, setAppLoaded, token])
  if (!appLoaded) return <LoadingComponent content='Loading app...' />
  return (

    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            {/* <NavBarLeft/> */}
            <div style={{ marginLeft: "17em" }}>
              <Container style={{ paddingTop: "3em" }} >

                <Switch>
                  <PrivateRoute exact path='/projects' component={ProjectDashboard} />
                  <PrivateRoute path='/projects/:id' component={ProjectDetails} />
                  <PrivateRoute path={["/confirm/:id", "/confirm"]} component={ProjectWorksheetConfirm} />
                  <PrivateRoute path='/login' component={LoginForm} />
                  <PrivateRoute path='/profile/:username' component={ProfilePage} />
                  <PrivateRoute path='/worksheet' component={WorkSheetPage} />
                  <PrivateRoute path='/employee' component={EmployeeContent} />
                  <PrivateRoute path='/statistic' component={StatisticPage} />
                  <PrivateRoute
                    key={location.key}
                    path={["/createProject", "/manage/:id"]}
                    component={ProjectForm}
                  />
                  <Route component={NotFound} />

                </Switch>
              </Container>
            </div>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
