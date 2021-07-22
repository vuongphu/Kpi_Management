

import React, { useContext, useEffect } from 'react'

import { Dropdown, Grid, Header, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { roleProject } from '../../app/common/options/roleOption';
import { observer, Observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { getLocationZone } from '../../app/common/util/util';

const StatisticFilter = () => {
  const rootStore = useContext(RootStoreContext);

  const { predicate, setPredicate, loadingInitial, loadProjects, userProjects, loadStatistics,statisticArray } = rootStore.statisticStore;
  useEffect(() => {
    if (userProjects.length == 0) {
      loadProjects();
    }

    if (predicate.has('id') && predicate.has('role') && predicate.has("fromDay") && predicate.has("toDay") ) {

      setPredicate('time', getLocationZone());
      loadStatistics()
    }
    console.log("HERE")
  }, [loadProjects, JSON.stringify(predicate)]);

  return (
    <Segment.Group>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>   Choose Project - Role - Start/End Day  </Header>
      </Segment>
      <Segment attached="top" loading={loadingInitial}>
        <Grid>
          <Grid.Column width={6}>
            <Dropdown
              placeholder="Select Project"
              fluid
              search
              selection
              defaultValue = {predicate.has("id") ? predicate.get("id"):""}
              onChange={(e, d) => {
              
                setPredicate('id', d.value!.toLocaleString())
              }}
              wrapSelection={false}
              options={userProjects.map((project) => ({
                key: project.id,
                value: project.id,
                text: project.title,
                image: {
                  avatar: true,
                  src: `/assets/levelImages/${project.level == "Hard"
                    ? "hard"
                    : project.level == "Normal"
                      ? "normal"
                      : "easy"
                    }.jpg`,
                },
              }))}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              placeholder="Select Role"
              search
              selection
              defaultValue = {predicate.has("role") ? predicate.get("role"):""}
              onChange={(e, d) => {
                setPredicate('role', d.value!.toLocaleString())
              }}
              options={roleProject}
              wrapSelection={false}
          
            />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={5}>
        <SemanticDatepicker 
        value= {predicate.has("fromDay") ? [predicate.get("fromDay"),predicate.get("toDay")] as any:""}
        size='small' locale="en-US" type="range" placeholder="Select Range" clearable={false} clearOnSameDateClick
              onChange={(e, d) => {
                const b = d.value! as Date[];
                if (b != null && b.length == 2) {
                  setPredicate("fromDay", b[0])
                  setPredicate("toDay", b[1])

                }
              }}
     />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(StatisticFilter)
