import ResultsComponent from './components/ResultsComponent.js';

// Vue app that holds the form results
new Vue({
    el: '#app',
    components: {
        'results-component': ResultsComponent
    }
});

/* ************************ */

// /* chart.js donut-chart */

let scores = [];
const colorMappings = {Low: 'rgb(138, 227, 122)',
                        Moderate: 'rgb(246, 228, 66)',
                        High: 'rgb(244, 123, 47)', 
                        Very: 'rgb(255, 0, 0, 0.9)'};

// gets the scores from document elements to give donut chart data
function getScores() {
  let sum = 0;
  let sub = getScore(document.getElementById('section1-subscore').innerText);
  sum += sub;
  scores.push(sub);
  sub = getScore(document.getElementById('section2-subscore').innerText);
  sum += sub;
  scores.push(sub);
  sub = getScore(document.getElementById('section3-subscore').innerText);
  sum += sub;
  scores.push(sub);
  sub = getScore(document.getElementById('section4-subscore').innerText);
  sum += sub;
  scores.push(sub);
  sub = getScore(document.getElementById('section5-subscore').innerText);
  sum += sub;
  scores.push(sub);
  scores.push(sum.toString());
  const color = colorMappings[document.getElementById('risk-level').innerText.split(' ')[0]];
  document.getElementById('risk-color').style.borderColor = color;
}

// parses a sub-score from a document element
function getScore(textString) {
  return parseInt(textString.split(':')[1].substr(1));
}

// registers donut chart
Chart.pluginService.register({
  beforeDraw: function (chart) {
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
      ctx.restore();
      var fontSize = (height / 50).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      var text = chart.config.options.elements.center.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
  }
});

// actually gets scores to populate scores array
getScores();

// deals with the case that score is 0 and the donut chart doesn't show up
if (scores[5] == 0) {
    let circleHTML = '<div class="zero-donut" style="margin-left:10px;"> 0 </div>';
    // changes score display for a score of 0
    document.getElementById('total-score').innerHTML = circleHTML;
    for (let i = 1; i < 6; i++) {
        const id = 'legend-circle-' + i.toString();
        document.getElementById(id).style.backgroundColor = 'white';
        document.getElementById(id).style.border = '2px solid #d4d4d4';
    }
}

// chart colors
var colors = ['#001a94','#4d7ef8', '#89baff', '#b1e2ff','#c5f6ff'];

/* 3 donut charts */
var donutOptions = { 
  elements: {
    center: {
      text: scores[5]
    }
  },
  cutoutPercentage: 65, 
  // legend: {position:'right', padding:0, labels: {pointStyle:'circle', usePointStyle:true}},
  legend: {
    display: false
  }
};

// donut
var acuityDonutData = {
    labels: [
    'Active/Chronic Disease',
    'Behavioral Health Conditions',
    'Social Determinants',
    'Utilization Risk',
    'Care Management Risk'],
    datasets: [
      {
        backgroundColor: colors.slice(0,5),
        borderWidth: 0,
        data: [scores[0], scores[1], scores[2], scores[3], scores[4]]
      }
    ]
};

var acuityDonut = document.getElementById("acuityDonut");
if (acuityDonut) {
  new Chart(acuityDonut, {
      type: 'pie',
      data: acuityDonutData,
      options: donutOptions
  });
}
