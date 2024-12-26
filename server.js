const net = require('net');
const fetch = require('node-fetch'); // اضافه کردن node-fetch
// ایجاد سرور TCP
const server = net.createServer((socket) => {
    console.log(`New connection from: ${socket.remoteAddress}:${socket.remotePort}`);

    // دریافت داده‌ها
    socket.on('data', async (data) => {
        console.log(`Received data: ${data.toString('hex')}`);

        // ارسال داده به API با fetch
        try {
            const response = await fetch('http://localhost:3000/api/receive-gps-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rawData: data.toString('hex'), // داده دریافتی به فرمت هگزا
                    clientInfo: {
                        ip: socket.remoteAddress,
                        port: socket.remotePort,
                    },
                }),
            });

            const result = await response.json();
            console.log(`API response: ${response.status} - ${JSON.stringify(result)}`);
        } catch (err) {
            console.error(`API call failed: ${err.message}`);
        }
    });

    // مدیریت قطع اتصال
    socket.on('end', () => {
        console.log('Client disconnected');
    });

    // مدیریت خطاها
    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

// گوش دادن به پورت 5027
const PORT = 5027;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});

// مدیریت خطاهای سرور
server.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
});