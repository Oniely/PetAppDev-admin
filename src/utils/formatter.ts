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
    let newHour = Number(hour) > 12 && `0${Number(hour) - 12}`;

    const datetime = `${newMonth} ${day} ${year}, ${newHour}:${minutes} ${meridiem}`;

    return datetime;
};