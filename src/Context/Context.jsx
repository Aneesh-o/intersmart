import React, { createContext, useState } from 'react';

export const isAddJobContext = createContext();

const ContextApi = ({ children }) => {

    const [addUserJob, setAddUserJobs] = useState("");

    return (
        <isAddJobContext.Provider value={{ addUserJob, setAddUserJobs}}>
            {children}
        </isAddJobContext.Provider>
    );
}

export default ContextApi;
