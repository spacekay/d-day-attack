export class DatetimeUtil {
    static KR_TIME_DIFF: number = 9 * 60 * 60 * 1000

    static getAsiaSeoulTimezone(datetime: Date): Date {
       return new Date(datetime.getTime() + this.KR_TIME_DIFF);
    }

    static getDateString(datetime: Date): string {
        var dateString = this.getAsiaSeoulTimezone(datetime).getFullYear() +"-";
        dateString = datetime.getMonth() + 1 > 9 
        ? dateString + (datetime.getMonth()+1) : dateString + "0"+(datetime.getMonth()+1);
        dateString = dateString +"-";
        dateString = datetime.getDate() > 9? dateString + datetime.getDate() : dateString + "0"+datetime.getDate();
        return dateString;
    }

    static getDateTimeString(datetime: Date) : string {
        var dateTimeString = this.getDateString(datetime) +" ";
        dateTimeString = datetime.getHours() > 9
        ? dateTimeString + datetime.getHours() : dateTimeString + "0"+datetime.getHours();
        dateTimeString = dateTimeString +":";
        dateTimeString = datetime.getMinutes() > 9
        ? dateTimeString + datetime.getMinutes() : dateTimeString + "0"+datetime.getMinutes();
        dateTimeString = dateTimeString +":";
        dateTimeString = datetime.getSeconds() > 9
        ? dateTimeString + datetime.getSeconds() : dateTimeString + "0"+datetime.getSeconds();
        return dateTimeString;
    }

}