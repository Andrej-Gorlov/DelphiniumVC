import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];

  selectedActivity: IActivity | undefined;
  selectActivity:(id: string) => void;
  cancelSelectActivity:() => void;

  editMode: boolean;
  openForm:(id:string) => void;
  closeForm:()=>void;

  createOrEdit:(activity: IActivity) => void;

  deleteActivity: (id: string)=> void

  submitting: boolean;
}

export default function ActivityDashboard({ 
  activities,  selectedActivity, deleteActivity,submitting,
  selectActivity,cancelSelectActivity,editMode, openForm, closeForm, createOrEdit}: IProps) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
          activities={activities} 
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode &&
        <ActivityDetails 
          activity={selectedActivity} 
          cancelSelectActivity={cancelSelectActivity}
          openForm={openForm}
        />}
        {editMode &&
        <ActivityForm 
          closeForm={closeForm} 
          activity={selectedActivity} 
          createOrEdit={createOrEdit}
          submitting={submitting}/>}
      </Grid.Column>
    </Grid>
  );
}
