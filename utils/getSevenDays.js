module.exports = class GetSevenDaysSql {
    getToday() {
        let date = new Date();
        let year = this.getYear(date);
        let month = this.getMonth(date);
        let strDate = this.getDays(date);
        return this.format(year,month,strDate);
    }
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return this.formatMM( date.getMonth() + 1 )
    }
    getDays(date) {
        return this.formatMM( date.getDate() );
    }
    formatMM(d) {
        if (d >= 1 && d <= 9) return d = `0${d}`;
        else return d;
    }
    format(y,m,d) {
        return `${y}-${m}-${d}`;
    }
    sevenDays() {
        var myDate = new Date(this.getToday());
        let dateArr = [];
        myDate.setDate(myDate.getDate() - 7);
        for (let i = 0; i < 7; i++) {
            let formatDate = this.format( this.getYear(myDate), this.getMonth(myDate), this.getDays(myDate) );
            dateArr.push( formatDate );
            myDate.setDate(myDate.getDate() + 1);
        }
        return dateArr;
    }
    sql() {
      let sqlArr = [];
      this.sevenDays().forEach(v=>{
        sqlArr.push(`SELECT IFNULL(DATE_FORMAT(create_time,'%Y-%m-%d'),'${v}') AS 'date',COUNT(DATE_FORMAT(create_time,'%Y-%m-%d')) AS 'count' FROM users WHERE create_time LIKE '%${v}%' AND customer_type!= 2;`)
      })
      return sqlArr;
    }
}

