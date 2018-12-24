
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
        selectedTest: ''
    },
    created: function () {
        console.log(window.location.pathname);
        getAjax(window.location.pathname + '?onlygr=true').then(res => {
            console.log(res)
            this.group = res.group;
            this.students = res.students;
        });
        getAjax('/forms').then(tests => {this.tests = tests; this.selectedTest = tests[0]._id}).catch(err => console.log(err));
        getAjax('/tests').then(userTests => this.userTests = userTests).catch(err => console.log(err));
        // getAjax('/groups').then(groups => {this.groups = groups;});
    },
    computed: {
        five: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.ball == 5 && test.group == this.group.name) counter++;
            }
            return counter
        },
        fore: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.ball == 4 && test.group == this.group.name) counter++;
            }
            return counter
        }, 
        three: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.ball == 3 && test.group == this.group.name) counter++;
            }
            return counter
        }, 
        five2: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.ball == 5 && test.try == 2 && test.group == this.group.name) counter++;
            }
            return counter
        }, 
        three2: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.ball == 3 && test.try == 2 && test.group == this.group.name) counter++;
            }
            return counter
        },
        fore2: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.ball == 3 && test.try == 2 && test.group == this.group.name) counter++;
            }
            return counter
        },
        middleBall: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.group == this.group.name && test.try == 1) counter +=test.ball;
            }
            console.log(counter, this.students.length)
            counter /= this.students.length;
            if (!counter > 0) counter = 0 
            return counter.toFixed(1)
        },
        middleBall2: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.try == 2 && test.group == this.group.name) counter +=test.ball;
            }
            counter /= this.students.length;
            if (!counter > 0) counter = 0 
            return counter.toFixed(1)
        },
        middlePercent: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.group == this.group.name && test.try == 1) counter += test.procents;
            }
            counter /= this.students.length;
            if (!counter > 0) counter = 0 
            return counter.toFixed(2) + '%'
        },
        middlePercent2: function() {
            let counter = 0;
            for (test of this.userTests) {
                if (test.try == 2 && test.group == this.group.name) counter += test.procents;
            }
            counter /= this.students.length;
            if (!counter > 0) counter = 0 
            return counter.toFixed(2) + '%'
        },
    },
    methods: {
        getInfOfSt: function(stId, twoTest) {
            let st = {};
            for (test of this.userTests) {
                if ((test.test == this.selectedTest) && (this.group.name == test.group) && (test.userId == stId)) {
                    if (twoTest) { 
                        if (test.try == 2) {
                            st.ball = test.ball || 0;
                            st.percent = test.procents || 0;
                            st.trueAnswers = test.trueAnswers || 0;
                            return st
                        }
                    } else {
                        st.ball = test.ball || 0;
                        st.percent = test.procents || 0;
                        st.trueAnswers = test.trueAnswers || 0;
                        return st
                    }
                }
            }
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