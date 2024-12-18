document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculateBtn");
    let chart;

    // Arrays for graph
    let reynoldsData = [];
    let frictionData = [];

    calculateBtn.addEventListener("click", () => {
        // Input values
        const h1 = parseFloat(document.getElementById("h1").value); // cm
        const h2 = parseFloat(document.getElementById("h2").value); // cm
        const t = parseFloat(document.getElementById("time").value); // sec
        const p1 = parseFloat(document.getElementById("p1").value); // cm
        const p2 = parseFloat(document.getElementById("p2").value); // cm
        const L = parseFloat(document.getElementById("length").value); // cm
        const d = parseFloat(document.getElementById("diameter").value); // cm
        const v = parseFloat(document.getElementById("viscosity").value); // cm²/s

        // Constants
        const g = 981; // Acceleration due to gravity in cm/s²

        // Step 1: Discharge (Q)
        const deltaH = h1 - h2; // Height difference in cm
        const Q = (deltaH / t).toFixed(6); // Discharge in cm³/s

        // Step 2: Head loss due to friction (hf)
        const hf = (12.6 * (p1 - p2)).toFixed(6); // hf in cm

        // Step 3: Friction Factor (f)
        const f = ((12 * hf * d) / (L * Math.pow(Q / 1000, 2))).toFixed(6); // Adjust Q to m³/s for calculations

        // Step 4: Reynolds Number (Re)
        const Re = ((4 * Q) / (Math.PI * v * d)).toFixed(6);

        // Display Results
        document.getElementById("dischargeResult").innerText = `Discharge (Q): ${Q} cm³/s`;
        document.getElementById("headLossResult").innerText = `Head Loss (hf): ${hf} cm`;
        document.getElementById("frictionFactorResult").innerText = `Friction Factor (f): ${f}`;
        document.getElementById("reynoldsNumberResult").innerText = `Reynolds Number (Re): ${Re}`;

        // Update Graph
        reynoldsData.push(Re);
        frictionData.push(f);
        drawChart(reynoldsData, frictionData);
    });

    // Function to draw the graph
    function drawChart(reynoldsData, frictionData) {
        const ctx = document.getElementById("frictionChart").getContext("2d");

        // Destroy previous chart instance
        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: reynoldsData,
                datasets: [{
                    label: "Reynolds Number vs Friction Factor",
                    data: frictionData,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Reynolds Number (Re)" } },
                    y: { title: { display: true, text: "Friction Factor (f)" } }
                }
            }
        });
    }
});



























