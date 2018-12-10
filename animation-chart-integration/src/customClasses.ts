

export class DateHandler{
    //dates from the server are collected in this form: 2006-04-29T00:00:00.000Z. This class deconstructs this date into year, month and day
    private inputDate:string;
    private outputYear:any;
    private outputMonth:any;
    private outputDay:any;
    private regEx:RegExp = /^([0-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ ;

    getYear():any{
        return this.outputYear;
    }
    getMonth():any{
        return this.outputMonth;
    }
    getDay():any{
        return this.outputDay;
    }

    genDate(date:string, callback){
        this.inputDate = date;
        if (!this.regEx.test(this.inputDate)) {console.log('not correct date format'); return;}
        //TODO: take the inputDate and extract the year, month and date
        this.outputYear = parseInt(this.inputDate.slice(0, 4));
        this.outputMonth = parseInt(this.inputDate.slice(5, 7));
        this.outputDay = parseInt(this.inputDate.slice(8, 10));
        callback({year:this.outputYear, month:this.outputMonth, day:this.outputDay});

    }
}

export class MatchStats{
    id:any;
    venue:string;
    date:any;
    fours:any;
    sixes:any;
    total_runs:any;
    bowled:any;
    run_out:any;
    caught:any;
    wides:any;
}