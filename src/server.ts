import express from 'express';
import cors from 'cors';
import { detectFacets } from './facetGenerator.js';

const app = express();
const port = 443;

app.use(cors());
app.use(express.json());

interface TextRequest {
  text: string;
}

app.post('/api/facets', (req: any, res: any) => {
  const { text } = req.body as TextRequest;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const facets = detectFacets(text);
  res.json({ text, facets });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
