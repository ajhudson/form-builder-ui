import React from 'react';
import { Alert } from 'reactstrap';

const BootstrapAlerts = () => {

    return (
        <div className="container">
            <Alert color="primary">
                This is a primary alert
            </Alert>
            <Alert color="secondary">
                This is a secondary alert
            </Alert>
        </div>
    );
};

export default BootstrapAlerts;