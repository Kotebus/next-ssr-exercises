'use client';
import {useEffect, useState} from 'react';
import {format} from 'date-fns/format';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = window.setInterval(
            () => setTime(new Date()),
            50);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <p
            suppressHydrationWarning={true}
            className="clock">
            {format(time, 'hh:mm:ss.S a')}
        </p>
    );
}

export default Clock;
