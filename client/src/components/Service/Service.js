import React from 'react';

import "./Service.css";

const Service = ({user}) => {

    return (
        <React.Fragment>
            {user ? (<React.Fragment>
                <div className="centered serviceText">
                <h1>Service Module</h1><br />
                <h3>This section is under development and not ready yet.</h3>
                <h3>Sorry for the inconvienece 😊</h3>

                </div>
                </React.Fragment>) 
                : 
                (<h3>Permission Denied</h3>)}
        </React.Fragment>
    )
}

export default Service;