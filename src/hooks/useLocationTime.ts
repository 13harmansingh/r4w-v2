import { useState, useEffect } from 'react';

interface LocationTime {
    city: string;
    currentTime: string;
}

export const useLocationTime = (): LocationTime => {
    const [city, setCity] = useState('LISBON');
    const [timeZone, setTimeZone] = useState('Europe/Lisbon');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // Fetch user location
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    if (data.city && data.timezone) {
                        setCity(data.city.toUpperCase());
                        setTimeZone(data.timezone);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch location, using fallback:', error);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setCurrentTime(timeString);
        };

        updateTime();
        // Update immediately when timezone changes to avoid mismatched display
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timeZone]);

    return { city, currentTime };
};
