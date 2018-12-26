
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
        usrTests: [],
        tests: [],
        selectedTest: "",
        test2: {}
    }, 
    created: function () {
        let vue = this;
        getAjax('/forms').then(tests => {
            this.tests = tests;
            this.selectedTest = tests[0]._id;
            this.$nextTick(function() {
                goToTest.selectedTest = this.selectedTest;
            })
        })
        getAjax('/tests/me')
            .then(loadedTests => {
                this.usrTests = loadedTests;
                for (test of this.usrTests) {
                    if (test.test == this.selectedTest && test.try == 2) {
                        this.test2 = test
                    } 
                }
                document.querySelector('.loader').style.visibility = 'hidden';
            }).catch(err => console.log(err));
    },
    watch: {
        selectedTest: function(val, oldVal) {
            if (document.querySelector('.golink')) {
                document.querySelector('.golink').setAttribute('href', '/test/' + val);
            }
            for (test of this.usrTests) {
                if (test.test == val && test.try == 2) {
                    this.test2 = test
                } 
            }
        },
        
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
        tests: 0,
        selectedTest: '',
    },
    created: function () {
        getAjax('/groups/my')
            .then(gr => goToTest.group = gr)
    },

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