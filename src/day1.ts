const https = require('https');

const options = {
    hostname: "adventofcode.com",
    path: "/2024/day/1/input",
    headers: {
        Cookie: "session=53616c7465645f5f5acad219b1f2cf343abe3a60893a774ba6d787d4c6c7551caad28aaa2302511873a490416cafcb34c4d74b5c91ea812f008beb96eecd5200"
    }
};

https.get(options, (res: any) => {
    let data = '';
    let leftColumn: number[] = [];
    let rightColumn: number[] = [];

    res.on('data', (chunk: any) => {
        data += chunk;
    });
    res.on('end', () => {
        data.split('\n').forEach((line: string) => {
            const [left, right] = line.split(/\s+/);
            if (left && right) {
                leftColumn.push(Number(left));
                rightColumn.push(Number(right));
            }
        });
        
        leftColumn = leftColumn.sort((a: number, b: number) => a - b);
        rightColumn = rightColumn.sort((a: number, b: number) => a - b);
        let sum = 0;
        for (let i = 0; i < leftColumn.length; i++) {
            sum += Math.abs(leftColumn[i] - rightColumn[i]);
        }
        console.log(sum);
    });
});