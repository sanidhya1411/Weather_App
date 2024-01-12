import React from "react";
import { useState } from "react";

const Time = () => {

    let t = new Date().toLocaleTimeString();
    let m = (new Date()).getMonth();
    let d = (new Date()).getDay();
    let dt = (new Date()).getDate();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];



    const [current, setcurrent] = useState({
        time: t,
        month: months[m],
        day: days[d],
        date: dt,

    });
    
    setInterval(() => {
        let t = new Date().toLocaleTimeString();
        setcurrent({...current,time:t});
    }, 1000);

    return (
        <div className="flex items-center gap-4 flex-col mt-5 lg:text-3xl md:text-2xl sm:text-xl">
                <div>
                    {current.time}
                </div>
                <div>
                    {current.day}, {current.date} {current.month}
                </div>
    
        </div>
    )
}

export default Time;