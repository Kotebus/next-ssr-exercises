'use client';
import {useEffect, useState} from 'react';
import {format} from 'date-fns/format';
import Spinner from "../../../components/Spinner";

function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    //Initial setting of time
    useEffect(
        () => setTime(new Date()),
        []);

    //Effect with setting up time update
    useEffect(() => {
        const intervalId = window.setInterval(
            () => setTime(new Date()),
            50);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <p className="clock">{time ? format(time, 'hh:mm:ss.S a') : <Spinner/>}</p>
    );
}

export default Clock;
