import React, { Fragment, useContext, useEffect, useState } from "react";
import { Segment, Header, Form, Button, Comment, Grid, Popup } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import TextArenaInput from "../../../app/common/form/TextArenaInput";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { IProject } from "../../../app/models/project";
import { getLocationZone } from "../../../app/common/util/util";
import { ISumaryBarChart } from "../../../app/models/statistic";

const ProjectDetailedChart:React.FC<{project:IProject}> = ({project}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadSumary,sumaryBarChartArray,loadingInitial } = rootStore.statisticStore;
  const data: ChartData = {
    labels: [
      "Thao",
      "Thy",
      "Thuy",
      "Trang",
      "Tran",
      "Tien",
      "Hai",
      "Thanh",
      "Truc",
      "Cuong",
      "Thoa",
      "Phuong",
      "Thoa",
      "Phuong",
      "Phuong",
      "Thoa",
      "Phuong",
      "Phong",
      "Hai",
      "Thanh",
      "Truc",
      "Phuong2",
      "Phong2",
      "Hai2",
      "Thanh2",
      "Truc2",
      
    ],
    datasets: [
      {
        label: "Producility",
        data: [33, 53, 85, 41, 44, 65, 100, 80, 70, 50, 11, 22,55,100,5,10,160,50,5,10,17, 70, 50, 11, 22,55],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Hours",
        data: [15, 25, 35, 51, 54, 76, 15, 26, 26, 110, 22, 11,1,10,70,80,99,69, 22, 11,1, 70, 50, 11, 22,55],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };
  const options = {
    
    indexAxis: "y",

    maintainAspectRatio: true,
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
        text: "Sumary Chart",
      },
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
  };
  const handle=()=>{
    loadSumary(project.id,"op",getLocationZone()).then((result)=>{
      
      const newdata: ChartData ={
        labels:  result!.map((sumary) => (
          sumary.displayName
        )),
        datasets: [
          {
            label: "Producility",
            data:
            result!.map((sumary) => (
                    sumary.producility
                  ))
                ,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: "Hours",
            data: 
            result!.map((sumary) => (
                    sumary.hour
                  ))
                ,fill: false,
            borderColor: "#742774",
          },
        ],
      };
      setstate(newdata)
      setshow(true)
    });
   
  }
  const [state, setstate] = useState<ChartData|undefined>()
  const [show, setshow] = useState(false)
   useEffect(() => {
  //   loadSumary(project.id,"op",getLocationZone()).then((result)=>{
  //     setstate(undefined)
  //     const newdata: ChartData ={
  //       labels:  result!.map((sumary) => (
  //         sumary.displayName
  //       )),
  //       datasets: [
  //         {
  //           label: "Producility",
  //           data:
  //           result!.map((sumary) => (
  //                   sumary.producility
  //                 ))
  //               ,
  //           fill: true,
  //           backgroundColor: "rgba(75,192,192,0.2)",
  //           borderColor: "rgba(75,192,192,1)",
  //         },
  //         {
  //           label: "Hours",
  //           data: 
  //           result!.map((sumary) => (
  //                   sumary.hour
  //                 ))
  //               ,fill: false,
  //           borderColor: "#742774",
  //         },
  //       ],
  //     };
  //     setstate(newdata)
  //   });
   
    
  }, [loadSumary])
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header> Sumary Bar Chart In Week
       </Header>
      </Segment>
      <Segment attached loading= {loadingInitial}>
      <Grid di>
            <Grid.Column>
           {show &&<Bar type='line' key={Math.random()}
        data ={state} 
        options={{
          responsive: true,
          maintainAspectRatio: true,

        }} />}
            </Grid.Column>
        </Grid>
            
        <Grid>
            <Grid.Column>
            <Button.Group floated='right'>
            <Button primary content="OP Chart" onClick={()=>handle()}></Button>
            <Button.Or></Button.Or>
            <Button secondary content="QC Chart" onClick={()=>handle()}></Button>
            </Button.Group>
         
            </Grid.Column>
        </Grid>
     
       
      </Segment>
    
    </Fragment>
  );
};
export default observer(ProjectDetailedChart);
