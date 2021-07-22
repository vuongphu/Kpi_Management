import React, {  useContext, Fragment } from "react";
import { Container, Button, Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from './../user/LoginForm';
import RegisterForm from './../user/RegisterForm';
const HomePage = () => {
  const token =window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn,user}=rootStore.userStore;
  const {openModal} = rootStore.modelStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
     
        <Header as="h1" inverted>
   
    <Icon.Group size='small' style={{fontSize: '.9em'}}>
    
      <Icon name='user circle' />
    </Icon.Group>
          Kpi Management
        </Header>
        {isLoggedIn && user &&token ?
        (<Fragment>
            <Header as="h2" inverted content={`Welcome to ${user.displayName}`} />
        <Button as={Link} to="/projects" size="huge" inverted>
          Go to Dashboard!
        </Button>
        </Fragment>):(
          <Fragment>
     
        <Button onClick={()=>openModal(<LoginForm/>)} to="/login" size="huge" inverted>
          Login
        </Button>
        </Fragment>)
        }
      </Container>
    </Segment>
  );
};
export default HomePage;
