export default function createNewDate (date){
    return date ? new Date(date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);
} 