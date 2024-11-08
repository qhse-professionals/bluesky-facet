import './style.css';

const API_URL = 'http://localhost:3000/api/facets';

async function generateFacets() {
  const sampleText = "Check out https://example.com and follow @alice.bsky.social and @bob!";

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: sampleText }),
    });

    const data = await response.json();
    displayResults(sampleText, data);
  } catch (error) {
    console.error('Error:', error);
    displayError(error);
  }
}

function displayResults(inputText: string, response: any) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
      <h1>Bluesky Facet Generator API</h1>
      <div class="card">
        <h2>Input Text:</h2>
        <pre>${inputText}</pre>
        
        <h2>Generated Facets:</h2>
        <pre>${JSON.stringify(response.facets, null, 2)}</pre>
      </div>
      
      <div class="card">
        <h2>Try it yourself:</h2>
        <div class="input-group">
          <textarea id="userInput" rows="4" placeholder="Enter text with URLs and @mentions...">${inputText}</textarea>
          <button onclick="window.generateUserFacets()">Generate Facets</button>
        </div>
        <div id="userResult"></div>
      </div>
    </div>
  `;

  // Add the generateUserFacets function to the window object
  (window as any).generateUserFacets = async () => {
    const userInput = document.querySelector<HTMLTextAreaElement>('#userInput')!.value;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });
      const data = await response.json();
      document.querySelector('#userResult')!.innerHTML = `
        <h3>Results:</h3>
        <pre>${JSON.stringify(data.facets, null, 2)}</pre>
      `;
    } catch (error) {
      document.querySelector('#userResult')!.innerHTML = `
        <div class="error">
          <h3>Error:</h3>
          <pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>
        </div>
      `;
    }
  };
}

function displayError(error: any) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
      <h1>Bluesky Facet Generator API</h1>
      <div class="card error">
        <h2>Error:</h2>
        <pre>${error.message}</pre>
        <p>Make sure the API server is running using: npm run serve</p>
      </div>
    </div>
  `;
}

generateFacets();