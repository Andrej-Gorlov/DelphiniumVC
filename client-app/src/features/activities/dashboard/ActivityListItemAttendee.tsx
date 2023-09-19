import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { IProfile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface IPrpos {
  attendees: IProfile[];
}

export default observer(function ActivityListItemAttendee({
  attendees,
}: IPrpos) {
  return (
    <List horizontal>
      {attendees.map((x) => (
        <Popup
          hoverable
          key={x.username}
          trigger={
            <List.Item
              key={x.username}
              as={Link}
              to={`/profiles/${x.username}`}
            >
              <Image size="mini" circular src={x.image || "/assets/user.png"} />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={x} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
});
