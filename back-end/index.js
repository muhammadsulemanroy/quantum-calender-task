const http = require('http');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();

const server = http.createServer(async (req, res) => {

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/calendar') {
    try {
      const calendarEvents = await prisma.calendar.findMany();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(calendarEvents));
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  } else if (req.method === 'POST' && req.url === '/api/calendar') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { meetdata, changedDate } = JSON.parse(body);
        console.log(body);
        
        const newCalendarEvent = await prisma.calendar.create({
          data: {
            title:meetdata,
            date:changedDate,
          },
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Calendar event created successfully!', event: newCalendarEvent }));
      } catch (error) {
        console.error('Error creating calendar event:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }

});

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
