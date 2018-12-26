
let header = new Vue({
    el: 'header',
    data: {
        name: ''
    },
    created: function () {
        getAjax('/users/me').then(res => {
            this.name = res.fio;
        }).catch(err => console.log(err))

    }
})


let main = new Vue({
    el: 'main', 
    data: {
        group: {},
        students: [],
        tests: [],
        userTests: [],
        st: {
            trueAnswers: 0,
            ball: 0,
            percent: 0,
            selectedTest: ''
        },
        usr: []
    },
    created: function () {
        console.log(window.location.pathname);
        getAjax(window.location.pathname + '?onlygr=true')
        .then(res => {
            console.log(res)
            this.group = res.group;
            this.students = res.students;

        getAjax('/forms')    
        .then(tests => {
            this.tests = tests; this.st.selectedTest = tests[0]._id
        getAjax('/tests')
        .then(userTests => {
            this.userTests = userTests;
            this.recalc(this).then(() => this.getBalls());
                    
        }).catch(err => console.log(err));
        }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },
    methods: {
        recalc: function (vue, first) {
            return new Promise((resolve, reject) => {
                if (!first) {
                    vue.usr = []
                }
                for (student of vue.students) {
                        let user = [];
                        user[0] = student._id;
                        for (test of vue.userTests) {
                            let st = {
                                ball: 0,
                                percent: 0,
                                trueAnswers: 0,
                                try: 0
                            };
                            if ((test.test == vue.st.selectedTest) && (test.userId == student._id)) {
                                if (test.try == 2) {
                                    st.ball = test.ball || 0;
                                    st.percent = test.procents || 0;
                                    st.trueAnswers = test.trueAnswers || 0;
                                    st.try = 2;
                                    user[2] = st;
                                } else {
                                    st.ball = test.ball || 0;
                                    st.percent = test.procents || 0;
                                    st.trueAnswers = test.trueAnswers || 0;
                                    st.try = 1;
                                    user[1] = st;
                                }
                            }
                            if (user.length == 1) {
                                user.push(st);
                                user.push(st);
                            }
                        }
                        vue.usr.push(user);
                }
                resolve(true)   
            })
        },
        rechange: function(ev) {
            this.st.selectedTest = ev; 
            let vue = this;
            console.log(ev)
            this.recalc(vue).then(() => this.getBalls());

        },
        getBalls: function() {
            let fives = 0, fives2 = 0, 
                fores = 0, fores2 = 0,
                thres = 0, thres2 = 0;
            for (ball of document.querySelectorAll('.student-ball')) {
                console.log(ball.innerText)
                if (Number(ball.innerText) === 5) fives++;
                if (Number(ball.innerText) === 4) fores++;
                if (Number(ball.innerText) === 3) thres++;
            }
            for (ball of document.querySelectorAll('.student-ball2')) {
                console.log(ball.innerText)
                if (Number(ball.innerText) === 5) fives2++;
                if (Number(ball.innerText) === 4) fores2++;
                if (Number(ball.innerText) === 3) thres2++;
            }
            document.querySelector('.five').innerText = fives;
            document.querySelector('.fore').innerText = fores;          
            document.querySelector('.free').innerText = thres;      
            document.querySelector('.five2').innerText = fives2;
            document.querySelector('.fore2').innerText = fores2;          
            document.querySelector('.free2').innerText = thres2;     

            this.insertMiddle();
            this.insertPercents();
            this.verdict();
        },
        insertMiddle: function() {
            let balls = document.querySelectorAll('.student-ball')
            let balls2 = document.querySelectorAll('.student-ball2')
            let mdbal = 0;
            let mdbal2 = 0;
            for (ball of balls) {
                mdbal += Number(ball.innerText);
            }
            for (ball of balls2) {
                mdbal2 += Number(ball.innerText);
            }
            if (mdbal2 > 0) mdbal2 /= balls2.length            
            if (mdbal > 0) mdbal /= balls.length
            document.querySelector('.res_bal').innerText = mdbal.toFixed(1);
            document.querySelector('.res_bal2').innerText = mdbal2.toFixed(1);
        },
        insertPercents: function() {
            let balls = document.querySelectorAll('.student-percent')
            let balls2 = document.querySelectorAll('.student-percent2')
            let mdbal = 0;
            let mdbal2 = 0;
            for (ball of balls) {
                mdbal += Number(ball.innerText);
            }
            for (ball of balls2) {
                mdbal2 += Number(ball.innerText);
            }
            if (mdbal2 > 0) mdbal2 /= balls2.length            
            if (mdbal > 0) mdbal /= balls.length
            document.querySelector('.res_percent').innerText = mdbal.toFixed(2);
            document.querySelector('.res_percent2').innerText = mdbal2.toFixed(2);
        },
        verdict: function() {
            let perc = Number(document.querySelector('.res_percent').innerText);
            if (perc <= 50) document.querySelector('.verict').innerText = 'Группа не подготовлена';
            if (perc > 50) document.querySelector('.verict').innerText = 'Группа подготовлена плохо';
            if (perc > 70) document.querySelector('.verict').innerText = 'Группа подготовлена хорошо';
            if (perc > 90) document.querySelector('.verict').innerText = 'Группа подготовлена прекрасно';

            let perc2 = Number(document.querySelector('.res_percent2').innerText);
            if (perc2 < 50) document.querySelector('.verict2').innerText = 'Группа не подготовлена';
            if (perc2 >= 50) document.querySelector('.verict2').innerText = 'Группа подготовлена плохо';
            if (perc2 > 70) document.querySelector('.verict2').innerText = 'Группа подготовлена хорошо';
            if (perc2 > 90) document.querySelector('.verict2').innerText = 'Группа подготовлена прекрасно';
        }
    },
    watch: {
        'st.selectedTest': function (val, oldVal) {this.rechange(val)}
    }
})


function postAjax(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        }
        xhr.onerror = () => {
            reject(err);
        }
    })
}
function getAjax(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function () {
            resolve(JSON.parse(this.responseText));
        }
        xhr.onerror = function(err) {
            reject(err);
        }
    })
    
}