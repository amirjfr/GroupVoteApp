const form = document.getElementById('vote-form');


//Form Event
form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=food]:checked').value;
    const data = {food: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});

let dataPoints = [
    { label: "Sushi", y: 0 },
    { label: "Donair", y: 0 },
    { label: "Burger", y: 0 },
    { label: "Chicken", y: 0 },
    { label: "Sandwich", y: 0 }
    ];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
        text: "Vote Results"
    },
    axisY: {
        labelFontSize: 20,
        labelFontColor: "dimGrey"
    },
    axisX: {
        labelAngle: -30
    },
    data: [
    {
        type: "column",
        dataPoints: dataPoints
    }
    ]
});


chart.render();
 // Enable pusher logging - don't include this in production
 Pusher.logToConsole = true;

 var pusher = new Pusher('f1d459f9f15b3865ae7d', {
   cluster: 'us3',
   forceTLS: true
 });

 var channel = pusher.subscribe('food-poll');
 channel.bind('food-vote', function(data) {
   dataPoints = dataPoints.map(x => {
       if(x.label == data.food){
           x.y += data.points;
           return x;
       } else {
           return x;
       }
   });
   chart.render();

 });

}