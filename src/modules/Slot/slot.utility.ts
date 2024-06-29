import { Types } from 'mongoose';

const createSlots = (
    startTime: string,
    endTime: string,
    date: string,
    room: Types.ObjectId
) => {
    const slotDuration = 60;
    // convert to minutes -> ["9", "30"][0,1]*60
    const startMinutes =
        parseInt(startTime.split(':')[0]) * slotDuration +
        parseInt(startTime.split(':')[1]);
    const endMinutes =
        parseInt(endTime.split(':')[0]) * slotDuration +
        parseInt(endTime.split(':')[1]);

    // calculate total duration
    const totalDuration = endMinutes - startMinutes;

    //   calculate number of slots
    const numberOfSlots = totalDuration / slotDuration;

    const slots = [];
    for (let i = 0; i < numberOfSlots; i++) {
        //convert slot start time and end time by iteration value
        const slotStartTime = startMinutes + i * slotDuration;
        const slotEndTime = slotStartTime + slotDuration;

        //Start Slot Hours
        const startHours = Math.floor(slotStartTime / 60)
            .toString()
            .padStart(2, '0');

        //Start Slot Mins
        const startMins = (slotStartTime % 60).toString().padStart(2, '0');

        //End Slot Hours
        const endHours = Math.floor(slotEndTime / 60)
            .toString()
            .padStart(2, '0');

        //End Slot Mins
        const endMins = (slotEndTime % 60).toString().padStart(2, '0');

        //push object to the slots
        slots.push({
            room,
            date,
            startTime: `${startHours}:${startMins}`,
            endTime: `${endHours}:${endMins}`,
        });
    }
    return slots;
};

export default createSlots;
