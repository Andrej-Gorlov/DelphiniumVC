import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { Link } from "react-router-dom";

interface IProps {
    activity: IActivity
}

export default function ActivivityListItem({activity}:IProps){
      
    return (
       <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <span>
                    <Icon name='clock'/> {activity.date}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>

            <Segment secondary>
                ATTENDEES GO HERE
            </Segment>

            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="View"
                />
            </Segment>
       </Segment.Group>
    )
}