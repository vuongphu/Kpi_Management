import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react'
import { Button, Header, Popup, Segment, Table } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProjectWorksheetSumary = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadConfirmSumary,confirmsumary,loadingInitial
      } = rootStore.worksheetStore;
      useEffect(() => {
         loadConfirmSumary()
      }, [loadConfirmSumary]);
    return (
        <Fragment>
            <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>   Couting
          <Popup
            content="Reload"
            trigger={
              <Button 
              color="teal" floated="right" circular icon="sync"  onClick={() =>
                loadConfirmSumary()
              }></Button>
            }
          /></Header>
      </Segment>
            <Segment attached loading={loadingInitial}>
      <Table celled selectable >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Project Name</Table.HeaderCell>
            <Table.HeaderCell>QCs </Table.HeaderCell>
            <Table.HeaderCell>OPs </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {confirmsumary.map(
            (it, i) =>
               (
                <Table.Row key={i}  >
                  <Table.Cell>{it.title}</Table.Cell>
                  <Table.Cell>{it.ops}</Table.Cell>
                  <Table.Cell>{it.qcs}</Table.Cell>
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
      </Segment>
    </Fragment>
    )
}

export default observer(ProjectWorksheetSumary)
