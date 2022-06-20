import React, { createContext, useState, useContext } from "react";

const DateContext = createContext();

export default function DateProvider({children}){
    const [date, setDate] = useState(new Date());

    return (
        <DateContext.Provider
            value={{
                date,
                setDate
            }}
        >
        {children}
    </DateContext.Provider>
    )
}

export function useDate(){
    const context = useContext(DateContext)
    const {date, setDate} = context;
    return {date, setDate}
}