function ptcDelayToMinutes(delay) {
    // delay as number
    if (typeof delay === 'number') {
        return delay;
    }

    // delay as HH:MM:SS
    if (typeof delay === 'string' && delay.includes(':')) {
        const delayParts = delay.split(':');
        const hours = parseInt(delayParts[0]) || 0;
        const minutes = parseInt(delayParts[1]) || 0;
        return (hours * 60) + minutes;
    }

    return parseInt(delay) || 0;
}

function ptcTimeToStr(time) {
    if (!time) return time;
    // If time is already in HH:MM or HH:MM:SS format, return HH:MM directly
    if (typeof time === 'string' && /^\d{1,2}:\d{2}(:\d{2})?$/.test(time)) {
        return time.substring(0, 5);
    }
    const parse = Date.parse(time);
    if (!parse) return time;
    const date = new Date(parse);
    // Use hours/minutes directly to avoid timezone conversion issues
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function ptcTimeOffset(time, delay) {
    const [targetHours, targetMinutes] = time.split(":").map(Number);

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const targetTotalMinutes = targetHours * 60 + targetMinutes;

    let offset = targetTotalMinutes - currentTotalMinutes;

    // assume target time is tomorrow if offset is more than 3 hours in the past
    if (offset < -3 * 60) {
        offset += 24 * 60;
    }

    return offset + delay;
}

function ptcParseBool(value) {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'number') {
        return value !== 0;
    }

    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }

    return false;
}
