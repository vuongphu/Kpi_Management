import { format } from 'date-fns';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'

import { IProject } from '../../../app/models/project';
const ProjectDetailedInfo:React.FC<{project:IProject}> = ({project}) => {
    return (
        <Segment.Group>
              <Segment attached='top'>
                <Grid>
                  <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info' />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <p>{project.description}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='calendar' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <span>
                    {format(project.date,'eeee do MMMM')} at{format(project.date,'h:mm aa')}
                    </span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='level up alternate' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <p>
                      {project.level}
                    </p>
                    {/* <span>{project.opKpi}, {project.qcKpi}</span> */}
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='certificate' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <p>
                    OP KPI Target {project.opKpi}
                    </p>
                    {/* <span>{project.opKpi}, {project.qcKpi}</span> */}
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='certificate' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <p>
                      QC KPI Target {project.qcKpi}
                    </p>
                    {/* <span>{project.opKpi}, {project.qcKpi}</span> */}
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>
    )
}
export default ProjectDetailedInfo