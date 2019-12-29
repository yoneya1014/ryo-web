$(() => {
    $(window).on('load', () => {
        const youbi = ['日', '月', '火', '水', '木', '金', '土'];
        const timeLabel = $('#time_now');
        setInterval(() => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const week = date.getDay();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            timeLabel.text(
                year + '年' +
                month + '月' +
                day + '日（' +
                youbi[week] + '） ' +
                hour + '時' +
                minute + '分' +
                second + '秒');
        }, 1000);
    });
});