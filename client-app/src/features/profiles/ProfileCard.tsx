import { observer } from "mobx-react-lite";
import { IProfile } from "../../app/models/profile";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  profile: IProfile;
}

export default observer(function ProfileCard({ profile }: IProps) {
  return (
    <Card as={Link} to={`/profile/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.image || "/assets/user.png"}</Card.Header>
        <Card.Description>Bio goes here</Card.Description>
      </Card.Content>
      <Card.Content>
        <Icon name="user" />
        20 Followers
      </Card.Content>
    </Card>
  );
});
