export class CurrentDate {
    constructor() {
        this.CurrentDate = new Date()
    }

    getDay() {
        const corrent_day = this.CurrentDate.getDate()
        return corrent_day
    }

    getMounth() {
        const corrent_month = this.CurrentDate.getMonth() + 1
        return corrent_month
    }

    getMounth() {
        const corrent_month_numb = this.CurrentDate.getMonth() + 1
        let corrent_month_words = null
        switch (corrent_month_numb) {
            case 1:
                corrent_month_words = 'Январь'
                break
            case 2:
                corrent_month_words = 'Февраль'
                break
            case 3:
                corrent_month_words = 'Март'
                break
            case 4:
                corrent_month_words = 'Апрель'
                break
            case 5:
                corrent_month_words = 'Май'
                break
            case 6:
                corrent_month_words = 'Июнь'
                break
            case 7:
                corrent_month_words = 'Июль'
                break
            case 8:
                corrent_month_words = 'Август'
                break
            case 9:
                corrent_month_words = 'Сентябрь'
                break
            case 10:
                corrent_month_words = 'Октябрь'
                break
            case 11:
                corrent_month_words = 'Ноябрь'
                break
            case 12:
                corrent_month_words = 'Декабрь'
                break
        }

        const corrent_month_data = {
            monthNumber: corrent_month_numb,
            monthTitle: corrent_month_words,
        }

        return corrent_month_data
    }

    getYaer() {
        let corrent_year = this.CurrentDate.getFullYear()
        return corrent_year
    }

    getTime() {
        const corrent_time = `${this.CurrentDate.getHours()}  ':'  ${this.CurrentDate.getMinutes()}  ':'  ${this.CurrentDate.getSeconds()}`
        return corrent_time
    }
}
