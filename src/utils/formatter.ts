export const formatDateTime = (date: string, time: string) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    let month = date.split("/")[0];
    let day = date.split("/")[1];
    let year = date.split("/")[2];
    let newMonth = months[Number(month) - 1];

    let hour = time.split(":")[0];
    let minutes = time.split(":")[1];
    let meridiem = Number(hour) >= 12 ? "PM" : "AM";
    
    let newHour;
    if (Number(hour) === 0) {
        newHour = 12;
    } else if (Number(hour) > 12) {
        newHour = Number(hour) - 12;
    } else if (Number(hour) === 12) {
        newHour = 12;
    } else {
        newHour = Number(hour);
    }

    newHour = newHour < 10 ? `0${newHour}` : newHour.toString();

    const datetime = `${newMonth} ${day} ${year}, ${newHour}:${minutes} ${meridiem}`;

    return datetime;
};

export function formatTimestamp(isoTimestamp: Date) {
    // Create a new Date object from the ISO 8601 timestamp
    const date = new Date(isoTimestamp);
    
    // Define an array with month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Extract the day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    // Construct the formatted date string
    return `${month} ${day}, ${year}`;
}