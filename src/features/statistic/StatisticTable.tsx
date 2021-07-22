
import { ChartData } from 'chart.js';
import {  Bar  } from "react-chartjs-2";

import React, { Fragment, useContext } from 'react'

import { Button, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer, Observer } from 'mobx-react-lite';
const StatisticTable = () => {
  const rootStore = useContext(RootStoreContext);
  const { statisticArray } = rootStore.statisticStore;

    return (
        <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>  Statistic<Popup trigger={<Button color="teal" floated="right" circular icon="info circle" ></Button>} flowing hoverable>
     <Header textAlign='center'> Description Result </Header>   
    <Grid centered  columns={3} >
      
      <Grid.Column textAlign='center'>
        <Header as='h4' color='green'>High</Header>
        <p>
          <b>KPITarget+20%</b> {'<='} <b>KPIUser</b> 
        </p>
       
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header as='h4'>Normal</Header>
        <p>
        <b>KPITarget</b> {'<='} <b>KPIUser</b> 
        </p>
       
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header as='h4' color='red'>Low</Header>
        <p>
        <b>KPITarget</b> {'>'} <b>KPIUser</b> 
        </p>
      </Grid.Column>
    </Grid>
  </Popup>
        </Header>
      </Segment>
      <Segment attached >
        <Table celled selectable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Stt</Table.HeaderCell>
              <Table.HeaderCell>Display Name</Table.HeaderCell>
              <Table.HeaderCell>Kpi Target</Table.HeaderCell>
              <Table.HeaderCell>Total Hour</Table.HeaderCell>
              <Table.HeaderCell>Total Productivity</Table.HeaderCell>
              <Table.HeaderCell>Kpi Target Per Hour</Table.HeaderCell>
              <Table.HeaderCell>Kpi Empoyee Per Hour</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {statisticArray.map((it, i) => (
              <Table.Row key={i}   >
                <Table.Cell >{i + 1}</Table.Cell>
                <Table.Cell>{it.displayName}</Table.Cell>
                <Table.Cell>{it.kpiTarget}</Table.Cell>
                <Table.Cell>{it.totalHour}</Table.Cell>
                <Table.Cell>{it.totalProductivity}</Table.Cell>
                <Table.Cell>{it.kpiTargetInHour}</Table.Cell>
                <Table.Cell>{it.kpiEmpoyeeInHour}</Table.Cell>
                <Table.Cell style ={
                it.result=="High" ?
                { background: 'green'}: it.result==="Low" ? {background: 'red'}:  {background: ''} }>{it.result}</Table.Cell>
               
              </Table.Row>
            ))}
          
          </Table.Body>
        </Table>
      </Segment>
    </Fragment>


    )
}
export default observer(StatisticTable)
