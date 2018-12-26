let pageId = window.location.pathname.slice(6);
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
        criteries: ""
    },
    created: function () {
        
        getAjax('/forms/' + pageId).then(test => {
            for (quest of test.queastions) {
                quest.number = Number(quest.number);
            }
            this.test = test;
            console.log(test);
            this.criteries = `
             Больше ${Math.round(this.test.queastions.length / 100 * 85)} - 5 
             Больше ${Math.round(this.test.queastions.length / 100 * 70)} - 4 
             Больше ${Math.round(this.test.queastions.length / 100 * 50)} - 3 
            `
            document.querySelector('.loader').style.visibility = 'hidden';
        });
    },
    methods: {
        enableBtn: function(ev) {
            ev.target.parentElement.parentElement.querySelector('.btn').disabled = false;
        },
        saveTest: function(ev) {
            let vue = this;
            if (this.save) {
                this.$nextTick(function() {
                    console.log('save tasting')
                    json = {};
                    json.trueAnswers = this.userTest.trueAnswers;
                    json.ball = this.userTest.ball;
                    json.answers = this.userTest.answers;
                    json.test = this.test._id;
                    json.procents = Math.round(this.userTest.trueAnswers / this.test.queastions.length * 100) || 0
                    console.log(json)
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', '/forms/' + pageId, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    
                        xhr.send(JSON.stringify(json));
                        xhr.onload = () => {
                            this.save = false
                            console.log(xhr.responseText);
                        }
                    })
                } 
                
        },
        nextSlide: function(ev) {
            if (ev.target.dataset.number == this.test.queastions.length) {
                this.saveTest(ev);
                this.save = false;
            } 
            let thisEl = ev.target.parentElement;
            for (input of thisEl.querySelectorAll('input')) {
                if (input.checked) {
                    let i = thisEl.dataset.number - 1;
                    this.userTest.answers[i] = input.value;
                    let trueAnswers = 1;
                    if (this.save) {
                        for (trueAnsw of this.test.queastions[i].trueAnsw) {
                            if (this.test.queastions[i].trueAnsw.length > 1) {
                                if (trueAnsw == input.value) trueAnswers++
                            } else if (trueAnsw == input.value) this.userTest.trueAnswers++
                        }
                        console.log(trueAnswers, this.test.queastions[i].trueAnsw.length)

                        if (this.test.queastions[i].trueAnsw.length > 1 && trueAnswers == this.test.queastions[i].trueAnsw.length) this.userTest.trueAnswers++;
                        if (this.userTest.trueAnswers >= Math.round(this.test.queastions.length / 100 * 50)) {
                            this.userTest.ball = 3    
                        } 
                        if (this.userTest.trueAnswers >= Math.round(this.test.queastions.length / 100 * 70)) {
                            this.userTest.ball = 4    
                        } 
                        if (this.userTest.trueAnswers >= Math.round(this.test.queastions.length / 100 * 85)) {
                            this.userTest.ball = 5    
                        } 
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
                if (inp.checked) inp.nextElementSibling.style.color = '#d83232';

                let i = mainn.test.queastions[inp.parentElement.parentElement.dataset.number - 1].trueAnsw;
                for (let trueAnsw of i) {
                    if (inp.value === trueAnsw) {
                        console.log('s')
                        inp.nextElementSibling.style.color = '#6c926c' 
                    } 
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
            if (!btn.disabled) mainn.nextSlide(evv)
            // mainn.nextSlide(evv)
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
