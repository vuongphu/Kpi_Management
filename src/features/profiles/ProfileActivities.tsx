import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserProject } from '../../app/models/worksheet';

const panes = [
  { menuItem: 'Joined', pane: { key: 'joined' } },
  { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserProjects,
    profile,
    loadingActivities,
    userProjects
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserProjects(profile!.username);
  }, [loadUserProjects, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
     
      case 0:
        predicate = 'joined';
        break;
      case 1:
        predicate = 'hosting';
        break;
      default:
        predicate = 'joined';
        break;
    }

    loadUserProjects(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Activities'} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userProjects.map((activity: IUserProject) => (
              <Card
                as={Link}
                to={`/projects/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/levelImages/${activity.level}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{activity.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(activity.date), 'do LLL')}</div>
                    <div>{format(new Date(activity.date), 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);
