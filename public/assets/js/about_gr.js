
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
        group: { 
            balls: [],
            balls2: [],
            percents: [],
            percents2: []
        },
        students: null
    },
    created: function () {
        console.log(window.location.pathname);
        getAjax(window.location.pathname + '?onlygr=true').then(res => {
            console.log(res)
            this.group = res.group;
            this.students = res.students;
        });
        // getAjax('/groups').then(groups => {this.groups = groups;});
    },
    computed: {
        five: function() {
            let counter = 0;
            for (ball of this.group.balls) {
                if (ball.balls == 5) counter++;
            }
            return counter
        },
        fore: function() {
            let counter = 0;
            for (ball of this.group.balls) {
                if (ball.balls == 4) counter++;
            }
            return counter
        }, 
        three: function() {
            let counter = 0;
            for (ball of this.group.balls) {
                if (ball.balls == 3) counter++;
            }
            return counter
        }, 
        five2: function() {
            let counter = 0;
            for (ball of this.group.balls2) {
                if (ball.balls == 5) counter++;
            }
            return counter
        }, 
        three2: function() {
            let counter = 0;
            for (ball of this.group.balls2) {
                if (ball.balls == 3) counter++;
            }
            return counter
        },
        fore2: function() {
            let counter = 0;
            for (ball of this.group.balls2) {
                if (ball.balls == 4) counter++;
            }
            return counter
        },
        middleBall: function() {
            let counter = 0;
            for (ball of this.group.balls) {
                counter +=Number(ball.balls);
            }
            counter /= this.group.balls.length;
            if (!counter > 0) counter = 0 
            return counter
        },
        middleBall2: function() {
            let counter = 0;
            for (ball of this.group.balls2) {
                counter +=Number(ball.balls);
            }
            counter /= this.group.balls2.length;
            if (!counter > 0) counter = 0 
            return counter
        },
        middlePercent: function() {
            let counter = 0;
            for (ball of this.group.percents) {
                counter +=Number(ball.procents);
            }
            counter /= this.group.percents.length;
            if (!counter > 0) counter = 0 
            return counter.toFixed(2) + '%'
        },
        middlePercent2: function() {
            let counter = 0;
            for (ball of this.group.percents2) {
                counter +=Number(ball.procents);
            }
            console.log(counter)
            counter /= this.group.percents2.length;
            if (!counter > 0) counter = 0 
            return counter.toFixed(2) + '%'
        },
    },
    methods: {
        getMidPercent: function(el, chooser) {
            let midPercent = 0;
            if (chooser == 2) {
                for (percent of el.percents2) {
                    midPercent += Number(percent.procents);
                }
            } else {
                for (percent of el.percents) {
                    midPercent += Number(percent.procents);
                }
                
            }
            console.log(midPercent)
            midPercent /= el.students.length || 0;

            console.log(el);
            return midPercent + '%'
        },
        getInfOfSt: function(stId) {
            let st = {}
            for (ball of this.group.balls) {
                if (ball.id == stId) {
                    st.ball = ball.balls
                }
            }
            for (ball of this.group.balls2) {
                if (ball.id == stId) {
                    st.ball2 = ball.balls2
                }
            }
            for (ball of this.group.percents) {
                if (ball.id == stId) {
                    st.percent = ball.procents
                }
            }
            for (ball of this.group.percents2) {
                if (ball.id == stId) {
                    st.percent2 = ball.procents2
                }
            }
            for (ball of this.group.trueAnsw) {
                if (ball.id == stId) {
                    st.trueAnsw = ball.trueAnsw
                }
            }
            return st
        }
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