import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts, gridColumns }) => {
  const alertType =
    alerts !== null && alerts.length > 0 ? alerts[0].alertType : 'invisible';
  const alertMessage =
    alerts !== null && alerts.length > 0 ? alerts[0].msg : '';
  const alertId = alerts !== null && alerts.length > 0 ? alerts[0].id : '0';
  return (
    <div
      className={`alert alert-${alertType}`}
      style={{ gridColumn: gridColumns }}
    >
      {alertMessage}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    alerts: state.alert
  };
};

export default connect(mapStateToProps)(Alert);
