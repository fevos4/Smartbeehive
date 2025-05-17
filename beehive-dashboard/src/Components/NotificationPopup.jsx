import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Components/NotificationPopup.scss';

const NotificationPopup = ({ notifications, onClose, onClearNotification,onClearAllNotifications }) => {
  const handleClearNotification = (notificationId) => {
    console.log("Notification ID:", notificationId);
    onClearNotification(notificationId);
  };

  const handleClearAllNotifications = () => {
    onClearAllNotifications();
  };

  return (
    <div className="notification-popup">
      <div className="notification-popup-header">
        <span>Notifications</span>
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="close-icon" />
        </button>
      </div>
      <div className="notification-popup-content">
        {notifications.length === 0 ? (
          <p className="no-notifications-message">There are no notifications</p>
        ) : (
          notifications.map((notification) => (
            <div className="notification-item" key={notification._id}>
              {notification.notificationMessage}
              <button
                onClick={() => handleClearNotification(notification._id)}
                className="notification-close-icon"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <button onClick={handleClearAllNotifications} className="clear-all-button">
          <FontAwesomeIcon icon={faTrash} className="trash-icon" />
          Clear All Notifications
        </button>
      )}
    </div>
  );
};

export default NotificationPopup;
