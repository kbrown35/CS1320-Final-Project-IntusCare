import { formcontent } from '../resources/formcontent.js';
import { emptyAnswers } from '../resources/emptyAnswers.js';

// Event bus that relays information between components (mainly for checking form completion and subquestion expanding)
const EventBus = new Vue();

// Component for a sub-question and its answer inputs
Vue.component('sub-question', {
    props: {
        'questionText': String,
        'questionId': String
    },
    data: function() {
        return {
            dateInput: ['1-1-c', '1-2-c', '1-3-c'],
            severityInput: ['1-6-b'],
            educationInput: ['3-3-a'],
            transportInput: ['3-5-c'],
            prefix: this.questionId.substring(9),
            sectionNum: parseInt(this.questionId.substring(9, 10)) - 1,
            mainNum: parseInt(this.questionId.substring(11, 12)) - 1,
            subNum: this.questionId.charCodeAt(13) - 97,
            reallyCheckedYes: false,
            reallyCheckedNo: false,
            yesno: false,
            date: false,
            severity: false,
            education: false,
            transport: false
        }; 
    },
    methods: {
        getInputs() {
            if (this.dateInput.includes(this.prefix)) {
                this.date = true;
            } else if (this.severityInput.includes(this.prefix)) {
                this.severity = true;
            } else if (this.educationInput.includes(this.prefix)) {
                this.education = true;
            } else if (this.transportInput.includes(this.prefix)) {
                this.transport = true;
            } else {
                this.yesno = true;
            }
        },
        getYesId() {
            return this.prefix + '-yes';
        },
        getNoId() {
            return this.prefix + '-no';
        },
        getDateId() {
            return this.prefix + '-date';
        },
        clickYes(e) {
            // allows for unchecking of radio buttons
            if (this.reallyCheckedYes == false) {
                e.checked = true;
                this.reallyCheckedYes = true;
                this.reallyCheckedNo = false;
            } else {
                const ele = document.getElementsByName(this.questionId);
                for (let i = 0; i < ele.length; i++) {
                    ele[i].checked = false;
                }
                e.checked = false;
                this.reallyCheckedYes = false;
            }
            let nums = [this.sectionNum, this.mainNum, this.subNum, e.checked];
            EventBus.$emit('sub-yes', nums);
        },
        clickNo(e) {
            // allows for unchecking of radio buttons
            if (this.reallyCheckedNo == false) {
                e.checked = true;
                this.reallyCheckedNo = true;
                this.reallyCheckedYes = false;
            } else {
                const ele = document.getElementsByName(this.questionId);
                for (let i = 0; i < ele.length; i++) {
                    ele[i].checked = false;
                }
                e.checked = false;
                this.reallyCheckedNo = false;
            }
            let nums = [this.sectionNum, this.mainNum, this.subNum, e.checked];
            EventBus.$emit('sub-no', nums);
        },
        changeDate(e) {
            let nums = [this.sectionNum, this.mainNum, this.subNum, e.target.value];
            EventBus.$emit('sub-date', nums);
        },
        changeSeverity(e) {
            let nums = [this.sectionNum, this.mainNum, this.subNum, e.target.value];
            EventBus.$emit('sub-severity', nums);
        }, 
        changeEducation(e) {
            let nums = [this.sectionNum, this.mainNum, this.subNum, e.target.value];
            EventBus.$emit('sub-education', nums);
        },
        changeTransport(e) {
            let nums = [this.sectionNum, this.mainNum, this.subNum, e.target.value];
            EventBus.$emit('sub-transport', nums);
        }
    },
    created() {
        this.getInputs();
    },
    template: `
        <div>
            <div :id="this.questionId"> 
                {{this.questionText}} 
            </div>
            <div v-if="this.yesno">
                <label class="container">Yes
                    <input type="radio" :id="getYesId" :name="this.questionId" @click="clickYes(this)">
                    <span class="radio-yes"></span>
                 </label>
                <label class="container">No
                    <input type="radio" :id="getNoId" :name="this.questionId" @click="clickNo(this)">
                    <span class="radio-no"></span>
                </label>
            </div>
            <div v-if="this.date">
                <label>
                    <input type="date" :id="getDateId" :name="this.questionId" @change="changeDate($event)">
                </label>
            </div>
            <div v-if="this.severity">
                <select name="question-1-6-b" @change="changeSeverity($event)">
                    <option value="">Select impairment level:</option>
                    <option id="1-6-b-mild" value="Mild">Mild</option>
                    <option id="1-6-b-moderate" value="Moderate">Moderate</option>
                    <option id="1-6-b-severe" value="Severe">Severe</option>
                </select>
            </div>
            <div v-if="this.education">
                <select name="question-3-3-a" @change="changeEducation($event)">
                    <option value="">Select highest level of education:</option>
                    <option id="3-3-a-none" value="Less than high school diploma">Less than high school diploma</option>
                    <option id="3-3-a-highschool" value="High School Diploma or GED">High school diploma or GED</option>
                    <option id="3-3-a-somecollege" value="Some college, but no degree">Some college, but no degree</option>
                    <option id="3-3-a-associates" value="Associate Degree">Associate Degree</option>
                    <option id="3-3-a-bachelors" value="Bachelor's Degree">Bachelor's Degree</option>
                    <option id="3-3-a-masters" value="Master's Degree">Master's Degree</option>
                    <option id="3-3-a-professional" value="Professional Degree">Professional Degree</option>
                    <option id="3-3-a-doctorate" value="Doctorate Degree">Doctorate Degree</option>
                </select>
            </div>
            <div v-if="this.transport">
                <select name="question-3-5-c" @change="changeTransport($event)">
                    <option value="">Select transportation:</option>
                    <option id="3-5-c-walk" value="Walk">Walk</option>
                    <option id="3-5-c-bus" value="Bus">Bus</option>
                    <option id="3-5-c-family" value="Family Member">Family Member</option>
                    <option id="3-5-c-transportservice" value="Transportation Service">Transportation Service</option>
                    <option id="3-5-c-other" value="Other">Other</option>
                </select>
            </div>
        </div>
    `,
});

// Component that holds all a question's subquestions
Vue.component('subquestion-section', {
    props: {
        'sectionId': String,
        'subquestions': {
            type: Array,
            default: () => [],
        }
    },
    data: function() {
        return {
            idPrefix: 'question-' + this.sectionId.substring(4, this.sectionId.length) + '-',
            alphabet: 'abcdefghi',
            expanded: false
        }; 
    },
    created () {
        let vm = this;
        EventBus.$on(this.idPrefix + 'main-yes', function (checked) {
            if (checked) {
                vm.expanded = true;
            } else {
                vm.expanded = false;
            }
        });
        EventBus.$on(this.idPrefix + 'main-no', function () {
            vm.expanded = false;
         });
    },
    computed: {
        getDisplay() {
          return (this.expanded && this.subquestions.length > 0);
        }
    },
    methods: {
        getQuestionID(index) {
            return this.idPrefix + this.alphabet[index];
        },
        getQuestion(index) {
            return this.subquestions[index];
        }
    },
    template: `
        <div class="subquestion-box" :id="this.sectionId" v-show="getDisplay">
            <div v-for="(question, index) in this.subquestions" :key="getQuestionID(index)">
                <sub-question :questionText="getQuestion(index)" :questionId="getQuestionID(index)"></sub-question>
            </div>
        </div>
    `,
});

// Component that holds a main question's no radio button
Vue.component('main-no', {
    props: {
        'questionId': String
    },
    data: function() {
        return {
            radioIdNo: this.getPrefix() + '-no',
            sectionNum: parseInt(this.questionId.substring(9, 10)) - 1,
            questionNum: parseInt(this.questionId.substring(11, 12)) - 1,
            reallyChecked: false
        };
    },
    created() {
        const vm = this;
        EventBus.$on(this.questionId + '-main-yes', function (e) {
            vm.reallyChecked = false;
        });
    },
    methods: {
        getPrefix() {
            return this.questionId.substring(9);
        },
        clickNo(e) {
            // allows for unchecking of radio buttons
            if (this.reallyChecked == false) {
                e.checked = true;
                this.reallyChecked = true;
            } else {
                const ele = document.getElementsByName(this.questionId);
                for (let i = 0; i < ele.length; i++) {
                    ele[i].checked = false;
                }
                e.checked = false;
                this.reallyChecked = false;
            }
            EventBus.$emit(this.questionId + '-main-no', e);
            let nums = [this.sectionNum, this.questionNum, e.checked];
            EventBus.$emit('main-no', nums);
        }
    },
    template: `
        <td>
            <label class="container">
                <input type="radio" :id="this.radioIdNo" :name="this.questionId" @click="clickNo(this)">
                <span class="radio-no"></span>
            </label>
        </td>
    `,
});

// Component that holds a main question's yes radio button
Vue.component('main-yes', {
    props: {
        'questionId': String
    },
    data: function() {
        return {
            radioIdYes: this.getPrefix() + '-yes',
            sectionNum: parseInt(this.questionId.substring(9, 10)) - 1,
            questionNum: parseInt(this.questionId.substring(11, 12)) - 1,
            reallyChecked: false
        };
    },
    created() {
        const vm = this;
        EventBus.$on(this.questionId + '-main-no', function (e) {
            vm.reallyChecked = false;
        });
    },
    methods: {
        getPrefix() {
            return this.questionId.substring(9);
        },
        clickYes(e) {
            // allows for unchecking of radio buttons
            if (this.reallyChecked == false) {
                e.checked = true;
                this.reallyChecked = true;
            } else {
                const ele = document.getElementsByName(this.questionId);
                for (let i = 0; i < ele.length; i++) {
                    ele[i].checked = false;
                }
                e.checked = false;
                this.reallyChecked = false;
            }
            EventBus.$emit(this.questionId + '-main-yes', e.checked);
            let nums = [this.sectionNum, this.questionNum, e.checked];
            EventBus.$emit('main-yes', nums);
        }
    },
    template: `
        <td>
            <label class="container">
                <input type="radio" :id="this.radioIdYes" :name="this.questionId" @click="clickYes(this)">
                <span class="radio-yes"></span>
            </label>
        </td>
    `,
});

// Component that holds a main question's text
Vue.component('main-question', {
    props: {
        'questionText': String,
        'questionId': String,
        'subquestions': {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        getSectionID() {
            return 'section-' + this.sectionNumber.toString();
        },
        getQuestionID(index) {
            let num = index + 1;
            return 'question-' + this.sectionNumber.toString() + '-' + num.toString();
        },
        getHeaderHTML() {
            return this.sectionTitle;
        },
        getSubquestions(index) {
            return this.subquestions[index];
        },
        subsectionId() {
            return 'sub-' + this.questionId.substring(9);
        }
    },
    template: `
        <td :id="this.questionId">
            {{this.questionText}}
            <subquestion-section :section-id="subsectionId()" :subquestions="this.subquestions"></subquestion-section>
        </td>
    `,
});

// Component that holds all questions for a section
Vue.component('question-section', {
    props: {
        'sectionTitle': String,
        'sectionNumber': Number,
        'questions': {
            type: Array,
            default: () => [],
        },
        'subquestions': {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        getSectionID() {
            return 'section-' + this.sectionNumber.toString();
        },
        getQuestionID(index) {
            let num = index + 1;
            return 'question-' + this.sectionNumber.toString() + '-' + num.toString();
        },
        getHeaderHTML() {
            return this.sectionTitle;
        },
        getSubquestions(index) {
            return this.subquestions[index];
        },
        subsectionId(index) {
            let num = index + 1;
            return 'sub-' + this.sectionNumber.toString() + '-' + num.toString();
        }
    },
    template: `
        <div class="form-box" :id="getSectionID()">
        <table class="table-form">
            <tr>
                <th> {{this.sectionTitle}} </th>
                <th>Yes </th>
                <th>No </th>
            </tr>
            <tr v-for="(q, index) in this.questions" :key="getQuestionID(index)">
                <main-question :questionText="q" :questionId="getQuestionID(index)" :subquestions="getSubquestions(index)"></main-question>
                <main-yes :questionId="getQuestionID(index)"></main-yes>
                <main-no :questionId="getQuestionID(index)"></main-no>
             </tr>
        </table>
        </div>
    `,
});

// Exported form component holds form and submit button
export default {
    created () {
        let vm = this;
        EventBus.$on('main-yes', function (nums) {
            if (nums[2]) {
                Vue.set(vm.answers.answers[nums[0]], nums[1], "yes");
            } else {
                Vue.set(vm.answers.answers[nums[0]], nums[1], "");
            }
        });
        EventBus.$on('main-no', function (nums) {
            if (nums[2]) {
                Vue.set(vm.answers.answers[nums[0]], nums[1], "no");
            } else {
                Vue.set(vm.answers.answers[nums[0]], nums[1], "");
            }
        });
        EventBus.$on('sub-yes', function (nums) {
            if (nums[3]) {
                Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], "yes");
            } else {
                Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], "");
            }
        });
        EventBus.$on('sub-no', function (nums) {
            if (nums[3]) {
                Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], "no");
            } else {
                Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], "");
            }
        });
        EventBus.$on('sub-date', function (nums) {
            Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], nums[3]);
        });
        EventBus.$on('sub-education', function (nums) {
            Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], nums[3]);
        });
        EventBus.$on('sub-transport', function (nums) {
            Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], nums[3]);
        });
        EventBus.$on('sub-severity', function (nums) {
            Vue.set(vm.answers.subAnswers[nums[0]][nums[1]], nums[2], nums[3]);
        });
    },
    data: function() {
        return {
            acuityForm: formcontent,
            answers: emptyAnswers
        };
    },
    computed: {
        getAnswers() {
            return this.answers;
        }
    },
    watch: {
        // whenever answers change, this function will run to check if the form is complete
        answers: {
            deep: true,
            handler() {
                for (let i = 0; i < this.answers.answers.length; i++) {
                    for (let j = 0; j < this.answers.answers[i].length; j++) {
                        if (this.answers.answers[i][j] == '') {
                            document.getElementById('form-submit').disabled = true;
                            return;
                        }
                        if (this.answers.answers[i][j] == 'yes') {
                            for (let k = 0; k < this.answers.subAnswers[i][j].length; k++) {
                                if (this.answers.subAnswers[i][j][k] == '') {
                                    document.getElementById('form-submit').disabled = true;
                                    return;
                                }
                            }
                        }
                    }
                }
                document.getElementById('form-submit').disabled = false;
                return;
            }
        }
    },
    methods: {
        processForm() {
            let split = window.location.href.split('/');
            let id = split[split.length - 2];
            fetch('/' + id + '/form/submit', {
                method: 'POST',
                redirect: 'follow',
                body: JSON.stringify(
                    {answers: this.answers}
                ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(res) {
                return res.text();
            }).then(function(data) {
                window.location.href = split.slice(0, split.length - 2).join('/') + data;
            });
        },
        getTitle(index) {
            return this.acuityForm.sectionTitles[index - 1];
        },
        getQuestions(index) {
            return this.acuityForm.questions[index - 1];
        },
        getSubquestions(index) {
            return this.acuityForm.subQuestions[index - 1];
        }
    },
    template: `
        <div>
            <form id="acuity-form" @submit.prevent="processForm">
                    <div class="row" v-for="i in 5" :key="i">
                        <question-section :sectionTitle="getTitle(i)" :sectionNumber="i" :questions="getQuestions(i)" :subquestions="getSubquestions(i)"></question-section>
                    </div>
                <div class="row center-div">
                    <button id="form-submit" class="button-submit" disabled>Submit</button>
                </div>
            </form>
        </div>
    `,
};