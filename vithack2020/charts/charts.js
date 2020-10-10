async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/hospitals/beds';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

var lineChartData = {
    labels: [],
    datasets: [{
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "rgba(220,180,0,1)",
        pointColor: "rgba(220,180,0,1)",
        data: []
    },{
      fillColor: "rgba(220,220,220,0)",
      strokeColor: "rgba(252, 25, 25,1)",
      pointColor: "rgba(252, 25, 25,1)",
      data: []
    }]
}

async function renderUsers(){
  let users = await getUsers();
  let x = users.data.regional;
  x.forEach(data => {
    lineChartData.labels.push(data.state);
    lineChartData.datasets[0].data.push(data.ruralHospitals);
    lineChartData.datasets[1].data.push(data.urbanHospitals);
  });
}

renderUsers();

console.log(lineChartData);


Chart.defaults.global.animationSteps = 50;
Chart.defaults.global.tooltipYPadding = 10;
Chart.defaults.global.tooltipCornerRadius = 0;
Chart.defaults.global.tooltipTitleFontStyle = "normal";
Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
Chart.defaults.global.animationEasing = "easeOutBounce";
Chart.defaults.global.responsive = true;
Chart.defaults.global.scaleLineColor = "black";
Chart.defaults.global.scaleFontSize = 10;


function showGraph(){
var ctx = document.getElementById("canvas").getContext("2d");
var LineChartDemo = new Chart(ctx).Line(lineChartData, {
    pointDotRadius: 5,
    bezierCurve: false,
    scaleShowVerticalLines: false,
    // scaleGridLineColor: "black"
});
};

window.setTimeout(showGraph,1000);


$('#downloadPdf').click(function(event) {
  // get size of report page
  var reportPageHeight = $('.container').innerHeight();
  var reportPageWidth = $('.container').innerWidth();

  // create a new canvas object that we will populate with all other canvas objects
  var pdfCanvas = $('<canvas />').attr({
    id: "canvaspdf",
    width: reportPageWidth,
    height: reportPageHeight
  });

  // keep track canvas position
  var pdfctx = $(pdfCanvas)[0].getContext('2d');
  var pdfctxX = 0;
  var pdfctxY = 0;
  var buffer = 100;

  // for each chart.js chart
    // get the chart height/width
    var canvasHeight = $("canvas").innerHeight();
    var canvasWidth = $("canvas").innerWidth();

    // draw the chart into the new canvas
    pdfctx.drawImage($("canvas")[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    // our report page is in a grid pattern so replicate that in the new canvas


  // create new pdf and add our new canvas as an image
  var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
  pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

  // download the pdf
  pdf.save('charts.pdf');
});

$('#email_submit').click(function(event) {
  // get size of report page
  var reportPageHeight = $('.container').innerHeight();
  var reportPageWidth = $('.container').innerWidth();

  // create a new canvas object that we will populate with all other canvas objects
  var pdfCanvas = $('<canvas />').attr({
    id: "canvaspdf",
    width: reportPageWidth,
    height: reportPageHeight
  });

  // keep track canvas position
  var pdfctx = $(pdfCanvas)[0].getContext('2d');
  var pdfctxX = 0;
  var pdfctxY = 0;
  var buffer = 100;

  // for each chart.js chart
    // get the chart height/width
    var canvasHeight = $("canvas").innerHeight();
    var canvasWidth = $("canvas").innerWidth();

    // draw the chart into the new canvas
    pdfctx.drawImage($("canvas")[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    // our report page is in a grid pattern so replicate that in the new canvas


  // create new pdf and add our new canvas as an image
  var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
  pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

  var pdfBase64 = pdf.output('datauristring');

  // download the pdf

  user_email = document.getElementById('email').value;
  Email.send({
    Host: "smtp.gmail.com",
    Username: "shubhakshat10@gmail.com",
    Password: "Gupta2002",
    To: user_email,
    From: "shubhakshat10@gmail.com",
    Subject: "Sending Email using javascript",
    Body: "Well that was easy!!",
    // Attachments: [
    //   {
    //     name: "charts.pdf",
    //     path: pdf.save('charts.pdf')
    //   }]
  })
    .then(function (message) {
      alert("Mail has been sent successfully")
    });
});

// function sendEmail() {
//       user_email = document.getElementById('email').value;
//       Email.send({
//         Host: "smtp.gmail.com",
//         Username: "shubhakshat10@gmail.com",
//         Password: "Gupta2002",
//         To: user_email,
//         From: "shubhakshat10@gmail.com",
//         Subject: "Sending Email using javascript",
//         Body: "Well that was easy!!",
//         Attachments: [
//           {
//             name: "charts.pdf",
//             path: pdf
//           }]
//       })
//         .then(function (message) {
//           alert("Mail has been sent successfully")
//         });
//     }
