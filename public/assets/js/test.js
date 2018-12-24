let mainn = new Vue({
    el: '.form',
    data: {
        test: {},
        userTest: {
            answers: [],
            trueAnswers: 0,
            ball: 2
        },
        save: true,
        showAnsw: false,
        criteries: "Оценка: \n 16-18 правильных ответов - 5 \n 12-15 правильных ответов - 4 \n 9-11 правильных ответов - 3 \n 0-8 правильных ответов - 2"
    },
    created: function () {
        getAjax('/forms/LWSEj4ZPGavgXIck').then(test => {
            this.test = test;
            console.log(test);
            document.querySelector('.loader').style.visibility = 'hidden';
        });
    },
    methods: {
        enableBtn: function(ev) {
            ev.target.parentElement.parentElement.querySelector('.btn').disabled = false;
        },
        saveTest: function(ev) {
            let vue = this;
            if (vue.save) {
                console.log('save tasting')
                json = {};
                json.trueAnswers = this.userTest.trueAnswers;
                json.ball = this.userTest.ball;
                json.answers = this.userTest.answers;
                json.test = this.test._id;
                let xhr = new XMLHttpRequest();
                xhr.open('POST', '/forms/LWSEj4ZPGavgXIck', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(json));
                xhr.onload = () => {
                    vue.save = false
                    console.log(xhr.responseText);
                }
            } 
        },
        nextSlide: function(ev) {
            if (ev.target.dataset.number == 18) {
                this.saveTest(ev);
                this.save = false;
            } 
            let thisEl = ev.target.parentElement;
            for (input of thisEl.querySelectorAll('input')) {
                if (input.checked) {
                    let i = thisEl.dataset.number - 1;
                    this.userTest.answers[i] = input.value;
                    if (this.test.queastions[i].trueAnsw == input.value) {this.userTest.trueAnswers++}
                    if (this.userTest.trueAnswers > 8) {
                        this.userTest.ball = 3    
                    } 
                    if (this.userTest.trueAnswers > 11) {
                        this.userTest.ball = 4    
                    } 
                    if (this.userTest.trueAnswers > 15) {
                        this.userTest.ball = 5    
                    } 
                }
            }
            thisEl.classList.remove('show');
            thisEl.nextElementSibling.classList.add('show');
        },
        goHome: function() {
            window.location.href = '/cabinet';
        },
        alert: function() {
            alert(this.criteries)
        },
        viewAnsw: function() {
            this.showAnsw = true;

            for (inp of document.querySelectorAll('input')) {
                if (inp.checked) {
                    let i = mainn.test.queastions[inp.parentElement.parentElement.dataset.number - 1].trueAnsw;
                    if (inp.value == i) {
                        inp.parentElement.style.color = '#6c926c' 
                    } else inp.parentElement.style.color = '#d83232';
                }
                inp.disabled = true;
            }
            firstSlide()
        },
    }
})



function firstSlide() {
    document.querySelector('.show').classList.remove('show');
    document.querySelector('.slide').classList.add('show');
}

window.onkeydown = ev => {
    let evv = {}
    let btn = document.querySelector('.show').querySelector('.btn');
    if (document.querySelector('.show').className != 'slide lastSlide show') {
        evv.target = btn;
        if (ev.code == 'Enter') {
            // if (!btn.disabled) mainn.nextSlide(evv)
            mainn.nextSlide(evv)
        }
    }
}

function getAjax(url, noParse) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function () {
            if (noParse) {
                resolve(this.responseText);
            } else {
                if (JSON.parse(this.responseText).length == 0) reject('{status: 404}');
                resolve(JSON.parse(this.responseText));
            }
            
        }
        xhr.onerror = function(err) {
            reject(err);
        }
    })
    
}
