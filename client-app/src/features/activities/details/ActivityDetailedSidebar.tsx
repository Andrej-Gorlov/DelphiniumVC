import React from "react";
import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
}

export default observer(function ActivityDetailedSidebar({
  activity: { attendees, host },
}: IProps) {
  if (!attendees) return null;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((x) => (
            <Item style={{ position: "relative" }} key={x.username}>
              {x.username === host?.username && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={x.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${x.username}`}>{x.displayName}</Link>
                </Item.Header>
                {x.following &&
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
