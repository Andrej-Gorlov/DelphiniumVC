import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";
import { IProfile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: IProfile
}

export default observer(function ProfileContent({profile}: Props) {
  const {profileStore} = useStore();
  
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />  },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    { menuItem: "Followers", render: () => <ProfileFollowings /> },
    { menuItem: "Follwing", render: () => <ProfileFollowings /> }
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
})
