
import { ChartData } from 'chart.js';
import {  Bar  } from "react-chartjs-2";

import React, { useContext, useEffect } from 'react'

import { Grid } from 'semantic-ui-react';
import StatisticFilter from './StatisticFilter';
import StatisticTable from './StatisticTable';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { RootStoreContext } from '../../app/stores/rootStore';
const StatisticPage = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        clearStatistic
      } = rootStore.statisticStore;
      useEffect(() => {
        clearStatistic()
     }, [clearStatistic]);

    return (
        <Grid>
            <Grid.Column width={15}>
               <StatisticFilter/>
            </Grid.Column>
            <Grid.Column width={15}>
               <StatisticTable/>
            </Grid.Column>
        </Grid>


    )
}
export default StatisticPage
