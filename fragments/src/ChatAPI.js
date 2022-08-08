import React from "react";

class ChatAPI extends React.Component {
    subscribeToFriendStatus(id, fun) {
        return <div>Online</div>
    }
    unsubscribeFromFriendStatus(id, fun) {
        return <div>Offline</div>
    }

}

export default ChatAPI;