import type { IAvatarProps } from "native-base";
import { Avatar } from "native-base";
import type { VFC } from "react";
import { Pressable } from "react-native";
import { sessionState } from "src/valtio/session";
import { useSnapshot } from "valtio";

type ProfileAvatarProps = Omit<IAvatarProps, "source"> & {
  onPress?: () => void;
};

export const ProfileAvatar: VFC<ProfileAvatarProps> = (props) => {
  const sessionSnap = useSnapshot(sessionState);
  const { onPress, ...avatarProps } = props;

  return (
    <Pressable onPress={onPress}>
      <Avatar
        {...avatarProps}
        source={{
          uri: sessionSnap.session?.user?.user_metadata?.avatar_url,
        }}
      >
        <Avatar {...avatarProps} source={require("/assets/dummy_profile.png")} />
      </Avatar>
    </Pressable>
  );
};
