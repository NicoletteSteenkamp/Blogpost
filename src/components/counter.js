import React, { useState, useEffect } from 'react';

function LiveCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Function to fetch count from CountAPI
        const fetchCount = async () => {
            try {
                const response = await fetch('https://api.countapi.xyz/get/your-namespace/your-key');
                const data = await response.json();
                setCount(data.value);
            } catch (error) {
                console.error('Error fetching count:', error);
            }
        };

        // Fetch count initially
        fetchCount();

        // Fetch count every 5 seconds (you can adjust this interval as needed)
        const intervalId = setInterval(fetchCount, 5000);

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <div>
            <h1>Live Counter</h1>
            <div>{count}</div>
        </div>
    );
}

export default LiveCounter;
