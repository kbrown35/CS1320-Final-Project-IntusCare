import { formcontent } from '../resources/formcontent-redacted.js';
import { emptyResults } from '../resources/emptyResults.js';

const educationMap = {
    'grade school': 'Less than high school diploma',
    'high school': 'High school diploma or GED',
    'some college': 'Some college, but no degree',
    'associates': 'Associate Degree',
    'bachelors': 'Bachelor\'s Degree',
    'masters': 'Master\'s Degree',
    'certification': 'Professional Degree',
    'doctorate': 'Doctorate Degree',
};
const transportMap = {
    'walk': 'Walk',
    'public bus': 'Bus',
    'family': 'Family Member',
    'transport service': 'Transportation Service',
    'other': 'Other'
};

// Component that holds a subquestion and its answer
Vue.component('q-and-a', {
    props: {
        'questionText': String,
        'answerText': String
    },
    methods: {
        getHTML() {
            let html = this.questionText;
            if (this.answerText == null) {
                html += '<span style="font-weight:bold;font-style:italic;color:#616161;"> Unanswered </span>';
            } else {
                html += '<span style="font-weight:bold;font-style:italic;"> ' + this.answerText + '</span>';
            }
            return html;
        }
    },
    template: `
        <div v-html="getHTML()"></div>
    `
});

// Component that holds all subquestions and answers
Vue.component('sub-section', {
    props: {
        'subQsAndAs': {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        getQuestion(index) {
            return this.subQsAndAs[index][0];
        },
        getAnswer(index) {
            return this.subQsAndAs[index][1];
        },
        getId(index) {
            return 'sub-' + index;
        }
    },
    template: `
        <div>
            <div class="results-subquestions" v-for="(q, index) in this.subQsAndAs" :key="getId(index)">
                <q-and-a :questionText="getQuestion(index)" :answerText="getAnswer(index)"></q-and-a>
            </div>
        </div>
    `
});

// Component that holds a main question and its answer, and subquestions component
Vue.component('main-q-and-a', {
    props: {
        'questionText': String,
        'answerText': String,
        'subQsAndAs': {
            type: Array,
            default: () => [],
        }
    },
    template: `
        <div class="results-questions">
            <q-and-a :questionText="this.questionText" :answerText="this.answerText"></q-and-a>
            <sub-section :subQsAndAs="this.subQsAndAs"></sub-section>
        </div>
    `
});

// Component that holds all questions and answers for a section
Vue.component('results-section', {
    props: {
        'sectionTitle': String,
        'qsAndAs': {
            type: Array,
            default: () => [],
        },
        'subQsAndAs': {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        getQuestion(index) {
            return this.qsAndAs[index][0];
        },
        getAnswer(index) {
            return this.qsAndAs[index][1];
        },
        getId(index) {
            return 'main-' + index;
        },
        getSubQsAndAs(index) {
            return this.subQsAndAs[index];
        }
    },
    template: `
        <div class="form-box">
            <table class="table-form">
                <tr>
                <th> {{sectionTitle}} </th>
                </tr>
                <tr v-for="(q, index) in this.qsAndAs" :key="getId(index)">
                    <main-q-and-a :questionText="getQuestion(index)" :answerText="getAnswer(index)" :subQsAndAs="getSubQsAndAs(index)"></main-q-and-a>
                </tr>
            </table>
        </div>
    `
});

// Exported form component holds all the results of the form
export default {
    data: function() {
        return {
            acuityForm: formcontent,
            formAnswers: [],
            ready: false
        };
    },
    computed: {
        onReady: function() {
            return this.ready;
        }
    },
    created() {
        // gets the form from the database with a post request
        let vm = this;
        let split = window.location.href.split('/');
        let formId = split[split.length - 1];
        if (formId.charAt(formId.length - 1) == '?') {
            formId = formId.substr(0, formId.length - 1);
        }
        let getUrl = '/' + split[split.length - 2] + '/' + formId + '/get';
        fetch(getUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {id: formId}
            )
        }).then(function(res) {
            return res.json();
        }).then(function(data) {
            vm.processForm(data);
            vm.ready = true;
        });
    },
    methods: {
        // processes the data gotten from the post request so the components can use it
        processForm(form) {
            const results = emptyResults;
            const numSections = 5;
            const numQuestions = [6, 6, 6, 4, 5];
            const numSubs = [[3, 3, 3, 1, 1, 3],
                            [4, 3, 3, 3, 5, 3],
                            [2, 3, 2, 2, 3, 3],
                            [0, 0, 0, 0],
                            [1, 3, 3, 2, 1]];
            const alphabet = 'abcdef';
            for (let i = 0; i < numSections; i++) {
                for (let j = 0; j < numQuestions[i]; j++) {
                    const index = (i + 1).toString() + '_' + (j + 1).toString();
                    if (form[index] == 'yes') {
                        results.answers[i].push('Yes');
                        for (let k = 0; k < numSubs[i][j]; k++) {
                            const subIndex = index + alphabet[k];
                            if (form[subIndex] == 'yes') {
                                results.subAnswers[i][j].push('Yes');
                            } else if (form[subIndex] == 'no') {
                                results.subAnswers[i][j].push('No');
                            } else {
                                if (subIndex == '1_1c' || subIndex == '1_2c' || subIndex == '1_3c') {
                                    const date = new Date(form[subIndex]);
                                    const month = (date.getMonth() + 1).toString();
                                    const day = (date.getDate() + 1).toString();
                                    const year = (date.getFullYear()).toString();
                                    results.subAnswers[i][j].push(month + '/' + day + '/' + year);
                                } else {
                                    if (form[subIndex] != null) {
                                        if (subIndex == '3_3a') {
                                            results.subAnswers[i][j].push(educationMap[form[subIndex]]);
                                        } else if (subIndex == '3_5c') {
                                            results.subAnswers[i][j].push(transportMap[form[subIndex]]);
                                        } else {
                                        results.subAnswers[i][j].push(form[subIndex].charAt(0).toUpperCase() + form[subIndex].slice(1));
                                        }
                                    } else {
                                        results.subAnswers[i][j].push(null);
                                    }
                                }
                            }
                        }
                    } else {
                        results.answers[i].push('No');
                    }
                }
                if (form['5_5ai'] != null && results.answers[4][4] == "Yes") {
                    if (form['5_5ai'] == 'yes') {
                        results.subAnswers[4][4].push('Yes');
                    } else {
                        results.subAnswers[4][4].push('No');
                    }
                }
            }
            this.formAnswers = results;
        },
        getTitle(sectionNumber) {
            return this.acuityForm.sectionTitles[sectionNumber - 1];
        },
        getQsAndAs(sectionNumber) {
            let index = sectionNumber - 1;
            let questions = this.acuityForm.questions[index];
            let answers = this.formAnswers.answers[index];
            let qsAndAs = [];
            for (let i = 0; i < questions.length; i++) {
                qsAndAs.push([questions[i], answers[i]]);
            }
            return qsAndAs;
        },
        getSubQAndAs(sectionNumber) {
            let index = sectionNumber - 1;
            let questions = this.acuityForm.subQuestions[index];
            let answers = this.formAnswers.subAnswers[index];
            let qsAndAs = [];
            for (let i = 0; i < questions.length; i++) {
                let mainQuestion = [];
                if (answers[i].length > 0) {
                    for (let j = 0; j < questions[i].length; j++) {
                        mainQuestion.push([questions[i][j], answers[i][j]]);
                    }
                }
                qsAndAs.push(mainQuestion);
            }
            return qsAndAs;
        }
    },
    template: `
        <div>
            <div v-if="onReady">
                <div class="row" v-for="i in 5" :key="i">
                    <results-section :sectionTitle="getTitle(i)" :sectionNumber="i" :qsAndAs="getQsAndAs(i)" :subQsAndAs="getSubQAndAs(i)"></results-section>
                </div>
            </div>
            <div v-else>
                <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    `
};