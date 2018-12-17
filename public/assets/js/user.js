
let header = new Vue({
    el: '.title_username',
    data: {
        name: ''
    },
    created: function () {
        let vue = this;
        getAjax('/users/me').then(res => {
            vue.name = res.fio;
        }).catch(err => console.log(err))

    }
})

let tests = new Vue({
    el: "#first_block",
    data: {
        test1: { 
            answers: [],
            ball: 0,
            trueAnswers: 0,
            userId: '',
            _id: '',
            group: ''
        },
        test2: {
            answers: [],
            ball: 0,
            trueAnswers: 0,
            userId: '',
            _id: '',
            group: ''
        }
    }, 
    created: function () {
        let vue = this;
        getAjax('/tests/me')
            .then(loadedTests => {
                if (loadedTests.length) {
                    if (loadedTests.length == 2) {
                        vue.test1 = loadedTests[0];
                        vue.test2 = loadedTests[1];
                    } else vue.test1 = loadedTests[0];
                    goToTest.tests = loadedTests.length
                }
                document.querySelector('.loader').style.visibility = 'hidden';
            }).catch(err => console.log(err));
    },
    methods: {
        getProcent: function(two) {
            let res = 0;
            if (this.test2.trueAnswers && two) {
                console.log('haha')
                res = this.test2.trueAnswers / 18 * 100;
            } else if (this.test1.trueAnswers) {
                res = this.test1.trueAnswers / 18 * 100;
            }
            if (res) return res.toFixed(0) + '%'
            return 0
        }
    }
})

let goToTest = new Vue({
    el: '#second_block',
    data: {
        group: {},
        tests: 0
    },
    created: function () {
        getAjax('/groups/my')
            .then(gr => goToTest.group = gr)
    }
})

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