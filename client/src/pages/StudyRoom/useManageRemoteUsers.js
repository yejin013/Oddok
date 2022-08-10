import { useState } from "react";

const useManageRemoteUsers = () => {
  const [remoteUsers, setRemoteUsers] = useState([]);

  const onRemoteStreamCreated = (event, stream) => {
    const { data, connectionId } = event.stream.connection;
    const { nickname, isHost, isMicOn } = JSON.parse(data);
    setRemoteUsers((prev) => [...prev, { stream, connectionId, nickname, isHost, isMicOn }]);
  };

  const onRemoteStreamDestroyed = (event) => {
    setRemoteUsers((prev) => prev.filter((user) => user.connectionId !== event.stream.connection.connectionId));
  };

  const onRemoteMicStatusChanged = (from, data) => {
    const { isMicOn } = JSON.parse(data);
    setRemoteUsers((prev) =>
      prev.map((user) => {
        if (user.connectionId === from.connectionId) return { ...user, isMicOn };
        return user;
      }),
    );
  };

  return {
    remoteUsers,
    onRemoteStreamCreated,
    onRemoteStreamDestroyed,
    onRemoteMicStatusChanged,
  };
};

export default useManageRemoteUsers;
