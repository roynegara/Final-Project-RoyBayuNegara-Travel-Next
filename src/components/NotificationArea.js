// NotificationArea.js

import React from "react";
import { connect } from "react-redux";

const NotificationArea = ({ notifications }) => {
  return (
    <div className="notification-area">
      {notifications.map((notification, index) => (
        <div key={index} className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notificationReducer.notifications,
});

export default connect(mapStateToProps)(NotificationArea);

