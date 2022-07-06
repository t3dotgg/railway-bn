// server.js
export default {
  port: Number(process.env.PORT ?? 3000),
  fetch(request) {
    return new Response(
      `
      <html>
        <main>
          <img src="https://bun.sh/logo@2x.png" style="height: 48px;" alt="bun logo" />
          <h1>Theo's Crappy Benchmark (Bun On Railway)</h1>
          <h4>Rendered at: ${new Date().toISOString()}</h4>


          <h2><span>Full request to render time (according to Theo): <span id="overrideme" />ms</span></h2>
          <script>
            const currentTime = new Date();
            // round trip time
            const fullTime = currentTime - window.performance.timing.requestStart;
            document.getElementById('overrideme').innerHTML = fullTime.toString();
            console.log('THEO REPORTS', fullTime);
    
            const times = JSON.parse(localStorage.getItem('astro-edge-times-store')) ?? [];
            times.push(fullTime);
            localStorage.setItem('astro-edge-times-store', JSON.stringify(times));
            console.table(times);
          </script>
        </main>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
};
